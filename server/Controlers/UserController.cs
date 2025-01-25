using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Dtos;
using Server.Models;

namespace Server.Controller;

[Authorize]
[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{
    DataContextDapper _dapper;
    public UserController(IConfiguration config)
    {
        _dapper = new DataContextDapper(config);
    }

    [HttpGet("GetUser")]
    public User GetUserById()
    {
        string userId = this.User.FindFirst("userId")?.Value + "";
        string sql = @"SELECT * FROM TurorialAppSchema.Users WHERE UserId = " + userId;
        User user = _dapper.loadDataSingle<User>(sql);
        return user;
    }
}