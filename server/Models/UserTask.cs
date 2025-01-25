namespace Server.Models
{
    public partial class UserTask
    {
        public int TaskId { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime DueDate { get; set; } = DateTime.Now;
        public bool IsCompleted { get; set; } = false;
        public int UserId { get; set; }
    }
}