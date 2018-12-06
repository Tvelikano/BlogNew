namespace Blog.Data.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class AddUserNameField : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Comments", "UserName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Comments", "UserName");
        }
    }
}
