using API.Data;
using API.Entites;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        // private readonly DataContext _context;
        // public BaseApiController(DataContext context)
        // {
        //     _context = context;
        // }

       
    }
}