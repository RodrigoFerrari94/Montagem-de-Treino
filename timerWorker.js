var intervalId;

self.onmessage = function (e) {
  var index = e.data.index;
  var tempoTotal, tempoRestante;

  if (e.data.command === "start") {
    clearInterval(intervalId);
    tempoTotal = e.data.tempoTotal;
    tempoRestante = tempoTotal;

    intervalId = setInterval(function () {
      tempoRestante--;
      self.postMessage({
        command: "update",
        index: index,
        tempoRestante: tempoRestante,
      });

      if (tempoRestante <= 0) {
        clearInterval(intervalId);
        self.postMessage({
          command: "stop",
          index: index,
          message: "Próxima Série",
        });
      }
    }, 1000);
  } else if (e.data.command === "stop") {
    clearInterval(intervalId);
    self.postMessage({
      command: "stop",
      index: index,
      message: e.data.message,
    });
  }
};
