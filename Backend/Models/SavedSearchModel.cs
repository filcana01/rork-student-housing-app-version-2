using System.ComponentModel.DataAnnotations.Schema;

namespace HousingRequest.Models;

public class SavedSearchModel
{
    public long Id { get; set; }

    public long IdUser { get; set; }
    public UserModel User { get; set; } = null!;

    public string SearchName { get; set; } = string.Empty;

    public string SearchCriteria { get; set; } = string.Empty; 

    public bool NotificationsEnabled { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

