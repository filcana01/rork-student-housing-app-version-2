namespace HousingRequest.GraphQLModels.Input
{
    public class CreateMessageModelInput
    {
        public long IdSenderUser { get; set; }
        public long IdReceiverUser { get; set; }
        public long IdListing { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}