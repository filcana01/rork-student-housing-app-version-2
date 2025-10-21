namespace HousingRequest.GraphQLModels.Input
{
    public class SaveListingAsDraftModelInput
    {
        public long? Id { get; set; }
        public long? IdCategory { get; set; }
        public long? IdFurnishingStatus { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? Address { get; set; } = string.Empty;
        public string? PostalCode { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public int? SurfaceArea { get; set; }
        public int? NumberOfRooms { get; set; }
        public int? Floor { get; set; }
        public int? NumberOfBathrooms { get; set; }
        public decimal? MonthlyRent { get; set; }
        public bool? ExpensesIncluded { get; set; } = false;
        public decimal? MonthlyExpenses { get; set; }
        public bool? AnnualAdjustment { get; set; } = false;
        public bool? HasTerrace { get; set; } = false;
        public bool? HasGarden { get; set; } = false;
        public bool? HasPool { get; set; } = false;
        public bool? PetsAllowed { get; set; } = false;
        public DateTime? AvailabilityDate { get; set; }
        public bool? IsAvailableImmediately { get; set; } = false;
        public int? MinContractDuration { get; set; }
        public string? Rules { get; set; }
        public bool? HasElevator { get; set; } = false;
        public bool? HasRampAccess { get; set; } = false;
        public decimal? SecurityDeposit { get; set; }
        public bool? AcceptsSwissCaution { get; set; } = false;
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }
}