package com.example.demo.controllers;

import com.example.demo.other.AuthenticationRequest;
import com.example.demo.other.AuthenticationResponse;
import com.example.demo.other.RegisterRequest;
import com.example.demo.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import static com.example.demo.other.Role.ADMIN;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
//    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
//    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/google")
//    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<AuthenticationResponse> google(
            @RequestBody String credential
    ){
        return ResponseEntity.ok(service.oauth(credential));
    }

    @PostMapping("/logout")
//    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> logout(@RequestBody String token) {
        service.logout(token);
        return ResponseEntity.noContent().build();
    }
}