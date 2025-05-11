package com.example.backend.dto;

public class AuthResponse {

    private String token;
    private String refreshToken;
    private String message;

    //constructor
    public AuthResponse(String token, String refreshToken, String message) {
        this.token = token;
        this.message = message;
        this.refreshToken = refreshToken;
    }

    //Getters y setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;

    }


    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

}
