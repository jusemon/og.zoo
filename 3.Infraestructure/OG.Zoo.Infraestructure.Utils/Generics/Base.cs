namespace OG.Zoo.Infraestructure.Utils.Generics
{
    using Google.Cloud.Firestore;

    /// <summary>
    /// Entity base
    /// </summary>
    public class Base
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        ///
        [FirestoreProperty]
        public string Id { get; set; }
    }
}
