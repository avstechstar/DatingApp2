using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string  GetUsername(this ClaimsPrincipal user)
        {   
            // this User is from BaseApiController : ControllerBase
            // this gives the user name of current editing usr
           return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

       // public static

    }

    
}
