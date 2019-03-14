namespace OG.Zoo.Domain.Interfaces.Security.User
{
    using Generics;
    using Entities.Security;

    /// <summary>
    /// User Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Generics.IBaseService{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    public interface IUserService: IBaseService<User, string>
    {
    }
}
