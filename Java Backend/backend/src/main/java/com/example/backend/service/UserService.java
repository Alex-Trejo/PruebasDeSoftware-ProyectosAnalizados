package com.example.backend.service;

import com.example.backend.config.JwtUtil;
import com.example.backend.dto.AuthResponse;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtener el nombre de usuario autenticado
    public String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();  // Obtiene el nombre de usuario (Principal)
        }
        return null;
    }

    // Verificar si el usuario tiene un rol específico
    public boolean hasRole(String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_" + role));
        }
        return false;
    }

    public User createUser(String username, String password, Role role) {

        if(userRepository.existsByUsername(username)){
            throw new RuntimeException("Usuario ya existe");
        }
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        if (role == null) {
            throw new RuntimeException("El rol no puede estar vacio");
        }

        newUser.setRole(role);




        //Generar un token Jwt
        String token = jwtUtil.generateToken(newUser.getUsername(), List.of(newUser.getRole().name()));
        String refreshToken = jwtUtil.generateToken(newUser.getUsername(), List.of(newUser.getRole().name()));
        new AuthResponse(token, refreshToken, "Usuario registrado exitosamente");

        return userRepository.save(newUser);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User editUser(Long id, String username, String password, Role role) {
        User user = getUserById(id);
        if (username != null) user.setUsername(username);
        if (password != null) user.setPassword(passwordEncoder.encode(password));
        if (role != null) user.setRole(role);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }



}
