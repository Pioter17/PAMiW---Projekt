using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Shared.Configuration
{
    public class AppSettings
    {
        public string BaseAPIUrl { get; set; }
        public MovieEndpoint MovieEndpoint { get; set; }
        public DirectorEndpoint DirectorEndpoint { get; set; }
    }
}
