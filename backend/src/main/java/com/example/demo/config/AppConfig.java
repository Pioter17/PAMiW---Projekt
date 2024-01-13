package com.example.demo.config;

import com.example.demo.models.Director;
import com.example.demo.models.Movie;
import com.example.demo.other.RegisterRequest;
import com.example.demo.repositories.DirectorRepository;
import com.example.demo.repositories.MovieRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.AuthenticationService;
import com.github.javafaker.Faker;
import jakarta.persistence.Enumerated;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Locale;
import java.util.Random;

import static com.example.demo.other.Role.ADMIN;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService(){
        return username -> userRepository.findByName(username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner commandLineRunner(
            MovieRepository movieRepository,
            DirectorRepository directorRepository,
            AuthenticationService service
        ) {
        return args -> {
            var admin = RegisterRequest.builder()
                    .name("admin")
                    .password("admin")
                    .role(ADMIN)
                    .build();
            service.register(admin);

            Random random = new Random(98765);
            Faker faker = new Faker(Locale.ENGLISH, random);
            for (int i = 0; i < 40; i++) {
                Director director = generateFakeDirector(faker);
                directorRepository.save(director);
                Movie movie = generateFakeBook(faker, director);
                movieRepository.save(movie);
            }
        };
    }

    private Director generateFakeDirector(Faker faker) {
        Director director = new Director();
        director.setName(faker.name().firstName()+" "+faker.name().lastName());
        director.setNationality(faker.address().country());
        director.setAge(faker.number().numberBetween(20, 90));

        return director;
    }

    private Movie generateFakeBook(Faker faker, Director director) {
        Movie movie = new Movie();
        movie.setName(faker.book().title());
        movie.setDirector(director);
        movie.setProducer(faker.company().name());
        movie.setRating(faker.number().numberBetween((int) 1.0, (int) 10.0));
        movie.setLength(faker.number().numberBetween(60, 240));

        return movie;
    }
}