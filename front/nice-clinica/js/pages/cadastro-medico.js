document.addEventListener('DOMContentLoaded', () => {

    console.log("asddas")

    const formulario = document.getElementById('formulario');
  
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Recupera valores dos inputs
      const nome = document.getElementById('input-nome').value.trim();
      const crm = document.getElementById('input-crm').value.trim();
      const especialidade = document.getElementById('input-especialidade').value.trim();
      const telefone = document.getElementById('input-telefone').value.trim();
      const email = document.getElementById('input-email').value.trim();
      const senha = "vou tirar a senha"
      const valorConsultaRaw = document.getElementById('input-valor-consulta').value;
      const valorConsulta = parseFloat(valorConsultaRaw);
  
      // Monta o payload
      const payload = {
        nome,
        crm,
        especialidade,
        telefone,
        email,
        senha,
        valorConsulta
      };
  
      try {
        const response = await fetch('http://localhost:8080/medico/cadastrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Status ${response.status}: ${errorText}`);
        }
  
        const data = await response.json();
        console.log('Médico cadastrado:', data);
        alert('Cadastro realizado com sucesso!');
        window.location.href = "../index.html";
        formulario.reset();
      } catch (err) {
        console.error('Erro ao cadastrar médico:', err);
        alert('Ocorreu um erro ao cadastrar. Veja console para detalhes.');
      }
    });
  });
  