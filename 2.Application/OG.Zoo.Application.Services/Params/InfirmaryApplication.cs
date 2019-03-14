namespace OG.Zoo.Application.Services.Params
{
    using Domain.Entities.Params;
    using Domain.Interfaces.Params.Infirmary;
    using Generics;
    using Interfaces.Params;

    /// <summary>
    /// Infirmary Application
    /// </summary>
    /// <seealso cref="OG.Zoo.Application.Interfaces.Generics.IBaseApplication{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    public class InfirmaryApplication : BaseApplication<Infirmary, string>, IInfirmaryApplication
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InfirmaryApplication"/> class.
        /// </summary>
        /// <param name="service">The service.</param>
        public InfirmaryApplication(IInfirmaryService service) : base(service)
        {
        }
    }
}
