using HousingRequest.GraphQLModels;
using HousingRequest.GraphQLModels.Input;
using HousingRequest.GraphQLModels.InputType;
using ProfilingRequest.GraphQLModels.Type;
using Tools.Helpers;
using TosRequest.GraphQLModels.Input;
using TosRequest.GraphQLModels.Type;
using TosRequest.Model.Input;

namespace HousingAPI.GraphQLModels.Mutation;

public class Mutation : ObjectGraphType
{
    private readonly IUserService _userService;
    private readonly AuthenticatedUser? _user;
    private readonly ILoggerService _loggerService;
    private readonly IHousingService _housingService;


    public Mutation(IServiceProvider serviceProvider, IHousingService housingService)
    {
        Name = nameof(Mutation);
        Description = "Mutation description";
        _loggerService = serviceProvider.GetRequiredService<ILoggerService>();
        _userService = serviceProvider.GetRequiredService<IUserService>();
        _user = _userService.GetCurrentUser();
        _housingService = housingService;
        if (_user != null && !_user.HasPower(InsideConstants.Inside.Power.ACCESS))
        {
            return;
        }
     
        FakeMutation();
        SetDisclaimer();

        SaveListing();
        SaveListingAsDraft();
        ArchiveListing();
        DeleteListing();
        ReactivateListing();
        AddListingToFavorites();
        RemoveListingFromFavorites();
        ReportListing();

        VerifyListing();
        DeleteListingReport();
    }

    private void SetDisclaimer()
    {
        Field<DisclaimerModelGraphType>("setDisclaimer")
            .Argument<NonNullGraphType<UserDisclaimerModelInputGraphType>> (InsideConstants.Inside.GRAPHQL_INPUT)
            .ResolveAsync(async context =>
            {
                UserDisclaimerModelInput input = context.GetArgument<UserDisclaimerModelInput>(InsideConstants.Inside.GRAPHQL_INPUT);
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.CreateScope().ServiceProvider.GetRequiredService<ITosService>().SetUserDisclaimerAsync(input);
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

    private void FakeMutation()
    {
        Field<AuthenticatedUserGraphType>("fakeMutation")
            .Resolve(context =>
            {
                try
                {
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return serviceProvider.CreateAsyncScope().ServiceProvider.GetRequiredService<IUserService>().GetCurrentUser();
                    }
                    //ClassName input = context.GetArgument<ClassName>(Constant.GRAPHQL_INPUT);
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            }
        );
    }

    // LISTING ===========================

    // OK

    // CREA O AGGIORNA ANNUNCIO
    public void SaveListing()
    {
        Field<ListingModelGraphType>("saveListing")
                .Argument<NonNullGraphType<CreateOrUpdateListingInputGraphType>>("input")
                .ResolveAsync(async context =>
                {
                    try
                    {
                        var input = context.GetArgument<CreateOrUpdateListingModelInput>("input");
                        IServiceProvider? serviceProvider = context.RequestServices;
                        if (serviceProvider is not null)
                        {
                            return await serviceProvider.GetRequiredService<IHousingService>().CreateOrUpdateListing(input);
                        }
                    }
                    catch (Exception e)
                    {
                        context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                    }

                    return null;
                });
    }

    // QUANDO L'UTENTE SALVA LA CREAZIONE PER RIPRENDERLA SUCCESSIVAMENTE, L'ANNUNCIO VIENE SALVATO COME BOZZA
    public void SaveListingAsDraft()
    {
        Field<ListingModelGraphType>("saveListingAsDraft")
            .Argument<NonNullGraphType<CreateOrUpdateListingInputGraphType>>("input")
            .ResolveAsync(async context =>
            {
                try
                {
                    var input = context.GetArgument<CreateOrUpdateListingModelInput>("input");
                    IServiceProvider? serviceProvider = context.RequestServices;

                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().SaveListingAsDraft(input);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }

                return null;
            });
    }

    // ARCHIVIA ANNUNCIO

    public void ArchiveListing()
    {
        Field<ListingModelGraphType>("archiveListing")
            .Argument<NonNullGraphType<IdGraphType>>("id")
            .ResolveAsync(async context =>
            {
                try
                {
                    var id = context.GetArgument<long>("id");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not  null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().ArchiveListing(id);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return null;
            });
    }

    // ELIMINA ANNUNCIO

    public void DeleteListing()
    {
        Field<BooleanGraphType>("deleteListing")
            .Argument<NonNullGraphType<IdGraphType>>("id")
            .ResolveAsync(async context =>
            {
                try
                {
                    var id = context.GetArgument<long>("id");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().DeleteListing(id);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return false;
            });
    }

    // RIATTIVA ANNUNCIO
    public void ReactivateListing()
    {
        Field<ListingModelGraphType>("reactivateListing")
            .Argument<NonNullGraphType<IdGraphType>>("id")
            .ResolveAsync(async context =>
            {
                try
                {
                    var id = context.GetArgument<long>("id");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().ReactivateListing(id);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }

                return null;
            });
    }

    // AGGIUNGI ANNUNCIO AI PREFERITI
    public void AddListingToFavorites()
    {
        Field<FavoriteModelGraphType>("addFavorite")
            .Argument<NonNullGraphType<LongGraphType>>("userId")
            .Argument<NonNullGraphType<LongGraphType>>("listingId")
            .ResolveAsync(async context =>
            {
                try
                {
                    var userId = context.GetArgument<long>("userId");
                    var listingId = context.GetArgument<long>("listingId");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().AddFavorite(userId, listingId);
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

    // RIMUOVE ANNUNCIO DAI PREFERITI
    // Necessaria al front end per impostare il toggle del "cuoricino"
    // È un BooleanGraphType perchè elimina qualcosa, quindi l'unico feedback utile è sapere se ha avuto successo (true) o fallito (false) nella cancellazione.
    public void RemoveListingFromFavorites()
    { 
        Field<BooleanGraphType>("removeFavorite")
            .Argument<NonNullGraphType<LongGraphType>>("userId")
            .Argument<NonNullGraphType<LongGraphType>>("listingId")
            .ResolveAsync(async context =>
            {
                try
                {
                    var userId = context.GetArgument<long>("userId");
                    var listingId = context.GetArgument<long>("listingId");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().RemoveFavorite(userId, listingId);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }
                return false;
            });
    }

    // VERIFICA CONFORMITÀ ANNUNCIO (PER ADMIN)
    private void VerifyListing()
    {
        Field<ListingModelGraphType>("verifyListing")
            .Argument<NonNullGraphType<LongGraphType>>("listingId")
            .ResolveAsync(async context =>
            {
                try
                {
                    var listingId = context.GetArgument<long>("listingId");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().VerifyListing(listingId);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }

                return null;
            });
    }

    // PERMETTE ALL'UTENTE DI SEGNALARE UN ANNUNCIO
    private void ReportListing()
    {
        Field<ListingReportModelGraphType>("reportListing")
            .Argument<NonNullGraphType<CreateListingReportInputGraphType>>("input")
            .ResolveAsync(async context =>
            {
                try
                {
                    var input = context.GetArgument<CreateListingReportModelInput>("input");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().ReportListing(input);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }

                return null;
            });
    }

    // PERMETTE ALL'ADMIN DI ELIMINARE UNA SEGNALAZIONE
    private void DeleteListingReport()
    {
        Field<BooleanGraphType>("deleteListingReport")
            .Argument<NonNullGraphType<LongGraphType>>("id")
            .ResolveAsync(async context =>
            {
                try
                {
                    var id = context.GetArgument<long>("id");
                    IServiceProvider? serviceProvider = context.RequestServices;
                    if (serviceProvider is not null)
                    {
                        return await serviceProvider.GetRequiredService<IHousingService>().DeleteListingReport(id);
                    }
                }
                catch (Exception e)
                {
                    context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
                }

                return false;
            });
    }







    // PER MIA CONOSCENZA, DA IGNORARE:

    // ARCHIVE LISTING
    //public void ArchiveListing()
    //{
    //    Field<BooleanGraphType>("archiveListing")
    //        .Description("Soft delete a listing by achieving it")
    //         .Argument<NonNullGraphType<DeleteInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            var input = context.GetArgument<DeleteInput>("input");
    //            return await _housingService.ArchiveListing(input);
    //        });

    //}

    // DELETE LISTING
    //public void DeleteListing()
    //{
    //    Field<BooleanGraphType>("deleteListing")
    //        .Description("Delete existing listing")
    //        .Argument<NonNullGraphType<DeleteInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            var input = context.GetArgument<DeleteInput>("input");
    //            return await _housingService.DeleteListing(input);
    //        });

    //}

    // USER ===========================

    // CREATE USER
    //public void CreateUser()
    //{
    //    Field<UserModelGraphType>("createUser")
    //        .Description("Create new user")
    //        .Argument<NonNullGraphType<CreateUserInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var input = context.GetArgument<CreateUserInput>("input");
    //                return await _housingService.CreateUser(input); 
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }

    //            return null;
    //        });
    //}

    // UPDATE USER
    //public void UpdateUser()
    //{
    //    Field<UserModelGraphType>("updateUser")
    //            .Description("Update existing user")
    //            .Argument<NonNullGraphType<UpdateUserInputGraphType>>("input")
    //            .ResolveAsync(async context =>
    //            {
    //                var input = context.GetArgument<UpdateUserInput>("input");
    //                return await _housingService.UpdateUser(input);
    //            });
    //}

    // MESSAGE ===========================

    // CREATE MESSAGE
    //public void CreateMessage()
    //{
    //    Field<MessageModelGraphType>("createMessage")
    //        .Description("Create a new message in the chat")
    //        .Argument<NonNullGraphType<CreateMessageInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var input = context.GetArgument<CreateMessageInput>("input");
    //                return await _housingService.CreateMessage(input);
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }

    //            return null;
    //        });
    //}

    // MARK MESSAGE AS READ
    //public void MarkMessageAsRead()
    //{
    //    Field<BooleanGraphType>("markMessageAsRead")
    //        .Description("Mark a message as read")
    //        .Argument<NonNullGraphType<DeleteInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            var input = context.GetArgument<DeleteInput>("input");
    //            return await _housingService.MarkMessageAsRead(input);
    //        });

    //}

    // LISTING IMAGE ===========================

    // SET THE MAIN LISTING IMAGE 
    //public void SetPrimaryListingImage()
    //{
    //    Field<BooleanGraphType>("setPrimaryListingImage")
    //        .Description("Set an image as primary for a listing")
    //        .Argument<NonNullGraphType<DeleteInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            var input = context.GetArgument<DeleteInput>("input");
    //            return await _housingService.SetPrimaryListingImage(input);
    //        });

    //}

    // SAVED SEARCH ===========================

    // CREATE NEW SAVED SEARCH
    //public void CreateSavedSearch()
    //{
    //    Field<SavedSearchModelGraphType>("createSavedSearch")
    //        .Description("Create a new saved search")
    //        .Argument<NonNullGraphType<CreateSavedSearchInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            try
    //            {
    //                var input = context.GetArgument<CreateSavedSearchInput>("input");
    //                return await _housingService.CreateSavedSearch(input);
    //            }
    //            catch (Exception e)
    //            {
    //                context.Errors.Add(new ExecutionError(e.InnerException?.Message ?? e.Message));
    //            }

    //            return null;
    //        });
    //}

    // DELETE AN EXISTING SAVED SEARCH
    //public void DeleteSavedSearch()
    //{
    //    Field<BooleanGraphType>("deleteSavedSearch")
    //        .Description("Delete existing saved search")
    //        .Argument<NonNullGraphType<DeleteInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            var input = context.GetArgument<DeleteInput>("input");
    //            return await _housingService.DeleteSavedSearch(input);
    //        });

    //}

    // TURN SAVED SEARCH NOTIFICATIONS ON/OFF
    //public void ToggleSavedSearchNotifications()
    //{
    //    Field<BooleanGraphType>("toggleSavedSearchNotifications")
    //        .Description("Toggle notifications for a saved search")
    //        .Argument<NonNullGraphType<DeleteInputGraphType>>("input")
    //        .ResolveAsync(async context =>
    //        {
    //            var input = context.GetArgument<DeleteInput>("input");
    //            return await _housingService.ToggleSavedSearchNotifications(input);
    //        });

    //}
}
