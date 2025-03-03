
    fetch("http://localhost:3500/games")
    .then(resp => resp.json())
    .then(resp => console.log("resposta lista", resp));

    fetch("http://localhost:3500/games/1")
    .then(resp => resp.json())
    .then(resp => console.log("resposta jogo", resp));

    const jogosForm = document.querySelector("#jogos");
    const dadosJogosForm = document.querySelector("#dados-jogos")
    const jogosButton = document.querySelector("#jogos-btn");
    const superMarioButton = document.querySelector("#superMario");
    const zeldaButton = document.querySelector("#zelda");
    const resultadoJogos = document.querySelector("#resultadoBuscaJogos");
    const resultadoSuperMario = document.querySelector("#resultadoSuperMario");
    const resultadoZelda = document.querySelector("#resultadoZelda");
    //console.log(resultadoZelda);



    
    
    function toggleVisibility() {
    
        if (dadosJogosForm.style.display === 'none') {
            dadosJogosForm.style.display = 'block'; // Mostra o elemento
        } else {
            dadosJogosForm.display = 'none'; // Esconde o elemento
        }
    }











    superMarioButton.addEventListener('click', async () => {
        resultadoSuperMario.textContent = 'Carregando...';
        try {
          const resposta = await fetch("http://localhost:3500/games");
          const dados = await resposta.json();
          resultadoSuperMario.innerHTML = '';
          dados.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `Título: ${item.title}`;
            resultadoDiv.appendChild(itemDiv);
          });
        } catch (erro) {
          console.error('Erro ao carregar dados:', erro);
          resultadoDiv.textContent = 'Erro ao carregar dados. Tente novamente.';
        }
      });
    