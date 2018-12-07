namespace Blog.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeUserIdType : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Comment", new[] { "User_Id" });
            DropColumn("dbo.Comment", "UserId");
            RenameColumn(table: "dbo.Comment", name: "User_Id", newName: "UserId");
            AlterColumn("dbo.Comment", "UserId", c => c.Int(nullable: false));
            AlterColumn("dbo.Comment", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.Comment", "UserId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Comment", new[] { "UserId" });
            AlterColumn("dbo.Comment", "UserId", c => c.Int());
            AlterColumn("dbo.Comment", "UserId", c => c.String());
            RenameColumn(table: "dbo.Comment", name: "UserId", newName: "User_Id");
            AddColumn("dbo.Comment", "UserId", c => c.String());
            CreateIndex("dbo.Comment", "User_Id");
        }
    }
}
