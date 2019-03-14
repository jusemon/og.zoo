namespace OG.Zoo.Application.Interfaces.Generics
{
    using DTOs;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Base Application
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <typeparam name="TId">The type of the identifier.</typeparam>
    public interface IBaseApplication<TEntity, TId>
    {
        /// <summary>
        /// Creates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        Task<Response<TEntity>> Create(TEntity entity);

        /// <summary>
        /// Updates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        Task<Response<TEntity>> Update(TEntity entity);

        /// <summary>
        /// Deletes the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        Task<Response<TEntity>> Delete(TId id);

        /// <summary>
        /// Gets the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        Task<Response<TEntity>> Get(TId id);

        /// <summary>
        /// Gets all.
        /// </summary>
        /// <returns></returns>
        Task<Response<IEnumerable<TEntity>>> GetAll();
    }
}
