
window.onload = function definirHeaderUsuario() {

    console.log("asd")

    const opcoesUsuarioStatus = document.getElementById('opcoes-usuario');
    let usuarioId = localStorage.getItem("userId");

    //FAZER O IF DO USUÁRIO ESTAR LOGADO OU NÃO

    //Se ESTIVER logado faça
    if (usuarioId != null) {

        opcoesUsuarioStatus.innerHTML = ``;
        opcoesUsuarioStatus.innerHTML = `
            <div class="icone-usuario">

                <ul class="navbar-header-buttons">
                    <li>
                <p> ${localStorage.getItem("userNome")} </p>
                    </li>
                    <li>
                <button class="btn-icone-usuario" title="Ver opções perfil"><div class='bx bx-user'></div></button>
                    </li>
                </ul>


            </div>
        `;

        menuFlutuanteCliente();

    } else { //Se NÃO ESTIVER logado faça
        opcoesUsuarioStatus.innerHTML = ``;
        opcoesUsuarioStatus.innerHTML = `
            <div>
                <ul class="navbar-header-buttons">
                    <li>
                        <button class="btn-entrar" onclick="window.location.href='./pages/login-paciente.html'">Entrar</button>
                    </li>
                    <li>
                        <button class="btn-cadastro" onclick="window.location.href='./pages/login-paciente.html'">Cadastre-se</button>
                    </li>
                </ul>
            </div>
        `;
    }



}


function menuFlutuanteCliente() {
    const iconeCliente = document.querySelector('.bx-user');
    const header = document.querySelector('.header');
    let menuAberto = false;
    let menuElement = null;

    iconeCliente.addEventListener('click', (event) => {
        event.stopPropagation();

        if (menuAberto) {
            menuElement.remove();
            menuAberto = false;
        } else {
            menuElement = document.createElement('div');
            menuElement.classList.add('opcoes-visualizacao-cliente');
            menuElement.innerHTML = `
                <ul>
                    <li class="nome-usuario">
                        <i class='bx bx-user'></i>
                        <p>Nome Usuário</p>
                    </li>
                    <li class="opcao-usuario" title="Meu Perfil" onclick="window.location.href = '../pages/perfil-usuario.html'">
                        <i class='bx bxs-user-detail'></i>
                        <p>Meu Perfil</p>
                    </li>
                    <li class="opcao-usuario" title="Sair" onclick="window.location.href = '../pages/login.html'">
                        <i class='bx bx-log-out'></i>
                        <p>Sair</p>
                    </li>
                </ul>
            `;
            header.appendChild(menuElement);
            menuAberto = true;
        }
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (event) => {
        if (menuAberto && !iconeCliente.contains(event.target) && !menuElement.contains(event.target)) {
            menuElement.remove();
            menuAberto = false;
        }
    });
}


