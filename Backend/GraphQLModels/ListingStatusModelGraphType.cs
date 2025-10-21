namespace HousingRequest.GraphQLModels;

public class ListingStatusModelGraphType : ObjectGraphType<ListingStatusModel>
{
    public ListingStatusModelGraphType()
    {
        Name = nameof(ListingStatusModel);
        Field(x => x.Id);
        Field(x => x.NameIt);
        Field(x => x.NameEn);
    }
}
