from flask import Flask, request, jsonify;
from flask_cors import CORS
import animalLlm
app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/generateQuestions',methods = ['POST'])
@cross_origin()
def thing():
    print(request)
    app.logger.info(request)
    animalLlm.generateQuestions()
    response = jsonify(message="Simple server is running")
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response




