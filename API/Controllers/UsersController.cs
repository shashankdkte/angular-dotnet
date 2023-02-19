using System.Security.Claims;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {
            // var users = await _userRepository.GetUsersAsync();
            // var usersToReturn = _mapper.Map<IEnumerable<MemberDTO>>(users);
            // return Ok(usersToReturn);
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUser(int id)
        // {
        //     var user = await _context.Users.FindAsync(id);
        //     if (user != null)
        //     {
        //         return user;
        //     }
        //     return NotFound();
        // }
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            // var user = await _userRepository.GetUserByUsernameAsync(username);
            // return _mapper.Map<MemberDTO>(user);
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);
            if (user == null)
                return NotFound();
            _mapper.Map(memberUpdateDTO, user);
            if (await _userRepository.SaveAllAsync())
                return NoContent();
            return BadRequest("Failed to update user");
        }
    }
}
