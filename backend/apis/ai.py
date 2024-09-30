from flask_restx import Namespace, Resource, fields, abort
from flask import request
from util.helper import *
from util.models import *

api = Namespace('ai', description='ai Services')

@api.route('/recommendLLM')
class Login(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Token')
    @api.expect(login_details(api))
    @api.doc(description='''
        This is used to authenticate a verified account created through signup.
        Returns a auth token which should be passed in subsequent calls to the api
        to verify the user.
    ''')
    def post(self):
        if not request.json:
            abort(400, 'Malformed Request')
        #if (request.args.get('property_id', None) is None):
        #    abort(400, "You must provide the property_id you want to update")
        
        (username, password) = unpack(request.json, 'username', 'password')
        if (password != "admin"):
            abort(403,'Invalid Username/Password')
        t = gen_token()
        return {
            'token': t,
        }