import secrets
from flask_restx import abort

def gen_token():
    token = secrets.token_hex(32)
    #while db.exists("USER").where(curr_token=token):
    #    token = secrets.token_hex(32)
    return token

def unpack(j, *args, **kargs):
    #result = []
    #for arg in args:
    #    result.append(j.get(arg))
    #return result
    r = [j.get(arg, None) for arg in args]
    if kargs.get("required", True):
        [abort(kargs.get("Missing Arguments", 400)) for e in r if e == None]
    return r