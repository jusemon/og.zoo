namespace OG.Zoo.Application.Interfaces.Params
{
    using Domain.Entities.Params;
    using DTOs;
    using Generics;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Infirmary Application
    /// </summary>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    public interface IInfirmaryApplication: IBaseApplication<Infirmary, string>
    {
        /// <summary>
        /// Gets the with relations.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        Task<Response<Infirmary>> GetWithRelations(string id);

        /// <summary>
        /// Gets all with relations.
        /// </summary>
        /// <returns></returns>
        Task<Response<IEnumerable<Infirmary>>> GetAllWithRelations();
    }
}
