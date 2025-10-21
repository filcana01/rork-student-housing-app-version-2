namespace HousingRequest.GraphQLModels

{
    public class MessageModelGraphType : ObjectGraphType<MessageModel>
    {
        public MessageModelGraphType()
        {
            Name = nameof(MessageModel);

            Field(x => x.Id);
            Field(x => x.IdSenderUser);
            Field(x => x.IdReceiverUser);
            Field<LongGraphType>("ListingId")
                .Resolve(ctx => ctx.Source.IdListing);
            Field(x => x.Content);
            Field(x => x.IsRead);
            Field(x => x.CreatedAt);

            Field(x => x.IdUser, type: typeof(UserModelGraphType));
            Field(x => x.IdListing, type: typeof(ListingModelGraphType));

        }
    }
}
