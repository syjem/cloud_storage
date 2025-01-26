from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from resources.home import Home
from resources.images import Images, ScreenShots, Favorites
from resources.download_files import DownloadFiles

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5173"}})
api = Api(app)

# API routes
api.add_resource(Home, "/", "/home")
api.add_resource(Images, "/api/images")
api.add_resource(ScreenShots, "/api/images/screenshots")
api.add_resource(Favorites, "/api/images/favorites")
api.add_resource(DownloadFiles, "/api/images/download")
