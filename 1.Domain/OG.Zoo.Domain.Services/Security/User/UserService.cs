namespace OG.Zoo.Domain.Services.Security.User
{
    using Entities.Security;
    using Infraestructure.Utils.Exceptions;
    using Infraestructure.Utils.Security;
    using Interfaces.Security.User;
    using Microsoft.IdentityModel.Tokens;
    using Services.Generics;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// User Service
    /// </summary>
    /// <seealso cref="OG.Zoo.Domain.Services.Generics.BaseService{OG.Zoo.Domain.Entities.Security.User, System.String}" />
    /// <seealso cref="OG.Zoo.Domain.Interfaces.Security.User.IUserService" />
    public class UserService : BaseService<User, string>, IUserService
    {
        /// <summary>
        /// The user repository
        /// </summary>
        private readonly IUserRepository userRepository;

        /// <summary>
        /// The key
        /// </summary>
        private readonly string key;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserService"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public UserService(IUserRepository repository, string key) : base(repository)
        {
            this.userRepository = repository;
            this.key = key;
        }

        /// <summary>
        /// Creates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public override async Task Create(User entity)
        {
            entity.Password = Cryptography.GetHash(Encoding.UTF8.GetString(Convert.FromBase64String(entity.Password)));
            await base.Create(entity);
            entity.Password = string.Empty;
        }

        /// <summary>
        /// Updates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public override async Task Update(User entity)
        {
            if (!string.IsNullOrWhiteSpace(entity.Password))
            {
                entity.Password = Cryptography.GetHash(Encoding.UTF8.GetString(Convert.FromBase64String(entity.Password)));
            }
            else
            {
                var old = await this.userRepository.Get(entity.Id);
                entity.Password = old.Password;
            }
            await base.Update(entity);
            entity.Password = string.Empty;
        }

        /// <summary>
        /// Logins the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        /// <exception cref="AppException">Incorrect User or Password.</exception>
        public async Task Login(User user)
        {
            var result = await this.userRepository.GetBy(user, u => u.Name.ToUpperInvariant().Trim());
            if (result != null && Cryptography.Validate(result.Password, Encoding.UTF8.GetString(Convert.FromBase64String(user.Password))))
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(this.key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                            new Claim(ClaimTypes.Name, result.Id)
                        }),
                    Expires = DateTime.UtcNow.AddHours(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);
                user.Password = string.Empty;
                user.Id = result.Id;
                return;
            }
            throw new AppException(AppExceptionTypes.Validation, "Incorrect User or Password.");
        }

        /// <summary>
        /// Gets by the specified identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public override async Task<User> Get(string id)
        {
            var result = await base.Get(id);
            result.Password = string.Empty;
            return result;
        }

        /// <summary>
        /// Gets all.
        /// </summary>
        /// <returns></returns>
        public override async Task<IEnumerable<User>> GetAll()
        {
            var results = await base.GetAll();
            return results.Select(r => { r.Password = string.Empty; return r; });
        }
    }
}
