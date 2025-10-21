using System.ComponentModel.DataAnnotations.Schema;
using HousingData.Entities;
using static Tools.Helpers.InsideConstants.Inside;

namespace HousingRequest.Models;

public class ListingModel
{
    public long Id { get; set; }

    public long IdUser { get; set; }
    public UserModel User { get; set; } = null!;

    public long? IdCategory { get; set; }
    public CategoryModel Category { get; set; } = null!;

    public long? IdFurnishingStatus { get; set; }
    public FurnishingStatusModel FurnishingStatus { get; set; } = null!;

    public long? IdListingStatus { get; set; }
    public ListingStatusModel ListingStatus { get; set; } = null!;

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

    public bool? IsAvailableImmediately { get; set; } = true;

    public int? MinContractDuration { get; set; } 

    public string? Rules { get; set; }
    public bool? HasElevator { get; set; } = false;
    public bool? HasRampAccess { get; set; } = false;

    public decimal? SecurityDeposit { get; set; }

    public bool? AcceptsSwissCaution { get; set; } = false;


    public DateTime? VerifiedAt { get; set; } = DateTime.UtcNow;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }

}

