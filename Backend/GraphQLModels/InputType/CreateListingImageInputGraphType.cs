using HousingRequest.GraphQLModels.Input;

namespace HousingRequest.GraphQLModels.InputType
{
    public class CreateListingImageInputGraphType : InputObjectGraphType<CreateListingImageModelInput>
    {
        public CreateListingImageInputGraphType()
        {
            Name = "CreateListingImageInput";
            Description = "Input for adding an image to a listing";

            Field(x => x.IdListing);
            Field(x => x.VideoUrl);
            Field(x => x.IsPrimary);
            Field(x => x.OrderIndex);
        }
    }
}