package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import com.example.backend.util.Role;
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
public class UserResolver  {

    private final UserService userService;

    public UserResolver(UserService userService) {
        this.userService = userService;
    }

    private User getCurrentUserAndVerifyAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Usuario no autenticado");
        }

        // Obtiene el principal (usuario autenticado)
        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails userDetails) {
            // Aquí ya tienes el username del usuario autenticado
            String username = userDetails.getUsername();

            // Verifica si el rol está incluido en las autoridades del JWT
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

            // Si no tiene el rol de ADMIN, lanza una excepción
            if (!isAdmin) {
                throw new RuntimeException("Acceso denegado: solo ADMIN puede realizar esta acción.");
            }

            // Ahora obtenemos la entidad User desde la base de datos utilizando el UserService
            User user = userService.getUserByUsername(username);

            return user; // Devuelve la entidad User (no UserDetails)
        } else {
            throw new RuntimeException("No se pudo obtener el usuario autenticado");
        }
    }





    //obtener todos los usuarios ( solo ADMIN)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @QueryMapping
    public List<UserDTO> getUsers() {
        getCurrentUserAndVerifyAdmin();

        return userService.getAllUsers().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }



    //obtener un usuario especifico por ID (ADMIN)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @QueryMapping
    public UserDTO getUser(@Argument Long id) {
        getCurrentUserAndVerifyAdmin();

        return new UserDTO(userService.getUserById(id));
    }

    //Crear usuario (solo admin)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @MutationMapping
    public UserDTO createUser(@Argument String username, @Argument String password,@Argument String role) {
        getCurrentUserAndVerifyAdmin();
        if (username == null || username.trim().isEmpty()) {
            throw new RuntimeException("El nombre de usuario no puede estar vacío");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("La contraseña no puede estar vacía");
        }
        if (role == null || role.trim().isEmpty()) {
            throw new RuntimeException("El rol no puede estar vacio");
        }

        User user= userService.createUser(username, password, Role.valueOf(role));
        return new UserDTO(user);
    }


    //Editar un ususrio (SOLO ADMIN)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @MutationMapping
    public UserDTO editUser(@Argument Long id, @Argument String username, @Argument String password,@Argument String role) {
        getCurrentUserAndVerifyAdmin();
        if (username == null || username.trim().isEmpty()) {
            throw new RuntimeException("El nombre de usuario no puede estar vacío");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("La contraseña no puede estar vacía");
        }
        if (role == null || role.trim().isEmpty()) {
            throw new RuntimeException("El rol no puede estar vacio");
        }
        User user = userService.editUser(id, username, password, Role.valueOf(role));
        return new UserDTO(user);
    }

    // Eliminar un usuario ( solo admin)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {

        getCurrentUserAndVerifyAdmin();
        userService.deleteUser(id);
        return true;
    }
}
