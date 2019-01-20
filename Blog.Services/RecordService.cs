using AutoMapper;

using Blog.Data.Models;
using Blog.Data.Repository.Interfaces;
using Blog.Services.Interfaces;
using Blog.Services.Models;

using System;
using System.Collections.Generic;
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

        public IEnumerable<AdminUserDTO> GetAllAdminUsers()
        {
            return _mapper.Map<IEnumerable<AdminUserDTO>>(_repository.GetAllAdminUsers());
        }

        public async Task<ReturnModelDTO<RecordDTO>> GetById(int id)
        {
            return _mapper.Map<ReturnModelDTO<RecordDTO>>(await _repository.GetById(id));
        }

        public async Task<int> Insert(RecordDTO record)
        {
            record.CreateDate = DateTime.Now;

            return await _repository.Insert(_mapper.Map<Record>(record));
        }

        public async Task Update(RecordDTO record)
        {
            await _repository.Update(_mapper.Map<Record>(record));
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
        }

        public async Task InsertComment(CommentDTO comment)
        {
            comment.CreateDate = DateTime.Now;

            await _repository.InsertComment(_mapper.Map<Comment>(comment));
        }

        public ReturnListDTO<CommentDTO> GetCommentsById(int recordId)
        {
            return _mapper.Map<ReturnListDTO<CommentDTO>>(_repository.GetCommentsById(recordId));
        }
    }
}
