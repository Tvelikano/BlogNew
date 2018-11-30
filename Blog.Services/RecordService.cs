using System;
using AutoMapper;
using Blog.Data;
using System.Collections.Generic;
using System.Linq;
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
            return _mapper.Map<IEnumerable<Record>, IEnumerable<RecordDTO>>(_repository
                .Get(orderBy: q => q.OrderBy(d => d.CreateDate)));
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
