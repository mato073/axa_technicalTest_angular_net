
using System.Data;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Server.Data;
using Server.Dtos;
using Server.Helpers;

namespace Server.Controller;

[Authorize]
[ApiController]
[Route("[controller]")]

public class AuhtController : ControllerBase
{
    private readonly DataContextDapper _dapper;
    private readonly AuthHelper _authHelper;
    public AuhtController(IConfiguration config)
    {
        _dapper = new DataContextDapper(config);
        _authHelper = new AuthHelper(config);
    }

    [AllowAnonymous]
    [HttpPost("Register")]
    public IActionResult Register(RegistrationDto RegistrationValues)
    {
        if (RegistrationValues.Password != RegistrationValues.PasswordConfirmation)
            throw new Exception("Passwords do not match");

        string sql = "SELECT * FROM  TurorialAppSchema.Auht WHERE Email = '" + RegistrationValues.Email + "'";
        IEnumerable<string> existingUsers = _dapper.loadData<string>(sql);

        if (existingUsers.Count() != 0)
            throw new Exception("User already exists");

        byte[] passwordSalt = new byte[128 / 8];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetNonZeroBytes(passwordSalt);
        }

        byte[] passwordHash = _authHelper.GetPasswordHash(RegistrationValues.Password, passwordSalt);

        string sqlAddAuth = @"
                INSERT INTO TurorialAppSchema.Auht  ([Email],
                [PasswordHash],
                [PasswordSalt]) VALUES ('" + RegistrationValues.Email +
                "', @PasswordHash, @PasswordSalt)";

        List<SqlParameter> sqlParameters = new List<SqlParameter>();

        SqlParameter passwordSaltParameter = new SqlParameter("@PasswordSalt", SqlDbType.VarBinary);
        passwordSaltParameter.Value = passwordSalt;

        SqlParameter passwordHashParameter = new SqlParameter("@PasswordHash", SqlDbType.VarBinary);
        passwordHashParameter.Value = passwordHash;

        sqlParameters.Add(passwordSaltParameter);
        sqlParameters.Add(passwordHashParameter);
        if (_dapper.ExecuteSqlWithParameters(sqlAddAuth, sqlParameters))
        {
            string SqlAddUser = @"INSERT INTO TurorialAppSchema.Users (
                Name,
                Email
                ) VALUES ('" + RegistrationValues.Name
                 + "','" + RegistrationValues.Email
                + "')";

            if (_dapper.ExecuteSql(SqlAddUser))
            {
                return Ok(new {
                    message = "User successfully created"
                });
            }
            throw new Exception("Failed to create user");
        }
        throw new Exception("Failed to create user");
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    public IActionResult Login(LoginDto LoginValues)
    {

        string sqlForHasAndSalt = @"SELECT 
                [PasswordHash],
                [PasswordSalt] FROM TurorialAppSchema.Auht WHERE Email = '" +
                 LoginValues.Email + "'";

        LoginConfirmationDto confirmation = _dapper.loadDataSingle<LoginConfirmationDto>(sqlForHasAndSalt);
        if (confirmation == null)
            throw new Exception("User does not exist");

        byte[] passwordHash = _authHelper.GetPasswordHash(LoginValues.Password, confirmation.PasswordSalt);

        for (int i = 0; i < passwordHash.Length; i++)
        {
            if (passwordHash[i] != confirmation.PasswordHash[i])
                return StatusCode(401, "Login Failed");
        }
        string userIdSql = @"
            SELECT UserId FROM TurorialAppSchema.Users WHERE Email = '" 
            + LoginValues.Email + "'";
        int userId = _dapper.loadDataSingle<int>(userIdSql);

        return Ok(new Dictionary<string, string>{ 
            { "token", _authHelper.CreateToken(userId) } 
        });
    }

    [HttpGet("RefreshToken")]
    public IActionResult RefreshToken()
    {
        string userId = User.FindFirst("userId")?.Value + "";
        string sql = "SELECT UserId FROM TurorialAppSchema.Users WHERE UserId = " + userId;
        int userIdFromDB = _dapper.loadDataSingle<int>(sql);
        if (userIdFromDB == 0)
            return StatusCode(401, "Invalid Token");
        
        return Ok(new Dictionary<string, string>{
            { "token", _authHelper.CreateToken(userIdFromDB) }
        });
        
    }
}