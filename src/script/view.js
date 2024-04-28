const videoElement = document.querySelector('video');

videoElement.addEventListener('play', async () => {
  const videoId = videoElement.dataset.videoId; 
  const response = await fetch(`/upload/${videoId}/visualizado`, { method: 'POST' }); 
  if (response.ok) {
      console.log('Visualização do vídeo registrada com sucesso.');
  } else {
      console.error('Erro ao registrar visualização do vídeo.');
  }
});
