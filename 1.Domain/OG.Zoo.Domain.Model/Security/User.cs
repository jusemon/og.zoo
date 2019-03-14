namespace OG.Zoo.Domain.Entities.Security
{
    using Generics;
    using Google.Cloud.Firestore;

    /// <summary>
    /// User class
    /// </summary>
    [FirestoreData]
    public class User : Base
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.B
        /// </value>
        [FirestoreProperty]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        /// <value>
        /// The password.
        /// </value>
        [FirestoreProperty]
        public string Password { get; set; }
    }
}
