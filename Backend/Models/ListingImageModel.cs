namespace HousingRequest.Models;

public class ListingImageModel
{
    public long Id { get; set; }

    public long IdListing { get; set; }
    public string VideoUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; } = false;

    public int OrderIndex { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

