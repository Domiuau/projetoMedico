document.addEventListener('DOMContentLoaded', () => {
    const tbodyAgendadas = document.querySelector('.tabela-consultas-agendadas tbody');

    function formatDate(isoString) {
        const d = new Date(isoString);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    fetch('http://localhost:8080/atendimento/paciente/futuro/' + localStorage.getItem("userId"))
        .then(res => {
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            return res.json();
        })
        .then(data => {
            tbodyAgendadas.innerHTML = ''; // limpa linhas antigas

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
              <button class="btn-cancelar-consulta" data-id="${item.id}">
                <p>Cancelar Consulta</p>
                <i class="bx bx-trash"></i>
              </button>
            </td>
          `;

                tbodyAgendadas.appendChild(tr);

                tr.querySelector('.btn-detalhes')
                    .addEventListener('click', () => {
                        alert('ID do atendimento:' + item.id);
                    });

                tr.querySelector('.btn-cancelar-consulta')
                    .addEventListener('click', () => {
                        cancelarConsulta(item.id)
                    });
            });
        })
        .catch(err => console.error(err));
});



function cancelarConsulta(id) {
    
    fetch(`http://localhost:8080/atendimento/cancelar/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao deletar consulta com ID ${id}: ${response.status}`);
      }
      
      alert("Consulta cancelada com sucesso!")
      location.reload();

    })
    .catch(error => {
      console.error('Erro ao cancelar a consulta:', error);
    });
  }
  