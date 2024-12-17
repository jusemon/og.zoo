namespace OG.Zoo.Infraestructure.IoC.Installers
{
    using System.Linq;
    using Configuration;
    using Data.Repository.Generics;
    using Domain.Interfaces.Generics;
    using Microsoft.Extensions.DependencyInjection;

    /// <summary>
    /// Repository Installer
    /// </summary>
    class RepositoryInstaller
    {
        /// <summary>
        /// The configure
        /// </summary>
        private readonly IConfigure configure;

        /// <summary>
        /// Initializes a new instance of the <see cref="RepositoryInstaller"/> class.
        /// </summary>
        /// <param name="configure">The configure.</param>
        public RepositoryInstaller(IConfigure configure)
        {
            this.configure = configure;
        }

        /// <summary>
        /// Installs the specified service registry.
        /// </summary>
        /// <param name="serviceCollection">The service registry.</param>
        public void Install(IServiceCollection serviceCollection)
        {
            this.configure.SetFirebaseConfig();
            serviceCollection.AddScoped<IDbFactory, DbFactory>();

            var types = typeof(BaseRepository<,>).Assembly.GetTypes();
            var interfaces = typeof(IBaseRepository<,>)
                .Assembly.GetTypes()
                .Where(t =>
                    t.IsInterface
                    && t.GetInterfaces()
                        .Any(i =>
                            i.IsGenericType
                            && i.GetGenericTypeDefinition() == typeof(IBaseRepository<,>)
                        )
                );

            foreach (var interfaceType in interfaces)
            {
                var implementationType = types.FirstOrDefault(t =>
                    t.IsClass && t.GetInterfaces().Any(i => i == interfaceType)
                );
                if (implementationType != null)
                {
                    serviceCollection.AddScoped(interfaceType, implementationType);
                }
            }
        }
    }
}
