package com.example.backend.service;

import com.example.backend.config.JwtUtil;
import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    private final String TEST_USERNAME = "testuser";
    private final String TEST_PASSWORD = "password";
    private final String ENCODED_PASSWORD = "encodedPassword";
    private final String TEST_TOKEN = "testToken";
    private final String TEST_REFRESH_TOKEN = "testRefreshToken";

    @Nested
    @DisplayName("Cargar usuario por username")
    class LoadUserByUsername {
        @Test
        @DisplayName("Cuando el usuario existe, entonces retorna UserDetails")
        void whenUserExists_thenReturnsUserDetails() {
            // Arrange
            User testUser = createTestUser();
            when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(testUser));

            // Act
            UserDetails userDetails = authService.loadUserByUsername(TEST_USERNAME);

            // Assert
            assertAll(
                    () -> assertEquals(TEST_USERNAME, userDetails.getUsername()),
                    () -> assertEquals(ENCODED_PASSWORD, userDetails.getPassword()),
                    () -> assertTrue(userDetails.isEnabled()),
                    () -> assertEquals(1, userDetails.getAuthorities().size())
            );
        }

        @Test
        @DisplayName("Cuando el usuario no existe, entonces lanza excepción")
        void whenUserNotExists_thenThrowsException() {
            // Arrange
            when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.empty());

            // Act & Assert
            assertThrows(UsernameNotFoundException.class, () ->
                    authService.loadUserByUsername(TEST_USERNAME)
            );
        }
    }

    @Nested
    @DisplayName("Registro de usuario")
    class UserRegistration {
        @Test
        @DisplayName("Cuando el usuario es nuevo, entonces lo registra correctamente")
        void whenNewUser_thenRegistersSuccessfully() {
            // Arrange
            AuthRequest request = new AuthRequest(TEST_USERNAME, TEST_PASSWORD);
            when(userRepository.existsByUsername(TEST_USERNAME)).thenReturn(false);
            when(passwordEncoder.encode(TEST_PASSWORD)).thenReturn(ENCODED_PASSWORD);
            when(jwtUtil.generateToken(anyString(), anyList()))
                    .thenReturn(TEST_TOKEN, TEST_REFRESH_TOKEN);

            // Act
            AuthResponse response = authService.register(request);

            // Assert
            verify(userRepository).save(userCaptor.capture());
            User savedUser = userCaptor.getValue();

            assertAll(
                    () -> assertEquals(TEST_USERNAME, savedUser.getUsername()),
                    () -> assertEquals(ENCODED_PASSWORD, savedUser.getPassword()),
                    () -> assertEquals(Role.USER, savedUser.getRole()),
                    () -> assertEquals(TEST_TOKEN, response.getToken()),
                    () -> assertEquals(TEST_REFRESH_TOKEN, response.getRefreshToken())
            );
        }

        @Test
        @DisplayName("Cuando el usuario ya existe, entonces lanza excepción")
        void whenUserExists_thenThrowsException() {
            // Arrange
            AuthRequest request = new AuthRequest(TEST_USERNAME, TEST_PASSWORD);
            when(userRepository.existsByUsername(TEST_USERNAME)).thenReturn(true);

            // Act & Assert
            RuntimeException exception = assertThrows(RuntimeException.class, () ->
                    authService.register(request)
            );

            assertEquals("Usuario ya existe", exception.getMessage());
        }
    }

    @Nested
    @DisplayName("Login de usuario")
    class UserLogin {
        @Test
        @DisplayName("Cuando las credenciales son válidas, entonces retorna tokens")
        void whenValidCredentials_thenReturnsTokens() {
            // Arrange
            AuthRequest request = new AuthRequest(TEST_USERNAME, TEST_PASSWORD);
            User testUser = createTestUser();

            when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(testUser));
            when(passwordEncoder.matches(TEST_PASSWORD, ENCODED_PASSWORD)).thenReturn(true);
            when(jwtUtil.generateToken(anyString(), anyList()))
                    .thenReturn(TEST_TOKEN, TEST_REFRESH_TOKEN);

            // Act
            AuthResponse response = authService.login(request);

            // Assert
            assertAll(
                    () -> assertEquals(TEST_TOKEN, response.getToken()),
                    () -> assertEquals(TEST_REFRESH_TOKEN, response.getRefreshToken()),
                    () -> assertEquals("Inicio de sesión exitoso", response.getMessage())
            );
        }

        @Test
        @DisplayName("Cuando el usuario no existe, entonces lanza excepción")
        void whenUserNotExists_thenThrowsException() {
            // Arrange
            AuthRequest request = new AuthRequest(TEST_USERNAME, TEST_PASSWORD);
            when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.empty());

            // Act & Assert
            RuntimeException exception = assertThrows(RuntimeException.class, () ->
                    authService.login(request)
            );

            assertEquals("Usuario no encontrado", exception.getMessage());
        }

        @Test
        @DisplayName("Cuando la contraseña es incorrecta, entonces lanza excepción")
        void whenInvalidPassword_thenThrowsException() {
            // Arrange
            AuthRequest request = new AuthRequest(TEST_USERNAME, "wrongPassword");
            User testUser = createTestUser();

            when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(testUser));
            when(passwordEncoder.matches("wrongPassword", ENCODED_PASSWORD)).thenReturn(false);

            // Act & Assert
            RuntimeException exception = assertThrows(RuntimeException.class, () ->
                    authService.login(request)
            );

            assertEquals("Credenciales incorrectas", exception.getMessage());
        }
    }

    @Nested
    @DisplayName("Refresh Token")
    class TokenRefresh {
        @Test
        @DisplayName("Cuando el token es válido, entonces genera nuevo access token")
        void whenValidToken_thenReturnsNewAccessToken() {
            // Arrange
            when(jwtUtil.validateToken(TEST_REFRESH_TOKEN)).thenReturn(true);
            when(jwtUtil.getUsernameFromToken(TEST_REFRESH_TOKEN)).thenReturn(TEST_USERNAME);
            when(jwtUtil.getRolesFromToken(TEST_REFRESH_TOKEN)).thenReturn(List.of("USER"));
            when(jwtUtil.generateToken(TEST_USERNAME, List.of("USER"))).thenReturn("newToken");

            // Act
            AuthResponse response = authService.refreshToken(TEST_REFRESH_TOKEN);

            // Assert
            assertAll(
                    () -> assertEquals("newToken", response.getToken()),
                    () -> assertEquals(TEST_REFRESH_TOKEN, response.getRefreshToken())
            );
        }

        @Test
        @DisplayName("Cuando el token es inválido, entonces lanza excepción")
        void whenInvalidToken_thenThrowsException() {
            // Arrange
            when(jwtUtil.validateToken("invalidToken")).thenReturn(false);

            // Act & Assert
            assertThrows(RuntimeException.class, () ->
                    authService.refreshToken("invalidToken")
            );
        }
    }

    private User createTestUser() {
        User user = new User();
        user.setUsername(TEST_USERNAME);
        user.setPassword(ENCODED_PASSWORD);
        user.setRole(Role.USER);
        return user;
    }
}