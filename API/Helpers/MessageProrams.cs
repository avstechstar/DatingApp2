using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MessageParams: PaginationParams
    {
        public string Username { get; set; } // curent login in user
        public string Container { get; set; } =  "Unread";
    }
}