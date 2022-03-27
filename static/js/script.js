var formdrop = document.getElementById("formdrop");
var PDFinput = document.getElementById("PDFinput");
var textfromfile = document.getElementById("textfromfile");
var uploadPDFStatus = document.getElementById("uploadPDFStatus");
var droppedPDF;

// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//   alert(1)
//  } else {
//    alert(2)
//  }

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
    textfromfile.innerHTML = '<div class="uploadtext">' + files.length + " files selected" + '</div>';
  } else {
    textfromfile.innerHTML = '<div class="uploadtext">' + files[0].name + '</div>';
  }
}

function uploadPDFs(event) {
  
  event.preventDefault();
  var nameValue = document.getElementById("customSwitches").checked;
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

