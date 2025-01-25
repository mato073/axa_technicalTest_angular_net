namespace Server.Dtos
{
    public partial class EditUserTaskDto
    {
        public int TaskId { get; set; }
        public string Title { get; set; } = "Task Title";
        public string Description { get; set; } = "Task Description";
        public bool IsCompleted { get; set; } = true;
        public DateTime DueDate { get; set; }
        public bool IsComplete { get; set; } = false;
    }
}