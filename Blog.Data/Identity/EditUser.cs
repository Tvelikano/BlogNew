﻿namespace Blog.Data.Identity
{
    public class EditUser
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string UserName { get; set; }

        public string[] Roles { get; set; }
    }
}
