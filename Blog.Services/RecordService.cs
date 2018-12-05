using AutoMapper;
using Blog.Data;
using Blog.Data.Repository.Interfaces;
using Blog.Services.Interfaces;
using System;
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
        
        public ReturnRecordsDTO GetAll(GetAllArgsDTO argsDto)
        {
            return _mapper.Map<ReturnRecordsDTO>(_repository.Get(_mapper.Map<GetAllArgs>(argsDto)));
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
