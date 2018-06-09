using Dapper;
using DarkSide;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Doggies.Models.Field
{
    public class TestManager : Manager
    {
        public TestManager(Concrete concrete) : base(concrete) { }

        
        public async Task<List<Event>> GetAllEvents()
        {
            List<Event> events = null;
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                events = (await cnt.QueryAsync<Event>(
                     sql: "dbo.GetAllEvents",
                     commandType: CommandType.StoredProcedure

                     )).ToList();
            }
            return events;
        }
        public async Task SetChallengeValue(int dId, string chName, decimal chValue)
        {
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "dbo.SetChallengeValue",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       dogId = dId,
                       challengeName = chName,
                       challengeValue= chValue
                   }
                   );
            }
          
        }
        public async Task<List<Dog>> GetDogsByEventId(int id)
        {
            List<Dog> dogs = null;
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                dogs = (await cnt.QueryAsync<Dog>(
                     sql: "dbo.GetDogsByEventId",
                     commandType: CommandType.StoredProcedure,
                     param: new {id}
            
                     )).ToList();
            }
            return dogs;
        }
    }
}