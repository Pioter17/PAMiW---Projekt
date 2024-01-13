using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Shared.Services.LocalStorageService
{
    public interface ILocalStorageService
    {
        Task SetItemAsync<T>(string key, T value);
        Task<T> GetItemAsync<T>(string key);
        Task RemoveItemAsync(string key);
        Task ClearAsync();
    }

}
