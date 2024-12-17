﻿namespace OG.Zoo.Infraestructure.Utils.Exceptions
{
    using System;
    using System.Runtime.Serialization;

    /// <summary>
    /// App Custom Exception
    /// </summary>
    /// <seealso cref="System.Exception" />
    public class AppException : Exception
    {
        /// <summary>
        /// Gets the type.
        /// </summary>
        /// <value>
        /// The type.
        /// </value>
        public AppExceptionTypes Type { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppException"/> class.
        /// </summary>
        /// <param name="type">The type.</param>
        public AppException(AppExceptionTypes type)
            : base()
        {
            this.Type = type;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppException"/> class.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="message">The message.</param>
        public AppException(AppExceptionTypes type, string message)
            : base(message)
        {
            this.Type = type;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="AppException"/> class.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="message">The message.</param>
        /// <param name="innerException">The inner exception.</param>
        public AppException(AppExceptionTypes type, string message, Exception innerException)
            : base(message, innerException)
        {
            this.Type = type;
        }
    }
}
