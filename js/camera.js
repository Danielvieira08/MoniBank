//----------Selecionando os campos do HTML DOM ----------
const botaoIniciarCamera = document.querySelector('[data-video-botao]');
const campoCamera = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');
const botaoTirarFoto = document.querySelector('[data-tirar-foto]');
const canvas = document.querySelector('[data-video-canvas]');
const mensagem = document.querySelector('[data-mensagem]');
const botaoEnviarFoto = document.querySelector('[data-enviar]');
//----------Selecionando os campos do HTML DOM ----------

//----------Variáveis para armazenar a URL da imagem capturada----------
let imagemURL = ''; 

//----------Adicionando o evento de click no botão iniciar camera----------
// Essa função é responsável por iniciar a câmera do usuário e exibir o vídeo na tela.
// Ela utiliza a API "getUserMedia" para acessar a câmera e o microfone do usuário.
// Quando o botão é clicado, a câmera é iniciada e o vídeo é exibido
// no elemento <video> do HTML. O botão de iniciar câmera é ocultado e o
// campo de câmera é exibido.
botaoIniciarCamera.addEventListener('click', async function () {
    // Solicita acesso à câmera do usuário, Video: true significa que queremos vídeo,
    // audio: false significa que não queremos áudio.
    const iniciarVideo = await navigator.mediaDevices
    .getUserMedia({ video: true, audio: false}); 

    // Verifica se o usuário concedeu permissão para acessar a câmera.
    botaoIniciarCamera.style.display = 'none'; 
    

    campoCamera.style.display = 'block'; // Exibe o campo da câmera na tela.
    // Atribui o fluxo de vídeo obtido à fonte do elemento <video>.
    // Isso faz com que o vídeo da câmera seja exibido no elemento <video>.

    video.srcObject = iniciarVideo; // Define o fluxo de vídeo no elemento <video>

}) 

botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg'); // Converte o conteúdo do canvas em uma URL de imagem JPEG.

    campoCamera.style.display = 'none'; // Oculta o campo da câmera.
    mensagem.style.display = 'block'; // Exibe a mensagem de sucesso.
})

//----------Adicionando o evento de click no botão enviar foto----------
botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem('cadastro'); 
    const converteRetorno = JSON.parse(receberDadosExistentes) || {}; // Converte os dados existentes em um objeto ou cria um objeto vazio se não houver dados. 
    
    converteRetorno.imagem = imagemURL; // Adiciona a URL da imagem capturada ao objeto de dados.
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno)); // Armazena os dados atualizados no localStorage como uma string JSON.

    window.location.href = '../pages/abrir-conta-form-3.html'; // Redireciona o usuário para a próxima página do formulário.
    // A URL da imagem capturada é armazenada no localStorage para ser usada posteriormente.
})