namespace OG.Zoo.Application.Interfaces.Security
{
    using System.Threading.Tasks;
    using Domain.Entities.Security;
    using Generics;
    using OG.Zoo.Application.Interfaces.DTOs;

    /// <summary>
    /// User Application
    /// </summary>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    public interface IUserApplication : IBaseApplication<User, string>
    {
        /// <summary>
        /// Logins the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        Task<Response<User>> Login(User user);
    }
}
