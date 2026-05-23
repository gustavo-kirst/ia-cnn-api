import React from 'react';
import './ImageUploader.css';

function ImageUploader({
  onImageSelect,
  imagePreview,
  onClassify,
  onReset,
  loading
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem válido.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  return (
    <div className="image-uploader">
      {!imagePreview ? (
        <div
          className="upload-zone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <span className="upload-icon">📤</span>
            <h2>Arraste uma imagem aqui</h2>
            <p>ou</p>
            <label className="file-input-label">
              Clique para selecionar
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden-input"
              />
            </label>
            <p className="upload-hint">
              Suporta: JPG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      ) : (
        <div className="preview-section">
          <div className="image-preview-container">
            <img src={imagePreview} alt="Preview" className="image-preview" />
          </div>
          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={onClassify}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Classificando...
                </>
              ) : (
                '🚀 Classificar'
              )}
            </button>
            <button
              className="btn btn-secondary"
              onClick={onReset}
              disabled={loading}
            >
              ↻ Trocar Imagem
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
