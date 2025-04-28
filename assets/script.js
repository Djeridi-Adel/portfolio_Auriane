document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.clickable-img');
  const modal = document.getElementById('myModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTitleSpan = document.getElementById('modalTitle_span');
  const modalDescription = document.getElementById('modalDescription');
  const modalImagesContainer = document.getElementById('modalImagesContainer');
  const closeBtn = document.querySelector('.close');
  const openSecondModalBtn = document.getElementById('openSecondModal');
  const modalUsedToolsImg = document.getElementById("modalUsedToolsImg");

  const secondModal = document.getElementById('secondModal');
  const secondModalTitle = document.getElementById('secondModalTitle');
  const secondModalTitleSpan = document.getElementById('secondModalTitle_span');
  const secondModalDescription = document.getElementById('secondModalContent_description');
  const secondModalImagesContainer = document.getElementById('secondModalImagesContainer');
  const secondModalContent = document.getElementById('secondModalContent');
  const closeSecondModalBtn = document.querySelector('.second-close');
  const backToFirstModalBtn = document.getElementById('backToFirstModal');

  let imageData = [];
  let currentItem = null;

  // ----------------- FONCTION POUR OUVRIR L'IMAGE EN GRAND -----------------
  function openImageOverlay(src) {
    const overlay = document.getElementById('imageOverlay');
    const overlayImg = document.getElementById('overlayImage');
    overlayImg.src = src;
    overlay.style.display = 'flex';
  }

  // ----------------- FETCH DES DONNÉES -----------------
  fetch('assets/data/database.json')
    .then(response => response.json())
    .then(data => {
      imageData = data;

      images.forEach(img => {
        img.addEventListener('click', () => {
          const id = img.getAttribute('data-id');
          const item = imageData.find(el => el.id === id);

          if (item) {
            currentItem = item;
            showFirstModal(item);
          }
        });
      });
    })
    .catch(error => console.error('Erreur JSON :', error));

  // ----------------- AFFICHER LA PREMIÈRE MODALE -----------------
  function showFirstModal(item) {
    modalTitle.textContent = item.title || '';
    modalTitleSpan.textContent = item.title_span || '';
    modalDescription.innerHTML = '';
    modalImagesContainer.innerHTML = '';
    modalUsedToolsImg.innerHTML = '';

    // Description
    if (Array.isArray(item.description)) {
      item.description.forEach((line, index) => {
        const container = document.createElement('div');
        container.classList.add('modal-description-line');

        if (item.imagesTools && item.imagesTools[index]) {
          const iconData = item.imagesTools[index];
          const icon = document.createElement('i');
          icon.className = iconData.icon;
          if (iconData.color) {
            icon.style.color = iconData.color;
          }
          container.appendChild(icon);
        }

        if (line.p) {
          const parts = line.p.split('\n');

          const titleSpan = document.createElement('span');
          titleSpan.textContent = parts[0];
          titleSpan.classList.add('modal-title-part');
          container.appendChild(titleSpan);

          if (parts.length > 1) {
            parts.slice(1).forEach(subLine => {
              const p = document.createElement('p');
              p.textContent = subLine.trim();
              container.appendChild(p);
            });
          }
        }

        modalDescription.appendChild(container);
      });
    } else if (item.description) {
      const p = document.createElement('p');
      p.textContent = item.description;
      modalDescription.appendChild(p);
    }

    // Images
    if (item.images) {
      item.images.forEach(imgData => {
        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = imgData.alt || '';
        img.className = imgData.class || 'modal_img';

        // ➔ Click pour ouvrir en grand
        img.addEventListener('click', () => openImageOverlay(img.src));

        modalImagesContainer.appendChild(img);
      });
    }

    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
  }

  // ----------------- AFFICHER LA SECONDE MODALE -----------------
  openSecondModalBtn.addEventListener('click', () => {
    if (!currentItem || !currentItem.second_modal) return;

    const second = currentItem.second_modal;

    secondModalTitle.textContent = second.title || '';
    secondModalTitleSpan.textContent = second.title_span || '';
    secondModalDescription.innerHTML = '';
    secondModalContent.innerHTML = '';
    secondModalImagesContainer.innerHTML = '';

    if (Array.isArray(second.content)) {
      second.content.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        secondModalContent.appendChild(p);
      });
    } else {
      secondModalDescription.textContent = second.description || '';
    }

    if (second.images) {
      second.images.forEach(imgData => {
        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = imgData.alt || '';
        img.className = imgData.class || 'modal_img';

        // ➔ Click pour ouvrir en grand
        img.addEventListener('click', () => openImageOverlay(img.src));

        secondModalImagesContainer.appendChild(img);
      });
    }

    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      secondModal.style.display = 'flex';
      requestAnimationFrame(() => secondModal.classList.add('show'));
    }, 300);
  });

  // ----------------- BOUTONS POUR FERMER LES MODALES -----------------
  backToFirstModalBtn.addEventListener('click', () => {
    secondModal.classList.remove('show');
    setTimeout(() => {
      secondModal.style.display = 'none';
      showFirstModal(currentItem);
    }, 300);
  });

  closeSecondModalBtn.addEventListener('click', () => {
    secondModal.classList.remove('show');
    setTimeout(() => secondModal.style.display = 'none', 300);
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.style.display = 'none', 300);
    }
    if (e.target === secondModal) {
      secondModal.classList.remove('show');
      setTimeout(() => secondModal.style.display = 'none', 300);
    }
  });

  // ----------------- OVERLAY IMAGE - POUR FERMER -----------------
  document.getElementById('closeOverlay').addEventListener('click', () => {
    document.getElementById('imageOverlay').style.display = 'none';
  });

  document.getElementById('imageOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'imageOverlay') {
      document.getElementById('imageOverlay').style.display = 'none';
    }
  });
});
