namespace Server.Dtos
{
    public partial class CreateUserTaskDto
    {
        public string Title { get; set; } = "Task Title";
        public string Description { get; set; } = "Task Description";
        public DateTime DueDate { get; set; }
    }
}