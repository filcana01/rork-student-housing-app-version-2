using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HousingRequest.GraphQLModels.Input
{
    public class ListingFilterModelInput
    {

        public List<long>? Ids { get; set; } = [];
        public List<long>? UserIds { get; set; } = [];
        public List<long>? CategoryIds { get; set; } = [];
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string? City { get; set; } = string.Empty; // swiss municipalities from seeds
        public int? MinSurfaceArea { get; set; }
        public int? MaxSurfaceArea { get; set; }
        public List<long>? FurnishingStatusIds { get; set; } = [];

        public bool HasTerrace { get; set; } = false;
        public bool HasGarden { get; set; } = false;
        public bool HasPool { get; set; } = false;
        public bool PetsAllowed { get; set; } = false;


        public bool HasElevator { get; set; } = false;
        public bool HasRampAccess { get; set; } = false;
        
        public bool AcceptsSwissCaution { get; set; } = false;
        public bool IsAvailableImmediately { get; set; } = false;

    }
}
