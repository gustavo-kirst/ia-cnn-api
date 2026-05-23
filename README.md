# 🎮 CNN Classificador de Armas R6S - API + Frontend

Classificador de armas do Rainbow Six Siege usando CNN com PyTorch, Backend Node.js e Frontend React temático.

---

## 📋 Características

- ✅ **Backend API**: Node.js + Express (Modo Demo e Produção)
- ✅ **Frontend**: React 18 com tema R6S profissional (escuro + vermelho)
- ✅ **Modelo Treinado**: CNN com 5 blocos convolucionais (~80-90% acurácia esperada)
- ✅ **20 Classes**: Todas as armas do R6S Siege
- ✅ **Drag & Drop**: Upload intuitivo de imagens
- ✅ **Resultados em Tempo Real**: Predições e confiança visual

---

## 🚀 Quick Start (Modo Demo - Sem Python)

Se você quer apenas **testar o frontend e a API sem treinar**:

### 1. Backend (Porta 3000)
```bash
cd cnn-api-aulas
node server_demo.js
```

### 2. Frontend (Porta 3001)
```bash
cd frontend
npm install
npm start
```

Abra `http://localhost:3001` e teste o upload de imagens!

---

## 🔧 Setup Completo (Com Modelo PyTorch)

### Pré-requisitos
- Node.js >= 14
- Python >= 3.8
- PyTorch

### 1. Instalar Dependências Node.js

```bash
cd cnn-api-aulas
npm install
cd frontend
npm install
```

### 2. Criar Ambiente Python

**Windows (PowerShell):**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**Linux/macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Instalar Dependências Python

```bash
pip install torch torchvision pillow numpy
```

### 4. Rodar Backend + Frontend

**Terminal 1 - Backend (Porta 3000):**
```bash
node server.js
```

**Terminal 2 - Frontend (Porta 3001):**
```bash
cd frontend
$env:PORT=3001
npm start
```

Acesse `http://localhost:3001`

---

## 📁 Estrutura do Projeto

```
ia-cnn-api/
├── server.js                 # Servidor de produção com PyTorch
├── server_demo.js           # Servidor demo (sem Python)
├── package.json             # Dependências Node.js
├── requirements.txt         # Dependências Python
├── models_saved/
│   └── model.pth           # Modelo CNN treinado (29 MB)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js          # Componente principal
│   │   ├── App.css         # Tema R6S
│   │   ├── components/
│   │   │   ├── ImageUploader.js
│   │   │   ├── ImageUploader.css
│   │   │   ├── ResultsDisplay.js
│   │   │   └── ResultsDisplay.css
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🎯 Uso da API

### Endpoint: POST /classify

**URL:** `http://localhost:3000/classify`

**Body (FormData):**
```
file: <arquivo PNG/JPG>
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "prediction": "M4 (Striker)",
  "confidence": 0.95,
  "topPredictions": [
    { "class": "M4 (Striker)", "confidence": 0.95 },
    { "class": "R4-C (Ash)", "confidence": 0.04 },
    { "class": "L85A2 (Sledge)", "confidence": 0.01 }
  ]
}
```

**Resposta de Erro (400/500):**
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

---

## 🎨 Armas Disponíveis (20 Classes)

1. M4 (Striker)
2. R4-C (Ash)
3. L85A2 (Sledge)
4. M249 (Striker)
5. SR-25 (Striker)
6. Reaper MK2 (Sledge)
7. M45 MEUSOC (Ash)
8. P9 (Twitch)
9. LFP586 (Twitch)
10. P226 MK 25 (Tatcher)
11. PMR90A2 (Tatcher)
12. M590A1 (Tatcher)
13. M1014 (Thermite)
14. SASG-12 (Goyo)
15. TCSG12 (Defender)
16. SPEAR .308 (Goyo)
17. C8-SFW (IQ)
18. PARA-308 (Capitão)
19. GPMG-7 (Tachanka)
20. Oka (Gridlock)

---

## 🎯 Modelo Treinado

- **Arquivo:** `models_saved/model.pth`
- **Tamanho:** 29 MB
- **Arquitetura:** CNN com 5 blocos convolucionais
- **Acurácia Esperada:** 80-90%
- **Input:** Imagens 224x224 RGB
- **Output:** 20 classes (armas R6S)

---

## 🌐 Frontend - Tema R6S

O frontend foi totalmente redesenhado com a estética do Rainbow Six Siege:

- 🎮 **Cores:** Preto profundo (#0a0e27, #1a1f3a) + Vermelho agressivo (#ff6b6b)
- ⚔️ **Tipografia:** Uppercase, letter-spacing aumentado, bold
- ✨ **Efeitos:** Glow, bordas vermelhas, animações táteis
- 📱 **Responsivo:** Mobile-first design

### Componentes

1. **ImageUploader**
   - Drag & drop de imagens
   - Seleção múltipla
   - Preview em tempo real
   - Botão upload com indicador de carregamento

2. **ResultsDisplay**
   - Arma predita em destaque
   - Barra de confiança visual (0-100%)
   - Top 3 predições alternativas
   - Informações de acurácia

---

## 🔌 Integração Frontend-Backend

O frontend se conecta automaticamente ao backend:

```javascript
// Em frontend/src/App.js
const API_URL = 'http://localhost:3000';

// Upload de imagem
const response = await axios.post(`${API_URL}/classify`, formData);
```

---

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz (opcional):

```env
NODE_ENV=production
PORT=3000
PYTHON_CMD=python
MODEL_PATH=models_saved/model.pth
```

---

## 🐛 Troubleshooting

### "Module not found: PyTorch"
```bash
pip install torch torchvision
```

### "Port 3000/3001 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :3000
kill -9 <PID>
```

### "CORS Error"
O backend já possui CORS habilitado. Se persistir, verifique:
- Backend rodando em `http://localhost:3000`
- Frontend rodando em `http://localhost:3001`

---

## 🚀 Deploy

### Heroku (Backend)
```bash
git push heroku main
```

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

---

## 📚 Documentação Adicional

- `requirements.txt` - Pacotes Python necessários
- `package.json` - Pacotes Node.js necessários
- `frontend/README.md` - Detalhes do React App

---

## 👨‍💻 Desenvolvedor

**Gustavo Kirst**

---

## 📄 Licença

MIT

---

## ✨ Features Futuras

- [ ] Treinar com mais dados
- [ ] Adicionar mais classes de armas
- [ ] Dashboard de estatísticas
- [ ] Cache de predições
- [ ] Suporte a vídeo/streaming



Com o ambiente Python ativado, execute:

```bash
pip install -r requirements.txt
```

---

## 4. Copiar o modelo treinado

Após treinar sua CNN, você terá um arquivo `.pth`, por exemplo:

```txt
model_20260522_103012.pth
```

Copie esse arquivo para a pasta:

```txt
models_saved/
```

E renomeie obrigatoriamente para:

```txt
model.pth
```

O caminho final deve ficar assim:

```txt
models_saved/model.pth
```

Atenção: se o arquivo `models_saved/model.pth` não existir, a API não inicia.

---

## 5. Rodar a API

Execute:

```bash
npm start
```

Se tudo estiver correto, a API irá carregar o modelo `.pth` e ficará aguardando requisições.

Exemplo de saída esperada:

```txt
Inicializando API de inferência CNN...
Modelo esperado em: models_saved/model.pth

API iniciada com modelo carregado.
Servidor rodando em: http://localhost:3000
Endpoint de inferência: POST http://localhost:3000/infer
```

---

## 6. Endpoint disponível

A API possui apenas um endpoint:

```txt
POST /infer
```

Esse endpoint recebe uma imagem no formato `multipart/form-data`.

O nome do campo da imagem deve ser:

```txt
image
```

---

## 7. Testar com curl

Coloque uma imagem de teste na pasta do projeto, por exemplo (teste.jpg, teste.png, qualquer outro):

```txt
teste.jpg
```

Depois execute em outro terminal em sua máquina:

```bash
curl -X POST http://localhost:3000/infer \
  -F "image=@./teste.jpg"
```

No Windows PowerShell, use:

```powershell
curl.exe -X POST http://localhost:3000/infer -F "image=@./teste.jpg"
```

---

## 8. Resposta esperada

A API retorna um JSON com a classe prevista pelo modelo:

```json
{
  "ok": true,
  "predictedClass": "cat",
  "predictedIndex": 0,
  "confidence": 0.9231,
  "topPredictions": [
    {
      "class": "cat",
      "index": 0,
      "confidence": 0.9231
    },
    {
      "class": "dog",
      "index": 1,
      "confidence": 0.0612
    },
    {
      "class": "horse",
      "index": 2,
      "confidence": 0.0157
    }
  ]
}
```

---

## 9. Observações importantes

A arquitetura da CNN usada na API precisa ser igual à arquitetura usada no treinamento.

Se você alterou a classe `CNN` durante o treinamento, também precisa atualizar a classe `CNN` dentro do arquivo `server.js`.

O arquivo `.pth` deve ter sido salvo no formato utilizado no código da aula.

---

## 10. Checklist antes de rodar

Antes de executar `npm start`, confirme:

- O Node.js está instalado.
- O Python está instalado.
- As dependências do Node foram instaladas com `npm install`.
- As dependências Python foram instaladas com `pip install -r requirements.txt`.
- A pasta `models_saved/` existe.
- O modelo treinado foi copiado para `models_saved/model.pth`.
- O nome do arquivo é exatamente `model.pth`.
- A arquitetura da CNN na API é igual à arquitetura usada no treinamento.

---

## Comando final para rodar

```bash
npm start
```