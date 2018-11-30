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
        private readonly IMapper _mapper = new MapperConfiguration(cfg => cfg.CreateMap<Record, RecordDTO>()).CreateMapper();

        public RecordService(IRecordRepository repo)
        {
            _repository = repo;
        }

        public IEnumerable<RecordDTO> GetAll()
        {
            return _mapper.Map<IEnumerable<RecordDTO>>(_repository.Get());
        }

        public IEnumerable<RecordDTO> GetAll(bool isAuthenticated, string searchString, int page, int pageSize, out int count)
        {
            Expression<Func<Record, bool>> filter;

            if (isAuthenticated)
            {
                filter = rec => rec.State != RecordState.Private && rec.Name.Contains(searchString);
            }
            else
            {
                filter = rec => rec.State == RecordState.Public && rec.Name.Contains(searchString);
            }

            IOrderedQueryable<Record> OrderBy(IQueryable<Record> record) => record.OrderByDescending(rec => rec.CreateDate);

            count = _repository.Get(filter, OrderBy).Count();

            IQueryable<Record> Func(IQueryable<Record> rec) => rec.Skip((page - 1) * pageSize).Take(pageSize);

            return _mapper.Map<IEnumerable<RecordDTO>>(_repository.Get(filter, OrderBy, Func));
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
