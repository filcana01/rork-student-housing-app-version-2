namespace HousingRequest.Models;


public class FurnishingStatusModel
{
    public long Id { get; set; }
    public string NameIt { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

