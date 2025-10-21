using HousingRequest.GraphQLModels.Input;

namespace HousingRequest.GraphQLModels.InputType
{
    public class CreateListingReportInputGraphType : InputObjectGraphType<CreateListingReportModelInput>
    {
        public CreateListingReportInputGraphType()
        {
            Field(x => x.IdUser);
            Field(x => x.IdListing);
            Field(x => x.Reason);
            Field(x => x.Description);
        }
    }
}
