using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Authorization;
using System.Security.Claims;
using System.Text.Json;
using System.Net.Http.Headers;
using System.Net.Http;

namespace MauiBlazor.Components.Authentication
{
    public class CustomAuthenticationStateProvider : AuthenticationStateProvider
    {
        private ClaimsPrincipal anonymous = new ClaimsPrincipal(new ClaimsIdentity());
        private readonly HttpClient _httpClient = new HttpClient();

        public override async Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            try
            {
                //Get Usersession from secure storage
                string getUserSessionFromStorage = await SecureStorage.Default.GetAsync("UserSession");
                if (string.IsNullOrEmpty(getUserSessionFromStorage))
                    return await Task.FromResult(new AuthenticationState(anonymous));

                //Desrialize into and UserSession object.
                var DesrializedUserSession = JsonSerializer.Deserialize<UserSession>(getUserSessionFromStorage);
                var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Name, DesrializedUserSession.Token!),
                    //new Claim(ClaimTypes.Email, DesrializedUserSession.Email!),
                    //new Claim(ClaimTypes.Role, DesrializedUserSession.UserRole!)
                }, "CustomAuth"));


                //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", DesrializedUserSession.Token.Replace("\\", ""));
                return await Task.FromResult(new AuthenticationState(claimsPrincipal));
            }
            catch
            {
                return await Task.FromResult(new AuthenticationState(anonymous));
            }
        }

        public async Task UpdateAuthenticationState(UserSession userSession)
        {
            ClaimsPrincipal claimsPrincipal;
            if (!string.IsNullOrEmpty(userSession.Token) /*|| !string.IsNullOrEmpty(userSession.Email) || !string.IsNullOrEmpty(userSession.UserRole))*/)
            {
                string serializeUserSession = JsonSerializer.Serialize(userSession);
                await SecureStorage.Default.SetAsync("UserSession", serializeUserSession);

                //var Role = userSession.Token.Decode

                claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userSession.Token!),
                    //new Claim(ClaimTypes.Email, userSession.Email!),
                    //new Claim(ClaimTypes.Role, userSession.UserRole!)
                }));
            }
            else
            {
                SecureStorage.Default.Remove("UserSession");
                claimsPrincipal = anonymous;
            }

            NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(claimsPrincipal)));
        }

    }
}
