using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entites
{
    public class AppUser: IdentityUser<int>
    {
        public DateTime DateOfBirth{get; set;}
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string LookingFor { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string  Country { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public ICollection<UserLike>LikedByUsers{ get; set; } // a is like by B
        public ICollection<UserLike>LikedUsers{ get; set; } // A liked B

        public ICollection<Message> MessageSent { get; set; }
        public ICollection<Message> MessageReceived { get; set; }
        
         public ICollection<AppUserRole> UserRoles { get; set; }
         
        // public int GetAge() //important to have Get in front Age for a convention of naming
        // {
        //     return DateOfBirth.CalculateAge();// DateOfBirth;
        // }

    }
}