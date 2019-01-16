using Blog.Api.Models;

using Newtonsoft.Json;

using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Blog.Api.Controllers
{
    public class WeatherController : ApiController
    {
        public async Task<IHttpActionResult> Get()
        {
            const string requestUrl = "http://localhost:9000/api/weather";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(requestUrl);
                var responseMessage = await client.GetAsync(requestUrl);
                var json = await responseMessage.Content.ReadAsStringAsync();

                var weather = JsonConvert.DeserializeObject<ClientWeather>(json);

                return Ok(weather);
            }
        }
    }
}
