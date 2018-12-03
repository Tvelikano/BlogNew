﻿using AutoMapper;
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
            Bind<IMapper>().ToMethod(SiteAutoMapper).When(request => request.Target.Type.Namespace.Contains("Blog.Site")).InSingletonScope();
        }

        private IMapper SiteAutoMapper(Ninject.Activation.IContext context)
        {
            var conf = new MapperConfiguration(cfg =>
            {
                cfg.ConstructServicesUsing(type => context.Kernel.Get(type));

                cfg.CreateMap<UserDTO, UserViewModel>();
            });

            return new Mapper(conf);
        }
    }
}