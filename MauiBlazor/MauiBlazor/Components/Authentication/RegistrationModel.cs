using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MauiBlazor.Components.Authentication
{
    public class RegistrationModel
    {
        //public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        //[Required, EmailAddress]
        //public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        //[Required, DataType(DataType.Password), Compare("Password"), MinLength(5), MaxLength(100)]
        //public string? ConfirmPassword { get; set; }
    }
}
