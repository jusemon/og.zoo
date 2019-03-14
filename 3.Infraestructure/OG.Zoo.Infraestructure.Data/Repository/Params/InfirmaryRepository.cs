namespace OG.Zoo.Infraestructure.Data.Repository.Params
{
    using Domain.Entities.Params;
    using Domain.Interfaces.Params.Infirmary;
    using Generics;

    /// <summary>
    /// Infirmary Repository
    /// </summary>
    /// <seealso cref="OG.Zoo.Infraestructure.Data.Repository.Generics.BaseRepository{OG.Zoo.Domain.Entities.Params.Infirmary, System.String}" />
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Params.Infirmary.IInfirmaryRepository" />
    public class InfirmaryRepository : BaseRepository<Infirmary, string>, IInfirmaryRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InfirmaryRepository"/> class.
        /// </summary>
        /// <param name="dbFactory">The database factory.</param>
        public InfirmaryRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
