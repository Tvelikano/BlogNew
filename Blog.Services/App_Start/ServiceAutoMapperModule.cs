using System.Linq;
using AutoMapper;
using Blog.Data.Identity;
using Blog.Services.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Ninject;
using Ninject.Modules;

namespace Blog.Services
{
    public class ServiceAutoMapperModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IMapper>().ToMethod(AutoMapper).InSingletonScope();
        }

        private IMapper AutoMapper(Ninject.Activation.IContext context)
        {
            var conf = new MapperConfiguration(cfg =>
            {
                cfg.ConstructServicesUsing(type => context.Kernel.Get(type));
                
                cfg.CreateMap<User, UserDTO>().ForMember(dest => dest.Roles, src => src.MapFrom(o => o.Roles.Select(r => r.RoleId)));

                cfg.CreateMap<IdentityUserRole, string>().ConvertUsing(src => src.RoleId);

                cfg.CreateMap<RoleDTO, Role>().ForMember(dest => dest.Users, src => src.Ignore());
            });

            return new Mapper(conf);
        }
    }
}
