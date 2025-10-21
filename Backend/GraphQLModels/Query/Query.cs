using HousingAPI.Business.Services.seeds;
using HousingRequest.GraphQLModels;
using HousingRequest.GraphQLModels.Input;
using HousingRequest.GraphQLModels.InputType;
using HousingRequest.Models;
using ProfilingRequest.GraphQLModels.Type;
using Tools.Helpers;
using TosRequest.GraphQLModels.Type;
using TosRequest.Model;

namespace HousingAPI.GraphQLModels.Query;

public class Query : ObjectGraphType
{

    private readonly IUserService _userService;
    private readonly AuthenticatedUser? _user;
    public Query(IServiceProvider serviceProvider)
    {
        Name = nameof(Query);
        _userService = serviceProvider.GetRequiredService<IUserService>();
        _user = _userService.GetCurrentUser();
        AuthenticatedUser();
        if (_user != null && !_user.HasPower("ACCESS"))
        {
            Settings();
            return;
        }

        Test();
        Settings();
        GetDiscalimer();
        GetOrganisationUnits();

        Listings();
        Listing();
        User();
        Favorites();
        ListingsByUser();
        DraftsByUser();

        PendingListings();
        GetAllListingReports();
    }
    private void GetOrganisationUnits()
    {
        Field<ListGraphType<OrganisationalUnitModelGraphType>>("organisationUnits")
            .ResolveAsync(async context =>
            {
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.CreateScope().ServiceProvider.GetRequiredService<ISeedsService>().OrganisationUnitsModelAsync();
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            }
        );
    }
    private void GetDiscalimer()
    {
        Field<DisclaimerModelGraphType>("disclaimer")
            .ResolveAsync(async context =>
            {
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        DisclaimerModel model = await serviceProvider.CreateAsyncScope().ServiceProvider.GetRequiredService<ITosService>().GetDisclaimerAsync();
                        return model;
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            }
        );

    }
    private void Settings()
    {
        Field<ListGraphType<SettingType>>("Settings")
            .ResolveAsync(async context =>
            {
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        List<SettingModel> settings = await serviceProvider.CreateAsyncScope().ServiceProvider.GetRequiredService<ISettingService>().GetSettingsAsync(true);
                        if (_user != null && !_user.HasPower("ACCESS"))
                        {
                            return settings;
                        }
                        return settings.Where(x => x.UIAccessType == "PUBLIC");
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            }

        );
    }

    private void Test()
    {
        Field<BooleanGraphType>("Test")
            .Resolve(context =>
            {
                try
                {
                    return true;
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            }
        );
    }

    private void AuthenticatedUser()
    {
        Field<AuthenticatedUserGraphType>("AuthenticatedUser")
            .Resolve(context =>
            {
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {

                        return serviceProvider.GetRequiredService<IUserService>().GetCurrentUser();
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            }
        );
    }

    // HOUSINGSERVICE =================================================

    // PER L'UTENTE ===================================================

    // Recupera tutti gli annunci che corrispondono ai filtri di ricerca
    private void Listings()
    {
        Field<ListGraphType<ListingModelGraphType>>("getListings")
            .Argument<NonNullGraphType<ListingFilterInputGraphType>>(InsideConstants.Inside.GRAPHQL_INPUT)
            .ResolveAsync(async context =>
            {
                try
                {
                    ListingFilterModelInput input = context.GetArgument<ListingFilterModelInput>(InsideConstants.Inside.GRAPHQL_INPUT);
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().GetFilteredListings(input);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            });
    }

    // Recupera i dettagli dell'annuncio selezionato tramite l'ID
    private void Listing()
    {
        Field<ListingModelGraphType>("getListing")

            .Argument<NonNullGraphType<LongGraphType>>("id")

            .ResolveAsync(async context =>
            {
                try
                {
                    var id = context.GetArgument<long>("id");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {

                        return await serviceProvider.GetRequiredService<IHousingService>().GetListingDetailsByListingId(id);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            });
    }

    // Recupera i dettagli dell'utente selezionato tramite l'ID
    private void User()
    {
        Field<UserModelGraphType>("getUser")

            .Argument<NonNullGraphType<LongGraphType>>("id")

            .ResolveAsync(async context =>
            {
                try
                {
                    var id = context.GetArgument<long>("id");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {

                        return await serviceProvider.GetRequiredService<IHousingService>().GetUserDetailsByUserId(id);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            });
    }

    // Recupera la lista dei preferiti di uno specifico utente
    private void Favorites()
    {
        Field<ListGraphType<FavoriteModelGraphType>>("getFavorites")
            .Argument<NonNullGraphType<LongGraphType>>("id")
            .ResolveAsync(async context =>
            {
                try
                {
                    var id = context.GetArgument<long>("id");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().GetUserFavoritesByUserId(id);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            });
    }

    // Recupera la lista degli annunci di uno specifico utente
    private void ListingsByUser()
    {
        Field<ListGraphType<ListingModelGraphType>>("getListingsByUser")
            .Argument<NonNullGraphType<LongGraphType>>("userId")
            .ResolveAsync(async context =>
            {
                try
                {
                    var userId = context.GetArgument<long>("userId");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().GetListingsByUserId(userId);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            });
    }

    // Recupera la lista dei drafts di uno specifico utente
    private void DraftsByUser()
    {
        Field<ListGraphType<ListingModelGraphType>>("getDraftListingsByUser")
            .Argument<NonNullGraphType<LongGraphType>>("userId")
            .ResolveAsync(async context =>
            { 
                try
                {
                    var userId = context.GetArgument<long>("userId");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().GetDraftListingsByUser(userId);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            });
    }

    // PER L'ADMIN ====================================================

    // Recupera la lista di tutti gli annunci in attesa di approvazione 
    private void PendingListings()
    {
        Field<ListGraphType<ListingModelGraphType>>("getPendingListings")
            .ResolveAsync(async context =>
            {
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().GetPendingListings();
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }

                return null;
            });
    }

    private void GetAllListingReports()
    {
        Field<ListGraphType<ListingReportModelGraphType>>("getListingReports")
            .ResolveAsync(async context =>
            {
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().GetListingReports();
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }

                return null;
            });
    }











    // PER MIA CONOSCENZA, DA IGNORARE:

    //private void Categories()
    //{
    //    Field<ListGraphType<CategoryModelGraphType>>("Categories")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is null) return null;

    //                return await serviceProvider
    //                .GetRequiredService<IHousingService>()
    //                .GetCurrentCategory();

    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}

    //private void CategoryById()
    //{
    //    Field<CategoryModelGraphType>("Category")
    //        .Argument<NonNullGraphType<LongGraphType>>("id")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var id = context.GetArgument<long>("id");
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is not null)
    //                {
    //                    return await serviceProvider.GetRequiredService<IHousingService>().GetCategoryById(id);
    //                }
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}

    //private void Users()
    //{
    //    Field<ListGraphType<UserModelGraphType>>("Users")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is not null)
    //                {
    //                    return await serviceProvider.GetRequiredService<IHousingService>().GetUsers();
    //                }
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}


    //private void ListingsByCategory()
    //{
    //    Field<ListGraphType<ListingModelGraphType>>("ListingsByCategory")
    //        .Argument<NonNullGraphType<LongGraphType>>("categoryId")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var categoryId = context.GetArgument<long>("categoryId");
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is not null)
    //                {
    //                    return await serviceProvider.GetRequiredService<IHousingService>().GetListingsByCategory(categoryId);
    //                }
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}

    //private void ListingImages()
    //{
    //    Field<ListGraphType<ListingImageModelGraphType>>("ListingImages")
    //        .Argument<NonNullGraphType<LongGraphType>>("listingId")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var listingId = context.GetArgument<long>("listingId");
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is not null)
    //                {
    //                    return await serviceProvider.GetRequiredService<IHousingService>().GetListingImages(listingId);
    //                }
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}

    //private void UserMessages()
    //{
    //    Field<ListGraphType<MessageModelGraphType>>("UserMessages")
    //        .Argument<NonNullGraphType<LongGraphType>>("userId")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var userId = context.GetArgument<long>("userId");
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is not null)
    //                {
    //                    return await serviceProvider.GetRequiredService<IHousingService>().GetUserMessages(userId);
    //                }
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}

    //private void Conversation()
    //{
    //    Field<ListGraphType<MessageModelGraphType>>("Conversation")
    //        .Argument<NonNullGraphType<LongGraphType>>("senderId")
    //        .Argument<NonNullGraphType<LongGraphType>>("receiverId")
    //        .Argument<NonNullGraphType<LongGraphType>>("listingId")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var senderId = context.GetArgument<long>("senderId");
    //                var receiverId = context.GetArgument<long>("receiverId");
    //                var listingId = context.GetArgument<long>("listingId");
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is not null)
    //                {
    //                    return await serviceProvider.GetRequiredService<IHousingService>().GetConversation(senderId, receiverId, listingId);
    //                }
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}

    //private void UserSavedSearches()
    //{
    //    Field<ListGraphType<SavedSearchModelGraphType>>("UserSavedSearches")
    //        .Argument<NonNullGraphType<LongGraphType>>("userId")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var userId = context.GetArgument<long>("userId");
    //                IServiceProvider? serviceProvider = context.RequestServices;
    //                if (serviceProvider is not null)
    //                {
    //                    return await serviceProvider.GetRequiredService<IHousingService>().GetUserSavedSearches(userId);
    //                }
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }
    //            return null;
    //        });
    //}

}
