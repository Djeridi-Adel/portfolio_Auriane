document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("assets/data/database.json");
  const data = await response.json();

  // Génére toutes les modales (chaque page est une modale)
  let modalCount = 0;
  data.forEach(modal => {
    modal.pages.forEach((page, pageIndex) => {
      const modalDiv = document.createElement("div");
      modalCount++;

      const modalId = `${modal.id}_page${pageIndex + 1}`;
      modalDiv.classList.add("modal");
      modalDiv.id = modalId;

      modalDiv.innerHTML = `
        <div class="modal-content">
          <div class="modal_nav">
            <button class="close-button"></button>
            ${pageIndex > 0 ? `<button class="prev-button" data-prev="${modal.id}_page${pageIndex}"></button>` : ""}
            ${pageIndex < modal.pages.length - 1 ? `<button class="next-button" data-next="${modal.id}_page${pageIndex + 2}"></button>` : ""}
          </div>
          <div class="modal_title_wrapper">
            <h2>${page.title} <span class="modalTitle_span">${page.title_span}</span></h2>
          </div>
          <div class="modal-content-description">
            <div class="modal-description-line">
        ${page.description.map((item, index) => `
          <div class="modal-description-item">
            <i class="${modal.imagesTools[index]?.icon}" style="color: ${modal.imagesTools[index]?.color};"></i>
            <p>${item.p}</p>
          </div>
        `).join("")}
      </div>
      <div class="modal-images">
        ${page.images.map(img => `
          <img src="${img.src}" alt="${img.alt}" class="${img.class}">
        `).join("")}
      </div>
    </div>
  `;

      document.body.appendChild(modalDiv);
    });
  });

  // Ouvrir la première modale au clic
  document.querySelectorAll(".clickable-img").forEach(img => {
    img.addEventListener("click", (e) => {
      const modalId = e.target.dataset.id;
      const firstPageModal = document.getElementById(`${modalId}_page1`);
      if (firstPageModal) firstPageModal.classList.add("show");
    });
  });

  // Fermer les modales
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-button")) {
      const modal = e.target.closest(".modal");
      modal.classList.remove("show");
    }

    // Suivant
    if (e.target.classList.contains("next-button")) {
      const currentModal = e.target.closest(".modal");
      currentModal.classList.remove("show");

      const nextId = e.target.dataset.next;
      const nextModal = document.getElementById(nextId);
      if (nextModal) nextModal.classList.add("show");
    }

    // Précédent
    if (e.target.classList.contains("prev-button")) {
      const currentModal = e.target.closest(".modal");
      currentModal.classList.remove("show");

      const prevId = e.target.dataset.prev;
      const prevModal = document.getElementById(prevId);
      if (prevModal) prevModal.classList.add("show");
    }
  });

  // Sélection de l'overlay
const overlay = document.getElementById('image-overlay');
const overlayImg = document.getElementById('overlay-img');
const overlayClose = document.querySelector('.overlay-close');

// Délégation : gestion du clic sur les images dans les modales
document.body.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal_img')) {
    overlayImg.src = e.target.src;
    overlay.style.display = 'flex';
  }
});

// Fermeture de l’overlay
overlayClose.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Fermeture au clic en dehors de l'image
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
  }
});

});
