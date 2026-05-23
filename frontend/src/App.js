import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = async () => {
    if (!selectedImage) {
      setError('Por favor, selecione uma imagem primeiro.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:3000/infer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Erro ao classificar a imagem. Verifique se o servidor está rodando.'
      );
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🔫 Rainbow Six Siege Weapon Classifier</h1>
          <p>Classifique armas do jogo usando IA</p>
        </header>

        <main className="main-content">
          <ImageUploader
            onImageSelect={handleImageSelect}
            imagePreview={imagePreview}
            onClassify={handleClassify}
            onReset={handleReset}
            loading={loading}
          />

          {error && (
            <div className="error-message">
              <strong>❌ Erro:</strong> {error}
            </div>
          )}

          {results && (
            <ResultsDisplay results={results} />
          )}
        </main>

        <footer className="footer">
          <p>Powered by CNN + PyTorch | Rainbow Six Siege Weapon Dataset</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
