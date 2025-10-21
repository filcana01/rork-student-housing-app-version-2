namespace HousingRequest.Models
{
    public class ListingReportModel
    {
        public long Id { get; set; }

        public long IdUser { get; set; }
        public UserModel User { get; set; } = null!;

        public long IdListing { get; set; }
        public ListingModel Listing { get; set; } = null!;

        public string Reason { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
