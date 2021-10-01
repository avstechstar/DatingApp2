using API.Entites;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }

        //Entity Framework Fluent API is used to configure 
        //domain classes to override conventions. 
        // ModelBuilder
        //EF Fluent API is based on a Fluent API design pattern (a.k.a Fluent Interface) where the result is formulated by method chaining.
        protected override void OnModelCreating(ModelBuilder builder) 
        {
            base.OnModelCreating(builder);
            builder.Entity<UserLike>()
                .HasKey(k => new {k.SourceUserId, k.LikedUserId});

            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l =>l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
                 //if you are using SQL server then you need to set the DeleteBehavior here 
                 // to DeleteBehavior.NoAction, or you will get an error during migraiton
            
            builder.Entity<UserLike>()
                .HasOne(s => s.LikedUser)
                .WithMany(l =>l.LikedByUsers)
                .HasForeignKey(s => s.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>()
                .HasOne(u=>u.Recipient)
                .WithMany(m=>m.MessageReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u=>u.Sender)
                .WithMany(m=>m.MessageSent)
                .OnDelete(DeleteBehavior.Restrict);
              
        }   

    }
}