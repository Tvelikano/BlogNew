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
        
        public ReturnListDTO<ReturnModelDTO<RecordDTO>> GetAll(GetArgsDTO<RecordDTO> recordsArgsDto)
        {
            return _mapper.Map<ReturnListDTO<ReturnModelDTO<RecordDTO>>>(_repository.Get(_mapper.Map<GetArgs<Record>>(recordsArgsDto)));
        }

        public async Task<RecordDTO> FindById(int id)
        {
            return _mapper.Map<RecordDTO>(await _repository.GetById(id));
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

        public ReturnListDTO<CommentDTO> FindCommentsById(int recordId)
        {
            return _mapper.Map<ReturnListDTO<CommentDTO>>(_repository.GetCommentsById(recordId));
        }
    }
}
