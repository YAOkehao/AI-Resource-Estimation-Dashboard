from flask_restx import Namespace, Resource, fields, abort
from flask import request
from util.helper import *
from util.models import *
import db.init_db as db

api = Namespace('ai', description='ai Services')

@api.route('/recommendLLM')
class Login(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Token')

    @api.expect(llm_request_details(api))
    @api.doc(description='''
        This is used to recommend users the LLM that best suits their needs.
    ''')
    def post(self):
        if not request.json:
            abort(400, 'Malformed Request')
        #if (request.args.get('property_id', None) is None):
        #    abort(400, "You must provide the property_id you want to update")
        
        (Service, Price, Response_Speed, Accuracy, Ethical_Training, Green_Computing_Resources, Local_Deployment_Capability, Training_Resource_Requirements, Fine_Tuning_Difficulty, Multilingual_Support_Capability, Model_Scalability) = unpack(request.json, 'Service', 'Price', 'Response_Speed', 'Accuracy', 'Ethical_Training', 'Green_Computing_Resources', 'Local_Deployment_Capability', 'Training_Resource_Requirements', 'Fine_Tuning_Difficulty', 'Multilingual_Support_Capability', 'Model_Scalability')
        session = db.get_session()
        allList = session.query(db.LLM).all()
        session.close()
        
        weights = {
            'Price': Price,
            'Response_Speed': Response_Speed,
            'Accuracy': Accuracy,
            'Ethical_Training': Ethical_Training,
            'Green_Computing_Resources': Green_Computing_Resources,
            'Local_Deployment_Capability': Local_Deployment_Capability,
            'Training_Resource_Requirements': Training_Resource_Requirements,
            'Fine_Tuning_Difficulty': Fine_Tuning_Difficulty,
            'Multilingual_Support_Capability': Multilingual_Support_Capability,
            'Model_Scalability': Model_Scalability
        }
        # Normalize each model's parameter to the range [0, 1]
        def normalize(value, min_value, max_value):
            return (value - min_value) / (max_value - min_value) if max_value != min_value else 1
        
        
        
        return {
            'result': recommendations
        }