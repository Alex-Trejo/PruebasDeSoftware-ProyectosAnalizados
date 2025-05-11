    package com.example.backend.service;


    import com.example.backend.dto.AuthRequest;
    import com.example.backend.dto.AuthResponse;
    import com.example.backend.entity.User;
    import com.example.backend.repository.UserRepository;
    import com.example.backend.config.JwtUtil;
    import com.example.backend.util.Role;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class AuthService implements UserDetailsService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private JwtUtil jwtUtil;

        @Autowired
        private BCryptPasswordEncoder passwordEncoder;


        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            // Buscar al usuario en la base de datos
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            System.out.println("Usuario encontrado: " + user.getUsername()); // Agregar log

            // Convertir el rol del usuario a una lista de autoridades
            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

            // Devolvemos un UserDetails con la información del usuario
            return new org.springframework.security.core.userdetails.User(
                    user.getUsername(),
                    user.getPassword(),
                    true, true, true, true, // Habilitar la cuenta, no expirada, no bloqueada, credenciales no expiradas
                    authorities // Lista de autoridades (roles)
            );
        }


        public AuthResponse register(AuthRequest authRequest) {

            if(userRepository.existsByUsername(authRequest.getUsername())){
                throw new RuntimeException("Usuario ya existe");
            }

            User newUser = new User();
            newUser.setUsername(authRequest.getUsername());
            newUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));
            newUser.setRole(Role.USER);
            userRepository.save(newUser);

            //Generar un token Jwt
            String token = jwtUtil.generateToken(newUser.getUsername(), List.of(newUser.getRole().name()));
            String refreshToken = jwtUtil.generateToken(newUser.getUsername(), List.of(newUser.getRole().name()));

            return new AuthResponse(token, refreshToken, "Usuario registrado exitosamente");
        }

        public AuthResponse login(AuthRequest authRequest) {
            // Verificar las credenciales del usuario
            User user = userRepository.findByUsername(authRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                throw new RuntimeException("Credenciales incorrectas");
            }

            // Generar un token JWT
            String token = jwtUtil.generateToken(user.getUsername(), List.of(user.getRole().name()));
            String refreshToken = jwtUtil.generateToken(user.getUsername(), List.of(user.getRole().name()));

            System.out.println("Token generado: " + token); // Agregar log

            return new AuthResponse(token, refreshToken, "Inicio de sesión exitoso");
        }


        public AuthResponse refreshToken(String refreshToken) {
            if (!jwtUtil.validateToken(refreshToken)) {
                throw new RuntimeException("Token inválido");
            }

            String username = jwtUtil.getUsernameFromToken(refreshToken);
            List<String> roles = jwtUtil.getRolesFromToken(refreshToken);

            String newAccessToken = jwtUtil.generateToken(username, roles);

            return new AuthResponse(newAccessToken, refreshToken, "Nuevo token");  // Devuelve el nuevo access token y el mismo refresh token
        }
        }





