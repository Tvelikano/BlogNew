using Microsoft.AspNet.SignalR;

namespace Blog.Api.Hubs
{
    public class RecordHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<RecordHub>();

        public void Hello()
        {
            Clients.All.hello();
        }

        public static void Hello(int id)
        {
            hubContext.Clients.All.hello(id);
        }
    }
}