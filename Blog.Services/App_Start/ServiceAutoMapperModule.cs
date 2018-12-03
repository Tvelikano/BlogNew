using AutoMapper;
using Blog.Data;
using Blog.Data.Identity;
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

                cfg.CreateMap<Record, RecordDTO>();

                cfg.CreateMap<User, UserDTO>();

                cfg.CreateMap<Role, RoleDTO>();
            });

            return new Mapper(conf);

        }
    }
}
