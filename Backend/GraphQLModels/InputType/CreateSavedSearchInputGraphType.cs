using HousingRequest.GraphQLModels.Input;

namespace HousingRequest.GraphQLModels.InputType
{
    public class CreateSavedSearchInputGraphType : InputObjectGraphType<CreateSavedSearchModelInput>
    {
        public CreateSavedSearchInputGraphType()
        {
            Name = "CreateSavedSearchInput";
            Description = "Input for creating a saved search";

            Field(x => x.IdUser);
            Field(x => x.SearchName);
            Field(x => x.SearchCriteria);
            Field(x => x.NotificationsEnabled);
        }
    }
}
