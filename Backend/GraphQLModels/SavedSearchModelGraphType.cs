namespace HousingRequest.GraphQLModels

{
    public class SavedSearchModelGraphType : ObjectGraphType<SavedSearchModel>
    {
        public SavedSearchModelGraphType()
        {
            Name = nameof(SavedSearchModel);

            Field(x => x.Id);
            Field(x => x.IdUser);
            Field(x => x.SearchName);
            Field(x => x.SearchCriteria);
            Field(x => x.NotificationsEnabled);

            Field(x => x.User, type: typeof(UserModelGraphType));
        }
    }
}
