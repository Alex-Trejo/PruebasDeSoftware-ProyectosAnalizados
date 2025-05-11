package com.example.backend.dto;
import com.example.backend.entity.User;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {
    private long id;
    private String username;
    private String role;

    public UserDTO() {}

    // Constructor que convierte un objeto User en UserDTO
    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.role = user.getRole().name(); // Convierte el Enum Role a String
    }

}
