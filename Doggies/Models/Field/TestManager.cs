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
    public class TestManager:Manager
    {
        public TestManager(Concrete concrete) : base(concrete) { }
        public async Task InsertIntoTest(string value)
        {
            using (var cnt = await Concrete.OpenConnectionAsync())
            {
                await cnt.ExecuteAsync(
                   sql: "dbo.InsertIntoTest",
                   commandType: CommandType.StoredProcedure,
                   param: new
                   {
                       value
                   }
                   );
            }
            public async Task InsertIntoTest(string value)
            {
                using (var cnt = await Concrete.OpenConnectionAsync())
                {
                    await cnt.ExecuteAsync(
                       sql: "dbo.InsertIntoTest",
                       commandType: CommandType.StoredProcedure,
                       param: new
                       {
                           value
                       }
                       );
                }


            }

    }
}