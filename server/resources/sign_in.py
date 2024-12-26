import re

from flask_restful import Resource, abort
from flask import request, jsonify

from storage import supabase


class SignIn(Resource):

    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            abort(400, error="Email and password are required.")

        # Validate email format
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            abort(400, error="Invalid email format.")

        try:
            response = supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })

            user = response.user
            session = response.session

            return jsonify({
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": user.role,
                    "created_at": user.created_at,
                    "last_sign_in_at": user.last_sign_in_at
                },
                "session": {
                    "access_token": session.access_token,
                    "expires_in": session.expires_in,
                    "expires_at": session.expires_at
                }
            })

        except Exception as e:
            abort(500, error=str(e))
