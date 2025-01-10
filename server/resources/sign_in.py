import re
import pytz
from datetime import datetime, timezone

from flask_restful import Resource, abort
from flask import request, jsonify, make_response

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

            response_payload = {
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": user.role,
                    "created_at": user.created_at,
                    "last_sign_in_at": user.last_sign_in_at
                },
            }

            res = make_response(jsonify(response_payload))

            ph_tz = pytz.timezone('Asia/Manila')
            expires_utc = datetime.fromtimestamp(
                session.expires_at, tz=timezone.utc)
            expires_ph = expires_utc.astimezone(ph_tz)

            expires_str = expires_ph.strftime('%a, %d %b %Y %H:%M:%S GMT')

            is_production = not request.is_secure

            # Set Secure only if in production
            cookie_settings = {
                'expires': expires_str,
                'httponly': True,
                'samesite': 'None',
                'secure': is_production,
            }

            res.set_cookie("sb_access_token",
                           session.access_token, **cookie_settings)

            return res

        except Exception as e:
            abort(500, error=str(e))
