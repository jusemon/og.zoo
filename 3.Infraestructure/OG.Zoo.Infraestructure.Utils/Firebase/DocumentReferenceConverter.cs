namespace OG.Zoo.Infraestructure.Utils.Firebase
{
    using Google.Cloud.Firestore;
    using System;

    public class DocumentReferenceConverter : IFirestoreConverter<string>
    {
        public string FromFirestore(object value)
        {
            var document = ((DocumentReference)value);
            var parts = document.Path.Split("/");
            return $"{parts[parts.Length - 2]}/{parts[parts.Length - 1]}";
        }

        public object ToFirestore(string value)
        {
            var id = Environment.GetEnvironmentVariable(FirebaseConstants.GoogleProjectId);
            return FirestoreDb.Create(id).Document(value);
        }
    }
}
