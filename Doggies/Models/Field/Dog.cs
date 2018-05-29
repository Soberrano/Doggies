using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class Dog
    {
        public int DogId { get; set; }
        public string DogName { get; set; }
        public string VpkosOrLicenceNumber { get; set; }
        public bool IsMale { get; set; }
        public string Color { get; set; }
        public string Breed { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int UserId { get; set; }
        public int MotherId { get; set; }
        public int FatherId { get; set; }
        public List<Event> Events { get; set; }
    }
}