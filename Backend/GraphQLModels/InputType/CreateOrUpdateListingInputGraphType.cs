using HousingRequest.GraphQLModels.Input;

namespace HousingRequest.GraphQLModels.InputType
{
    public class CreateOrUpdateListingInputGraphType : InputObjectGraphType<CreateOrUpdateListingModelInput>
    {
        // Input per creare un nuovo annuncio";
        public CreateOrUpdateListingInputGraphType()
        {
            Field(x => x.Id, nullable: true);
            Field(x => x.IdCategory, nullable: true);
            Field(x => x.IdFurnishingStatus, nullable: true);
            Field(x => x.IdListingStatus, nullable: true);
            Field(x => x.Title, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.Address, nullable: true);
            Field(x => x.PostalCode, nullable: true);
            Field(x => x.City, nullable: true);
            Field(x => x.Latitude, nullable: true);
            Field(x => x.Longitude, nullable: true);
            Field(x => x.SurfaceArea, nullable: true);
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
            Field(x => x.AvailabilityDate, nullable: true);
            Field(x => x.IsAvailableImmediately, nullable: true);
            Field(x => x.MinContractDuration, nullable: true);
            Field(x => x.Rules, nullable: true);
            Field(x => x.HasElevator, nullable: true);
            Field(x => x.HasRampAccess, nullable: true);
            Field(x => x.SecurityDeposit, nullable: true);
            Field(x => x.AcceptsSwissCaution, nullable: true);
        }
    }
}
