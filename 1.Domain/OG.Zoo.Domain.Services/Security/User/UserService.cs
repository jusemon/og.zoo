namespace OG.Zoo.Domain.Services.Security.User
{
    using System.Threading.Tasks;
    using Entities.Security;
    using Interfaces.Security.User;
    using OG.Zoo.Infraestructure.Utils.Exceptions;
    using Services.Generics;

    /// <summary>
    /// User Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Services.Generics.BaseService{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Security.User.IUserService" />
    public class UserService : BaseService<User, string>, IUserService
    {
        /// <summary>
        /// The user repository
        /// </summary>
        private readonly IUserRepository userRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public UserService(IUserRepository repository) : base(repository)
        {
            this.userRepository = repository;
        }

        /// <summary>
        /// Logins the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        /// <exception cref="AppException">Incorrect User or Password.</exception>
        public async Task Login(User user)
        {
            var result = await this.userRepository.GetBy(user, u => $"{u.Name.ToUpperInvariant().Trim()}|{u.Password}" );
            if (result != null)
            {
                user.Id = result.Id;
                return;
            }
            throw new AppException(AppExceptionTypes.Validation, "Incorrect User or Password.");
        }
    }
}
