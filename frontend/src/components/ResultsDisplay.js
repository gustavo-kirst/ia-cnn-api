import React from 'react';
import './ResultsDisplay.css';

function ResultsDisplay({ results }) {
  const mainResult = results.class || 'Desconhecido';
  const confidence = results.confidence
    ? (results.confidence * 100).toFixed(2)
    : 'N/A';
  const topPredictions = results.top_predictions || [];

  return (
    <div className="results-display">
      <div className="results-header">
        <h2>✅ Classificação Concluída!</h2>
      </div>

      <div className="main-result">
        <div className="result-card primary">
          <h3>Arma Identificada</h3>
          <div className="weapon-name">{mainResult}</div>
          <div className="confidence-meter">
            <div className="confidence-label">
              Confiança: <span className="confidence-value">{confidence}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(confidence, 100)}%`,
                  background:
                    confidence >= 80
                      ? '#4caf50'
                      : confidence >= 60
                      ? '#ffc107'
                      : '#ff9800'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {topPredictions.length > 0 && (
        <div className="top-predictions">
          <h3>🎯 Principais Previsões</h3>
          <div className="predictions-list">
            {topPredictions.map((pred, index) => (
              <div key={index} className="prediction-item">
                <span className="prediction-rank">#{index + 1}</span>
                <span className="prediction-name">{pred.class}</span>
                <span className="prediction-confidence">
                  {(pred.confidence * 100).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="results-info">
        <p>
          💡 <strong>Dica:</strong> Quanto maior a confiança, maior a certeza da
          IA sobre a classificação.
        </p>
      </div>
    </div>
  );
}

export default ResultsDisplay;
