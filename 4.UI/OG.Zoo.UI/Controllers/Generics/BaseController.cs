namespace OG.Zoo.UI.Controllers.Generics
{
    using Microsoft.AspNetCore.Mvc;
    using OG.Zoo.Application.Interfaces.DTOs;
    using OG.Zoo.Application.Interfaces.Generics;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Base Controller
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <typeparam name="TId">The type of the identifier.</typeparam>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    public class BaseController<TEntity, TId> : ControllerBase
    {
        /// <summary>
        /// The application
        /// </summary>
        private readonly IBaseApplication<TEntity, TId> application;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseController{TEntity, TId}" /> class.
        /// </summary>
        /// <param name="application">The application.</param>
        public BaseController(IBaseApplication<TEntity, TId> application)
        {
            this.application = application;
        }

        /// <summary>
        /// Creates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        [HttpPost]
        public Task<Response<TEntity>> Create([FromBody] TEntity entity) {
            return this.application.Create(entity);
        }

        /// <summary>
        /// Updates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        [HttpPut]
        public Task<Response<TEntity>> Update([FromBody] TEntity entity) {
            return this.application.Update(entity);

        }

        /// <summary>
        /// Deletes the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public Task<Response<TEntity>> Delete(TId id) {
            return this.application.Delete(id);

        }

        /// <summary>
        /// Gets the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public Task<Response<TEntity>> Get(TId id) {
            return this.application.Get(id);

        }

        /// <summary>
        /// Gets all.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Task<Response<IEnumerable<TEntity>>> GetAll() {
            return this.application.GetAll();
        }
    }
}