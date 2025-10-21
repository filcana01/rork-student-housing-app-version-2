using HousingRequest.GraphQLModels;
using HousingRequest.GraphQLModels.InputType;
using ProfilingRequest.GraphQLModels.Type;
using TosRequest.GraphQLModels.Input;
using TosRequest.GraphQLModels.Type;

namespace HousingAPI.GraphQLModels.Schema
{
    public class GraphQLSchema : GraphQL.Types.Schema
    {
        public GraphQLSchema(IServiceProvider services) : base(services)
        {

            var housingService = services.GetRequiredService<IHousingService>();

            //RegisterType(new ListingStatusModelGraphType());
            //RegisterType(new CategoryModelGraphType());
            //RegisterType(new UserModelGraphType());
            //RegisterType(new FurnishingStatusModelGraphType());
            //RegisterType(new ListingModelGraphType());
            //RegisterType(new ListingReportModelGraphType());

            //RegisterType(new ListingFilterInputGraphType());
            //RegisterType(new CreateOrUpdateListingInputGraphType());
            //RegisterType(new CreateListingReportInputGraphType());

            //RegisterType(new FavoriteModelGraphType());
            //RegisterType(new SavedSearchModelGraphType());
            //RegisterType(new MessageModelGraphType());

            //RegisterType(new AttachmentInputGraphType());
            //RegisterType(new EmailInputGraphType());

            //RegisterType(new UserDisclaimerModelInputGraphType());

            //RegisterType(new FacultyModelGraphType());
            //RegisterType(new OrganisationalUnitTypeModelGraphType());
            //RegisterType(new OrganisationalUnitModelGraphType());

            //RegisterType(new PersonUrlPhotoModelGraphType());
            //RegisterType(new PhotoUrlModelGraphType());
            //RegisterType(new MobileModelGraphType());
            //RegisterType(new EmailModelGraphType());
            //RegisterType(new PersonModelGraphType());

            //RegisterType(new DisclaimerModelGraphType());

            //RegisterType(new SeverityEnumGraphType());
            //RegisterType(new FeedbackModelGraphType());
            //RegisterType(new PowerModelGraphType());
            //RegisterType(new ProfilingRequest.GraphQLModels.Type.RoleModelGraphType());
            //RegisterType(new GroupModelGraphType());

            //RegisterType(new GroupRoleModelGraphType());
            //RegisterType(new DisclaimerModelInputGraphType());
            //RegisterType(new AuthenticatedUserGraphType());
           
            Query = new Query.Query(services);
            Mutation = new Mutation.Mutation(services, housingService);

        }
    }
}
