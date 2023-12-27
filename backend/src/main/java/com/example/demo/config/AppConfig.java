package com.example.demo.config;

import com.example.demo.models.Director;
import com.example.demo.models.Movie;
import com.example.demo.repositories.DirectorRepository;
import com.example.demo.repositories.MovieRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Locale;
import java.util.Random;

@Configuration
public class AppConfig {

    @Bean
    CommandLineRunner commandLineRunner(MovieRepository movieRepository, DirectorRepository directorRepository) {
        return args -> {
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
