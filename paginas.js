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
    `button, input, div.timer-tempo, div.video-container, select, fieldset, a`
  );

  ocultarElementos.forEach(function (elem) {
    elem.classList.add("oculto");
  });

  html2pdf(element).then(function () {
    ocultarElementos.forEach(function (elem) {
      elem.classList.remove("oculto");
    });
  });
}
function iniciarContador(index) {
  var buttonTimer = document.getElementById(`buttonTimer-${index}`);
  buttonTimer.style.display = "none";
  var timerElement = document.getElementById(`timer-${index}`);
  var tempoTotal = parseInt(document.getElementById(`contador-${index}`).value);
  var tempoRestante = tempoTotal;

  timerElement.innerHTML = formatarTempo(tempoRestante);
  timerElement.classList.remove("contador-verde");
  timerElement.classList.add("contador-vermelho");

  intervalId = setInterval(function () {
    tempoRestante--;

    if (tempoRestante <= 0) {
      clearInterval(intervalId);
      timerElement.classList.remove("contador-vermelho");
      timerElement.classList.add("contador-verde");
      buttonTimer.style.display = "inline";
      timerElement.innerHTML = "Próxima Série";
    } else {
      timerElement.innerHTML = formatarTempo(tempoRestante);
    }
  }, 1000);
}
function stopContador(index) {
  clearInterval(intervalId);
  var timerElement = document.getElementById(`timer-${index}`);
  var buttonTimer = document.getElementById(`buttonTimer-${index}`);
  timerElement.classList.remove("contador-vermelho");
  timerElement.classList.add("contador-verde");
  buttonTimer.style.display = "inline";
  timerElement.innerHTML = "Próxima Série";
}
function finalizarExer(index) {
  clearInterval(intervalId);
  var timerElement = document.getElementById(`timer-${index}`);
  var buttonTimer = document.getElementById(`buttonTimer-${index}`);
  timerElement.classList.remove("contador-verde");
  timerElement.classList.add("contador-vermelho");
  buttonTimer.style.display = "inline";
  timerElement.innerHTML = "Finalizado";
}

function formatarTempo(segundos) {
  var minutos = Math.floor((segundos % 3600) / 60);
  var segundosRestantes = segundos % 60;
  return `${minutos.toString().padStart(2, "0")}:${segundosRestantes
    .toString()
    .padStart(2, "0")}`;
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
