package com.example.demo.models;

import jakarta.persistence.*;

@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @NotNull
//    @Size(min = 1, max = 255)
    private String name;

    @ManyToOne
    @JoinColumn(name = "director_id")
    private Director director;

//    @NotNull
//    @Size(min = 1, max = 255)
    private String producer;

//    @NotNull
//    @Min(0)
//    @Max(10)
    private Double rating;

//    @NotNull
//    @Min(1)
    private Double length;
    public Movie(Long id, String name, Director director, String producer, double rating, double length) {
        this.id = id;
        this.name = name;
        this.length = length;
        this.director = director;
        this.producer = producer;
        this.rating = rating;
    }

    public Movie(String name, Director director, String producer, double rating, double length) {
        this.name = name;
        this.length = length;
        this.director = director;
        this.producer = producer;
        this.rating = rating;
    }

    public Movie() {
        // Konstruktor bezargumentowy
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Double getLength() {
        return length;
    }
    public void setLength(double length) {
        this.length = length;
    }
    public Director getDirector() {
        return director;
    }
    public void setDirector(Director director) {
        this.director = director;
    }
    public String getProducer() {
        return producer;
    }
    public void setProducer(String producer) {
        this.producer = producer;
    }
    public Double getRating() {
        return rating;
    }
    public void setRating(double rating) {
        this.rating = rating;
    }
}