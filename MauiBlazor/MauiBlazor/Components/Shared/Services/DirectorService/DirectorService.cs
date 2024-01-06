using MauiBlazor.Components.Shared.Configuration;
using MauiBlazor.Components.Shared.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Shared.Services.DirectorService
{
    public class DirectorService
    {

        private readonly AppSettings _appSettings;
        private readonly HttpClient _httpClient;
        public DirectorService(IOptions<AppSettings> appSettings, HttpClient httpClient)
        {
            _appSettings = appSettings.Value;
            _httpClient = httpClient;
        }
        public async Task<DirectorPaginationResponse> GetDirectorsAsync(int page)
        {
            try
            {
                var uri = new Uri($"http://localhost:8080/directors?page={page-1}", UriKind.Absolute);

                var response = await _httpClient.GetAsync(uri);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine(response.StatusCode.ToString());
                    return null;
                }
                var json = await response.Content.ReadAsStringAsync();
                var paginationResponse = await response.Content.ReadFromJsonAsync<DirectorPaginationResponse>();
                return paginationResponse;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<DirectorPaginationResponse> SearchDirectorsAsync(string text, int page)
        {

            try
            {
                string searchUrl = string.IsNullOrWhiteSpace(text) ? "" : $"name={text}&page={page - 1}";

                var uri = new Uri($"http://localhost:8080/directors/search?{searchUrl}", UriKind.Absolute);

                var response = await _httpClient.GetAsync(uri);

                if (!response.IsSuccessStatusCode)
                    return null;

                var json = await response.Content.ReadAsStringAsync();
                var result = await response.Content.ReadFromJsonAsync<DirectorPaginationResponse>();

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
