﻿namespace OG.Zoo.Domain.Entities.Security
{
    using Google.Cloud.Firestore;
    using Infraestructure.Utils;

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
