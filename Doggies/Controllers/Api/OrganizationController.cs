using Doggies.Controllers.Abstract;
using Doggies.Models.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using Doggies.Models;
using System.Web.Http;
using System.Threading.Tasks;

namespace Doggies.Controllers.Api
{

    [NotRedirectWebApiAuthorize]
    [AllowAnonymous]
    [RoutePrefix("api/organization")]
    public class OrganizationController:BaseApiController
    {
      
        protected OrganizationManager OrganizationManager
        {
            get
            {
                return Request.GetOwinContext().Get<OrganizationManager>();
            }
        }
    }
}