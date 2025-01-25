namespace Server.Dtos {
    public partial class RegistrationDto {
        public string Email { get; set; } = "";
        public string Name { get; set; } = "";    
        public string Password { get; set; } = "";
        public string PasswordConfirmation { get; set; } = "";
    }
}