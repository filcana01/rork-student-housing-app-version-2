using HousingRequest.Models;

namespace HousingRequest.GraphQLModels
{
    public class ListingReportModelGraphType : ObjectGraphType<ListingReportModel>
    {
        public ListingReportModelGraphType()
        {
            Name = nameof(ListingReportModel);
            Field(x => x.Id);
            Field(x => x.IdUser);
            Field(x => x.IdListing);
            Field(x => x.Reason);
            Field(x => x.Description);
            Field(x => x.CreatedAt);

            Field(x => x.User, type: typeof(UserModelGraphType));
            Field(x => x.Listing, type: typeof(ListingModelGraphType));

        }
    }
}
