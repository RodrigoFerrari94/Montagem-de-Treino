let tempoRestante = 0;
let intervalId;

self.onmessage = function (e) {
  if (e.data === "start") {
    intervalId = setInterval(() => {
      tempoRestante--;
      postMessage(tempoRestante);
      if (tempoRestante <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  } else if (e.data === "setTime") {
    tempoRestante = e.tempoTotal;
  }
};
