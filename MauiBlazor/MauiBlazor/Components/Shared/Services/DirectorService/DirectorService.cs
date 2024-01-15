using MauiBlazor.Components.Authentication;
using MauiBlazor.Components.Shared.Configuration;
using MauiBlazor.Components.Shared.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
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
                string getUserSessionFromStorage = await SecureStorage.Default.GetAsync("UserSession");
                var userSession = JsonSerializer.Deserialize<UserSession>(getUserSessionFromStorage);
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", userSession.Token.Replace("\\", ""));
                var uri = new Uri($"https://pamiw-backend-production.up.railway.app/directors?page={page-1}", UriKind.Absolute);

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

                var uri = new Uri($"https://pamiw-backend-production.up.railway.app/directors/search?{searchUrl}", UriKind.Absolute);

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
