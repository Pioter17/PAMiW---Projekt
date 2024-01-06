using MauiBlazor.Components.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Shared.Services.DirectorService
{
    public interface IDirectorService
    {
        Task<ServiceResponse<List<Director>>> GetDirectorAsync();
    }
}
