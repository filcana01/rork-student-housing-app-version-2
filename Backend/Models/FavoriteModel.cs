using System.ComponentModel.DataAnnotations.Schema;

namespace HousingRequest.Models;

public class FavoriteModel
{
    public long Id { get; set; }

    public long IdUser { get; set; }
    public UserModel User { get; set; } = null!;

    public long IdListing { get; set; }
    public ListingModel Listing { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
