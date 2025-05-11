package com.example.backend.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;




    // Generar un JWT
    public String generateToken(String username, List<String> roles) {
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // Expira en el tiempo configurado
                .signWith(SignatureAlgorithm.HS256, secretKey) // Usar el algoritmo HS256
                .compact();
    }

    // Validar un JWT
    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Obtener los roles del token
    public List<String> getRolesFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.get("roles", List.class);
    }

    // Obtener el nombre de usuario (o el "subject") desde el JWT
    public String getUsernameFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getSubject();
    }

    // Obtener los claims del token
    private Claims getClaimsFromToken(String token) {
        JwtParser jwtParser = Jwts.parser() // Usar parserBuilder
                .setSigningKey(secretKey) // Usar la clave secreta
                .build(); // Construir el JwtParser
        return jwtParser.parseClaimsJws(token).getBody(); // Usar parseClaimsJws para obtener los claims
    }

    // Comprobar si el token ha expirado
    public boolean isTokenExpired(String token) {
        return getClaimsFromToken(token).getExpiration().before(new Date());
    }

    // Refrescar el token (si es válido y no ha expirado)
    public String refreshToken(String token) {
        String username = getUsernameFromToken(token);
        List <String> roles = getRolesFromToken(token);
        return generateToken(username, roles);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // Claims::getSubject retorna el usuario
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        JwtParser jwtParser = Jwts.parser() // Usar parserBuilder
                .setSigningKey(secretKey) // Usar la clave secreta
                .build(); // Construir el JwtParser
        return jwtParser.parseClaimsJws(token).getBody(); // Obtener los claims del token
    }

}
