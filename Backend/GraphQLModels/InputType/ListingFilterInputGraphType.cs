using HousingRequest.GraphQLModels.Input;

namespace HousingRequest.GraphQLModels.InputType
{
    public class ListingFilterInputGraphType : InputObjectGraphType<ListingFilterModelInput>
    {
        public ListingFilterInputGraphType()
        {
            Field(x => x.Ids, nullable: true);
            Field(x => x.UserIds, nullable: true);
            Field(x => x.CategoryIds, nullable: true);
            Field(x => x.MinPrice, nullable: true);
            Field(x => x.MaxPrice, nullable: true);
            Field(x => x.City, nullable: true);
            Field(x => x.MinSurfaceArea, nullable: true);
            Field(x => x.MaxSurfaceArea, nullable: true);
            Field(x => x.FurnishingStatusIds, nullable: true);

            Field(x => x.HasTerrace, nullable: true);
            Field(x => x.HasGarden, nullable: true);
            Field(x => x.HasPool, nullable: true);
            Field(x => x.PetsAllowed, nullable: true);
            Field(x => x.HasElevator, nullable: true);
            Field(x => x.HasRampAccess, nullable: true);
            Field(x => x.AcceptsSwissCaution, nullable: true);
            Field(x => x.IsAvailableImmediately, nullable: true);

    }
    }
}