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
const secondModalContent = document.getElementById('secondModalContent');
const closeSecondModalBtn = document.querySelector('.second-close');

let imageData = [];
let currentItem = null;

// Charger les données depuis le JSON
fetch('assets/data/database.json')
  .then(response => response.json())
  .then(data => {
    imageData = data;

    // Ajouter les listeners après chargement
    images.forEach(img => {
      img.addEventListener('click', () => {
        const id = img.getAttribute('data-id');
        const item = imageData.find(el => el.id === id);

        if (item) {
          currentItem = item;

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

          if (item.images && item.images.length > 0) {
            item.images.forEach(imgData => {
              const imageElement = document.createElement('img');
              imageElement.src = imgData.src;
              imageElement.alt = imgData.alt || '';
              imageElement.className = imgData.class || 'modal_img';
              modalImagesContainer.appendChild(imageElement);
            });
          }

          modal.style.display = 'flex';
          requestAnimationFrame(() => {
            modal.classList.add('show');
          });
        }
      });
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement du JSON :', error);
  });

// Fermer la première modale
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
});

// Fermer la modale si clic en dehors
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
});

// Ouvrir la seconde modale via la flèche
openSecondModalBtn.addEventListener('click', () => {
  if (currentItem && currentItem.second_modal) {
    const second = currentItem.second_modal;

    secondModalTitle.textContent = second.title || '';
    secondModalTitleSpan.textContent = second.title_span || '';
    secondModalContent.innerHTML = '';

    if (Array.isArray(second.content)) {
      second.content.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        secondModalContent.appendChild(p);
      });
    } else {
      secondModalContent.textContent = second.content || '';
    }

    secondModal.style.display = 'flex';
    requestAnimationFrame(() => {
      secondModal.classList.add('show');
    });
  }
});

// Fermer la deuxième modale
closeSecondModalBtn.addEventListener('click', () => {
  secondModal.classList.remove('show');
  setTimeout(() => {
    secondModal.style.display = 'none';
  }, 300);
});

window.addEventListener('click', (e) => {
  if (e.target === secondModal) {
    secondModal.classList.remove('show');
    setTimeout(() => {
      secondModal.style.display = 'none';
    }, 300);
  }
});
