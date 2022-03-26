var formdrop = document.getElementById("formdrop");
var PDFinput = document.getElementById("PDFinput");
var textfromfile = document.getElementById("textfromfile");
var uploadPDFStatus = document.getElementById("uploadPDFStatus");
var droppedPDF;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  document.getElementById("web").style.display = "none";
  document.getElementById("mobile").style.display = "flex";
 }

function overrideDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}

function movefile() {
  formdrop.classList.add("movefile");
}
function movefileEnd() {
  formdrop.classList.remove("movefile");
}
function addfilesdatatoserver(event) {
  droppedPDF = event.target.files || event.dataTransfer.files;
  showFiles(droppedPDF);
}
function showFiles(files) {
  if (files.length > 1) {
    textfromfile.innerText = files.length + " files selected";
  } else {
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
