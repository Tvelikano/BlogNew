using AutoMapper;
using Blog.Api.Models;
using Blog.Services.Identity;
using Ninject;
using Ninject.Modules;

namespace Blog.Api
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

                cfg.CreateMap<LoginViewModel, UserDTO>()
                    .ForMember(dest => dest.Id, source => source.Ignore());

                cfg.CreateMap<UserDTO, UserViewModel>()
                    .ForMember(dest => dest.PasswordConfirm, source => source.Ignore());
            });

            return new Mapper(conf);
        }
    }
}