// -------máscaras--------------
function aplicarMascaraEmail(campo) {
    campo.value = campo.value
        .replace(/[^a-zA-Z0-9@._-]/g, '') // Permite apenas letras, números, @, . e _
        .replace(/@{2,}/g, '@') // Remove duplicação de "@"
        .replace(/\.{2,}/g, '.') // Remove duplicação de "."
        .replace(/^(.*@.*)@/, '$1'); // Garante que só tenha um "@" no texto
}

function aplicarMascaraTelefone(campo) {
    campo.value = campo.value
        .replace(/\D/g, '') // Remove tudo que não é número
        .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses e espaço para o DDD
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o traço após 5 dígitos
        .slice(0, 15); // Limita a 15 caracteres
}

function aplicarMascaraCPF(campo) {
    campo.value = campo.value
        .replace(/\D/g, "")  // Remove tudo o que não é dígito
        .slice(0, 11)  // Limita a 11 dígitos
        .replace(/^(\d{3})(\d)/, "$1.$2")  // Coloca ponto entre o terceiro e o quarto dígitos
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")  // Coloca ponto entre o sexto e o sétimo dígitos
        .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2")  // Coloca um hífen entre o nono e o décimo dígitos
        .slice(0, 14);  // Limita a 14 caracteres (formatados)
}

function aplicarMascaraRG(campo) {
    campo.value = campo.value
        .replace(/\D/g, '') // Remove tudo o que não é número
        .replace(/^(\d{2})(\d)/, '$1.$2') // Coloca ponto após os primeiros 2 números
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Coloca ponto após os próximos 3 números
        .replace(/\.(\d{3})(\d)$/, '.$1-$2')
        .slice(0, 12); // Limita a 12 caracteres (com formatação)
}

function aplicarMascaraCNPJ(campo) {
    campo.value = campo.value.replace(/\D/g, "")                           //Remove tudo o que não é dígito
        .replace(/^(\d{2})(\d)/, "$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
        .replace(/\.(\d{3})(\d)/, ".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18)              //Coloca um hífen depois do bloco de quatro dígitos
}

function aplicarMascaraCEP(campo) {
    campo.value = campo.value
        .replace(/\D/g, '') // Remove tudo que não é número
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o traço
        .slice(0, 9); // Limita a 9 caracteres
}

function aplicarMascaraSenha(campo) {
    const feedback = {
        length: document.getElementById("length"),
        uppercase: document.getElementById("uppercase"),
        lowercase: document.getElementById("lowercase"),
        number: document.getElementById("number"),
        special: document.getElementById("special"),
    };
    const senha = campo.value;

    // Verificações de força
    const lengthValid = senha.length >= 8;
    const uppercaseValid = /[A-Z]/.test(senha);
    const lowercaseValid = /[a-z]/.test(senha);
    const numberValid = /[0-9]/.test(senha);
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    function updateFeedback(element, isValid) {
        if (isValid) {
            element.classList.remove("invalid");
            element.classList.add("valid");
        } else {
            element.classList.remove("valid");
            element.classList.add("invalid");
        }
    }

    // Atualizar classes
    updateFeedback(feedback.length, lengthValid);
    updateFeedback(feedback.uppercase, uppercaseValid);
    updateFeedback(feedback.lowercase, lowercaseValid);
    updateFeedback(feedback.number, numberValid);
    updateFeedback(feedback.special, specialValid);

    // Verificar se todos os critérios foram atendidos
    const allValid = lengthValid && uppercaseValid && lowercaseValid && numberValid && specialValid;

    return allValid; // Retorna true se todos os critérios forem atendidos, caso contrário false
}

function validarSenha(senha2, senha) {
    const verificar = () => {
        if (senha2.value !== senha.value) {
            mostrarErro(senha2, 'Senha não correspondente!');
            return false;
        } else {
            limparErro(senha2);
            return true;
        }
    };
    senha.addEventListener('input', verificar);

    // Retorna o estado atual (útil se chamado diretamente)
    return verificar();
}


function aplicarMascaraURL(campo) {
    campo.value = campo.value
        .replace(/[^a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=%]/g, '') // Permite apenas caracteres válidos para URLs
        .replace(/^(?!https?:\/\/)/, 'https://'); // Adiciona https:// se não estiver presente
}

// --------------validação--------------

function validarNome(nome) {
    if (nome.value) {
        return true
    } else {
        return false
    }
}

function validarEmail(email) {
    // Remove espaços extras
    email = email.trim();

    // Verifica se o email está vazio
    if (!email) {
        return false;
    }

    // Define o padrão para um email válido usando regex
    const padraoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Verifica se o email segue o padrão
    return padraoEmail.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 números e não é um CPF "falso" (como 111.111.111-11)
    if (cpf.length !== 11 || /^(\d)\1*$/.test(cpf)) {
        return false;
    }

    // Validação do primeiro dígito
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verifica se o CNPJ tem 14 números e não é um CNPJ "falso"
    if (cnpj.length !== 14 || /^(\d)\1*$/.test(cnpj)) {
        return false;
    }

    // Validação do primeiro dígito
    let soma = 0;
    let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) soma += parseInt(cnpj.charAt(i)) * peso[i];
    let resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;
    if (resto !== parseInt(cnpj.charAt(12))) return false;

    // Validação do segundo dígito
    soma = 0;
    peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 13; i++) soma += parseInt(cnpj.charAt(i)) * peso[i];
    resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;
    return resto === parseInt(cnpj.charAt(13));
}

function validarDataNascimento(campo) {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const dataNascimento = new Date(campo.value);

    // Verifica se a data de nascimento é válida
    if (campo.value === '') {
        mostrarErro(campo, 'Data de nascimento é obrigatória.');
        return false;
    }

    if (isNaN(dataNascimento.getTime())) {
        mostrarErro(campo, 'Data de nascimento inválida.');
        return false;
    }

    const anoNascimento = dataNascimento.getFullYear();

    // Verifica se a data de nascimento está dentro dos limites aceitáveis
    if (anoNascimento < 1700 || anoNascimento > 3000) {
        mostrarErro(campo, 'O ano de nascimento deve estar entre 1700 e 3000.');
        return false;
    }

    // Verifica se a data de nascimento não é no futuro
    if (dataNascimento > hoje) {
        mostrarErro(campo, 'A data de nascimento não pode estar no futuro.');
        return false;
    }

    limparErro(campo);
    return true;
}

function validarRadio() {
    const radius = document.querySelectorAll('input[name="sexo"]');

    const algumSelecionado = Array.from(radius).some(radio => radio.checked);

    radius.forEach(radio => {
        radio.addEventListener('change', validarRadio); // Executa a validação sempre que um rádio é selecionado
    });

    if (algumSelecionado) {
        let error = document.querySelector('.error')
        error.classList.remove('is-invalid')
        error.textContent = ' '
        radius.forEach(radio => {
            radio.classList.remove('is-invalid')
        })
        return true
    } else {
        radius.forEach(radio => {
            radio.classList.add('is-invalid')
            radio.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        let error = document.querySelector('.error')
        error.classList.add('is-invalid')
        error.textContent = 'Por favor selecione uma opção'
        return false
    }
}

function verificarImagem(inputFile) {
    const arquivo = inputFile.files[0]; // Pega o primeiro arquivo carregado
    if (!arquivo) {
        return false
    } else {
        return true;
    }
}

document.getElementById("foto").addEventListener("change", function () {
    verificarImagem(this);
});



function mostrarErro(campo, mensagem) {
    campo.classList.add('is-invalid')
    campo.classList.add('input-error')
    campo.nextElementSibling.textContent = mensagem;
}

function limparErro(campo) {
    campo.classList.remove('is-invalid');
    campo.classList.remove('input-error')
    campo.nextElementSibling.textContent = '';
}

function resetFeedback() {
    const feedbackElements = document.querySelectorAll(".valid, .invalid");
    feedbackElements.forEach((element) => {
        element.classList.remove("valid"); // Remove a classe de válido
        element.classList.add("invalid"); // Adiciona a classe de inválido
    });
}



document.getElementById('email').addEventListener('input', function () {
    aplicarMascaraEmail(this)
})

document.getElementById('tel').addEventListener('input', function () {
    aplicarMascaraTelefone(this)
})

document.getElementById('cpf').addEventListener('input', function () {
    aplicarMascaraCPF(this)
})

document.getElementById('rg').addEventListener('input', function () {
    aplicarMascaraRG(this)
})

document.getElementById('cep').addEventListener('input', function () {
    aplicarMascaraCEP(this)
})

document.getElementById('cnpj').addEventListener('input', function () {
    aplicarMascaraCNPJ(this)
})

document.getElementById('url').addEventListener('input', function () {
    aplicarMascaraURL(this)
})

document.getElementById('senha').addEventListener("input", function () {
    aplicarMascaraSenha(this)
});


document.getElementById('senha2').addEventListener("input", function () {
    validarSenha(this, document.getElementById('senha'))
});


document.getElementById('nascimento').addEventListener('change', function () {
    validarDataNascimento(this);
})

document.getElementById('foto').addEventListener('change', function () {
    limparErro(this);
})

document.getElementById('check').addEventListener('change', function () {
    limparErro(this);
})


// -----------blur----------
document.getElementById('nome').addEventListener('blur', function () {
    if (!validarNome(this)) {
        mostrarErro(this, 'Preencha esse campo.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }

});

document.getElementById('email').addEventListener('blur', function () {
    if (!validarEmail(this.value)) {
        mostrarErro(this, 'Email inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }

});

document.getElementById('tel').addEventListener('blur', function () {
    if (this.value.length < 10) {
        mostrarErro(this, 'Telefone inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }
});

document.getElementById('cpf').addEventListener('blur', function () {
    if (!validarCPF(this.value)) {
        mostrarErro(this, 'CPF inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }
});
document.getElementById('cnpj').addEventListener('blur', function () {
    if (!validarCNPJ(this.value)) {
        mostrarErro(this, 'CNPJ inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }

});

document.getElementById('rg').addEventListener('blur', function () {
    if (!validarNome(this)) {
        mostrarErro(this, 'RG inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }

});

document.getElementById('cep').addEventListener('blur', function () {
    if (cep.value.length < 9) {
        mostrarErro(this, 'CEP inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }

});

document.getElementById('endereco').addEventListener('blur', function () {
    if (!validarNome(this)) {
        mostrarErro(this, 'Endereço inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }
});

document.getElementById('estado').addEventListener('blur', function () {
    if (!validarNome(this)) {
        mostrarErro(this, 'Estado inválido.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }
});

document.getElementById('url').addEventListener('blur', function () {
    if (!validarNome(this)) {
        mostrarErro(this, 'URL inválida.');
        valido = false;
    } else {
        valido = true;
        limparErro(this);
    }
});


document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();
    valido = true;

    const nome = document.getElementById('nome');
    if (!validarNome(nome)) {
        mostrarErro(nome, 'Preencha esse campo.');
        nome.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(nome);
    }

    const email = document.getElementById('email');
    if (!validarEmail(email.value)) {
        mostrarErro(email, 'Email inválido.');
        email.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(email);
    }


    // Validação CPF
    const cpf = document.getElementById('cpf');
    if (!validarCPF(cpf.value)) {
        mostrarErro(cpf, 'CPF inválido.');
        cpf.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(cpf);
    }

    // Validação CNPJ
    const cnpj = document.getElementById('cnpj');
    if (!validarCNPJ(cnpj.value)) {
        mostrarErro(cnpj, 'CNPJ inválido.');
        cnpj.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(cnpj);
    }

    // Validação telefone
    const telefone = document.getElementById('tel');
    if (telefone.value.length < 10) {
        mostrarErro(telefone, 'Telefone inválido.');
        telefone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(telefone);
    }

    // Validação CEP
    const cep = document.getElementById('cep');
    if (cep.value.length < 9) {
        mostrarErro(cep, 'CEP inválido.');
        cep.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(cep);
    }

    const rg = document.getElementById('rg');
    if (!validarNome(rg)) {
        mostrarErro(rg, 'RG inválido.');
        rg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(rg);
    }

    // Validação data de nascimento
    const dataNascimento = document.getElementById('nascimento');
    if (!validarDataNascimento(dataNascimento)) {
        dataNascimento.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    }


    const endereco = document.getElementById('endereco');
    if (!validarNome(endereco)) {
        mostrarErro(endereco, 'Preencha esse campo.');
        endereco.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(endereco);
    }

    !validarRadio() ? valido = false : ''


    const senha = document.getElementById('senha');
    if (!aplicarMascaraSenha(senha)) {
        senha.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
    }

    const senha2 = document.getElementById('senha2');
    if (!validarSenha(senha2, senha)) {
        mostrarErro(senha2, 'Senha não correspondente!');
        senha2.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(senha2);
    }

    const estado = document.getElementById('estado');
    if (!validarNome(estado)) {
        mostrarErro(estado, 'Preencha esse campo');
        estado.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(estado);
    }

    const url = document.getElementById('url');
    if (!validarNome(url)) {
        mostrarErro(url, 'Insira uma URL');
        url.scrollIntoView({ behavior: 'smooth', block: 'center' });
        valido = false;
    } else {
        limparErro(url);
    }

    const foto = document.getElementById('foto');
    if (!verificarImagem(foto)) {
        mostrarErro(foto, "Nenhuma imagem enviada.");
        valido = false;
    } else {
        limparErro(foto);
    }
    const check = document.getElementById('check');
    if (!check.checked) {
        mostrarErro(check, 'Obrigatório');
        valido = false;
    } else {
        limparErro(check);
    }
    if (valido) {
        document.getElementById('formulario').reset()
        resetFeedback()

        document.querySelector('.load').style.display = 'block';
        document.querySelector('.btn-text').style.display = 'none';
        setTimeout(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                title: "Cadastro realizado com sucesso!",
                width: '405px'
            });
            document.querySelector('.load').style.display = 'none';
            document.querySelector('.btn-text').style.display = 'block'
        }, 1000);
    } else {
        document.querySelector('.btn-text').style.display = 'none';
        document.querySelector('.load').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.load').style.display = 'none';
            document.querySelector('.btn-text').style.display = 'block';
        }, 1000);
    }
});