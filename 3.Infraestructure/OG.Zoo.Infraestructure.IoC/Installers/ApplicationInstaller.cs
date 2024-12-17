namespace OG.Zoo.Infraestructure.IoC.Installers
{
    using System.Linq;
    using Application.Interfaces.Generics;
    using Application.Services.Generics;
    using Configuration;
    using Microsoft.Extensions.DependencyInjection;

    /// <summary>
    /// Application Installer
    /// </summary>
    class ApplicationInstaller
    {
        /// <summary>
        /// The configure
        /// </summary>
        private IConfigure configure;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationInstaller"/> class.
        /// </summary>
        /// <param name="configure">The configure.</param>
        public ApplicationInstaller(IConfigure configure)
        {
            this.configure = configure;
        }

        /// <summary>
        /// Installs the specified service registry.
        /// </summary>
        /// <param name="serviceRegistry">The service registry.</param>
        public void Install(IServiceCollection serviceRegistry)
        {
            var types = typeof(BaseApplication<,>).Assembly.GetTypes();

            var interfaces = typeof(IBaseApplication<,>)
                .Assembly.GetTypes()
                .Where(t =>
                    t.IsInterface
                    && t.GetInterfaces()
                        .Any(i =>
                            i.IsGenericType
                            && i.GetGenericTypeDefinition() == typeof(IBaseApplication<,>)
                        )
                );

            foreach (var interfaceType in interfaces)
            {
                var implementationType = types.FirstOrDefault(t =>
                    t.IsClass && t.GetInterfaces().Any(i => i == interfaceType)
                );
                if (implementationType != null)
                {
                    serviceRegistry.AddScoped(interfaceType, implementationType);
                }
            }
        }
    }
}
