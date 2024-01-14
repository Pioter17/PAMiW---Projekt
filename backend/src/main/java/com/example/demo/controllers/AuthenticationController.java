package com.example.demo.controllers;

import com.example.demo.other.AuthenticationRequest;
import com.example.demo.other.AuthenticationResponse;
import com.example.demo.other.RegisterRequest;
import com.example.demo.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
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
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

//    @PostMapping("/google")
//    @CrossOrigin(origins = "http://localhost:4200")
//    public ResponseEntity<AuthenticationResponse> google(
//            @RequestBody AuthenticationRequest request
//    ){
//        var user = AuthenticationRequest.builder()
//                .name("admin")
//                .password("admin")
//                .build();
//        return ResponseEntity.ok(service.authenticate(user));
//    }

//    @GetMapping("/google")
//    public String afterLoginSuccess(Model model) {
//        var user = AuthenticationRequest.builder()
//                .name("admin")
//                .password("admin")
//                .build();
//        var token = service.authenticate(user);
//        AuthenticationResponse authenticationResponse = new AuthenticationResponse(token.getToken());
//
//        model.addAttribute("authResponse", authenticationResponse);
//
//        return "redirect:http://localhost:4200/auth/login";
//    }

    @PostMapping("/logout")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> logout(@RequestBody String token) {
        service.logout(token);
        return ResponseEntity.noContent().build();
    }
}