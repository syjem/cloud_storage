from flask import jsonify
from flask_restful import Resource
from storage import supabase

from utils.format_size import format_size
from utils.image_data import image_data


class Images(Resource):

    def get(self):
        response = supabase.storage.from_("images").list()

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        return jsonify({"images": image_data(images), "total_size": format_size(total_size)})

    def post(self):
        pass


class ScreenShots(Resource):

    def get(self):
        response = supabase.storage.from_("images").list(
            "screenshots",
            {"sortBy": {"column": "created_at", "order": "desc"}}
        )

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        return jsonify({"images": image_data(images, folder_name="screenshots"), "total_size": format_size(total_size)})


class Favorites(Resource):

    def get(self):
        response = supabase.storage.from_("images").list(
            "favorites",
            {"sortBy": {"column": "created_at", "order": "desc"}}
        )

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        return jsonify({"images": image_data(images, folder_name="favorites"), "total_size": format_size(total_size)})
