namespace OG.Zoo.Domain.Services.Security.User
{
    using Entities.Security;
    using Interfaces.Security.User;
    using Services.Generics;

    /// <summary>
    /// User Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Services.Generics.BaseService{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Security.User.IUserService" />
    public class UserService : BaseService<User, string>, IUserService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public UserService(IUserRepository repository) : base(repository)
        {
        }
    }
}
