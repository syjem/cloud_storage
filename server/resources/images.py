from flask import jsonify, request
from flask_restful import abort, Resource
from storage import supabase

from utils.format_size import format_size
from utils.image_data import image_data


class Images(Resource):

    def get(self):
        response = supabase.storage.from_("images").list()

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        return jsonify({"raw_data": images, "images": image_data(images), "total_size": format_size(total_size)})

    def post(self):

        if 'files' not in request.files:
            abort(400, error="No files provided.")

        files = request.files.getlist('files')

        for file in files:
            file_path = file.filename
            file_content = file.read()
            content_type = file.mimetype
            response = supabase.storage.from_("images").upload(
                file=file_content,
                path=file_path,
                file_options={"cache-control": "3600",
                              "content-type": content_type, "upsert": "false"},
            )

        return jsonify({"message": "Files uploaded successfully"})


class ScreenShots(Resource):

    def get(self):
        response = supabase.storage.from_("images").list(
            "screenshots",
            {"sortBy": {"column": "created_at", "order": "desc"}}
        )

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        return jsonify({"images": image_data(images, folder_name="screenshots"), "total_size": format_size(total_size)})

    def post(self):

        if 'files' not in request.files:
            abort(400, error="No files provided.")

        files = request.files.getlist('files')

        for file in files:
            file_path = f"screenshots/{file.filename}"
            file_content = file.read()
            content_type = file.mimetype
            response = supabase.storage.from_("images").upload(
                file=file_content,
                path=file_path,
                file_options={"cache-control": "3600",
                              "content-type": content_type, "upsert": "false"},
            )

        return jsonify({"message": "Files uploaded successfully"})


class Favorites(Resource):

    def get(self):
        response = supabase.storage.from_("images").list(
            "favorites",
            {"sortBy": {"column": "created_at", "order": "desc"}}
        )

        images = [file for file in response if file['id']]
        total_size = sum(file["metadata"]["size"] for file in images)

        return jsonify({"images": image_data(images, folder_name="favorites"), "total_size": format_size(total_size)})

    def post(self):

        if 'files' not in request.files:
            abort(400, error="No files provided.")

        files = request.files.getlist('files')

        for file in files:
            file_path = f"favorites/{file.filename}"
            file_content = file.read()
            content_type = file.mimetype
            response = supabase.storage.from_("images").upload(
                file=file_content,
                path=file_path,
                file_options={"cache-control": "3600",
                              "content-type": content_type, "upsert": "false"},
            )

        return jsonify({"message": "Files uploaded successfully"})
