using Skystone.Domain.Entities;

namespace Skystone.Application.Common.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user);
}
