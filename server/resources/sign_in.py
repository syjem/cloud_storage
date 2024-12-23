from flask_restful import Resource, abort
from flask import request, jsonify

from storage import supabase


class SignIn(Resource):

    def post(self):
        data = request.get_json()
        print(data)

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            abort(400, error="Email and password are required.")

        try:
            response = supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })

            return jsonify(response)

        except Exception as e:
            abort(500, error=str(e))
