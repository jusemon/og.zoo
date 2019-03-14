﻿namespace OG.Zoo.UI.Api.Controllers.Params
{
    using Application.Interfaces.Params;
    using Controllers.Generics;
    using Domain.Entities.Params;
    using Microsoft.AspNetCore.Mvc;

    /// <summary>
    /// Animal Controller
    /// </summary>
    /// <seealso cref="OG.Zoo.UI.Api.Controllers.Generics.BaseController{OG.Zoo.Domain.Entities.Params.Animal, System.String}" />
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalController : BaseController<Animal, string>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AnimalController"/> class.
        /// </summary>
        /// <param name="application">The application.</param>
        public AnimalController(IAnimalApplication application) : base(application)
        {
        }
    }
}
