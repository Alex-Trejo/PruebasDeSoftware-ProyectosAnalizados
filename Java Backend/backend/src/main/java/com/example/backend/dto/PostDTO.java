package com.example.backend.dto;

import com.example.backend.entity.Post;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private UserDTO user;
    private boolean isPublic;

    public PostDTO() {}

    public PostDTO( Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.user = (post.getUser() != null) ? new UserDTO(post.getUser()) : null;
        this.isPublic = post.isPublic();


    }}
