using MauiBlazor.Components.Shared.Services.LocalStorageService;
using Microsoft.Extensions.DependencyInjection;

public class LocalStorageService : ILocalStorageService
{
    private readonly ILocalStorageService _localStorage;

    public LocalStorageService(ILocalStorageService localStorage)
    {
        _localStorage = localStorage;
    }

    public async Task SetItemAsync<T>(string key, T value)
    {
        await _localStorage.SetItemAsync(key, value);
    }

    public async Task<T> GetItemAsync<T>(string key)
    {
        return await _localStorage.GetItemAsync<T>(key);
    }

    public async Task RemoveItemAsync(string key)
    {
        await _localStorage.RemoveItemAsync(key);
    }

    public async Task ClearAsync()
    {
        await _localStorage.ClearAsync();
    }
}
