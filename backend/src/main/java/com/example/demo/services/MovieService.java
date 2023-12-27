package com.example.demo.services;

import com.example.demo.models.Movie;
import com.example.demo.other.ServiceResponse;
import com.example.demo.repositories.DirectorRepository;
import com.example.demo.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository, DirectorRepository directorRepository) {
        this.movieRepository = movieRepository;
    }

    public ServiceResponse<Movie> addMovie(Movie movie) {
        if (movie.getId() != null) {
            Optional<Movie> movieById = movieRepository.findById(movie.getId());
            if (movieById.isPresent()) {
                return new ServiceResponse<Movie>(null, false, "Movie is already in db");
            }
        }
        try {
            movieRepository.save(movie);
            return new ServiceResponse<Movie>(movie, true, "Movie added");
        } catch (Exception e) {
            System.out.println(e);
            return new ServiceResponse<Movie>(null, false, "Error during adding movie");
        }
    }
}
