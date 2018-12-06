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
        
        public ListRecordsDTO GetAll(GetAllRecordsArgsDTO recordsArgsDto)
        {
            return _mapper.Map<ListRecordsDTO>(_repository.Get(_mapper.Map<GetAllRecordsArgs>(recordsArgsDto)));
        }

        public async Task<RecordDTO> FindById(int id, bool isWithComments = false)
        {
            return !isWithComments ? 
                _mapper.Map<RecordDTO>( await _repository.GetById(id)) : 
                _mapper.Map<RecordDTO>(_repository.GetByIdWithComment(id));
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

        public async Task InsertComment(CommentDTO comment)
        {
            comment.CreateDate = DateTime.Now;

            await _repository.InsertComment(_mapper.Map<Comment>(comment));
        }
    }
}
