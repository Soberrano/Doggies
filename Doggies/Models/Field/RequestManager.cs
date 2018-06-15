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
    public class RequestManager:Manager
    {
        public RequestManager(Concrete concrete) : base(concrete) { }

        //отправить заявку на мероприятие
        public async Task SendRequest(int UserId, int DogId, int OrganizationId, int EventId)
        {


            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "SendRequest",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {

                       UserId,
                       DogId,
                       OrganizationId,
                       EventId
                   }
                   );
            }

        }

        public async Task<List<Event>> GetEventsForDecentAmountOfTime(string dateStart, string dateEnd)
        {
            List<Event> events = null;
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                events = (await cnt.QueryAsync<Event>(
                     sql: "dbo.GetEventsForDecentAmountOfTime",
                     commandType: CommandType.StoredProcedure,
                      param: new
                      {
                          dateStart,
                          dateEnd,
                        
                      }
                     )).ToList();
            }
            return events;
        }
    }
}