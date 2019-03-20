namespace OG.Zoo.Domain.Interfaces.Params.Infirmary
{
    using Entities.Params;
    using Generics;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Infirmary Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Generics.IBaseService{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    public interface IInfirmaryService: IBaseService<Infirmary, string>
    {
        /// <summary>
        /// Gets the with relations.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        Task<Infirmary> GetWithRelations(string id);

        /// <summary>
        /// Gets all with relations.
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<Infirmary>> GetAllWithRelations();
    }
}
