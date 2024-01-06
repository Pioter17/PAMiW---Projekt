using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MauiBlazor.Components.Shared.Models;

namespace MauiBlazor.Components.Shared.Models
{
    public class Movie
    {
        public int id { get; set; }
        public string name { get; set; }
        public Director director { get; set; }
        public string producer { get; set; }
        public double rating { get; set; }
        public double length { get; set; }
    }

    public class MovieDTO
    {
        public string name { get; set; }
        public int director_id { get; set; }
        public string producer { get; set; }
        public double rating { get; set; }
        public double length { get; set; }
    }

    public class MovieDialogData
    {
        public bool isEdit { get; set; }
        public string name { get; set; }
        public string director { get; set; }
        public string producer { get; set; }
        public double rating { get; set; }
        public double length { get; set; }
    }

    public class MovieResponse
    {
        public Movie data { get; set; }
        public bool isSuccess { get; set; }
        public string message { get; set; }
    }

    public class MoviePaginationResponse
    {
        public List<Movie> Content { get; set; }
        public int TotalPages { get; set; }
        public int TotalElements { get; set; }
        public bool Last { get; set; }
        public int Size { get; set; }
        public int Number { get; set; }
        public object Sort { get; set; } // Dostosuj typ Sort do rzeczywistego typu, jeśli to wymagane
        public int NumberOfElements { get; set; }
        public bool First { get; set; }
        public bool Empty { get; set; }
    }
}
