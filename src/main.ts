 //* CRUD
 //? CREATE {método POST} - não passa valores pela URL, mas sim pelo body
 //? READ {método GET} - busca dados, não altera nada
 //? UPDATE {método PUT} - altera os dados, mas não cria novos, passa dados pela URL e pelo body
 ///? PATCH {método PATCH} - '' (igual o PUT) pode mudar só um dado***
 //? DELETE {método DELETE} - deleta os dados, passa dados pela URL e não pelo body

  interface IJogo {
    id: string;
    played: boolean;
    title: string;
    year: number;
  }

  let listaJogos: IJogo[] = []; // inicia com array vazio
  let jogo: IJogo | null = null; // ou é um jogo ou é nulo

  const resultadoJogos = document.querySelector("#resultadoBuscaJogos");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const closeModalEditBtn = document.getElementById("closeModalEdit");

  async function carregarListaJogos(){
   const resposta = await fetch("http://localhost:3500/games");
   const dados = await resposta.json() as IJogo[];
   listaJogos = dados;

    console.log("lista de jogos", listaJogos);
  }

  async function carregarJogo(id:string) {
   const resultado = await fetch (`http://localhost:3500/games/${id}`);
   const dados = await resultado.json() as IJogo;  
   console.log("carregou o jogo", dados);
   jogo = dados;
  }

  async function salvarJogo(jogo: IJogo) {
    if(jogo.id === ''){ //jogo zerado não tem id, backend vai criar o id
      const resposta = await fetch("http://localhost:3500/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: jogo.title,
          played: jogo.played,
          year: jogo.year,
        }),
      });
      const dados = await resposta.json();
      console.log("salvou o jogo", dados);
    }
  }

  async function alterarJogo(jogo: IJogo) {
    if(jogo.id !== ''){ // o id tem que ser diferente de nada, obrigatório ter um id
      const resposta = await fetch(`http://localhost:3500/games/${jogo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: jogo.title,
          played: jogo.played,
          year: jogo.year,
        }),
      });
      const dados = await resposta.json();
      console.log("alterou o jogo", dados);
    }
  }

  async function excluirJogo(id: string) {
    if(id !== ''){ // precisa ter um id
      const resposta = await fetch(`http://localhost:3500/games/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dados = await resposta.json();
      console.log("excluiu o jogo", dados);
    }
  }

  function criarListaJogos(){
   // console.log("chamou criar lista de jogos")
   const div = document.createElement("div"); //cria uma div para guardar a lista de jogos
   div.classList.add("list-group");// list-group é uma classe do bootstreap
   listaJogos.forEach((jogo)=>{ //passar por cada jogo criado
    const button = document.createElement("button"); //cria um botão
    button.setAttribute("type", "button"); //tipagem do botão
    button.textContent = jogo.title;//texto do botão
    button.classList.add("list-group-item");// bootstreap adicionou classe
    button.addEventListener("click", async () => { //função de carregar o jogo
         await carregarJogo(jogo.id);
         abrirModal(); //abrir o modal
    });
    div.appendChild(button); //adiciona o botao na div criada acima na linha 88
   });

    resultadoJogos?.appendChild(div);//recebe a div criada na linha 88
  }

  function abrirModal() {
    if(jogo){
        const div = document.getElementById("resultadoCarregarJogo");
        if(div){
            div.textContent = "";
            const pId = document.createElement("p");
            pId.textContent = `ID: ${jogo.id}`;
            const pTitle = document.createElement("p");
            pTitle.textContent = `Título: ${jogo.title}`;
            const pPlayed = document.createElement("p");
            pPlayed.textContent = `Jogou: ${jogo.played ? "Sim" : "Não"}`;
            const pYear = document.createElement("p");
            pYear.textContent = `Ano: ${jogo.year}`;
            const btnEdit = document.createElement("button");
            btnEdit.textContent = "Editar";
            btnEdit.setAttribute("type", "button");
            btnEdit.classList.add("btn", "btn-primary");
            btnEdit.onclick = function(){
              abrirModalEdit();
              if(closeModalBtn){
                closeModalBtn.click();
              }
              
            };
            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Excluir";
            btnDelete.setAttribute("type", "button");
            btnDelete.classList.add("btn", "btn-danger");
            btnDelete.onclick = function(){
              if(confirm("Tem certeza que deseja excluir este jogo?")){
                excluirJogo(jogo!.id);
                if(closeModalBtn){
                  closeModalBtn.click();
                }
              }
            };

            div?.appendChild(pId); //adicionando cada elemento criado na div
            div?.appendChild(pTitle);
            div?.appendChild(pPlayed);
            div?.appendChild(pYear);
            div?.appendChild(btnEdit);
            div?.appendChild(btnDelete);
    
            const modal = document.getElementById("myModal");
            if (modal) {
                modal.style.display = "block"; //block significa exiba como um bloco
            }
        }   
    }   
}

function abrirModalEdit(){
  const modal = document.getElementById("modal-edit");
  if (modal) {
    modal.style.display = "block";
}
  if(jogo){
    const formEdit = document.getElementById("formEdit") as HTMLFormElement;
    if(formEdit){
      formEdit.reset();
      const {idEdit, nome, ano, jogado} = formEdit;
      idEdit.value = jogo.id;
      nome.value = jogo.title;
      ano.value = jogo.year;
      jogado.value = jogo.played ? "Sim" : "Não";
    }
  }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none"; //esconder o modal
            jogo = null; //limpar a variavel do jogo
        }
    });
}

if(closeModalEditBtn){
  closeModalEditBtn.addEventListener("click", () => {
    const modal = document.getElementById("modal-edit");
    if (modal) {
        modal.style.display = "none";
        jogo = null;
    }
});
}

window.addEventListener("click", (event) => { //variavel que corresponde a nossa janela, fechar o modal se clicar na janela
    const myModal = document.getElementById("myModal");
    if (myModal && event.target === myModal) {
        myModal.style.display = "none";
        jogo = null;
    }
    const modal = document.getElementById("modal");
    if (modal && event.target === modal) {
        modal.style.display = "none";    
    }
    const modalEdit = document.getElementById("modal-edit");
    if (modalEdit && event.target === modalEdit) {
        modalEdit.style.display = "none";
        jogo = null;
    }
});

  carregarListaJogos().then(()=>{//se existe ao menos um jogo a lista vai ser criada
    if(listaJogos.length > 0){
        criarListaJogos();
    }
  });

// Seleciona os elementos do DOM
const openModalBtn = document.getElementById('openModalBtn') as HTMLButtonElement;
//console.log(openModalBtn);
const closeModal = document.getElementById('closeModal') as HTMLButtonElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const form = document.getElementById('form') as HTMLFormElement;
//console.log(form);
const formEdit = document.getElementById('formEdit') as HTMLFormElement;

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
form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault(); // Impede o envio padrão do formulário
  if (!form.checkValidity()) {
    event.stopPropagation();
    console.log("Formulário inváido.");
  }else{
    console.log("Formulário válido.");

    const{nome, ano, jogado} = form;

  // Exibe os valores no console
  console.log('Nome:', nome.value);
  console.log('Ano:', ano.value);
  console.log('Jogado:', jogado.value);

  salvarJogo({
    id: '', 
    title: nome.value,
    year: Number(ano.value),
    played: jogado.value === "Sim" ? true : false,
  })
  }
  form.classList.add('was-validated');
});

// Função para lidar com o envio do formulário de edição
formEdit.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault(); // Impede o envio padrão do formulário
  if (!formEdit.checkValidity()) {
    event.stopPropagation();
    console.log("Formulário inváido.");
  }else{
    console.log("Formulário válido.");

    const{ idEdit, nome, ano, jogado} = formEdit;

  // Exibe os valores no console
  console.log('Id:', idEdit.value);
  console.log('Nome:', nome.value);
  console.log('Ano:', ano.value);
  console.log('Jogado:', jogado.value);

  alterarJogo({
    id: idEdit.value, 
    title: nome.value,
    year: Number(ano.value),
    played: jogado.value === "Sim" ? true : false,
  })
  }

  formEdit.classList.add('was-validated');
});


  