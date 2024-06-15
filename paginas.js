var treinoA = JSON.parse(localStorage.getItem("treinoA")) || [];
var treinoB = JSON.parse(localStorage.getItem("treinoB")) || [];
var treinoC = JSON.parse(localStorage.getItem("treinoC")) || [];
var treinoD = JSON.parse(localStorage.getItem("treinoD")) || [];
var treinoE = JSON.parse(localStorage.getItem("treinoE")) || [];
var treinoF = JSON.parse(localStorage.getItem("treinoF")) || [];
var todosHistoricos = JSON.parse(localStorage.getItem("historicos")) || [];
var sessao = document.getElementById("visualizarsecao").value;
var divs;
var intervalId;
var objetivo = localStorage.getItem("objetivo");
var obj = document.getElementById("obj");
var ses = document.getElementById("ses");
var nomeUsuario = document.getElementById("nom");
var nome = localStorage.getItem("nome");

var main = document.querySelector("main");

var header = document.getElementById("info");
if (objetivo === null) {
  objetivo = "Treino de Musculação";
  localStorage.setItem("objetivo", objetivo);
}

obj.innerHTML = `${objetivo}`;

nomeUsuario.innerHTML = `${nome}`;

function editar(index) {
  var mostrarEdit = document.querySelectorAll(".exercicio-editar");
  mostrarEdit[index].style.display = "block";
}
function Edicao(index) {
  var mostrarEdit = document.querySelectorAll(".exercicio-editar");
  mostrarEdit[index].style.display = "block";
}
function cancelar(index) {
  var cancelarEdit = document.querySelectorAll(".exercicio-editar");
  cancelarEdit[index].style.display = "none";
  location.reload();
}
function editarObjetivo() {
  document.getElementById("editarInfo").style.display = "block";
  document.getElementById("alterarObjetivo").value = obj.innerText;
  document.getElementById("alterarNome").value = nomeUsuario.innerText;

  var divs = document.querySelectorAll("main div.exercicio-editado");
  divs.forEach((div, index) => {
    div.querySelector('button[onclick^="editar"]').style.display = "block";
    div.querySelector('button[onclick^="apagar"]').style.display = "block";
  });
}

function cancelarObj() {
  document.getElementById("editarInfo").style.display = "none";
  location.reload();
}
function salvarEdicao() {
  var editarObj = document.getElementById("alterarObjetivo").value;
  var editarNome = document.getElementById("alterarNome").value;

  obj.innerText = editarObj;
  nomeUsuario.innerText = editarNome;

  document.getElementById("editarInfo").style.display = "none";

  localStorage.setItem("nome", editarNome);
  localStorage.setItem("objetivo", editarObj);
  location.reload();
}
function gerarPDF() {
  var element = document.querySelector("body");
  var ocultarElementos = document.querySelectorAll(
    "button, input, div.timer-tempo, div.video-container, div#contatos, select, fieldset, a"
  );

  ocultarElementos.forEach(function (elem) {
    elem.classList.add("ocultos");
  });

  html2pdf(element).then(function () {
    ocultarElementos.forEach(function (elem) {
      elem.classList.remove("ocultos");
    });
  });
}
var worker = new Worker("timerWorker.js");

worker.onmessage = function (e) {
  var index = e.data.index;
  var tempoRestante = e.data.tempoRestante;
  var timerElement = document.getElementById(`timer-${index}`);
  var buttonTimer = document.getElementById(`buttonTimer-${index}`);

  if (e.data.command === "update") {
    timerElement.innerHTML = formatarTempo(tempoRestante);
  } else if (e.data.command === "stop") {
    clearInterval(intervalId);
    timerElement.classList.remove("contador-vermelho");
    timerElement.classList.add("contador-verde");
    buttonTimer.style.display = "inline";
    timerElement.innerHTML = e.data.message;
  }
};

function iniciarContador(index) {
  var tempoTotal = parseInt(document.getElementById(`contador-${index}`).value);
  worker.postMessage({
    command: "start",
    index: index,
    tempoTotal: tempoTotal,
  });
}

function pararContador(index) {
  worker.postMessage({
    command: "stop",
    index: index,
    message: "Próxima Série",
  });
}

function finalizarExer(index) {
  worker.postMessage({ command: "stop", index: index, message: "Finalizado" });
}
function verVideo(index) {
  var divVerVideo = document.getElementById(`verVideo-${index}`);
  divVerVideo.style.display = "block";
  document.addEventListener("click", function (event) {
    if (
      !divVerVideo.contains(event.target) &&
      !event.target.matches(`[onclick="verVideo(${index})"]`)
    ) {
      divVerVideo.style.display = "none";
    }
  });
}
