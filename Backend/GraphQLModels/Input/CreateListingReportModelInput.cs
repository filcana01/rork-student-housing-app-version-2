namespace HousingRequest.GraphQLModels.Input
{
    public class CreateListingReportModelInput
    {
        public long IdUser { get; set; }
        public long IdListing { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
