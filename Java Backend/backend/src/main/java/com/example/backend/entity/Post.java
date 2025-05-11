package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;



@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotBlank(message = "El título no puede estar vacío")
    @Size(max = 255, message = "El título no puede tener más de 255 caracteres")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "El contenido no puede estar vacío")
    @Column(nullable = false)
    private String content;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(name = "is_public", nullable = false)
    private boolean isPublic;



    // Constructor vacío requerido por JPA
    public Post() {}

    // Constructor con parámetros
    public Post(String title, String content, User user, boolean isPublic) {
        this.title = title;
        this.content = content;
        this.user = user;
        this.isPublic = isPublic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "El título no puede estar vacío") @Size(max = 255, message = "El título no puede tener más de 255 caracteres") String getTitle() {
        return title;
    }

    public void setTitle(@NotBlank(message = "El título no puede estar vacío") @Size(max = 255, message = "El título no puede tener más de 255 caracteres") String title) {
        this.title = title;
    }

    public @NotBlank(message = "El contenido no puede estar vacío") String getContent() {
        return content;
    }

    public void setContent(@NotBlank(message = "El contenido no puede estar vacío") String content) {
        this.content = content;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
