namespace OG.Zoo.UI.Api.Controllers.Security
{
    using Application.Interfaces.Security;
    using Domain.Entities.Security;
    using Microsoft.AspNetCore.Mvc;
    using UI.Api.Controllers.Generics;

    /// <summary>
    /// User Application
    /// </summary>
    /// <seealso cref="OG.Zoo.UI.Api.Controllers.Generics.BaseController{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: BaseController<User, string>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// </summary>
        /// <param name="application">The application.</param>
        public UserController(IUserApplication application): base(application)
        {

        }
    }
}
