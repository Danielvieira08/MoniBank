// ------ Importações de módulos --------------- //
import validaCPF from './valida-cpf.js';
import verificaIdade from './valida-idade.js';
// ------ Importações de módulos --------------- //

//responsável por selecionar todos os campos do formulário que possuem o atributo "required".
const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

//criar um função para armazenar os dados do formulário no localStorage
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio do formulário para evitar recarregar a página
    const listaResposta = {
        "nome": e.target.elements['nome'].value,
        "email": e.target.elements['email'].value,
        "rg": e.target.elements['rg'].value,
        "cpf": e.target.elements['cpf'].value,
        "aniversario": e.target.elements['aniversario'].value, 
        // A propriedade 'checked' é usada para verificar se a caixa de seleção dos termos foi marcada.
        // Se estiver marcada, o valor será true; caso contrário, será false.              
    }; 

    localStorage.setItem('cadastro', JSON.stringify(listaResposta)); // Armazena os dados do formulário no localStorage.
    window.location.href = './abrir-conta-form-2.html'; // Redireciona o usuário para a próxima página após o envio do formulário.
    // A função JSON.stringify converte o objeto listaResposta em uma string JSON para ser armazenada no localStorage.
    // O localStorage é uma forma de armazenar dados no navegador do usuário, permitindo que os dados persistam mesmo após o fechamento do navegador.
})

// Adiciona o evento de blur para cada campo do formulário
// O evento blur é acionado quando o campo perde o foco.
// Isso é útil para validar os campos quando o usuário termina de digitar.
camposDoFormulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo)); 
    campo.addEventListener('invalid', () => verificaCampo(campo));
    // O evento invalid é acionado quando o campo não atende às suas restrições de validação,
    // como o campo obrigatório ou o formato do CPF.
    // Isso permite que a função verificaCampo valide o campo e exiba mensagens de erro personalizadas, se necessário.
});

const tipoDeErros = [
    'valueMissing', // O campo obrigatório não foi preenchido
    'typeMismatch', // O tipo de dado não corresponde ao esperado (ex: email inválido)
    'patternMismatch', // O valor não corresponde ao padrão definido (ex: CPF inválido)
    'tooShort', // O valor é muito curto
    'customError' // Erro personalizado definido pelo desenvolvedor 
]
const mensagens = {
    // Mensagens de erro personalizadas para cada tipo de campo
    nome: {
            valueMissing: "O campo de nome não pode estar vazio.",
            patternMismatch: "Por favor, preencha um nome válido.",
            tooShort: "Por favor, preencha um nome válido."
        },
        email: {
            valueMissing: "O campo de e-mail não pode estar vazio.",
            typeMismatch: "Por favor, preencha um email válido.",
            tooShort: "Por favor, preencha um e-mail válido."
        },
        rg: {
            valueMissing: "O campo de RG não pode estar vazio.",
            patternMismatch: "Por favor, preencha um RG válido.",
            tooShort: "O campo de RG não tem caractéres suficientes."
        },
        cpf: {
            valueMissing: 'O campo de CPF não pode estar vazio.',
            patternMismatch: "Por favor, preencha um CPF válido.",
            customError: "O CPF digitado não existe.",
            tooShort: "O campo de CPF não tem caractéres suficientes."
        },
        aniversario: {
            valueMissing: 'O campo de data de nascimento não pode estar vazio.',
            customError: 'Você deve ser maior que 18 anos para se cadastrar.'
        },
        termos: {
            valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
        }
}

// Funcão para verificar os campos específicos. 
function verificaCampo(campo) {
    let mensagem = "";  
    campo.setCustomValidity(''); // Reseta a mensagem de erro personalizada antes de verificar o campo
    if (campo.name === 'cpf' && campo.value.length >= 11) {
        validaCPF(campo);//verifico se o campo é CPF e se tem pelo menos 11 caracteres.
    }
    if(campo.name === 'aniversario' && campo.value != '') {
        verificaIdade(campo);//verifico se o campo é aniversario se tem algum valor. 
    }
    tipoDeErros.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro'); 
    const validadorDeInput = campo.checkValidity(); // Verifica se o campo é válido. 

    if(!validadorDeInput) {
        mensagemErro.textContent = mensagem; // Se o campo não for válido, exibe a mensagem de erro.
    }else{
        mensagemErro.textContent = ""; // Se o campo for válido, limpa a mensagem de erro.
    }
}
