
const lista = document.querySelector('.lista-especialidades');
const btnBuscar = document.getElementById('btn-buscar');
const inputPesquisa = document.getElementById('input-pesquisa');


if (localStorage.getItem('userRole') === 'ROLE_ADMIN') {
  console.log(localStorage.getItem('userRole'))

    const opcoesServicos = document.getElementById('opcoes-servicos');

    const novaOpcao = document.createElement('div');
    novaOpcao.className = 'opcao-servico';
    novaOpcao.innerHTML = `
        <a href="./pages/cadastro-medico.html">
            <i class='bx bx-user-plus'></i>
            <p>Adicionar médico</p>
        </a>
    `;

    opcoesServicos.appendChild(novaOpcao);
}



fetch('http://localhost:8080/medico/disponiveis')
    .then(resp => {
        if (!resp.ok) {
            throw new Error('Erro na rede ao buscar médicos: ' + resp.statusText);
        }
        return resp.json();
    })
    .then(medicos => {
        lista.innerHTML = '';

        if (medicos.length === 0) {
          lista.innerHTML = '<li>Nenhum médico encontrado.</li>';
          return;
        }

        medicos.forEach(medico => {
          const li = document.createElement('li');

          li.innerHTML = `
            <div class="card-especialidade">
              <i class='bx bx-first-aid'></i>
                <p class="especialidade"><strong>${medico.especialidade || ''}</strong></p>
              <p class="nome">${medico.nome}</p>
              <p class="crm">${medico.crm}</p>
              <p class="valor">
                ${medico.valorConsulta.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
              <button class="btn-visualizar-especialidade">
                <p>Agendar</p>
                <i class='bx bx-right-arrow-alt'></i>
              </button>
            </div>
          `;

          lista.appendChild(li);

          li.querySelector('.btn-visualizar-especialidade')
            .addEventListener('click', () => {
              console.log('ID do médico:', medico.id);
              window.location.href = `./pages/tela-agendamento.html?id=${medico.id}`;

            });
        });
      })
    .catch(err => {
        console.error(err);
        lista.innerHTML = '<li>Não foi possível carregar a lista de médicos.</li>';
    });

    btnBuscar.addEventListener('click', () => {

        console.log(inputPesquisa.value.trim() == "")
    
        fetch(`http://localhost:8080/medico/disponiveis/${encodeURIComponent(inputPesquisa.value.trim() == "" ? "null" : inputPesquisa.value.trim())}`)
          .then(resp => {
            if (!resp.ok) {
              throw new Error('Erro na busca: ' + resp.statusText);
            }
            return resp.json();
          })
          .then(medicos => {
            lista.innerHTML = '';
    
            if (medicos.length === 0) {
              lista.innerHTML = '<li>Nenhum médico encontrado.</li>';
              return;
            }
    
            medicos.forEach(medico => {
              const li = document.createElement('li');
    
              li.innerHTML = `
                <div class="card-especialidade">
                  <i class='bx bx-first-aid'></i>
                    <p class="especialidade"><strong>${medico.especialidade || ''}</strong></p>
                  <p class="nome">${medico.nome}</p>
                  <p class="crm">${medico.crm}</p>
                  <p class="valor">
                    ${medico.valorConsulta.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                  <button class="btn-visualizar-especialidade">
                    <p>Agendar</p>
                    <i class='bx bx-right-arrow-alt'></i>
                  </button>
                </div>
              `;
    
              lista.appendChild(li);
    
              li.querySelector('.btn-visualizar-especialidade')
                .addEventListener('click', () => {
                    window.location.href = `./pages/tela-agendamento.html?id=${medico.id}`;

                  console.log('ID do médico:', medico.id);
                });
            });
          })
          .catch(err => {
            console.error(err);
            lista.innerHTML = '<li>Nenhum resultado encontrado.</li>';
          });
      });

