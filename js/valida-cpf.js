export default function validaCPF(campo) {
    // Remove caracteres não numéricos (caso venha com pontos ou traço)
    const cpf = campo.value.replace(/\D/g, ''); // remove tudo que não é dígito numérico
    if(validarNumerosRepetidos(cpf) || validarPrimeiroDigito(cpf) || validarSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse CPF não é válido.'); // Define uma mensagem de erro personalizada
    }
}

function validarNumerosRepetidos(cpf) {
    
    const numerosRepetidos = [
        '00000000000', '11111111111', '22222222222', '33333333333',
        '44444444444', '55555555555', '66666666666', '77777777777',
        '88888888888', '99999999999'
    ];

    return numerosRepetidos.includes(cpf); // vai verificar se o CPF é um dos números repetidos
    // Se for, retorna true, indicando que o CPF é inválido.
}

function validarPrimeiroDigito(cpf) {
    // ------- 1º dígito verificador -------
    let soma = 0; 
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--; 
    }
    
    soma = (soma * 10) % 11;

    if(soma === 10 || soma === 11) {
        soma = 0;
    }
    return soma != cpf[9];

} 

function validarSegundoDigito(cpf) {
    // ------- 2º dígito verificador -------
    let soma = 0; 
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--; 
    }
    
    soma = (soma * 10) % 11;

    if(soma === 10 || soma === 11) {
        soma = 0;
    }
    return soma != cpf[10];
}

