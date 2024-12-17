namespace OG.Zoo.Infraestructure.IoC
{
    using Configuration;
    using Installers;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Utils.Injectables.Email;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterServices(
            this IServiceCollection serviceCollection,
            IConfiguration configuration
        )
        {
            serviceCollection.AddScoped<IConfigure>((f) => new Configure(configuration));
            var config = serviceCollection.BuildServiceProvider().GetService<IConfigure>();
            var email = config.GetEmailConfig();
            serviceCollection.AddScoped<IEmailService>(
                (serviceProvider) =>
                {
                    return new EmailService(
                        email.Server,
                        email.Username,
                        email.Password,
                        email.Sender
                    );
                }
            );

            new RepositoryInstaller(config).Install(serviceCollection);
            new ServiceInstaller(config).Install(serviceCollection);
            new ApplicationInstaller(config).Install(serviceCollection);

            return serviceCollection;
        }
    }
}
