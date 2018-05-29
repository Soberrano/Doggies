using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class myUser
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserPatronymic { get; set; }
        public string Region{ get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public List<Dog> Dogs { get; set; }
    }
}