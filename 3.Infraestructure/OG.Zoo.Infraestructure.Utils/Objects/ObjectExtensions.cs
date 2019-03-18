namespace OG.Zoo.Infraestructure.Utils.Objects
{
    using Google.Cloud.Firestore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;

    /// <summary>
    /// Object Extensions
    /// </summary>
    public static class ObjectExtensions
    {
        /// <summary>
        /// Converts to object.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source">The source.</param>
        /// <returns></returns>
        public static T ToObject<T>(this IDictionary<string, object> source)
            where T : class, new()
        {
            var someObject = new T();
            var someObjectType = someObject.GetType();

            foreach (var item in source)
            {
                someObjectType
                         .GetProperty(item.Key)
                         .SetValue(someObject, item.Value, null);
            }

            return someObject;
        }

        /// <summary>
        /// Ases the dictionary.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="bindingAttr">The binding attribute.</param>
        /// <returns></returns>
        public static IDictionary<string, object> AsDictionary(this object source, BindingFlags bindingAttr = BindingFlags.DeclaredOnly | BindingFlags.Public | BindingFlags.Instance)
        {
            return source.GetType().GetProperties(bindingAttr).ToDictionary
            (
                propInfo => propInfo.Name,
                propInfo => GetValue(source, propInfo)
            );

        }

        /// <summary>
        /// Gets the value.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="propInfo">The property information.</param>
        /// <returns></returns>
        private static object GetValue(object source, PropertyInfo propInfo)
        {
            var converter = propInfo.GetCustomAttribute<FirestorePropertyAttribute>()?.ConverterType;
            if (converter == null)
            {
                return propInfo.GetValue(source, null);
            }
            var ctor = converter.GetConstructor(new Type[0]);
            var documentRefereceConverter = (IFirestoreConverter<string>) ctor.Invoke(new object[] { });
            var value = propInfo.GetValue(source, null).ToString();
            return documentRefereceConverter.ToFirestore(value);
        }
    }
}
