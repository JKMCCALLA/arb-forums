from flask import Flask, request
from flask_cors import CORS
import whisper

app = Flask(__name__)
cors = CORS(app)

@app.route('/S2T', methods=['POST'])
def S2T():
    # Locate audio file locally and pass to whisper model
    default_path = "./assets/common_voice_es_19610609.mp3"
    response = request.get_json()
    path = default_path if response["flag"]=='True' else response["path"]
    model = whisper.load_model("base")
    result = model.transcribe(path)
    return result["text"]

if __name__ == '__main__':
    app.run(debug=True)