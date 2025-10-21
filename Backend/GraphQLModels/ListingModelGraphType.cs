

using HousingData.Entities;

namespace HousingRequest.GraphQLModels

{
    public class ListingModelGraphType : ObjectGraphType<ListingModel>
    {
        public ListingModelGraphType()
        {
            Name = nameof(ListingModel);

            Field(x => x.Id);
            Field(x => x.IdUser);
            Field(x => x.IdCategory, nullable: true);
            Field(x => x.IdFurnishingStatus, nullable: true);
            Field(x => x.IdListingStatus, nullable: true);

            Field(x => x.Title, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.Address, nullable: true);
            Field(x => x.PostalCode, nullable: true);
            Field(x => x.City, nullable: true);
            // Field(x => x.Country);
            //Field<DecimalGraphType>("latitude", nullable: true)
            //    .Resolve(ctx => ctx.Source.Latitude);
            Field(x => x.Latitude, nullable: true);
            Field(x => x.Longitude, nullable: true);
            Field(x => x.SurfaceArea);
            Field(x => x.NumberOfRooms, nullable: true);
            Field(x => x.Floor, nullable: true);
            Field(x => x.NumberOfBathrooms, nullable: true);
            Field(x => x.MonthlyRent, nullable: true);
            Field(x => x.ExpensesIncluded, nullable: true);
            Field(x => x.MonthlyExpenses, nullable: true);
            Field(x => x.AnnualAdjustment, nullable: true);
            Field(x => x.HasTerrace, nullable: true);
            Field(x => x.HasGarden, nullable: true);
            Field(x => x.HasPool, nullable: true);
            Field(x => x.PetsAllowed, nullable: true);
            Field(x => x.AvailabilityDate);
            Field(x => x.IsAvailableImmediately, nullable: true);
            Field(x => x.MinContractDuration, nullable: true);
            Field(x => x.Rules, nullable: true);
            Field(x => x.HasElevator, nullable: true);
            Field(x => x.HasRampAccess, nullable: true);
            Field(x => x.SecurityDeposit, nullable: true);
            Field(x => x.AcceptsSwissCaution, nullable: true);
            Field(x => x.VerifiedAt, nullable: true);

            Field(x => x.User, type: typeof(UserModelGraphType));
            Field(x => x.Category, type: typeof(CategoryModelGraphType));
            Field(x => x.FurnishingStatus, type: typeof(FurnishingStatusModelGraphType));
            Field(x => x.ListingStatus, type: typeof(ListingStatusModelGraphType));

        }
    }
}
