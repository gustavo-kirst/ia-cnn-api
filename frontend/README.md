# Frontend - React Application

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Instalação

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

### Execução

Para iniciar o servidor de desenvolvimento:
```bash
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

### Build para Produção

Para criar uma build otimizada:
```bash
npm run build
```

Os arquivos compilados serão salvos em `frontend/build/`

## 📁 Estrutura de Pastas

```
frontend/
├── public/
│   └── index.html           # HTML base
├── src/
│   ├── components/
│   │   ├── ImageUploader.js     # Componente de upload
│   │   ├── ImageUploader.css    # Estilos do upload
│   │   ├── ResultsDisplay.js    # Componente de resultados
│   │   └── ResultsDisplay.css   # Estilos dos resultados
│   ├── App.js               # Componente principal
│   ├── App.css              # Estilos globais da app
│   ├── index.js             # Ponto de entrada
│   └── index.css            # Estilos globais
├── package.json             # Dependências do projeto
└── README.md                # Este arquivo
```

## 🔌 Integração com Backend

A aplicação se conecta ao backend (server.js) através do endpoint:
- **URL**: `http://localhost:3000/infer`
- **Método**: `POST`
- **Content-Type**: `multipart/form-data`
- **Campo**: `image` (arquivo da imagem)

**Certifique-se de que o backend está rodando em `http://localhost:3000`**

## 🎨 Funcionalidades

✅ Upload de imagens (arrastar e soltar ou selecionar)
✅ Pré-visualização da imagem selecionada
✅ Classificação de armas usando o modelo CNN
✅ Exibição de confiança da previsão em tempo real
✅ Listagem das 3 principais previsões
✅ Tratamento de erros com mensagens amigáveis
✅ Interface responsiva (mobile-friendly)

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktops
- Tablets
- Smartphones

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework JavaScript
- **Axios**: Cliente HTTP
- **CSS3**: Estilização (com animações e gradientes)
- **ES6+**: JavaScript moderno

## 🐛 Troubleshooting

### A aplicação não carrega
- Verifique se o Node.js está instalado: `node --version`
- Verifique se as dependências foram instaladas: `npm install`

### Erro ao conectar com o backend
- Verifique se o servidor (server.js) está rodando
- Verifique se está na porta 3000: `http://localhost:3000`
- Verifique CORS no backend (pode ser necessário adicionar middleware CORS)

### Erro ao enviar imagem
- Certifique-se de que é um arquivo de imagem válido
- Verifique o tamanho da imagem (recomendado < 5MB)
- Verifique os logs do console (F12) para mais detalhes

## 📞 Suporte

Para adicionar novas funcionalidades ou reportar bugs, consulte o README principal do projeto.
