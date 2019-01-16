using Blog.Services.Enums;

using Microsoft.AspNet.SignalR;

using System.Threading.Tasks;

namespace Blog.Api.Hubs
{
    public class RecordHub : Hub
    {
        private static readonly IHubContext HubContext = GlobalHost.ConnectionManager.GetHubContext<RecordHub>();

        public override Task OnConnected()
        {
            var isAuthenticated = Context.User.Identity.IsAuthenticated;
            var isInRoleAdmin = Context.User.IsInRole("Admin");
            var connectionId = Context.ConnectionId;

            if (isAuthenticated)
            {
                Groups.Add(connectionId, "Users");

                if (isInRoleAdmin)
                {
                    Groups.Add(connectionId, "Admins");
                }
            }
            else
            {
                Groups.Remove(connectionId, "Users");
            }

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var isAuthenticated = Context.User.Identity.IsAuthenticated;
            var connectionId = Context.ConnectionId;

            Groups.Remove(connectionId, "Users");
            Groups.Remove(connectionId, "Admins");

            return base.OnDisconnected(stopCalled);
        }

        public static void NewRecord(int id, RecordStateDTO state = RecordStateDTO.Private)
        {
            switch (state)
            {
                case RecordStateDTO.Internal:
                    HubContext.Clients.Group("Users").newRecord(id);
                    break;
                case RecordStateDTO.Private:
                    HubContext.Clients.Group("Admins").newRecord(id);
                    break;
                default:
                    HubContext.Clients.All.newRecord(id);
                    break;
            }
        }
    }
}