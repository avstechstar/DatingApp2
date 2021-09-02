using System;
using API.Data;
using API.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)//: base(context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);
            if(thing == null ) return NotFound();
            return Ok(thing);
         
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            // let try use a global error handling
            // try   
            // {
                var thing = _context.Users.Find(-1); // null
                var thingToReturn = thing.ToString(); // cause problem if null
                return thingToReturn;
            // } 
            // catch(Exception ex)
            // {
            //     return StatusCode(500, "computer says no to null !");
            // }
            
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadResuest()
        {
            return BadRequest("this was not a good requet");
        }

    }
}