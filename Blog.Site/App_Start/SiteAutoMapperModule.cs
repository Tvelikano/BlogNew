using AutoMapper;
using Blog.Services;
using Blog.Services.Identity;
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

                cfg.CreateMap<LoginViewModel, UserDTO>()
                    .ForMember(dest => dest.Id, source => source.Ignore());

                //cfg.CreateMap<RecordDTO, RecordDetailsViewModel>().ForMember(dest => dest.Record, source =>
                //    source.MapFrom(o => new RecordDTO
                //    {
                //        RecordId = o.RecordId,
                //        Content = o.Content,
                //        Name = o.Name,
                //        CreateDate = o.CreateDate,
                //        Comments = o.Comments,
                //        State = o.State
                //    })).ForMember(dest => dest.Comment, source => source.Ignore());

                cfg.CreateMap<RecordDTO, RecordDetailsViewModel>()
                    .ForMember(dest => dest.IsWithComments, source => source.Ignore());
            });

            return new Mapper(conf);
        }
    }
}