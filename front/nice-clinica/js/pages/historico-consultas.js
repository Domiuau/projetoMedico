document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('#tabela-historico-consultas tbody');

    // Formata a string ISO para DD/MM/YYYY
    function formatDate(isoString) {
      const d = new Date(isoString);
      const day   = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year  = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    fetch('http://localhost:8080/atendimento/paciente/passado/' + localStorage.getItem("userId"))
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Limpa linhas antigas (se quiser substituir tudo)
        tbody.innerHTML = '';

        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.classList.add('consulta-agendada');
          
            tr.innerHTML = `
              <td class="data-consulta">${formatDate(item.date)}</td>
              <td class="especialidade-consulta">${item.especialidade}</td>
              <td class="nome-medico">${item.nomeMedico}</td>
              <td class="sala-consulta">${item.sala}</td>
              <td class="acoes-consulta">
                <button class="btn-detalhes" data-id="${item.id}">
                  <p>Ver Detalhes</p>
                  <i class="bx bx-right-arrow-alt"></i>
                </button>
              </td>
            `;
          
            // Adiciona o botão na tabela
            tbody.appendChild(tr);
          
            // Adiciona o evento diretamente ao botão recém-criado
            const botaoDetalhes = tr.querySelector('.btn-detalhes');
            botaoDetalhes.addEventListener('click', () => {
              alert('ID do atendimento:' + item.id);
            });
          });
      })
      .catch(err => {
        console.error(err);
        // Você pode também mostrar uma mensagem de erro na UI
      });
  });