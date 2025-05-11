package com.example.backend.service;


import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public Post createPost(Long userId, String title, String content, boolean isPublic) {
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado con ID: " + userId);
        }
        Post post = new Post(title, content, user, isPublic);

        return postRepository.save(post);
    }

    @Transactional
    public Post editPost(Long postId, String title, String content, boolean isPublic) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post no encontrado con ID: " + postId));
        if (title != null) post.setTitle(title);
        if (content != null) post.setContent(content);
        post.setPublic(isPublic);
        return postRepository.save(post);
    }

    public List<Post> getPublicPosts() {
        return postRepository.findByIsPublicTrue();
    }

    @Transactional
    public void deletePost(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new RuntimeException("Post no encontrado con ID: " + postId);
        }
        postRepository.deleteById(postId);
    }

    public List<Post> getPostsByUserId(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("El post con ID " + postId + " no fue encontrado."));
    }


}
