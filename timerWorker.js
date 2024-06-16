let segundosRestantes;

onmessage = function (e) {
  if (e.data === "start") {
    segundosRestantes = e.segundos;
    countdown();
  }
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
