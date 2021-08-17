using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        // validation the field as Required
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}