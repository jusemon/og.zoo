namespace OG.Zoo.Application.Services.Security
{
    using System.Threading.Tasks;
    using Domain.Entities.Security;
    using Domain.Interfaces.Security.User;
    using Generics;
    using Interfaces.Security;
    using OG.Zoo.Application.Interfaces.DTOs;

    /// <summary>
    /// User Application
    /// </summary>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    public class UserApplication : BaseApplication<User, string>, IUserApplication
    {
        /// <summary>
        /// The user service
        /// </summary>
        private readonly IUserService userService;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserApplication"/> class.
        /// </summary>
        /// <param name="service">The service.</param>
        public UserApplication(IUserService service) : base(service)
        {
            this.userService = service;
        }

        /// <summary>
        /// Logins the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        public Task<Response<User>> Login(User user)
        {
            return ApplicationUtil.Try(async () => {
                await this.userService.Login(user);
                return user;
            });
        }
    }
}
