namespace OG.Zoo.Infraestructure.Data.Repository.Params
{
    using Domain.Entities.Params;
    using Domain.Interfaces.Params.Infirmary;
    using Generics;
    using Google.Cloud.Firestore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    /// <summary>
    /// Infirmary Repository
    /// </summary>
    /// <seealso cref="string" />
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

        /// <summary>
        /// Gets the with relations.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public async Task<Infirmary> GetWithRelations(string id)
        {
            var db = this.DbFactory.GetDb();
            var snapshot = await db.Collection(typeof(Infirmary).Name).Document(id).GetSnapshotAsync();
            var entity = snapshot.ConvertTo<Infirmary>();
            var snapshotAnimal = await db.Document(entity.IdAnimal).GetSnapshotAsync();
            entity.Animal = snapshotAnimal.ConvertTo<Animal>();
            entity.Id = id;
            return entity;
        }

        /// <summary>
        /// Gets all with relations.
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Infirmary>> GetAllWithRelations()
        {
            var db = this.DbFactory.GetDb();
            var snapshot = await db.Collection(typeof(Infirmary).Name).GetSnapshotAsync();
            var snapshotAnimal = await db.Collection(typeof(Animal).Name).Select(FieldPath.DocumentId, new FieldPath("Name"))
                .GetSnapshotAsync();

            var entities = snapshot.Documents.Select(d =>
            {
                var entity = d.ConvertTo<Infirmary>();
                entity.Id = d.Id;
                return entity;
            }).ToList();
            
            foreach (var infirmary in entities)
            {
                var key = infirmary.IdAnimal.Split('/').Last();
                var animal = snapshotAnimal.FirstOrDefault(d => d.Id == key)?.ConvertTo<Animal>();
                if (animal!=null)
                {
                    animal.Id = key;
                    infirmary.Animal = animal;
                }
            }
            return entities;
        }
    }
}
