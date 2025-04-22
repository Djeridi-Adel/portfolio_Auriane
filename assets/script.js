document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.clickable-img');
  const modal = document.getElementById('myModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTitleSpan = document.getElementById('modalTitle_span');
  const modalDescription = document.getElementById('modalDescription');
  const modalImagesContainer = document.getElementById('modalImagesContainer');
  const closeBtn = document.querySelector('.close');
  const openSecondModalBtn = document.getElementById('openSecondModal');

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

  function showFirstModal(item) {
    modalTitle.textContent = item.title || '';
    modalTitleSpan.textContent = item.title_span || '';
    modalDescription.innerHTML = '';
    modalImagesContainer.innerHTML = '';

    if (Array.isArray(item.description)) {
      item.description.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        modalDescription.appendChild(p);
      });
    } else {
      modalDescription.textContent = item.description || '';
    }

    if (item.images) {
      item.images.forEach(imgData => {
        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = imgData.alt || '';
        img.className = imgData.class || 'modal_img';
        modalImagesContainer.appendChild(img);
      });
    }

    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
  }

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
});
