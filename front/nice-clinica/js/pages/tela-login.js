const tituloContainerLogin = document.querySelector('.titulo-container-login');
const btnFormLogin = document.getElementById('btn-form-login');
const btnFormCadastro = document.getElementById('btn-form-cadastro');
const formulario = document.getElementById('formulario');

function criarElemento(tag, atributos = {}, texto = '') {
    const elemento = document.createElement(tag);
    Object.entries(atributos).forEach(([chave, valor]) => {
        elemento.setAttribute(chave, valor);
    });
    if (texto) elemento.textContent = texto;
    return elemento;
}

function atualizarFormulario(tipo) {
    formulario.innerHTML = '';

    if (tipo === 'login') {
        tituloContainerLogin.textContent = "Entre com a sua conta";

        // Email
        formulario.appendChild(criarElemento('label', { for: 'input-email' }, 'E-mail'));
        formulario.appendChild(criarElemento('input', {
            type: 'email',
            name: 'input-email',
            id: 'input-email',
            placeholder: 'exemplo@dominio.com',
            required: 'yes'
        }));

        // Senha
        formulario.appendChild(criarElemento('label', { for: 'input-senha' }, 'Senha'));
        formulario.appendChild(criarElemento('input', {
            type: 'password',
            name: 'input-senha',
            id: 'input-senha',
            placeholder: '********',
            required: 'yes'
        }));

        // Botão de login
        const btnLogin = criarElemento('button', {
            type: 'submit',
            class: 'btn-formulario',
            id: 'btn-login'
        }, 'Entrar');
        formulario.appendChild(btnLogin);

        btnLogin.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('input-email').value;
            const senha = document.getElementById('input-senha').value;

            fetch('http://localhost:8080/paciente/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.id) {
                    localStorage.setItem('userId', data.id);
                    localStorage.setItem('userNome', data.nome);
                    localStorage.setItem('userRole', data.role);

                    window.location.href = "/nice-clinica/index.html";
                } else {
                    alert("Login inválido, tente novamente")
                }
            })
            .catch(error => console.error('Erro no login:', error));
        });

        btnFormLogin.classList.add('ativo');
        btnFormCadastro.classList.remove('ativo');

    } else {  // cadastro
        tituloContainerLogin.textContent = "Crie a sua conta";

        // Nome
        formulario.appendChild(criarElemento('label', { for: 'input-nome' }, 'Nome'));
        formulario.appendChild(criarElemento('input', {
            type: 'text',
            name: 'input-nome',
            id: 'input-nome',
            placeholder: 'Seu nome completo',
            required: 'yes'
        }));

        // CPF
        formulario.appendChild(criarElemento('label', { for: 'input-cpf' }, 'CPF'));
        formulario.appendChild(criarElemento('input', {
            type: 'text',
            name: 'input-cpf',
            id: 'input-cpf',
            placeholder: '000.000.000-00',
            required: 'yes'
        }));

        // Endereço
        formulario.appendChild(criarElemento('label', { for: 'input-endereco' }, 'Endereço'));
        formulario.appendChild(criarElemento('input', {
            type: 'text',
            name: 'input-endereco',
            id: 'input-endereco',
            placeholder: 'Rua, número, bairro',
            required: 'yes'
        }));

        // Telefone
        formulario.appendChild(criarElemento('label', { for: 'input-telefone' }, 'Telefone'));
        formulario.appendChild(criarElemento('input', {
            type: 'tel',
            name: 'input-telefone',
            id: 'input-telefone',
            placeholder: '(00) 00000-0000',
            required: 'yes'
        }));

        // Email
        formulario.appendChild(criarElemento('label', { for: 'input-email' }, 'E-mail'));
        formulario.appendChild(criarElemento('input', {
            type: 'email',
            name: 'input-email',
            id: 'input-email',
            placeholder: 'exemplo@dominio.com',
            required: 'yes'
        }));

// Senha
formulario.appendChild(criarElemento('label', { for: 'input-senha' }, 'Senha'));
formulario.appendChild(criarElemento('input', {
    type: 'password',
    name: 'input-senha',
    id: 'input-senha',
    placeholder: '********',
    required: 'yes'
}));

// **Confirmar Senha**
formulario.appendChild(criarElemento('label', { for: 'input-senha-confirmacao' }, 'Confirme a senha'));
formulario.appendChild(criarElemento('input', {
    type: 'password',
    name: 'input-senha-confirmacao',
    id: 'input-senha-confirmacao',
    placeholder: '********',
    required: 'yes'
}));

// Botão de cadastro
const btnRegistro = criarElemento('button', {
    type: 'submit',
    class: 'btn-formulario',
    id: 'btn-registro'
}, 'Cadastrar');
formulario.appendChild(btnRegistro);

btnRegistro.addEventListener('click', (event) => {
    event.preventDefault();
    const nome = document.getElementById('input-nome').value;
    const cpf = document.getElementById('input-cpf').value;
    const endereco = document.getElementById('input-endereco').value;
    const telefone = document.getElementById('input-telefone').value;
    const email = document.getElementById('input-email').value;
    const senha = document.getElementById('input-senha').value;
    const senhaConfirmacao = document.getElementById('input-senha-confirmacao').value;

    // Validação: senhas devem coincidir
    if (senha !== senhaConfirmacao) {
        alert('As senhas não conferem. Por favor, verifique.');
        return;
    }

    fetch('http://localhost:8080/paciente/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, cpf, endereco, telefone, email, senha })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.id) {
            console.log("asdasddsa")
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userNome', data.nome);
            localStorage.setItem('userRole', data.role);

            window.location.href = "/nice-clinica/index.html";
        } else {
            alert("Não foi possível realizar o cadastro")
        }
    })
    .catch(error => console.error('Erro no cadastro:', error));
});

        btnFormCadastro.classList.add('ativo');
        btnFormLogin.classList.remove('ativo');
    }
}

btnFormLogin.addEventListener('click', () => atualizarFormulario('login'));
btnFormCadastro.addEventListener('click', () => atualizarFormulario('cadastro'));

document.addEventListener("DOMContentLoaded", () => {
    atualizarFormulario('login');
});
