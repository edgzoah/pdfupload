// Wrzucanie pliku do forma
var formdrop = document.getElementById("formdrop");
// Input typu file
var PDFinput = document.getElementById("PDFinput");
// Zmiena na spana z nazwą pliku (pdf) 
var textfromfile = document.getElementById("textfromfile");
// Status uploadu PDF 
var uploadPDFStatus = document.getElementById("uploadPDFStatus");
// Zmienna do wrzuconych już PDF 
var droppedPDF;


// Eeee, nie wiem co to ale podobno będzie działać, tak mówi stackoverflow
function overrideDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

// Przenoszenie i dodawanie naszego pliku poprzez input do forma 
function movefile() {
  formdrop.classList.add("movefile");
}
// Usuwanie naszego pliku z forma po skończeniu "uploadu" 
function movefileEnd() {
  formdrop.classList.remove("movefile");
}
// Transfer/dodawanie danych/plików na server 
function addfilesdatatoserver(event) {
  droppedPDF = event.target.files || event.dataTransfer.files;
  showFiles(droppedPDF);
}
// Funkcja pokazywania PDF (jeśli pdf < 2)
function showFiles(files) {
  // Sprawdzanie ilości wrzuconych PDF (1 czy więcej)
  if (files.length > 1) {
      // Ilość PDF wrzuconych (Opcja PDF ≥ 2)
    textfromfile.innerText = files.length + " files selected";
  } else {
      // Nazwa wrzuconego "jednego" PDF
    textfromfile.innerText = files[0].name;
  }
}

function uploadPDFs(event) {
  
  event.preventDefault();
  changeStatusupload("Uploading...");
  var nameValue = document.getElementById("sraka").checked;
  var formData = new FormData();
  for (var i = 0, file; (file = droppedPDF[i]); i++) {
    formData.append(PDFinput.name, file, file.name);
  }
  var xhr = new XMLHttpRequest();
  xhr.open(formdrop.method, formdrop.action, true);
  xhr.setRequestHeader('fajne', nameValue);
  xhr.onreadystatechange = function(data) {
    if (xhr.response !== "") {
      window.location.href = xhr.response
    }
  };
  xhr.send(formData);
}

function changeStatusupload(text) {
  uploadPDFStatus.innerText = text;
}
