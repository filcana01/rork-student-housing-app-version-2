namespace HousingRequest.GraphQLModels

{
    public class UserModelGraphType : ObjectGraphType<UserModel> 
    {
        public UserModelGraphType()
        {
            Name = nameof(UserModel);
            Field(x => x.Id);
            Field(x => x.FirstName);
            Field(x => x.LastName);
            Field(x => x.CompanyName, nullable: true);
            Field(x => x.CompanyWebsite, nullable: true);
            Field(x => x.Email);
            Field(x => x.PhoneNumber);
            Field(x => x.Address, nullable: true);
            Field(x => x.IsIndividual);
            Field(x => x.IsAgency);
            Field(x => x.IsAdmin);
            Field(x => x.IsVerified);
        }
    }
}

