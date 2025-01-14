from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from resources.home import Home
from resources.images import Images, ScreenShots, Favorites

app = Flask(__name__)
CORS(app, supports_credentials=True)
api = Api(app)


# API routes
api.add_resource(Home, "/", "/home")
api.add_resource(Images, "/api/images")
api.add_resource(ScreenShots, "/api/images/screen_shots")
api.add_resource(Favorites, "/api/images/favorites")
