using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Shared.Models
{
    public class Director
    {
        public int id { get; set; }
        public string name { get; set; }
        public string nationality { get; set; }
        public double age { get; set; }
    }

    public class DirectorPaginationResponse
    {
        public List<Director> Content { get; set; }
        public int TotalPages { get; set; }
        public int TotalElements { get; set; }
        public bool Last { get; set; }
        public int Size { get; set; }
        public int Number { get; set; }
        public object Sort { get; set; } // Możesz dostosować ten typ do rzeczywistego używanego typu sortowania
        public int NumberOfElements { get; set; }
        public bool First { get; set; }
        public bool Empty { get; set; }
    }
}
