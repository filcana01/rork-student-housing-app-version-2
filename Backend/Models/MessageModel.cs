using System.ComponentModel.DataAnnotations.Schema;

namespace HousingRequest.Models;

public class MessageModel
{
    public long Id { get; set; }
    public long IdUser { get; set; }

    public long IdSenderUser { get; set; }

    public long IdReceiverUser { get; set; }

    public long? IdListing { get; set; }

    public string Content { get; set; } = string.Empty;

    public bool IsRead { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

