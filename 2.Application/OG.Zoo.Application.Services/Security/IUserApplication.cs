namespace OG.Zoo.Application.Services.Security
{
    using Domain.Entities.Security;
    using Domain.Interfaces.Security.User;
    using Generics;
    using Interfaces.Security;

    /// <summary>
    /// User Application
    /// </summary>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    public class UserApplication : BaseApplication<User, string>, IUserApplication
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserApplication"/> class.
        /// </summary>
        /// <param name="service">The service.</param>
        public UserApplication(IUserService service) : base(service)
        {
        }
    }
}
