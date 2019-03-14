namespace OG.Zoo.Application.Services.Generics
{
    using Domain.Entities.Generics;
    using Domain.Interfaces.Generics;
    using Interfaces.DTOs;
    using Interfaces.Generics;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Base Application
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <typeparam name="TId">The type of the identifier.</typeparam>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{TEntity, TId}" />
    public class BaseApplication<TEntity, TId> : IBaseApplication<TEntity, TId> where TEntity : Base
    {
        /// <summary>
        /// The service
        /// </summary>
        private readonly IBaseService<TEntity, TId> service;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseApplication{TEntity, TId}" /> class.
        /// </summary>
        /// <param name="service">The service.</param>
        public BaseApplication(IBaseService<TEntity, TId> service)
        {
            this.service = service;
        }

        /// <summary>
        /// Creates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public Task<Response<TEntity>> Create(TEntity entity)
        {
            return ApplicationUtil.Try(async () =>
            {
                await this.service.Create(entity);
                return entity;
            });
        }

        /// <summary>
        /// Deletes the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public Task<Response<TEntity>> Delete(TId id)
        {
            return ApplicationUtil.Try<TEntity>(async () =>
            {
                await this.service.Delete(id);
                return null;
            });
        }

        /// <summary>
        /// Gets the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public Task<Response<TEntity>> Get(TId id)
        {
            return ApplicationUtil.Try(async () => await this.service.Get(id));
        }

        /// <summary>
        /// Gets all.
        /// </summary>
        /// <returns></returns>
        public Task<Response<IEnumerable<TEntity>>> GetAll()
        {
            return ApplicationUtil.Try(async () => await this.service.GetAll());
        }

        /// <summary>
        /// Updates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public Task<Response<TEntity>> Update(TEntity entity)
        {
            return ApplicationUtil.Try(async () =>
            {
                await this.service.Update(entity);
                return entity;
            });
        }
    }
}
