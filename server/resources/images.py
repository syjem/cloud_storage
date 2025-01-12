from flask import jsonify
from flask_restful import Resource
from storage import supabase

from utils.format_date import format_date
from utils.format_size import format_size


class Images(Resource):

    def get(self):
        response = supabase.storage.from_("images").list()

        images = [file for file in response if file['id']]

        total_size = sum(file["metadata"]["size"] for file in images)

        image_data = [
            {
                "name": file["name"],
                "created_at": format_date(file["created_at"]),
                "type": file["metadata"]["mimetype"],
                "size": format_size(file["metadata"]["size"]),
                "last_modified_at": format_date(file["metadata"]["lastModified"]),
                "url": supabase.storage.from_("images").get_public_url(file["name"])
            }
            for file in images
        ]

        return jsonify({"images": image_data, "total_size": format_size(total_size)})


class ScreenShots(Resource):

    def get(self):
        response = supabase.storage.from_("images").list(
            "screen_shots",
            {"sortBy": {"column": "created_at", "order": "desc"}}
        )

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        image_data = [
            {
                "name": file["name"],
                "created_at": format_date(file["created_at"]),
                "type": file["metadata"]["mimetype"],
                "size": format_size(file["metadata"]["size"]),
                "last_modified_at": format_date(file["metadata"]["lastModified"]),
                "url": supabase.storage.from_("images").get_public_url(f"screen_shots/{file['name']}")
            }
            for file in images
        ]

        return jsonify({"images": image_data, "total_size": format_size(total_size)})


class Favorites(Resource):

    def get(self):
        response = supabase.storage.from_("images").list(
            "favorites",
            {"sortBy": {"column": "created_at", "order": "desc"}}
        )

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        image_data = [
            {
                "name": file["name"],
                "created_at": format_date(file["created_at"]),
                "type": file["metadata"]["mimetype"],
                "size": format_size(file["metadata"]["size"]),
                "last_modified_at": format_date(file["metadata"]["lastModified"]),
                "url": supabase.storage.from_("images").get_public_url(f"favorites/{file['name']}")
            }
            for file in images
        ]

        return jsonify({"images": image_data, "total_size": format_size(total_size)})
