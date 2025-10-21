namespace HousingRequest.GraphQLModels;

public class CategoryModelGraphType : ObjectGraphType<CategoryModel>
{
    public CategoryModelGraphType()
    {
        Name = nameof(CategoryModel);
        Field(x => x.Id);
        Field(x => x.NameIt);
        Field(x => x.NameEn);
    }
}
