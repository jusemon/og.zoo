namespace OG.Zoo.Application.Services.Params
{
    using Domain.Entities.Params;
    using Domain.Interfaces.Params.Infirmary;
    using Generics;
    using Interfaces.DTOs;
    using Interfaces.Params;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Infirmary Application
    /// </summary>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    public class InfirmaryApplication : BaseApplication<Infirmary, string>, IInfirmaryApplication
    {
        /// <summary>
        /// The infirmary service
        /// </summary>
        private readonly IInfirmaryService infirmaryService;

        /// <summary>
        /// Initializes a new instance of the <see cref="InfirmaryApplication"/> class.
        /// </summary>
        /// <param name="service">The service.</param>
        public InfirmaryApplication(IInfirmaryService service) : base(service)
        {
            this.infirmaryService = service;
        }

        /// <summary>
        /// Gets the with relations.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public Task<Response<Infirmary>> GetWithRelations(string id)
        {
            return ApplicationUtil.Try(async () => await this.infirmaryService.GetWithRelations(id));
        }

        /// <summary>
        /// Gets all with relations.
        /// </summary>
        /// <returns></returns>
        public Task<Response<IEnumerable<Infirmary>>> GetAllWithRelations()
        {
            return ApplicationUtil.Try(async () => await this.infirmaryService.GetAllWithRelations());
        }
    }
}
