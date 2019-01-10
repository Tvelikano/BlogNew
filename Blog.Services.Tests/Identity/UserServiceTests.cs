using Blog.Services.Identity;
using Blog.Services.Identity.Models;
using Blog.Services.Models;
using Blog.Tests.Initialize.EffortSetting;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Services.Tests.Identity
{
    [TestClass]
    public class UserServiceTests
    {
        private UserService<UserDTO, RoleDTO> _service;

        [TestInitialize]
        public void TestInitialize()
        {
            _service = new UserService<UserDTO, RoleDTO>(
                EffortProviderFactory.GetFakeUnitOfWork(),
                EffortProviderFactory.GetFakeServiceAutoMapper(),
                EffortProviderFactory.GetFakeServiceAutoMapper()
            );
        }

        [TestMethod]
        public void Get_UsersByArgs()
        {
            var getArgs = new GetArgsDTO<UserDTO>
            {
                OrderBy = r => r.UserName,
                Page = 1,
                PageSize = 2
            };

            var users = _service.GetAllUsers(getArgs);

            Assert.AreEqual(3, users.Count);
            Assert.AreEqual(2, users.List.Count);
        }

        [TestMethod]
        public async Task Get_UserById()
        {
            const int id = 2;

            var user = await _service.GetUserById(id);

            Assert.AreNotEqual(null, user);
            Assert.AreEqual(id, user.Id);
        }

        [TestMethod]
        public async Task Create_User_4()
        {
            var user = new UserDTO { Id = 4, UserName = "Jack", Password = "123456", Email = "Jack@mail.com" };

            var result = await _service.CreateUser(user);
            var actualUser = await _service.GetUserById(user.Id);

            Assert.IsTrue(result.IsSucceed);
            Assert.AreNotEqual(null, actualUser);
            Assert.AreEqual(user.Id, actualUser.Id);
        }

        [TestMethod]
        public async Task Edit_User_2()
        {
            var user = new UserDTO { Id = 2, UserName = "NewJack", Password = "123456", Email = "Jack@mail.com" };

            var result = await _service.EditUser(user);
            var actualUser = await _service.GetUserById(user.Id);

            Assert.IsTrue(result.IsSucceed);
            Assert.AreNotEqual(null, actualUser);
            Assert.AreEqual(user.Id, actualUser.Id);
        }

        [TestMethod]
        public async Task Delete_UserById_2()
        {
            const int id = 2;

            var result = await _service.DeleteUserById(id);

            Assert.IsTrue(result.IsSucceed);
        }

        [TestMethod]
        public void GetAllRoles()
        {
            var roles = _service.GetAllRoles();

            Assert.AreEqual(3, roles.Count());
        }

        [TestMethod]
        public async Task Create_Role_4()
        {
            const string roleName = "NewRole";

            var result = await _service.CreateRole(roleName);
            var roles = _service.GetAllRoles();

            Assert.IsTrue(result.IsSucceed);
            Assert.AreNotEqual(null, roles.First(r => r.Name == roleName));
        }

        [TestMethod]
        public async Task Delete_RoleById_2()
        {
            const int id = 2;

            var result = await _service.DeleteRoleById(id);

            Assert.IsTrue(result.IsSucceed);
        }

        [TestMethod]
        public async Task Authenticate()
        {
            var user = new UserDTO { Id = 1, UserName = "Admin", Password = "123456", Email = "Admin@mail.com" };

            var claim = await _service.Authenticate(user);

            Assert.AreNotEqual(null, claim);
        }
    }
}