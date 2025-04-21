document.addEventListener("DOMContentLoaded", () => {
    const calendario = document.getElementById("calendario");
    const mesAno = document.getElementById("mesAno");
    const btnAnterior = document.getElementById("mesAnterior");
    const btnProximo = document.getElementById("mesProximo");
    const containerHorarios = document.getElementById("horariosDisponiveis");
    const dataConsultaSelecionada = document.getElementById('data-consulta');

    let dataAtual = new Date();

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
            const vazio = document.createElement("div");
            calendario.appendChild(vazio);
        }

        for (let dia = 1; dia <= diasNoMes; dia++) {
            const divDia = document.createElement("div");
            divDia.classList.add("dia");
            divDia.textContent = dia;

            const dataCompleta = new Date(ano, mes, dia);
            const dataFormatada = dataCompleta.toISOString().split("T")[0];

            const disponivel = diasDisponiveis.includes(dataFormatada);
            if (!disponivel) {
                divDia.classList.add("indisponivel");
                divDia.style.pointerEvents = "none";
                divDia.style.opacity = "0.4";
            } else {
                divDia.addEventListener("click", () => {
                    document.querySelectorAll(".dia").forEach(d => d.classList.remove("selecionado"));
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
                document.querySelectorAll("#horariosDisponiveis button").forEach(btn => btn.classList.remove("selecionado"));
                botao.classList.add("selecionado");
                console.log(`Selecionado: ${data} às ${horario}`);

                const [ano, mes, dia] = data.split("-");
                const dataFormatadaBR = `${dia}/${mes}/${ano}`;
                dataConsultaSelecionada.innerHTML = `Data: ${dataFormatadaBR} às ${horario}`;
            });

            containerHorarios.appendChild(botao);
        });
    }

    btnAnterior.addEventListener("click", () => {
        const hoje = new Date();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        if (dataAtual.getMonth() === mesAtual && dataAtual.getFullYear() === anoAtual) return;

        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario();
    });

    btnProximo.addEventListener("click", () => {
        const hoje = new Date();
        const mesLimite = hoje.getMonth() + 2;
        const anoLimite = hoje.getFullYear();

        if (dataAtual.getMonth() === mesLimite && dataAtual.getFullYear() === anoLimite) return;

        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario();
    });

    renderizarCalendario();
});

function gerarDatasEHorariosDisponiveis(qtdMeses = 2) {
    const diasDisponiveis = [];
    const horariosPorDia = {};
    const horariosPossiveis = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

    const hoje = new Date();
    let dataAtual = new Date(hoje);
    let mesContador = 0;

    while (mesContador < qtdMeses) {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        const diasNoMes = new Date(ano, mes + 1, 0).getDate();

        const diasUteis = [];

        for (let dia = 1; dia <= diasNoMes; dia++) {
            const data = new Date(ano, mes, dia);
            if (mesContador === 0 && data < hoje) continue;

            const diaSemana = data.getDay();
            if (diaSemana !== 0 && diaSemana !== 6) {
                diasUteis.push(data);
            }
        }

        // Embaralha os dias úteis
        for (let i = diasUteis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [diasUteis[i], diasUteis[j]] = [diasUteis[j], diasUteis[i]];
        }

        // Seleciona até 6 dias úteis aleatórios
        const diasSelecionados = diasUteis.slice(0, 6);

        diasSelecionados.forEach(data => {
            const dataFormatada = data.toISOString().split("T")[0];

            // Horários para cada dia disponível
            const quantidadeHorarios = Math.floor(Math.random() * 3) + 2; // entre 2 e 4 horários
            const copiaHorarios = [...horariosPossiveis];
            const horariosSorteados = [];

            for (let i = 0; i < quantidadeHorarios; i++) {
                const idx = Math.floor(Math.random() * copiaHorarios.length);
                horariosSorteados.push(copiaHorarios.splice(idx, 1)[0]);
            }

            diasDisponiveis.push(dataFormatada);
            horariosPorDia[dataFormatada] = horariosSorteados;
        });

        dataAtual = new Date(ano, mes + 1, 1);
        mesContador++;
    }

    return { diasDisponiveis, horariosPorDia };
}
