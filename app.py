from django.shortcuts import redirect
from flask import Flask , request , render_template , send_file
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import fitz

app = Flask(__name__)
app.config['SECRET_KEY'] = 'F3HUIF23H8923F9H8389FHXKLN'
app.config['UPLOAD_FOLDER'] = './templates'



@app.route('/', methods=['POST', 'GET'])
def sent():
    if request.method == 'POST':
        uploaded_files = request.files.getlist('file')
        doc1 = fitz.open()
        now1 = datetime.now()
        d1 = now1.strftime("%d.%m.%Y")
        current_time = now1.strftime("%H:%M:%S")
        file_name = str(d1) + ':' + str(current_time)
        for i in uploaded_files:
            f = secure_filename(i.filename)
            i.save(f)
            doc = fitz.open(f)
            if request.form['page_num'] == 'last': doc1.insert_pdf(doc, from_page = doc.page_count)
            else: doc1.insert_pdf(doc, to_page = 0)
            doc1.save(file_name + ".pdf")
            os.remove('./' + f)
        return send_file('./' + file_name + '.pdf', as_attachment=True)
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
