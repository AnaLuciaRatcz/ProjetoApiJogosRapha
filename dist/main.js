"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let listaJogos = [];
let jogo = null;
const resultadoJogos = document.querySelector("#resultadoBuscaJogos");
function carregarListaJogos() {
    return __awaiter(this, void 0, void 0, function* () {
        const resposta = yield fetch("http://localhost:3500/games");
        const dados = yield resposta.json();
        listaJogos = dados;
        console.log("lista de jogos", listaJogos);
    });
}
function carregarJogo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const resultado = yield fetch(`http://localhost:3500/games/${id}`);
        const dados = yield resultado.json();
        console.log("carregou o jogo", dados);
        jogo = dados;
    });
}
function criarListaJogos() {
    // console.log("chamou criar lista de jogos")
    const div = document.createElement("div");
    div.classList.add("list-group"); // list-group é uma classe do bootstreap
    listaJogos.forEach((jogo) => {
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.textContent = jogo.title;
        button.classList.add("list-group-item"); // bootstreap
        button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            yield carregarJogo(jogo.id);
            abrirModal();
        }));
        div.appendChild(button);
    });
    resultadoJogos === null || resultadoJogos === void 0 ? void 0 : resultadoJogos.appendChild(div);
}
function abrirModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "block";
    }
}
const closeModalBtn = document.getElementById("closeModalBtn");
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
        }
    });
}
window.addEventListener("click", (event) => {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
carregarListaJogos().then(() => {
    if (listaJogos.length > 0) {
        criarListaJogos();
    }
});
