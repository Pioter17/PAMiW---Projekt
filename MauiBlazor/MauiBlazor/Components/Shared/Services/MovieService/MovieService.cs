using MauiBlazor.Components.Authentication;
using MauiBlazor.Components.Shared.Configuration;
using MauiBlazor.Components.Shared.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Shared.Services.MovieService
{
    public class MovieService
    {

        private readonly HttpClient _httpClient;
        private readonly AppSettings _appSettings;
        public MovieService(HttpClient httpClient, IOptions<AppSettings> appSettings)
        {
            _httpClient = httpClient;
            _appSettings = appSettings.Value;
        }

        public async Task<Movie> CreateMovieAsync(MovieDTO movie)
        {
            var response = await _httpClient.PostAsJsonAsync("http://localhost:8080/movies", movie);
            var result = await response.Content.ReadFromJsonAsync<Movie>();
            return result;
        }

        public async Task<bool> DeleteMovieAsync(int id)
        {
            try
            {
                var response = await _httpClient.DeleteAsync("http://localhost:8080/movies" + '/' + id);
                if (!response.IsSuccessStatusCode)
                    return false;

                var result = await response.Content.ReadFromJsonAsync<bool>();
                return result;
            }
            catch (Exception)
            {
                return false;
            }

        }

        public async Task<MoviePaginationResponse> GetMoviesAsync(int page)
        {
            try
            {
                string getUserSessionFromStorage = await SecureStorage.Default.GetAsync("UserSession");
                var userSession = JsonSerializer.Deserialize<UserSession>(getUserSessionFromStorage);
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", userSession.Token.Replace("\\", ""));

                var uri = new Uri($"http://localhost:8080/movies?page={page - 1}", UriKind.Absolute);

                var response = await _httpClient.GetAsync(uri);

                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var paginationResponse = await response.Content.ReadFromJsonAsync<MoviePaginationResponse>();
                return paginationResponse;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Movie> UpdateMovieAsync(int id, MovieDTO movie)
        {
            var response = await _httpClient.PutAsJsonAsync("http://localhost:8080/movies" + '/' + id, movie);
            var result = await response.Content.ReadFromJsonAsync<Movie>();
            return result;
        }

        public async Task<MoviePaginationResponse> SearchMoviesAsync(string text, int page)
        {

            try
            {
                string searchUrl = string.IsNullOrWhiteSpace(text) ? "" : $"name={text}&page={page - 1}";

                var uri = new Uri($"http://localhost:8080/movies/search?{searchUrl}", UriKind.Absolute);

                var response = await _httpClient.GetAsync(uri);

                if (!response.IsSuccessStatusCode)
                    return null;

                var json = await response.Content.ReadAsStringAsync();
                var result = await response.Content.ReadFromJsonAsync<MoviePaginationResponse>();

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Task<ServiceResponse<Movie>> UpdateMoviesAsync(Movie movie)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<bool>> DeleteMoviesAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<Movie>> CreateMoviesAsync(Movie movie)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<Movie>>> SearchMoviessAsync(string text)
        {
            throw new NotImplementedException();
        }
    }
}
