from storage import supabase

from utils.format_date import format_date
from utils.format_size import format_size


def image_data(images: list[dict], folder_name: str = None) -> list[dict]:

    base_path = f"{folder_name}/" if folder_name else ""

    image_data = [
        {
            "name": file["name"],
            "created_at": format_date(file["created_at"]),
            "type": file["metadata"]["mimetype"],
            "size": format_size(file["metadata"]["size"]),
            "last_modified_at": format_date(file["metadata"]["lastModified"]),
            "url": supabase.storage.from_("images").get_public_url(f"{base_path}{file["name"]}")
        }
        for file in images
    ]

    return image_data
