namespace HousingRequest.GraphQLModels

{
    public class ListingImageModelGraphType : ObjectGraphType<ListingImageModel>
    {
        public ListingImageModelGraphType()
        {
            Name = nameof(ListingImageModel);
            Field(x => x.Id);
            Field(x => x.IdListing);
            Field(x => x.VideoUrl);
            Field(x => x.IsPrimary);
            Field(x => x.OrderIndex);

            Field(x => x.IdListing, type: typeof(ListingModelGraphType));
        }
    }
}
