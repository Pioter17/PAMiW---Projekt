package com.example.demo.controllers;

import com.example.demo.dtos.MovieDTO;
import com.example.demo.models.Director;
import com.example.demo.models.Movie;
import com.example.demo.other.ServiceResponse;
import com.example.demo.repositories.DirectorRepository;
import com.example.demo.repositories.MovieRepository;
import com.example.demo.services.MovieDTOConverterService;
import com.example.demo.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {

    private final MovieRepository movieRepository;

    private final DirectorRepository directorRepository;
    private final MovieService movieService;
    private final MovieDTOConverterService movieDTOConverterService;

    @Autowired
    public MovieController(MovieRepository movieRepository, DirectorRepository directorRepository,MovieService movieService , MovieDTOConverterService movieDTOConverterService) {
        this.movieRepository = movieRepository;
        this.directorRepository = directorRepository;
        this.movieService = movieService;
        this.movieDTOConverterService = movieDTOConverterService;
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Optional<Movie> optionalMovie = movieRepository.findById(id);

        return optionalMovie.map(movie -> ResponseEntity.ok(movie))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Page<Movie>> getAllMovies(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Movie> moviePage = movieRepository.findAll(pageable);

        if (moviePage.isEmpty()) {
            return ResponseEntity.ok(Page.empty());
        } else {
            return ResponseEntity.ok(moviePage);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Movie>> searchMovies(
            @RequestParam("name") String name,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        List<Movie> movies = movieRepository.findAll();

        String fragmentLowerCase = name.toLowerCase();

        List<Movie> matchingMovies = movies
                .stream()
                .filter(movie -> movie.getName().toLowerCase().contains(fragmentLowerCase))
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), matchingMovies.size());

        if (start > matchingMovies.size() || start < 0 || start > end) {
            return ResponseEntity.ok(Page.empty());
        } else {
            List<Movie> paginatedMovies = matchingMovies.subList(start, end);
            Page<Movie> moviePage = new PageImpl<>(paginatedMovies, pageable, matchingMovies.size());
            return ResponseEntity.ok(moviePage);
        }
    }

    // Endpoint do dodawania nowego filmu
    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ServiceResponse<Movie> addMovie(@RequestBody MovieDTO movieDTO) {
        Movie movie;
        try{
            movie = this.movieDTOConverterService.convert(movieDTO);
        } catch (Exception e) {
            return new ServiceResponse<Movie>(null,false,"Cannot parse item");
        }
        if (movie == null || movie.getDirector() == null || movie.getRating() == null || movie.getName() == null || movie.getLength() == null) {
            return new ServiceResponse<>(null, false, "Body is missing");
        }
        Movie movieToAdd = new Movie(movie.getName(), movie.getDirector(), movie.getProducer(), movie.getRating(), movie.getLength());
        return movieService.addMovie(movieToAdd);
    }

    // Endpoint do aktualizacji filmu po ID
    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ServiceResponse<Movie> updateMovie(@PathVariable Long id, @RequestBody MovieDTO movieDTO) {
        Movie movie;
        try{
            movie = this.movieDTOConverterService.convert(movieDTO);
        } catch (Exception e) {
            return new ServiceResponse<Movie>(null,false,"Cannot parse item");
        }
        if (movie == null || movie.getDirector() == null || movie.getRating() == null || movie.getName() == null || movie.getLength() == null) {
            return new ServiceResponse<>(null, false, "Body is missing");
        }
        Movie movieToUpdate = new Movie(id, movie.getName(), movie.getDirector(), movie.getProducer(), movie.getRating(), movie.getLength());

        movieRepository.save(movieToUpdate);
        return new ServiceResponse<Movie>(movie, true, "Movie updated");
    }

    // Endpoint do usuwania filmu po ID
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        Optional<Movie> optionalMovie = movieRepository.findById(id);
        if (optionalMovie.isPresent()) {
            Movie movie = optionalMovie.get();
            Director director = movie.getDirector();
            if (director != null) {
                director.getMovies().remove(movie);
                directorRepository.save(director);
            }
            movieRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
