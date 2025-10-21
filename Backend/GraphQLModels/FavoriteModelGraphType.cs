namespace HousingRequest.GraphQLModels

{
    public class FavoriteModelGraphType : ObjectGraphType<FavoriteModel>
    {
        public FavoriteModelGraphType()
        {
            Name = nameof(FavoriteModel);
            Field(x => x.Id);
            Field(x => x.IdUser);
            Field(x => x.IdListing);

            Field(x => x.Listing, type: typeof(ListingModelGraphType));
            Field(x => x.User, type: typeof(UserModelGraphType));
        }
    }
}
