using AutoMapper;
using Blog.Data;
using Ninject;
using Ninject.Modules;

namespace Blog.Services
{
    class AutoMapperModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IMapper>().ToMethod(AutoMapper).InSingletonScope();
        }

        private IMapper AutoMapper(Ninject.Activation.IContext context)
        {
            Mapper.Initialize(config =>
            {
                config.ConstructServicesUsing(type => context.Kernel.Get(type));

                config.CreateMap<Record, RecordDTO>();
                config.CreateMap<User, UserDTO>();
                config.CreateMap<Role, RoleDTO>();          

            });
            return Mapper.Instance;

        }
    }
}
