const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// ============================================
// MOCK DATA - Simulação sem Python/PyTorch
// ============================================
const MOCK_WEAPONS = {
  "417 (Twitch)": {
    confidence: 0.92,
    topPredictions: [
      { class: "417 (Twitch)", confidence: 0.92 },
      { class: "SR-25 (Striker)", confidence: 0.05 },
      { class: "5.7 USG", confidence: 0.03 }
    ]
  },
  "5.7 USG": {
    confidence: 0.88,
    topPredictions: [
      { class: "5.7 USG", confidence: 0.88 },
      { class: "LFP586 (Twitch)", confidence: 0.08 },
      { class: "P9 (Twitch)", confidence: 0.04 }
    ]
  },
  "556XI (Thermite)": {
    confidence: 0.85,
    topPredictions: [
      { class: "556XI (Thermite)", confidence: 0.85 },
      { class: "AR33 (Tatcher)", confidence: 0.10 },
      { class: "F2 (Twitch)", confidence: 0.05 }
    ]
  },
  "AR33 (Tatcher)": {
    confidence: 0.87,
    topPredictions: [
      { class: "AR33 (Tatcher)", confidence: 0.87 },
      { class: "556XI (Thermite)", confidence: 0.08 },
      { class: "L85A2 (Sledge)", confidence: 0.05 }
    ]
  },
  "F2 (Twitch)": {
    confidence: 0.89,
    topPredictions: [
      { class: "F2 (Twitch)", confidence: 0.89 },
      { class: "G36C (Ash)", confidence: 0.07 },
      { class: "R4-C (Ash)", confidence: 0.04 }
    ]
  },
  "G36C (Ash)": {
    confidence: 0.86,
    topPredictions: [
      { class: "G36C (Ash)", confidence: 0.86 },
      { class: "F2 (Twitch)", confidence: 0.09 },
      { class: "556XI (Thermite)", confidence: 0.05 }
    ]
  },
  "ITA12S (Striker)": {
    confidence: 0.83,
    topPredictions: [
      { class: "ITA12S (Striker)", confidence: 0.83 },
      { class: "M590A1 (Tatcher)", confidence: 0.12 },
      { class: "M1014 (Thermite)", confidence: 0.05 }
    ]
  },
  "L85A2 (Sledge)": {
    confidence: 0.90,
    topPredictions: [
      { class: "L85A2 (Sledge)", confidence: 0.90 },
      { class: "AR33 (Tatcher)", confidence: 0.06 },
      { class: "556XI (Thermite)", confidence: 0.04 }
    ]
  },
  "LFP586 (Twitch)": {
    confidence: 0.88,
    topPredictions: [
      { class: "LFP586 (Twitch)", confidence: 0.88 },
      { class: "5.7 USG", confidence: 0.07 },
      { class: "P9 (Twitch)", confidence: 0.05 }
    ]
  },
  "M1014 (Thermite)": {
    confidence: 0.91,
    topPredictions: [
      { class: "M1014 (Thermite)", confidence: 0.91 },
      { class: "M590A1 (Tatcher)", confidence: 0.05 },
      { class: "ITA12S (Striker)", confidence: 0.04 }
    ]
  },
  "M249 (Striker)": {
    confidence: 0.91,
    topPredictions: [
      { class: "M249 (Striker)", confidence: 0.91 },
      { class: "556XI (Thermite)", confidence: 0.05 },
      { class: "M4 (Striker)", confidence: 0.04 }
    ]
  },
  "M4 (Striker)": {
    confidence: 0.94,
    topPredictions: [
      { class: "M4 (Striker)", confidence: 0.94 },
      { class: "R4-C (Ash)", confidence: 0.04 },
      { class: "F2 (Twitch)", confidence: 0.02 }
    ]
  },
  "M45 MEUSOC (Ash)": {
    confidence: 0.85,
    topPredictions: [
      { class: "M45 MEUSOC (Ash)", confidence: 0.85 },
      { class: "5.7 USG", confidence: 0.10 },
      { class: "P226 MK 25 (Tatcher)", confidence: 0.05 }
    ]
  },
  "M590A1 (Tatcher)": {
    confidence: 0.89,
    topPredictions: [
      { class: "M590A1 (Tatcher)", confidence: 0.89 },
      { class: "ITA12S (Striker)", confidence: 0.08 },
      { class: "M1014 (Thermite)", confidence: 0.03 }
    ]
  },
  "P226 MK 25 (Tatcher)": {
    confidence: 0.87,
    topPredictions: [
      { class: "P226 MK 25 (Tatcher)", confidence: 0.87 },
      { class: "M45 MEUSOC (Ash)", confidence: 0.09 },
      { class: "5.7 USG", confidence: 0.04 }
    ]
  },
  "P9 (Twitch)": {
    confidence: 0.86,
    topPredictions: [
      { class: "P9 (Twitch)", confidence: 0.86 },
      { class: "LFP586 (Twitch)", confidence: 0.10 },
      { class: "5.7 USG", confidence: 0.04 }
    ]
  },
  "PMR90A2 (Tatcher)": {
    confidence: 0.84,
    topPredictions: [
      { class: "PMR90A2 (Tatcher)", confidence: 0.84 },
      { class: "5.7 USG", confidence: 0.11 },
      { class: "P9 (Twitch)", confidence: 0.05 }
    ]
  },
  "R4-C (Ash)": {
    confidence: 0.93,
    topPredictions: [
      { class: "R4-C (Ash)", confidence: 0.93 },
      { class: "M4 (Striker)", confidence: 0.04 },
      { class: "G36C (Ash)", confidence: 0.03 }
    ]
  },
  "Reaper MK2 (Sledge)": {
    confidence: 0.96,
    topPredictions: [
      { class: "Reaper MK2 (Sledge)", confidence: 0.96 },
      { class: "SR-25 (Striker)", confidence: 0.03 },
      { class: "417 (Twitch)", confidence: 0.01 }
    ]
  },
  "SR-25 (Striker)": {
    confidence: 0.94,
    topPredictions: [
      { class: "SR-25 (Striker)", confidence: 0.94 },
      { class: "417 (Twitch)", confidence: 0.04 },
      { class: "Reaper MK2 (Sledge)", confidence: 0.02 }
    ]
  }
};

// ============================================
// EXPRESS SETUP
// ============================================
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ============================================
// ROUTES
// ============================================

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "R6S Weapon Classifier API - Demo Mode (Sem Modelo PyTorch)",
    mode: "demo",
    available_weapons: Object.keys(MOCK_WEAPONS),
    note: "Para usar com modelo treinado, instale Python + PyTorch"
  });
});

// Inference endpoint (Mock)
app.post("/infer", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Nenhuma imagem foi enviada",
        message: "Por favor, envie uma imagem"
      });
    }

    console.log(`📸 Imagem recebida: ${req.file.originalname} (${req.file.size} bytes)`);

    // Simular classificação aleatória (em demo)
    const weapons = Object.keys(MOCK_WEAPONS);
    const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    const result = MOCK_WEAPONS[randomWeapon];

    console.log(`🤖 Classificação (Mock): ${randomWeapon}`);

    res.json({
      class: randomWeapon,
      confidence: result.confidence,
      top_predictions: result.topPredictions,
      mode: "demo",
      note: "Modo demonstração - resultados simulados"
    });

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({
      error: "Erro ao processar imagem",
      details: error.message
    });
  }
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(70));
  console.log("🎮 CLASSIFICADOR DE ARMAS R6S - MODO DEMONSTRAÇÃO");
  console.log("=".repeat(70));
  console.log(`\n✅ Servidor rodando em: http://localhost:${PORT}`);
  console.log(`\n📊 Modo: DEMO (Sem PyTorch)`);
  console.log(`🎯 Armas disponíveis para teste: ${Object.keys(MOCK_WEAPONS).length}`);
  console.log(`\n💡 Para usar com modelo treinado:`);
  console.log(`   1. Instale Python + PyTorch`);
  console.log(`   2. Execute: python split_dataset.py`);
  console.log(`   3. Treine no Colab: train_colab.py`);
  console.log(`   4. Salve modelo em: models_saved/model.pth`);
  console.log("\n" + "=".repeat(70) + "\n");
});
