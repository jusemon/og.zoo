namespace OG.Zoo.Domain.Services.Params.Infirmary
{
    using Entities.Params;
    using Interfaces.Params.Infirmary;
    using Generics;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Infirmary Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Services.Generics.BaseService{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Params.Infirmary.IInfirmaryService" />
    public class InfirmaryService : BaseService<Infirmary, string>, IInfirmaryService
    {
        /// <summary>
        /// The infirmary repository
        /// </summary>
        private readonly IInfirmaryRepository infirmaryRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="InfirmaryService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public InfirmaryService(IInfirmaryRepository repository) : base(repository)
        {
            this.infirmaryRepository = repository;
        }

        /// <summary>
        /// Gets the with relations.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public Task<Infirmary> GetWithRelations(string id)
        {
            return this.infirmaryRepository.GetWithRelations(id);
        }

        /// <summary>
        /// Gets all with relations.
        /// </summary>
        /// <returns></returns>
        public Task<IEnumerable<Infirmary>> GetAllWithRelations()
        {
            return this.infirmaryRepository.GetAllWithRelations();
        }
    }
}
