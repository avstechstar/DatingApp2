namespace API.Entites
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; } // make sure Name is captial initial
        // added for password
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}