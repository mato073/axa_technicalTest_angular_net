
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Dtos;
using Server.Models;

namespace Server.Controller;

[Authorize]
[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    DataContextDapper _dapper;
    public TaskController(IConfiguration config)
    {
        _dapper = new DataContextDapper(config);
    }

    [HttpGet("GetTaskById/{id}")]
    public UserTask GetTaskById(int id)
    {
        string sql = @"SELECT * FROM TurorialAppSchema.UserTasks WHERE TaskId = " + id.ToString();
        UserTask response = _dapper.loadDataSingle<UserTask>(sql);
        return response;
    }

    [HttpPost("CreateTask")]
    public IActionResult CreateTask(CreateUserTaskDto task)
    {
        string userId = this.User.FindFirst("userId")?.Value + "";
        string sql = @"INSERT INTO TurorialAppSchema.UserTasks (
                Title,
                Description,
                DueDate,
                IsCompleted,
                UserId
                ) VALUES ('" + task.Title
                + "','" + task.Description
                + "','" + task.DueDate.ToString("yyyy-MM-dd HH:mm:ss")
                + "','" + 0
                + "','" + userId
                + "')";
        Console.WriteLine($"SQL Query: {sql}");
        bool result = _dapper.ExecuteSql(sql);
        if (result)
        {
            return Ok("Task Created Successfully");
        }
        throw new Exception("Faild to create task");
    }

    [HttpPut("UpdateTask")]
    public IActionResult UpdateTask(EditUserTaskDto values)
    {
        string sqlCheckTaskExist = @"
        SELECT [TaskId] FROM TurorialAppSchema.UserTasks WHERE TaskId = "
        + values.TaskId.ToString();
        string taskIdFromDB = _dapper.loadDataSingle<string>(sqlCheckTaskExist) 
        ?? 
        throw new Exception("Task not found");

        string userId = this.User.FindFirst("userId")?.Value + "";
        string sql = @"UPDATE TurorialAppSchema.UserTasks SET
                Title = '" + values.Title
                + "', description = '" + values.Description
                + "', dueDate = '" + values.DueDate.ToString("yyyy-MM-dd HH:mm:ss")
                + "', isCompleted = '" + values.IsCompleted
                + "', userId = '" + userId
                + "' WHERE TaskId = " + taskIdFromDB;

        if (_dapper.ExecuteSql(sql))
        {
            return Ok("Task Updated Successfully");
        }

        throw new Exception("Faild to update task");
    }

    [HttpDelete("DeleteTask/{TaskId}")]

    public IActionResult DeleteTask(int TaskId)
    {
        string sqlCheckTaskExistAndBelongToUser = @"
        SELECT [TaskId] FROM TurorialAppSchema.UserTasks WHERE TaskId = "
        + TaskId.ToString() + " AND UserId = " + this.User.FindFirst("userId")?.Value;
        string taskIdFromDB = _dapper.loadDataSingle<string>(sqlCheckTaskExistAndBelongToUser)
        ??
        throw new Exception("Task not found or not belong to user");
        string sql = @"DELETE FROM TurorialAppSchema.UserTasks WHERE TaskId = " + taskIdFromDB;
        if (_dapper.ExecuteSql(sql))
        {
            return Ok("Task Deleted Successfully");
        }
        throw new Exception("Faild to delete task");
    }

    [HttpGet("GetUserAllTasks")]
    public IEnumerable<UserTask> GetAllTasks(int UserId)
    {
        string userId = this.User.FindFirst("userId")?.Value + "";
        string sql = @"SELECT * FROM TurorialAppSchema.UserTasks WHERE UserId = " + userId;
        IEnumerable<UserTask> tasks = _dapper.loadData<UserTask>(sql);
        return tasks;
    }
}