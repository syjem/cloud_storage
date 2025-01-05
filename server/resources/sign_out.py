from flask import jsonify
from flask_restful import Resource, abort

from storage import supabase


class SignOut(Resource):

    def get(self):
        try:
            response = supabase.auth.sign_out()
            return jsonify({'message': 'Signed out successfully.'})
        except Exception as e:
            abort(500, error=str(e))
