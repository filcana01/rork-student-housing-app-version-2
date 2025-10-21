namespace HousingRequest.GraphQLModels.Input
{
    public class CreateListingImageModelInput
    {
        public long IdListing { get; set; }
        public string VideoUrl { get; set; } = string.Empty;
        public bool IsPrimary { get; set; } = false;
        public int OrderIndex { get; set; } = 0;
    }
}
