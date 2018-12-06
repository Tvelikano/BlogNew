namespace Blog.Data.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class first : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Records",
                c => new
                    {
                        RecordId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Content = c.String(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        State = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RecordId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Records");
        }
    }
}
