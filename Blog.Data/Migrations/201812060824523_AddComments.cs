namespace Blog.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddComments : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        Content = c.String(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        RecordId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.Records", t => t.RecordId, cascadeDelete: true)
                .Index(t => t.RecordId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "RecordId", "dbo.Records");
            DropIndex("dbo.Comments", new[] { "RecordId" });
            DropTable("dbo.Comments");
        }
    }
}
