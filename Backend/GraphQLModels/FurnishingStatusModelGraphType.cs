namespace HousingRequest.GraphQLModels;


public class FurnishingStatusModelGraphType : ObjectGraphType<FurnishingStatusModel>
{
    public FurnishingStatusModelGraphType()
    {
        Name = nameof(FurnishingStatusModel);
        Field(x => x.Id);
        Field(x => x.NameIt);
        Field(x => x.NameEn);
    }
}
