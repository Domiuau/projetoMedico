let paciente = null;

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("ID do usuário não encontrado no localStorage.");
    return;
  }

  try {
    const resp = await fetch(`http://localhost:8080/paciente/${userId}`);
    if (!resp.ok) throw new Error(`Erro ao buscar dados: ${resp.status}`);
    paciente = await resp.json();

    document.getElementById("input-nome").value = paciente.nome || "";
    document.getElementById("input-endereco").value = paciente.endereco || "";
    document.getElementById("input-telefone").value = paciente.telefone || "";
    document.getElementById("input-email").value = paciente.email || "";
  } catch (err) {
    console.error("Erro ao carregar dados do paciente:", err);
  }
});

document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId    = Number(localStorage.getItem("userId"));
  const nome      = document.getElementById("input-nome").value.trim();
  const endereco  = document.getElementById("input-endereco").value.trim();
  const telefone  = document.getElementById("input-telefone").value.trim();
  const email     = document.getElementById("input-email").value.trim();
  const senhaNaoConfirmada     = document.getElementById("input-senha").value.trim();
  const confirma  = document.getElementById("input-senha-confirmacao").value.trim();
  const senha =  (senhaNaoConfirmada == "" ? paciente.senha : senhaNaoConfirmada)
  console.log(paciente.senha)
  console.log("senha " + senha)

  const dadosPaciente = {
    id: userId,
    nome,
    endereco,
    telefone,
    email,
    senha
  };

  if (senhaNaoConfirmada || confirma) {
    if (senha != confirma) {
        alert("As senhas devem ser iguais!")
        return
    } 
  }

  try {
    const resp = await fetch("http://localhost:8080/paciente/atualizar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosPaciente)
    });
    if (!resp.ok) throw new Error(`Erro ao atualizar: ${resp.status}`);
    const resultado = await resp.json();
    alert("Cadastro atualizado com sucesso!");
    console.log("Resposta da API:", resultado);
    localStorage.setItem('userId', resultado.id);
    localStorage.setItem('userNome', resultado.nome);
    localStorage.setItem('userRole', resultado.role);
  } catch (err) {
    console.error("Falha ao atualizar paciente:", err);
    alert("Não foi possível atualizar. Tente novamente.");
  }
});

document.getElementById("btn-deslogar").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "/nice-clinica/index.html";
});
