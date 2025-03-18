"use strict";
//*CRUD
//CREATE
//READ
//UPDATE
//DELETE
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
    if (jogo) {
        const div = document.getElementById("resultadoCarregarJogo");
        if (div) {
            div.textContent = "";
            const pId = document.createElement("p");
            pId.textContent = `ID: ${jogo.id}`;
            const pTitle = document.createElement("p");
            pTitle.textContent = `Título: ${jogo.title}`;
            const pPlayed = document.createElement("p");
            pPlayed.textContent = `Jogou: ${jogo.played ? "Sim" : "Não"}`;
            const pYear = document.createElement("p");
            pYear.textContent = `Ano: ${jogo.year}`;
            div === null || div === void 0 ? void 0 : div.appendChild(pId);
            div === null || div === void 0 ? void 0 : div.appendChild(pTitle);
            div === null || div === void 0 ? void 0 : div.appendChild(pPlayed);
            div === null || div === void 0 ? void 0 : div.appendChild(pYear);
            const modal = document.getElementById("myModal");
            if (modal) {
                modal.style.display = "block";
            }
        }
    }
}
const closeModalBtn = document.getElementById("closeModalBtn");
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
            jogo = null;
        }
    });
}
window.addEventListener("click", (event) => {
    const myModal = document.getElementById("myModal");
    if (myModal && event.target === myModal) {
        myModal.style.display = "none";
        jogo = null;
    }
    const modal = document.getElementById("modal");
    if (modal && event.target === modal) {
        modal.style.display = "none";
    }
});
carregarListaJogos().then(() => {
    if (listaJogos.length > 0) {
        criarListaJogos();
    }
});
//--------------------------------------------
// Seleciona os elementos do DOM
const openModalBtn = document.getElementById('openModalBtn');
//console.log(openModalBtn);
const closeModal = document.getElementById('closeModal');
//console.log(closeModal);
const modal = document.getElementById('modal');
//console.log(modal);
const form = document.getElementById('form');
//console.log(form);
// Função para abrir o modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = "block";
    //console.log("clicou");
});
// Função para fechar o modal
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});
// Função para lidar com o envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    if (!form.checkValidity()) {
        event.stopPropagation();
    }
    form.classList.add('was-validated');
    // Captura os valores dos campos
    //const nome = (document.getElementById('nome') as HTMLInputElement).value;
    //const ano = (document.getElementById('ano') as HTMLInputElement).value;
    const { nome, ano, jogado } = form;
    // Exibe os valores no console
    console.log('Nome:', nome.value);
    console.log('Ano:', ano.value);
    console.log('Jogado:', jogado.value);
    // Fecha o modal após o envio
    //modal.classList.remove('open');
});
