package com.example.demo.services;


import com.example.demo.models.User;
import com.example.demo.other.AuthenticationRequest;
import com.example.demo.other.AuthenticationResponse;
import com.example.demo.other.RegisterRequest;
import com.example.demo.other.Role;
import com.example.demo.repositories.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

import static com.example.demo.other.Role.ADMIN;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getName(),
                        request.getPassword()
                )
        );
        var user = repository.findByName(request.getName())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    private JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
    public AuthenticationResponse oauth(String credential) {
        credential = credential.replace("\"", "");
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList(googleClientId))
                .build();
        try {


            GoogleIdToken idToken = verifier.verify(credential);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Teraz możesz wygenerować swój JWT token i zwrócić go w odpowiedzi

                var user = repository.findByName("piotrek")
                        .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .build();
            } else {
                // Nieprawidłowy token ID
                return null;
            }
        } catch (GeneralSecurityException | IOException e) {
            // Błąd weryfikacji
            e.printStackTrace();
            return null;
        }
    }

    public void logout(String token) {
        jwtService.deleteToken(token);
    }
}