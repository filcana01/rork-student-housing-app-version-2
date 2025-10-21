namespace HousingRequest.GraphQLModels.Input
{
    public class CreateSavedSearchModelInput
    {
        public long IdUser { get; set; }
        public string SearchName { get; set; } = string.Empty;
        public string SearchCriteria { get; set; } = string.Empty;
        public bool NotificationsEnabled { get; set; } = true;
    }
}