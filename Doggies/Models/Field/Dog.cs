using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Doggies.Models.Field
{
    public class Dog
    {
        public Dog()
        {
            Diploma = new List<Diploma>();
            DogAchievment = new List<DogAchievment>();
            //Children = new List<Dog>(); не работает
            //Children = new List<Dog>();
        }
        public int DogId { get; set; }
        public string DogName { get; set; }
        public string VpkosOrLicenseNumber { get; set; }
        public bool IsMale { get; set; }
        public string Color { get; set; }
        public string Breed { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int UserId { get; set; }
        public int MotherId { get; set; }
        public int FatherId { get; set; }
        public List<Event> Events { get; set; }
       
        public Dog Mother { get; set; }
        public Dog Father { get; set; }
        public List<Dog> Children { get; set; }// не работает
        //поэтому
       // public Dictionary<int, Dog> Children { get; set; }
  

        public List<Diploma> Diploma { get; set; }
        public List<DogAchievment> DogAchievment { get; set; }
    }
}