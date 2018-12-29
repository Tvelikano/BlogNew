namespace Blog.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeIdType : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Record", new[] { "User_Id" });
            DropColumn("dbo.Record", "UserId");
            RenameColumn(table: "dbo.Record", name: "User_Id", newName: "UserId");
            AlterColumn("dbo.Record", "UserId", c => c.Int(nullable: false));
            AlterColumn("dbo.Record", "UserId", c => c.Int(nullable: false));
            CreateIndex("dbo.Record", "UserId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Record", new[] { "UserId" });
            AlterColumn("dbo.Record", "UserId", c => c.Int());
            AlterColumn("dbo.Record", "UserId", c => c.String());
            RenameColumn(table: "dbo.Record", name: "UserId", newName: "User_Id");
            AddColumn("dbo.Record", "UserId", c => c.String());
            CreateIndex("dbo.Record", "User_Id");
        }
    }
}
