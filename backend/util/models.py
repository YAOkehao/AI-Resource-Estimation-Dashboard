from flask_restx import fields

def auth_details(api):
    return api.parser().add_argument('Authorization', help="Your Authorization Token in the form '<AUTH_TOKEN>'", location='headers')

def login_details(api):
    return api.model('login_details', {
        'username': fields.String(required=True, example='SampleUsername'),
        'password': fields.String(required=True, example='SamplePassword')
    })
    
def llm_request_details(api):
    return api.model('llm_request_details', {
        'Service': fields.List(fields.String, required=True, example=['Text_Generation', 'Code_Generation']),
        'Price': fields.Integer(required=True, example='2'),
        'Response_Speed': fields.Integer(required=True, example='2'),
        'Accuracy': fields.Integer(required=True, example='2'),
        'Ethical_Training': fields.Integer(required=True, example='2'),
        'Green_Computing_Resources': fields.Integer(required=True, example='2'),
        'Local_Deployment_Capability': fields.Integer(required=True, example='2'),
        'Training_Resource_Requirements': fields.Integer(required=True, example='2'),
        'Fine_Tuning_Difficulty': fields.Integer(required=True, example='2'),
        'Multilingual_Support_Capability': fields.Integer(required=True, example='2'),
        'Model_Scalability': fields.Integer(required=True, example='2')
    })
    
def llm_compare_details(api):
    return api.model('llm_compare_details', {
        'names': fields.List(fields.String, required=True, example=['GPT-4', 'Claude 2', 'T5'])
    })