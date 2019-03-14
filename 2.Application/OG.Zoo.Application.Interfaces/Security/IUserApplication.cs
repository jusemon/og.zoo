namespace OG.Zoo.Application.Interfaces.Security
{
    using Domain.Entities.Security;
    using Generics;

    /// <summary>
    /// User Application
    /// </summary>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    public interface IUserApplication: IBaseApplication<User, string>
    {
    }
}
