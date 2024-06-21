function visualizarTreino() {
  switch (document.getElementById("visualizarsecao").value) {
    case "a":
      window.location.href = "treinoA.html";

      break;
    case "b":
      window.location.href = "treinoB.html";
      break;
    case "c":
      window.location.href = "treinoC.html";
      break;
    case "d":
      window.location.href = "treinoD.html";
      break;

    case "e":
      window.location.href = "treinoE.html";
      break;

    case "f":
      window.location.href = "treinoF.html";
      break;
  }
}
function visualizarTreinoOculto() {
  switch (document.getElementById("visualizarsecaoOculto").value) {
    case "A":
      window.location.href = "treinoA.html";

      break;
    case "B":
      window.location.href = "treinoB.html";
      break;
    case "C":
      window.location.href = "treinoC.html";
      break;
    case "D":
      window.location.href = "treinoD.html";
      break;

    case "E":
      window.location.href = "treinoE.html";
      break;

    case "F":
      window.location.href = "treinoF.html";
      break;
  }
}
function pushInHistorico() {
  if (document.getElementById("objetivo").value === "percentual") {
    todosHistoricos.push(
      `<div class="historic"><h1>${exercicio}</h1> <h3> ${nome}</h3><p>1RM ≈ <strong>${formulaGeral} KG</strong></p> <p> Repeticões: ${rm} </p> <p> Carga: ${
        carga - barra - percentualPeso
      }Kg</p> <p>Carga Total: ≈ ${carga}Kg</p> <p> Barra ou Equipamentos: ${barra}Kg.</p> <p> Peso Corporal: ${peso}KG</p><p>${percmin}% e ${percmax}% da carga: Entre ${cargaMinima}kg e ${cargaMax}kg</p></div>`
    );
  } else {
    let selecionado = document.getElementById("objetivo");
    let TextoDaOpcaoelecionada =
      selecionado.options[selecionado.selectedIndex].innerText;
    todosHistoricos.push(
      `<div class="historic"><h1>${exercicio}</h1> <h3> ${nome}</h3><p>1RM ≈ <strong>${formulaGeral} KG</strong></p> <p> Repeticões: ${rm} </p> <p> Carga: ${
        carga - barra - percentualPeso
      }Kg</p> <p>Carga Total: ≈ ${carga}Kg</p> <p> Barra ou Equipamentos: ${barra}Kg.</p> <p> Peso Corporal: ${peso}KG</p><p>Carga para ${TextoDaOpcaoelecionada}: Entre ${cargaMinima}kg e ${cargaMax}kg</p></div>`
    );
  }

  localStorage.setItem("historicos", JSON.stringify(todosHistoricos));
}
function gerarHistorico() {
  historico.innerHTML = "";
  todosHistoricos.forEach((item, index) => {
    historico.innerHTML += item;
    historico.innerHTML += `<button onclick="excluirItem(${index})">Excluir</button>`;
  });
}

function excluirItem(index) {
  todosHistoricos.splice(index, 1);
  localStorage.setItem("historicos", JSON.stringify(todosHistoricos));
  gerarHistorico();
}
function ocultar() {
  historico.innerHTML = "";
}
