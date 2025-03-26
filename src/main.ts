 //* CRUD
 //? CREATE
 //? READ
 //UPDATE
 //DELETE

  interface IJogo {
    id: string;
    played: boolean;
    title: string;
    year: number;
  }

  let listaJogos: IJogo[] = [];
  let jogo: IJogo | null = null;

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
   const resultado = await fetch(`http://localhost:3500/games/${id}`);
   const dados = await resultado.json() as IJogo;  
   console.log("carregou o jogo", dados);
   jogo = dados;
  }

  async function salvarJogo(jogo: IJogo) {
    if(jogo.id === ''){
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


  function criarListaJogos(){
   // console.log("chamou criar lista de jogos")
   const div = document.createElement("div");
   div.classList.add("list-group");// list-group é uma classe do bootstreap
   listaJogos.forEach((jogo)=>{
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.textContent = jogo.title;
    button.classList.add("list-group-item");// bootstreap
    button.addEventListener("click", async () => {
         await carregarJogo(jogo.id);
         abrirModal();
    });
    div.appendChild(button);
   });

    resultadoJogos?.appendChild(div);
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

            div?.appendChild(pId);
            div?.appendChild(pTitle);
            div?.appendChild(pPlayed);
            div?.appendChild(pYear);
            div?.appendChild(btnEdit);
    
            const modal = document.getElementById("myModal");
            if (modal) {
                modal.style.display = "block";
          
            }
        }
        
    }
   
}

function abrirModalEdit(){
  const modal = document.getElementById("modal-edit");
  if (modal) {
    modal.style.display = "block";
}
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
            jogo = null;
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
    const modalEdit = document.getElementById("modal-edit");
    if (modalEdit && event.target === modalEdit) {
        modalEdit.style.display = "none";
        jogo = null;
    }
});

  carregarListaJogos().then(()=>{
    if(listaJogos.length > 0){
        criarListaJogos();
    }
  });



  //--------------------------------------------
// Seleciona os elementos do DOM
const openModalBtn = document.getElementById('openModalBtn') as HTMLButtonElement;
//console.log(openModalBtn);
const closeModal = document.getElementById('closeModal') as HTMLButtonElement;
//console.log(closeModal);
const modal = document.getElementById('modal') as HTMLDivElement;
//console.log(modal);
const form = document.getElementById('form') as HTMLFormElement;
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

  // Captura os valores dos campos
  //const nome = (document.getElementById('nome') as HTMLInputElement).value;
  //const ano = (document.getElementById('ano') as HTMLInputElement).value;

  

  // Fecha o modal após o envio
  //modal.classList.remove('open');
});



  