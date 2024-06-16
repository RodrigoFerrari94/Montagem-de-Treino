var segundosRestantes;

onmessage = function (e) {
  segundosRestantes = e.data.segundos;
  countdown();
};

function countdown() {
  setTimeout(() => {
    segundosRestantes--;
    postMessage(segundosRestantes);
    if (segundosRestantes > 0) {
      countdown();
    }
  }, 1000);
}
