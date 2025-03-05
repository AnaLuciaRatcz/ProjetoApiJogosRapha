 


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

  carregarListaJogos().then(()=>{
    if(listaJogos.length > 0){
        criarListaJogos();
    }
  });

  




