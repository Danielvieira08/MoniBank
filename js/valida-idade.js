export default function ehMaiordeIdade(campo) {
    const dataNascimento = new Date(campo.value); 
    const maiorDeIdade = validaIdade(dataNascimento); 

    if(!maiorDeIdade) { // VERIFICA SE A PESSOA É MAIOR DE IDADE
        // Se não for maior de idade, define uma mensagem de erro personalizada
        // Isso impede o envio do formulário até que a idade seja verificada.
        // O método setCustomValidity() é usado para definir uma mensagem de erro personalizada
        // que será exibida quando o formulário for enviado.
        campo.setCustomValidity('Você deve ser maior de idade para se cadastrar');
        //console.log('Você deve ser maior de idade para se cadastrar');  
    }else {
        campo.setCustomValidity(''); // Reseta a mensagem de erro se a idade for válida
        console.log('Você é maior de idade');
    }
}
// -------------------- EXPLICANDO A FUNÇÃO -------------------- //
// Essa função verifica se a data de nascimento corresponde a uma pessoa maior de idade
// Ela recebe um objeto Date e compara com a data atual para determinar se a pessoa tem pelo menos 18 anos.
// Se a data de nascimento for válida, retorna true se a pessoa for maior de idade,
// caso contrário, retorna false.
// A função utiliza o método getFullYear() para obter o ano da data de nascimento e
// calcula a idade subtraindo o ano atual pelo ano de nascimento.
// Ela também leva em consideração o mês e o dia para garantir que a pessoa já tenha completado 18 anos no ano atual.
// Se a data de nascimento for inválida, a função retorna false.
// -------------------- EXPLICANDO A FUNÇÃO -------------------- //


function validaIdade(data) {
    const dataAtual = new Date(); 
    const dataMais18 = new Date(data.getFullYear() + 18, data.getMonth(), data.getDate());
    return dataAtual >= dataMais18; // Retorna true se a data atual for maior ou igual à data de 18 anos após a data de nascimento
}
