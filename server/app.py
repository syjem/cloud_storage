from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from resources.home import Home
from resources.sign_in import SignIn
from resources.sign_out import SignOut
from resources.images import Images, ScreenShots

app = Flask(__name__)
CORS(app, supports_credentials=True)
api = Api(app)


# API routes
api.add_resource(Home, "/", "/home")
api.add_resource(SignIn, "/api/sign_in")
api.add_resource(SignOut, "/api/sign_out")
api.add_resource(Images, "/api/images")
api.add_resource(ScreenShots, "/api/images/screen_shots")


if __name__ == ('__main__'):
    app.run(debug=True, port=8080)
