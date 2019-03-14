namespace OG.Zoo.Domain.Interfaces.Params.Infirmary
{
    using Entities.Params;
    using Generics;

    /// <summary>
    /// Infirmary Repository
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Generics.IBaseRepository{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    public interface IInfirmaryRepository: IBaseRepository<Infirmary, string>
    {
    }
}
