using Doggies.Controllers.Abstract;
using Doggies.Models;
using Doggies.Models.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity.Owin;
using System.Net.Http;
using System.Threading.Tasks;
namespace Doggies.Controllers.Api
{
   

        [NotRedirectWebApiAuthorize]
        [AllowAnonymous]
        [RoutePrefix("api/request")]
        public class RequestController : BaseApiController
        {

        [AllowAnonymous]
        [Route("SendRequest")]
        [HttpPost]
        public async Task<IHttpActionResult> SendRequest(int UserId, int DogId, int OrganizationId, int EventId)
        {
            await RequestManager.SendRequest(UserId, DogId, OrganizationId, EventId);
            return WrapSuccess();
        }

        [AllowAnonymous]
        [Route("GetEventsForDecentAmountOfTime")]
        [HttpPost]
        public async Task<IHttpActionResult> GetEventsForDecentAmountOfTime(string dateStart,string dateEnd)
        {
            List<Event> events = await RequestManager.GetEventsForDecentAmountOfTime(dateStart, dateEnd);
            return WrapSuccess(events);
        }
        protected RequestManager RequestManager
            {
                get
                {
                    return Request.GetOwinContext().Get<RequestManager>();
                }
            }
        }
    
}