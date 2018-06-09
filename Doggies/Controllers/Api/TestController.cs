using Doggies.Controllers.Abstract;
using Doggies.Models;
using Doggies.Models.Field;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Doggies.Controllers.Api
{
    [NotRedirectWebApiAuthorize]
    [RoutePrefix("api/test")]
    public class TestController : BaseApiController
    {
      

       
        [AllowAnonymous]
        [Route("GetAllEvents")]
        [HttpPost] 
        
        //!!!!------уменьшить объем возвращаемой информации----------
        public async Task<IHttpActionResult> GetAllEvents()
        {
            List<Event> events = await TestManager.GetAllEvents();
            return WrapSuccess(events);
        }
        [AllowAnonymous]
        [Route("SetChallengeValue")]
        [HttpPost]
        public async Task<IHttpActionResult> SetChallengeValue(int dId, string chName, decimal chValue)
        {
            await TestManager.SetChallengeValue(dId, chName, chValue);
            return WrapSuccess();
        }

        [AllowAnonymous]
        [Route("GetDogsByEventId")]
        [HttpPost]
        //!!!!-----уменьшить объем возвращаемой информации-----------
        public async Task<IHttpActionResult> GetDogsByEventId(int id)
        {
            List<Dog> dogs = await TestManager.GetDogsByEventId(id);
            return WrapSuccess(dogs);
        }


        protected TestManager TestManager
        {
            get
            {
                return Request.GetOwinContext().Get<TestManager>();
            }
        }
    }
}