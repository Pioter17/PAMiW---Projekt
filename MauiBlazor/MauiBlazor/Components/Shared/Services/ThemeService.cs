using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Shared.Services
{
    public class ThemeService
    {
        public event Action OnThemeChanged;

        private string currentTheme = "light";

        public string CurrentTheme
        {
            get => currentTheme;
            set
            {
                currentTheme = value;
                OnThemeChanged?.Invoke();
            }
        }
    }
}
