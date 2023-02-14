using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserName ?? "username"))
            {
                return BadRequest("Username is taken");
            }
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.UserName?.ToLower(),
                PasswordHash = hmac.ComputeHash(
                    Encoding.UTF8.GetBytes(registerDto.Password ?? "password")
                ),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDTO loginDTO)
        {
            //Get user having same username
            var user = await _context.Users.SingleOrDefaultAsync(
                x => x.UserName == loginDTO.UserName
            );
            //check user exist
            if (user == null)
            {
                return Unauthorized("invalid username");
            }

            //get password salt
            using var hmac = new HMACSHA512(user.PasswordSalt);

            //get password hash
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            //check each character
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid Password");
                }
            }
            return user;
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
