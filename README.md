
# 📚 Assistente de Chatbot com Gemini API — **jotaAI**

## 📖 Descrição do Projeto

Este projeto consiste na implementação de um assistente de chatbot, desenvolvido como parte da disciplina de **Inteligência Artificial** ministrada pelo professor **Otilio Paulo** no **Instituto Federal de Educação, Ciência e Tecnologia do Piauí**.

O chatbot, batizado de **jotaAI**, foi projetado para oferecer uma interface simples e amigável, e sua principal funcionalidade é consumir a **API do Google Gemini** para gerar respostas. Ele é capaz de processar e responder a mensagens de **texto** e **imagens**, sempre em **português brasileiro**, de forma **clara, simpática e objetiva**.

---

## 🎯 Funcionalidades

- ✅ **Interface Amigável**: Design intuitivo para facilitar a interação do usuário.
- ✅ **Integração com Gemini API**: Utiliza a API do Google Gemini para respostas dinâmicas e inteligentes.
- ✅ **Suporte a Múltiplos Formatos**: Capacidade de responder a entradas de **texto** e **imagem**.
- ✅ **Personalidade Definida**: O jotaAI responde sempre em **português brasileiro**, de forma **clara, simpática e objetiva**, e descreve o conteúdo de imagens em português.

---

## ⚙️ Como Configurar e Rodar o Projeto

### 📋 Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js — geralmente já vem com o Node.js)

---

### 📦 Instalação das Dependências

Clone este repositório:

```bash
git clone https://github.com/victordev018/jota-ai.git
```

Navegue até o diretório do projeto:

```bash
cd jota-ai
```

Instale as dependências:

```bash
npm install
```

---

### 🔐 Configuração da API Key do Gemini

1. Obtenha sua **API Key do Google Gemini**.
2. Crie um arquivo chamado `.env` na raiz do projeto.
3. Dentro do arquivo `.env`, adicione a sua chave da seguinte forma:

```env
GEMINI_API_KEY=SUA_CHAVE_AQUI
```

Lembre-se de substituir `SUA_CHAVE_AQUI` pela sua chave real da API Gemini.

---

### ▶️ Como Rodar

Execute o servidor Node.js:

```bash
npm run start
```


O terminal indicará que o **jotaAI** está online.

Abra seu navegador e acesse:

```
http://localhost:3000
```

---

## 🧪 Como Testar

Após iniciar o servidor e acessar `http://localhost:3000` no navegador:

- **Teste com Mensagens de Texto**:  
  Digite perguntas ou frases na caixa de texto e clique em **"Enviar"** (ou no botão correspondente).

- **Teste com Imagens**:  
  Utilize o campo de upload de arquivo para selecionar uma imagem. Você pode enviar a imagem sozinha ou adicionar um prompt de texto junto para ver como o **jotaAI** descreve e responde.
