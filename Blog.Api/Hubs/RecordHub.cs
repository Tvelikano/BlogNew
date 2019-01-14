using Microsoft.AspNet.SignalR;

namespace Blog.Api.Hubs
{
    public class RecordHub : Hub
    {
        private static readonly IHubContext HubContext = GlobalHost.ConnectionManager.GetHubContext<RecordHub>();

        public void NewRecord()
        {
            Clients.All.newRecord();
        }

        public static void NewRecord(int id)
        {
            HubContext.Clients.All.newRecord(id);
        }
    }
}