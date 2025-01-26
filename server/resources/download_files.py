import io

from flask import request, send_file
from flask_restful import Resource

from storage import supabase


class DownloadFiles(Resource):

    def post(self):
        data = request.get_json()
        file_name = data.get('path')
        print(file_name)

        response = supabase.storage.from_("images").download(
            file_name
        )

        return send_file(
            io.BytesIO(response),
            mimetype="application/octet-stream",
            as_attachment=True,
            download_name=file_name.split("/")[-1]
        )
