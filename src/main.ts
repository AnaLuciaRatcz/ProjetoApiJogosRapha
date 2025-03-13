 //*CRUD
 //CREAT
 //READ
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
            div?.appendChild(pId);
            div?.appendChild(pTitle);
            div?.appendChild(pPlayed);
            div?.appendChild(pYear);
    
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
    const modal = document.getElementById("myModal");
    if (modal && event.target === modal) {
        modal.style.display = "none";
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
  modal.classList.add('open');
  console.log("clicou");
});


// Função para fechar o modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('open');
});

// Função para lidar com o envio do formulário
form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura os valores dos campos
  const nome = (document.getElementById('nome') as HTMLInputElement).value;
  const ano = (document.getElementById('ano') as HTMLInputElement).value;

  // Exibe os valores no console
  console.log('Nome:', nome);
  console.log('Ano:', ano);

  // Fecha o modal após o envio
  modal.classList.remove('open');
});



  