using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entites;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();  // for appuser s
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string UserName); // for appuser

        // to optimise
        Task<IEnumerable<MemberDto>> GetMemebersAsync();  // for memberDto s
        Task<MemberDto> GetMemberAsync(string UserName);               // for memeberDto
        
        
    }
}