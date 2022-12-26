namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string? UserName { get; set; }

        public static explicit operator AppUser(ValueTask<AppUser?> v)
        {
            throw new NotImplementedException();
        }
    }
}