package com.example.backend.controller;

import com.example.backend.dto.PostDTO;
import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.PostService;
import com.example.backend.service.UserService;
import com.example.backend.util.Messages;
import com.example.backend.util.Role;
import graphql.GraphQLException;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;


@Controller
public class PostResolver  {

    private final PostService postService;
    private final PostRepository postRepository;
    private final UserService userService;


    private final UserRepository userRepository;

    // NOSONAR
    public PostResolver(PostService postService, PostRepository postRepository, UserService userService, UserRepository userRepository) {
        this.postService = postService;
        this.postRepository = postRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }


    private User getCurrentUserAndVerifyUSER() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new GraphQLException("Usuario no autenticado");
        }

        // Obtiene el principal (usuario autenticado)
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails userDetails) {
            // Aquí ya tienes el username del usuario autenticado
            String username = userDetails.getUsername();

            // Verifica si el rol está incluido en las autoridades del JWT
            boolean isUSER = authentication.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_USER"));

            // Si no tiene el rol de ADMIN, lanza una excepción
            if (!isUSER) {
                throw new GraphQLException("Acceso denegado: ADMIN no puede crear un post.");
            }

            // Ahora obtenemos la entidad User desde la base de datos utilizando el UserService
            User user = userService.getUserByUsername(username);

            return user; // Devuelve la entidad User (no UserDetails)
        } else {
            throw new GraphQLException("No se pudo obtener el usuario autenticado");
        }
    }

    //Obtener un post por id
    @QueryMapping
    public PostDTO getPost(@Argument Long postId) {
        String username= getAuthenticatedUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new GraphQLException(Messages.USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new GraphQLException(Messages.POST_NOT_FOUND));


        if (!post.getUser().getUsername().equals(username) && !user.getRole().equals(Role.ADMIN)) {
            throw new GraphQLException("No tienes permiso para ver este post");
        }

        return new PostDTO(postService.getPostById(postId));
    }

    @QueryMapping
    public List<PostDTO> getPublicPosts() {
        return postService.getPublicPosts().stream().map(post -> new PostDTO(post)).collect(Collectors.toList());

    }

    //Obtener todos los posts publicos
    @QueryMapping
    public List<PostDTO> getPosts() {

        return postService.getAllPosts().stream()
                .map(PostDTO::new)
                .collect(Collectors.toList());
    }


    @QueryMapping
    public List<PostDTO> getMyPosts (){
        String username = getAuthenticatedUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(Messages.USER_NOT_FOUND));

        return postService.getPostsByUserId(user.getId()).stream()
                .map(PostDTO::new)
                .collect(Collectors.toList());

    }

    //Crear un post (usuario autenticado)
    @PreAuthorize("hasRole('ROLE_USER')")
    @MutationMapping
    public PostDTO createPost(@Argument String title,@Argument String content, @Argument boolean isPublic) {
        getCurrentUserAndVerifyUSER();
        String username = getAuthenticatedUsername();

        //Buscar el usuario en la base de datos
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(Messages.USER_NOT_FOUND));

        return new PostDTO(postService.createPost(user.getId(), title, content, isPublic));
    }

    // Metodo para obtener el nombre de usuario autenticado desde el contexto de Spring Security
    private String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            throw new RuntimeException("No se pudo obtener el usuario autenticado");
        }
    }

    //Editar un post (solo si es del usuario autenticado)
    @MutationMapping
    public PostDTO editPost(@Argument Long postId, @Argument String title,@Argument String content, @Argument boolean isPublic) {
        String username = getAuthenticatedUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(Messages.USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException(Messages.POST_NOT_FOUND));

        //Verificar que el post pertenece al usuario autenticado
        if (!post.getUser().getUsername().equals(username) && !user.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("No tienes permiso para editar este post");
        }
        return new PostDTO(postService.editPost(postId, title, content, isPublic));
    }
    //Eliminar un post (solo si es del usuario autenticado o el admin)
    @MutationMapping
    public Boolean deletePost(@Argument  Long postId) {
        String username = getAuthenticatedUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(Messages.USER_NOT_FOUND));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException(Messages.POST_NOT_FOUND));

        //Verificar que el post pertnece al usuario autenticado
        if (!post.getUser().getUsername().equals(username) && !user.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("No tienes permiso para eliminar este post");
        }
        postService.deletePost(postId);
        return true;
    }





    public List<PostDTO> getPostsByUserId(Long userId) {
        return postService.getPostsByUserId(userId).stream().map(PostDTO::new).toList();
    }
}
