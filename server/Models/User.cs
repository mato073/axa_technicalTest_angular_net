namespace Server.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string Email { get; set; } = "";
        public string Name { get; set; } = "";
        public DateTime CreationDate { get; set; }
    }
}