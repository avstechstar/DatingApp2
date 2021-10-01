using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entites
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; } // make sure Name is captial initial
        // added for password
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
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
        
        // public int GetAge() //important to have Get in front Age for a convention of naming
        // {
        //     return DateOfBirth.CalculateAge();// DateOfBirth;
        // }

    }
}