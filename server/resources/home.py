from flask import jsonify
from flask_restful import Resource

class Home(Resource):
    def get(self):

        routes = [
            {
                "method": "GET",
                "url": "/api/images",
                "description": "Get all images"
            },
            {
                "method": "GET",
                "url": "/api/images/screen_shots",
                "description": "Get all screen shot images"
            },
            {
                "method": "POST",
                "url": "/api/sign_in",
                "description": "Sign in with Email and Password",
                "body": ["email", "password"]
            },
        ]

        return jsonify(routes)
