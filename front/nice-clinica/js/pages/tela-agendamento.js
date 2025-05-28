// confirmarAgendamento.js

document.addEventListener("DOMContentLoaded", () => {
    const calendario = document.getElementById("calendario");
    const mesAno = document.getElementById("mesAno");
    const btnAnterior = document.getElementById("mesAnterior");
    const btnProximo = document.getElementById("mesProximo");
    const containerHorarios = document.getElementById("horariosDisponiveis");
    const dataConsultaSelecionada = document.getElementById("data-consulta");
    const btnConfirmar = document.getElementById("btnConfirmar");

    let dataAtual = new Date();

    let dataSelecionada = "";
    let horarioSelecionado = "";

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const { diasDisponiveis, horariosPorDia } = gerarDatasEHorariosDisponiveis(3);

    function renderizarCalendario() {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();

        calendario.innerHTML = "";
        containerHorarios.innerHTML = "";
        mesAno.textContent = `${nomesMeses[mes]} de ${ano}`;

        const primeiroDia = new Date(ano, mes, 1).getDay();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        for (let i = 0; i < primeiroDia; i++) {
            calendario.appendChild(document.createElement("div"));
        }

        for (let dia = 1; dia <= diasNoMes; dia++) {
            const divDia = document.createElement("div");
            divDia.classList.add("dia");
            divDia.textContent = dia;

            const dataObj = new Date(ano, mes, dia);
            const dataFormatada = dataObj.toISOString().split("T")[0];
            const disponivel = diasDisponiveis.includes(dataFormatada);

            if (!disponivel) {
                divDia.classList.add("indisponivel");
                divDia.style.pointerEvents = "none";
                divDia.style.opacity = "0.4";
            } else {
                divDia.addEventListener("click", () => {

                    document.querySelectorAll(".dia")
                        .forEach(d => d.classList.remove("selecionado"));
                    divDia.classList.add("selecionado");

                    mostrarHorarios(dataFormatada);
                });
            }

            calendario.appendChild(divDia);
        }
    }

    function mostrarHorarios(data) {
        containerHorarios.innerHTML = "";
        const horarios = horariosPorDia[data] || [];

        if (horarios.length === 0) {
            containerHorarios.textContent = "Nenhum horário disponível.";
            return;
        }

        horarios.forEach(horario => {
            const botao = document.createElement("button");
            botao.textContent = horario;
            botao.addEventListener("click", () => {

                document.querySelectorAll("#horariosDisponiveis button")
                    .forEach(b => b.classList.remove("selecionado"));
                botao.classList.add("selecionado");

                dataSelecionada = data;
                horarioSelecionado = horario;

                const [ano, mes, dia] = data.split("-");
                const dataBR = `${dia}/${mes}/${ano}`;
                dataConsultaSelecionada.textContent = `Data: ${dataBR} às ${horario}`;
            });

            containerHorarios.appendChild(botao);
        });
    }

    btnAnterior.addEventListener("click", () => {
        const hoje = new Date();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        if (dataAtual.getMonth() === mesAtual && dataAtual.getFullYear() === anoAtual)
            return;

        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario();
    });

    btnProximo.addEventListener("click", () => {
        const hoje = new Date();
        const mesLimite = hoje.getMonth() + 2;
        const anoLimite = hoje.getFullYear();

        if (dataAtual.getMonth() === mesLimite && dataAtual.getFullYear() === anoLimite)
            return;

        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario();
    });

    btnConfirmar.addEventListener("click", () => {
        if (dataSelecionada && horarioSelecionado) {

            agendarAtendimento(toCorrectFormat(dataSelecionada, horarioSelecionado))


        } else {
            console.log("Nenhuma data e horário selecionados.");
        }
    });

    renderizarCalendario();
    carregarDadosMedico()
});

function gerarDatasEHorariosDisponiveis(qtdMeses = 2) {
    const diasDisponiveis = [];
    const horariosPorDia = {};
    const possiveis = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

    const hoje = new Date();
    let dataAtual = new Date(hoje);
    let mesContador = 0;

    while (mesContador < qtdMeses) {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        const uteis = [];
        for (let d = 1; d <= diasNoMes; d++) {
            const dt = new Date(ano, mes, d);
            if (mesContador === 0 && dt < hoje) continue;
            const wk = dt.getDay();
            if (wk !== 0 && wk !== 6) uteis.push(dt);
        }

        for (let i = uteis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [uteis[i], uteis[j]] = [uteis[j], uteis[i]];
        }
        const selecionados = uteis.slice(0, 6);

        selecionados.forEach(dt => {
            const key = dt.toISOString().split("T")[0];
            diasDisponiveis.push(key);

            const copia = [...possiveis];
            const sort = [];
            const qt = Math.floor(Math.random() * 3) + 2;
            for (let k = 0; k < qt; k++) {
                const idx = Math.floor(Math.random() * copia.length);
                sort.push(copia.splice(idx, 1)[0]);
            }
            horariosPorDia[key] = sort;
        });

        dataAtual = new Date(ano, mes + 1, 1);
        mesContador++;
    }

    return { diasDisponiveis, horariosPorDia };
}

async function carregarDadosMedico() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        console.error('ID do médico não encontrado na URL.');
        return;
    }

    try {

        const response = await fetch(`http://localhost:8080/medico/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do médico');
        }

        const medico = await response.json();

        document.querySelector('.card-especialidade .especialidade').textContent = medico.especialidade;
        document.querySelector('.card-especialidade .nome-medico').textContent = medico.nome;
        document.querySelector('.card-especialidade .crm').textContent = `CRM: ${medico.crm}`;
        document.querySelector('.card-especialidade .valor').textContent = `R$ ${medico.valorConsulta.toFixed(2)}`;

        const resumo = document.querySelector('.resumo-agendamento');
        resumo.querySelector('.especialidade').textContent = `Especialidade: ${medico.especialidade}`;
        resumo.querySelector('.nome-medico').textContent = `Médico(a): ${medico.nome}`;
        resumo.querySelector('.crm').textContent = `CRM: ${medico.crm}`;
        resumo.querySelector('.email').textContent = `E-mail: ${medico.email}`;
        resumo.querySelector('.valor').textContent = `Valor: R$ ${medico.valorConsulta.toFixed(2)}`;

    } catch (error) {
        console.error('Erro ao carregar dados do médico:', error);
    }
}

async function agendarAtendimento(dateISO) {

    const params = new URLSearchParams(window.location.search);
    const idMedico = params.get('id');
    if (!idMedico) {
        console.error('ID do médico não encontrado na URL.');
        return;
    }

    //console.log(dateISO)

    console.log(dateISO)

    const letras = ['A', 'B', 'C', 'D'];
    const letra = letras[Math.floor(Math.random() * letras.length)];
    const numero = Math.floor(Math.random() * 400) + 100;
    const sala = `${letra}${numero}`;

    const dadosAgendamento = {
        idPaciente: localStorage.getItem("userId"),
        idMedico: Number(idMedico),
        date: dateISO,
        sala: sala
    };

    console.log(dadosAgendamento)

    try {

        const response = await fetch('http://localhost:8080/atendimento/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAgendamento)
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        alert('Sua consulta com o doutor(a) "' + data.nomeMedico + '" foi agendada com sucesso, para dia ' + data.date + ' na sala "' + data.sala + '"');
        window.location.href = "../index.html";
        return data;

    } catch (error) {
        console.error('Falha ao agendar atendimento:', error);
    }
}

document.getElementById('btnConfirmar').addEventListener('click', () => {

  //  const data = toCorrectFormat(dataSelecionada, horarioSelecionado)
  //  console.log(data)

  //  agendarAtendimento(data);

});


function toCorrectFormat(dateStr, timeStr) {

    return dateStr + "T" + timeStr;
}



