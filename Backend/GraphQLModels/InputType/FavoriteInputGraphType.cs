using HousingRequest.GraphQLModels.Input;

namespace HousingRequest.GraphQLModels.InputType
{
    public class FavoriteInputGraphType : InputObjectGraphType<FavoriteModelInput>
    {
        public FavoriteInputGraphType()
        {
            Field(x => x.IdUser);
            Field(x => x.IdListing);
        }
    }
}