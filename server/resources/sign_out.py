from flask import jsonify, make_response
from flask_restful import Resource, abort
from flask_cors import cross_origin

from storage import supabase


class SignOut(Resource):

    # @cross_origin(origin="https://your-frontend.vercel.app", supports_credentials=True)  # Enable CORS for frontend domain
    def get(self):
        try:
            supabase.auth.sign_out()
            response = make_response(
                jsonify({'message': 'Signed out successfully.'}))

            response.delete_cookie('sb_access_token')

            return response

        except Exception as e:
            abort(500, error=str(e))
