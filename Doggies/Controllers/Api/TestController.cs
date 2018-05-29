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
        [Route("InsertIntoTest")]
        [HttpPost]
        public async Task<IHttpActionResult> InsertIntoTest(string value)
        {
            await TestManager.InsertIntoTest(value);
            return WrapSuccess();
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