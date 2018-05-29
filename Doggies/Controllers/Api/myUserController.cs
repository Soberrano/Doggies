using DarkSide;
using Doggies.Models.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity.Owin;
using Doggies.Controllers.Abstract;
using Doggies.Models;
using myUser = Doggies.Models.Field.myUser;
using Microsoft.Office.Interop.Word;

namespace Doggies.Controllers.Api
{
    [NotRedirectWebApiAuthorize]
    [RoutePrefix("api/user")]
    public class myUserController : BaseApiController
    {
        [AllowAnonymous]
        [Route("getUserById")]
        [HttpPost]
        public async Task<IHttpActionResult> getUserById()
        {
            myUser myUser = await myUserManager.GetUserById(1);
            return WrapSuccess(myUser);
        }

        [AllowAnonymous]
        [Route("GetEventsByUserId")]
        [HttpPost]
        public async Task<IHttpActionResult> GetEventsByUserId()
        {
            List<Event> events = await myUserManager.GetEventsByUserId(1);
            return WrapSuccess(events);
        }

     
        [AllowAnonymous]
        [Route("FillDogsAndEventsLists")]
        [HttpPost]
        public async Task<IHttpActionResult> FillDogsAndEventsLists()
        {
            return WrapSuccess(await myUserManager.FillDogsAndEventsLists(1));//!!!нужно передавать id пользователя
        }




    


        [AllowAnonymous]
        [Route("CreateDocument")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateDocument(myDocument myDoc, int dogId, int eventId)
        {
            var js = myDoc;
            myDocument document =  await myUserManager.GetInfoForDocument(eventId, dogId, 1);
            DogsEvent d = await myUserManager.GetDogsAndEventsById(dogId, eventId);
            Application app = new Application();
            Document doc = null;
            string fileName = "C:\\Users\\эльдорадо\\Desktop\\word\\templates\\template.docx";
            doc = app.Documents.Open(FileName: fileName);
            try
            {
                app.Selection.Find.Execute(FindText: "<orgName>", ReplaceWith: document.OrganizationName, Replace: 2);
                app.Selection.Find.Execute(FindText: "<eventName>", ReplaceWith: document.EventName, Replace: 2);
                app.Selection.Find.Execute(FindText: "<date>", ReplaceWith: document.Date, Replace: 2);
                app.Selection.Find.Execute(FindText: "<dogName>", ReplaceWith: document.DogName, Replace: 2);
                app.Selection.Find.Execute(FindText: "<VPKOS>", ReplaceWith: document.VpkosOrLicenceNumber, Replace: 2);
                app.Selection.Find.Execute(FindText: "<breed>", ReplaceWith: document.Breed, Replace: 2);
                app.Selection.Find.Execute(FindText: "<color>", ReplaceWith: document.Color, Replace: 2);
                app.Selection.Find.Execute(FindText: "<dateOfBirth>", ReplaceWith: document.DateOfBirth, Replace: 2);
                if(document.IsMale==false)
                app.Selection.Find.Execute(FindText: "<gender>", ReplaceWith: "сука", Replace: 2);
                else if(document.IsMale==true)
                app.Selection.Find.Execute(FindText: "<gender>", ReplaceWith: "кобель", Replace: 2);
                app.Selection.Find.Execute(FindText: "<fatherName>", ReplaceWith: document.FatherName, Replace: 2);
                app.Selection.Find.Execute(FindText: "<fatherVPKOS>", ReplaceWith: document.FatherLicense, Replace: 2);
                app.Selection.Find.Execute(FindText: "<motherName>", ReplaceWith: document.MotherName, Replace: 2);
                app.Selection.Find.Execute(FindText: "<motherVPKOS>", ReplaceWith: document.MotherLicense, Replace: 2);
                app.Selection.Find.Execute(FindText: "<userName>", ReplaceWith: document.UserName, Replace: 2);
                app.Selection.Find.Execute(FindText: "<userSurname>", ReplaceWith: document.UserSurname, Replace: 2);
                app.Selection.Find.Execute(FindText: "<userPatronymic>", ReplaceWith: document.UserPatronymic, Replace: 2);
                app.Selection.Find.Execute(FindText: "<region>", ReplaceWith: document.Region, Replace: 2);
                app.Selection.Find.Execute(FindText: "<city>", ReplaceWith: document.City, Replace: 2);
                app.Selection.Find.Execute(FindText: "<address>", ReplaceWith: document.Address, Replace: 2);
                app.Selection.Find.Execute(FindText: "<leaderFIO>", ReplaceWith: js.LeaderFIO, Replace: 2);
            }
            catch (Exception ex)
            {

            }
            object fileSaveAs = (object)"C:\\Users\\эльдорадо\\Desktop\\word\\outputs\\Report" + document.UserName+document.UserSurname+document.DogName + ".doc";
            doc.SaveAs2(FileName: fileSaveAs);
            doc.Close();
            app.Quit(false, false, false);
            System.Runtime.InteropServices.Marshal.ReleaseComObject(app);
            return WrapSuccess();
        }

        [AllowAnonymous]
        [Route("newUserInfo")]
        [HttpPost]
        public async Task<IHttpActionResult> newUserInfo(NewUserInfoModel model)
        {

            var temp = await myUserManager.newUserInfo(CurrentUser.Id, model.UserName, model.UserSurname, model.UserPatronymic, model.Region, model.City, model.Address);
            return WrapSuccess();
        }


        protected myUserManager myUserManager
        {
            get
            {
                return Request.GetOwinContext().Get<myUserManager>();
            }
        }
    }
}
