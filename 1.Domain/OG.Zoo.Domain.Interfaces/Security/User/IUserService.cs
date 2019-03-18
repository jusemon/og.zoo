namespace OG.Zoo.Domain.Interfaces.Security.User
{
    using Generics;
    using Entities.Security;
    using System.Threading.Tasks;

    /// <summary>
    /// User Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Generics.IBaseService{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    public interface IUserService : IBaseService<User, string>
    {
        /// <summary>
        /// Logins the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        Task Login(User user);
    }
}
