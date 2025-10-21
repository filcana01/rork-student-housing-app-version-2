using HousingRequest.GraphQLModels.Input;

namespace HousingRequest.GraphQLModels.InputType
{
    public class CreateMessageInputGraphType : InputObjectGraphType<CreateMessageModelInput>
    {
        public CreateMessageInputGraphType()
        {
            Name = "CreateMessageInput";
            Description = "Input for creating a new message";

            Field(x => x.IdSenderUser);
            Field(x => x.IdReceiverUser);
            Field(x => x.IdListing);
            Field(x => x.Content);
        }
    }
}