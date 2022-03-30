#pip install pymupdf
#pip install flask
from flask import Flask, redirect , request , render_template , send_file, after_this_request
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import fitz

app = Flask(__name__)
app.config['SECRET_KEY'] = 'F3HUIF23H8923F9H8389FHXKLN'
app.config['UPLOAD_FOLDER'] = '/home/adam/Documents/s/pdfupload/upload_folder'

@app.route('/', methods=['POST', 'GET'])
def sent():
    if request.method == 'POST':
        try:
            uploaded_files = request.files.getlist('PDFs[]')
            doc1 = fitz.open()
            now1 = datetime.now()
            d1 = now1.strftime("%d%m%Y")
            current_time = now1.strftime("%H%M%S")
            file_name = str(d1) + '' + str(current_time)
            for i in uploaded_files:
                if (secure_filename(i.filename)[len(secure_filename(i.filename))-4:len(secure_filename(i.filename))]) == ".pdf":
                    f = secure_filename(i.filename)
                    i.save(os.path.join(app.config['UPLOAD_FOLDER'], f))
                    doc = fitz.open(os.path.join(app.config['UPLOAD_FOLDER'], f))
                    if request.headers['fajne'] == 'true': doc1.insert_pdf(doc, from_page = doc.page_count)
                    else: doc1.insert_pdf(doc, to_page = 0)
                    doc1.save(os.path.join(app.config['UPLOAD_FOLDER'], file_name + '.pdf'))
                    doc.close()
                    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], f))
            return 'file?file=' + file_name + '.pdf'
        except:
            return '/'
    return render_template('index.html')

@app.route('/file')
def pdf():
    @after_this_request
    def remove_file(response):
        try:
            if request.args['file'][len(request.args['file'])-4:len(request.args['file'])] == '.pdf':
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], request.args['file']))
            else:
                return redirect('/')
        except Exception:
            return redirect('/')
        return response
    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], request.args['file']), as_attachment=True)




if __name__ == '__main__':
    app.run()
