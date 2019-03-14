namespace OG.Zoo.UI.Api.Controllers.Params
{
    using Application.Interfaces.Params;
    using Domain.Entities.Params;
    using Microsoft.AspNetCore.Mvc;
    using UI.Api.Controllers.Generics;

    /// <summary>
    /// Infirmary Controller
    /// </summary>
    /// <seealso cref="OG.Zoo.UI.Api.Controllers.Generics.BaseController{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    [Route("api/[controller]")]
    [ApiController]
    public class InfirmaryController : BaseController<Infirmary, string>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InfirmaryController" /> class.
        /// </summary>
        /// <param name="application">The application.</param>
        public InfirmaryController(IInfirmaryApplication application) : base(application)
        {
        }
    }
}
