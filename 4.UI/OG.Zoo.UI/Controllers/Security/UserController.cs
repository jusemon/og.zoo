namespace OG.Zoo.UI.Controllers.Security
{
    using Application.Interfaces.DTOs;
    using Application.Interfaces.Security;
    using Domain.Entities.Security;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using UI.Controllers.Generics;

    /// <summary>
    /// User Application
    /// </summary>
    /// <seealso cref="OG.Zoo.UI.Controllers.Generics.BaseController{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<User, string>
    {
        /// <summary>
        /// The user application
        /// </summary>
        private readonly IUserApplication userApplication;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// </summary>
        /// <param name="application">The application.</param>
        public UserController(IUserApplication application) : base(application)
        {
            this.userApplication = application;
        }

        /// <summary>
        /// Logins the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("Login")]
        public Task<Response<User>> Login([FromBody] User user)
        {
            return this.userApplication.Login(user);
        }
    }
}
