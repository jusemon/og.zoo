namespace OG.Zoo.Domain.Services.Params.Infirmary
{
    using Entities.Params;
    using Interfaces.Params.Infirmary;
    using Services.Generics;

    /// <summary>
    /// Infirmary Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Services.Generics.BaseService{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Params.Infirmary.IInfirmaryService" />
    public class InfirmaryService : BaseService<Infirmary, string>, IInfirmaryService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InfirmaryService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public InfirmaryService(IInfirmaryRepository repository) : base(repository)
        {
        }
    }
}
