using MauiBlazor.Components.Shared.Configuration;
using MauiBlazor.Components.Shared.Services.DirectorService;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.DependencyInjection.Extensions;
using MauiBlazor.Components.Shared.Services.MovieService;
using MauiBlazor.Components.Shared.Services;
using Microsoft.AspNetCore.Components.Authorization;
using MauiBlazor.Components.Authentication;
using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;

namespace MauiBlazor
{
    public static class MauiProgram
    {

        public static MauiApp CreateMauiApp()
        {

            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                });

            var appSettings = builder.Configuration.GetSection(nameof(AppSettings));
            var appSettingsSection = appSettings.Get<AppSettings>();
            var authenticationStateProvider = new CustomAuthenticationStateProvider();

            builder.Services.AddMauiBlazorWebView();
            builder.Services.AddHttpClient();

            builder.Services.AddSingleton<IOptions<AppSettings>>(new OptionsWrapper<AppSettings>(appSettingsSection));
            builder.Services.AddSingleton<MovieService>();
            builder.Services.AddSingleton<DirectorService>();
            builder.Services.AddSingleton<ThemeService>();
            builder.Services.AddAuthorizationCore();
            builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthenticationStateProvider>();


#if DEBUG
            builder.Services.AddBlazorWebViewDeveloperTools();
    		builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
