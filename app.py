from flask import Flask , request , abort , redirect , Response ,url_for, render_template, flash
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'F3HUIF23H8923F9H8389FHXKLN'
app.config['UPLOAD_FOLDER'] = './templates'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sent', methods=['POST', 'GET'])
def sent():
    if request.method == 'POST':
        uploaded_files = request.files.getlist('file')
        print(uploaded_files)
        for i in uploaded_files:
            i.save(secure_filename(i.filename))
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)