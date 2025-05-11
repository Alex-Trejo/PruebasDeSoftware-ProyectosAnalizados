package com.example.backend.controller;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.service.AuthService;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class AuthResolver {
    @Autowired
    private AuthService authService;

    // Registro de usuario



    @MutationMapping
    public AuthResponse register(@Argument String username, @Argument String password) {
        if (username == null || username.trim().isEmpty()) {
            throw new RuntimeException("El nombre de usuario no puede estar vacío");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("La contraseña no puede estar vacía");
        }

        AuthRequest authRequest = new AuthRequest(username, password);
        return authService.register(authRequest);
    }

    // Login de usuario
    @MutationMapping
    public AuthResponse login(@Argument String username, @Argument String password) {
        AuthRequest authRequest = new AuthRequest(username, password);
        AuthResponse authResponse = authService.login(authRequest);

        return authResponse;
    }

    // Refrescar el token
    @PreAuthorize("isAuthenticated()")
    @MutationMapping
    public AuthResponse refreshToken(@Argument String refreshToken) {
        return authService.refreshToken(refreshToken);
    }

}
