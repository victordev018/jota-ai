// script.js

// Seleções
const textInput = document.getElementById('userInput');
const imageInput = document.getElementById('imageInput');
const sendBtn = document.getElementById('sendBtn');
const messages = document.getElementById('messages');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

fetch('/api/welcome')
  .then(res => res.json())
  .then(data => addMessage(data.reply, 'bot'));

function sendData() {
  const message = textInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!message && !imageFile) return;

  // Desabilita o botão para evitar múltiplos envios
  sendBtn.disabled = true;

  // Se tiver mensagem, mostra no chat
  if (message) addMessage(message, 'user');
  if (imageFile) addMessage(`<img src="${URL.createObjectURL(imageFile)}" class="preview">`, 'user');

  // Remove preview da miniatura ao enviar
  clearImagePreview();

  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('message', message);

  // Mostra indicador de carregamento com os 3 pontinhos
  const loadingMsg = addLoadingIndicator();

  fetch('/api/chat', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      // Remove indicador de carregamento e adiciona resposta real
      loadingMsg.remove();
      addMessage(formatResponse(data.reply), 'bot');
    })
    .catch(() => {
      loadingMsg.remove();
      addMessage('Erro ao conectar.', 'bot');
    });

  // Limpa inputs
  textInput.value = '';
  imageInput.value = '';
  updateSendButtonState();
}

// Função para adicionar mensagem no chat
function addMessage(content, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.innerHTML = content;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
  return msg;
}

// Função para mostrar preview da imagem pequena ao lado do input texto
function updateImagePreview() {
  const file = imageInput.files[0];
  if (!file) {
    clearImagePreview();
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    imagePreviewContainer.innerHTML = `<img src="${reader.result}" class="thumbnail-preview" alt="Preview imagem">`;
  };
  reader.readAsDataURL(file);
}

// Limpa preview da imagem pequena
function clearImagePreview() {
  imagePreviewContainer.innerHTML = '';
}

// Animação dos 3 pontinhos enquanto aguarda resposta da IA
function addLoadingIndicator() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message bot loading';
  loadingDiv.innerHTML = `
    <span class="dot">.</span>
    <span class="dot">.</span>
    <span class="dot">.</span>
  `;
  messages.appendChild(loadingDiv);
  messages.scrollTop = messages.scrollHeight;
  return loadingDiv;
}

// Formata resposta para manter quebras e listas simples
function formatResponse(text) {
  return text
    .replace(/\n/g, '<br>')
    .replace(/\*\*\s*(.*?)\s*\*\*/g, '<strong>$1</strong>')
    .replace(/\*\s/g, '• ')
    .replace(/• (.*?)<br>/g, '<li>$1</li>')
    .replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
}

// Atualiza estado do botão enviar (habilitado/desabilitado)
function updateSendButtonState() {
  const hasText = textInput.value.trim().length > 0;
  const hasImage = imageInput.files.length > 0;
  sendBtn.disabled = !(hasText || hasImage);
}

// Eventos

// Atualiza preview ao selecionar imagem e atualiza botão enviar
imageInput.addEventListener('change', () => {
  updateImagePreview();
  updateSendButtonState();
});

// Atualiza botão enviar conforme digita no input texto
textInput.addEventListener('input', updateSendButtonState);

// Envia mensagem ao clicar no botão
sendBtn.addEventListener('click', sendData);

// Envia mensagem ao pressionar Enter no input texto
textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !sendBtn.disabled) {
    e.preventDefault(); // evita quebra de linha
    sendData();
  }
});
