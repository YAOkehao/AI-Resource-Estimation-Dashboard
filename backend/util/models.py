from flask_restx import fields

def auth_details(api):
    return api.parser().add_argument('Authorization', help="Your Authorization Token in the form '<AUTH_TOKEN>'", location='headers')

def login_details(api):
    return api.model('login_details', {
        'username': fields.String(required=True, example='SampleUsername'),
        'password': fields.String(required=True, example='SamplePassword')
    })