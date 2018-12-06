using AutoMapper;
using Blog.Services;
using Blog.Site.Models;
using Ninject;
using Ninject.Modules;

namespace Blog.Site
{
    public class SiteAutoMapperModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IRuntimeMapper>().ToMethod(SiteAutoMapper).InSingletonScope();
        }

        private static IRuntimeMapper SiteAutoMapper(Ninject.Activation.IContext context)
        {
            var conf = new MapperConfiguration(cfg =>
            {
                cfg.ConstructServicesUsing(type => context.Kernel.Get(type));

                cfg.CreateMap<UserDTO, UserViewModel>();

                cfg.CreateMap<RegisterViewModel, UserDTO>();

                cfg.CreateMap<LoginViewModel, UserDTO>().ForMember(destinationMember => destinationMember.Id, source => source.Ignore());
            });

            return new Mapper(conf);
        }
    }
}