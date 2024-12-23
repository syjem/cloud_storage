from flask import jsonify
from flask_restful import Resource
from storage import supabase


class Images(Resource):

    def get(self):
        response = supabase.storage.from_("images").list()

        images = [file for file in response if file['id']]

        images_url = [
            supabase.storage.from_("images").get_public_url(file['name'])
            for file in images
        ]

        return jsonify({"data": images_url})


class ScreenShots(Resource):

    def get(self):
        response = supabase.storage.from_("images").list(
            "screen_shots",
            {"sortBy": {"column": "created_at", "order": "desc"}}
        )

        image_url = [
            supabase.storage.from_("images").get_public_url(f"screen_shots/{file['name']}")
            for file in response
        ]

        return jsonify({"data": image_url})
