using AutoMapper;
using Blog.Data;
using Blog.Data.Enums;
using Blog.Data.Repository.Interfaces;
using Blog.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Blog.Services
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _repository;
        private readonly IMapper _mapper;

        public RecordService(IRecordRepository repo, IMapper mapper)
        {
            _repository = repo;
            _mapper = mapper;
        }

        public IEnumerable<RecordDTO> GetAll()
        {
            return _mapper.Map<IEnumerable<RecordDTO>>(_repository.Get());
        }

        public (IEnumerable<RecordDTO>, int) GetAll(GetAllArgs args)
        {
            Expression<Func<Record, bool>> filter;

            if (args.IsAuthenticated)
            {
                filter = rec => rec.State != RecordState.Private && rec.Name.Contains(args.SearchString);
            }
            else
            {
                filter = rec => rec.State == RecordState.Public && rec.Name.Contains(args.SearchString);
            }

            var count = _repository.Get(filter, x => x.Name).Count();

            return (_mapper.Map<IEnumerable<RecordDTO>>(_repository.Get(filter, x => x.Name, x => x.Skip((args.Page - 1) * args.PageSize).Take(args.PageSize))), count);
        }

        public async Task<RecordDTO> FindById(int? id)
        {
            var rec = await _repository.GetById(id);

            return _mapper.Map<RecordDTO>(rec);
        }

        public async Task Insert(RecordDTO record)
        {
            record.CreateDate = DateTime.Now;

            await _repository.Insert(_mapper.Map<Record>(record));
        }

        public async Task Update(RecordDTO record)
        {
            await _repository.Update(_mapper.Map<Record>(record));
        }

        public async Task Delete(RecordDTO record)
        {
            await _repository.Delete(_mapper.Map<Record>(record));
        }

        public async Task Delete(int id)
        {
            await Delete(await FindById(id));
        }
    }
}
