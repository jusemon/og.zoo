namespace OG.Zoo.Infraestructure.IoC.Installers
{
    using System.Linq;
    using System.Runtime.CompilerServices;
    using Configuration;
    using Domain.Interfaces.Generics;
    using Domain.Interfaces.Security.User;
    using Domain.Services.Generics;
    using Domain.Services.Security.User;
    using Infraestructure.Utils.Injectables.Email;
    using Microsoft.Extensions.DependencyInjection;

    /// <summary>
    /// Service Installer
    /// </summary>
    class ServiceInstaller
    {
        /// <summary>
        /// The configure
        /// </summary>
        private IConfigure configure;

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceInstaller"/> class.
        /// </summary>
        /// <param name="configure">The configure.</param>
        public ServiceInstaller(IConfigure configure)
        {
            this.configure = configure;
        }

        /// <summary>
        /// Installs the specified service registry.
        /// </summary>
        /// <param name="serviceCollection">The service registry.</param>
        public void Install(IServiceCollection serviceCollection)
        {
            var servicesConfig = this.configure.GetServicesConfig();
            serviceCollection.AddScoped<IUserService>(
                (f) =>
                    new UserService(
                        f.GetService<IUserRepository>(),
                        f.GetService<IEmailService>(),
                        servicesConfig.Key
                    )
            );

            var types = typeof(BaseService<,>).Assembly.GetTypes();
            var interfaces = typeof(IBaseService<,>)
                .Assembly.GetTypes()
                .Where(t =>
                    t.IsInterface
                    && t != typeof(IUserService)
                    && t.GetInterfaces()
                        .Any(i =>
                            i.IsGenericType
                            && i.GetGenericTypeDefinition() == typeof(IBaseService<,>)
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
