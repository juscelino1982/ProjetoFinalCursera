// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Se existir um botão de alerta com id="alertButton"
  const alertButton = document.getElementById("alertButton");
  if (alertButton) {
    alertButton.addEventListener("click", () => {
      alert("Button clicked! JavaScript is working.");
    });
  }

  // Botão "Limpar Seleção"
  const clearSelectionBtn = document.getElementById("clearSelectionBtn");
  if (clearSelectionBtn) {
    clearSelectionBtn.addEventListener("click", () => {
      deselectImage(); // Chama a função que tira a seleção
    });
  }

  /**********************************************
   *  Configuração da Galeria Interativa
   **********************************************/

  let selectedFigure = null; // Qual <figure> está selecionada/clicada
  let currentHover = null; // Qual <figure> está em hover/foco no momento

  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((figure, index) => {
    // Deixa <figure> focável pelo teclado
    figure.setAttribute("tabindex", "0");

    // MOUSEOVER => mostra preview se não houver outra selecionada
    figure.addEventListener("mouseover", () => {
      currentHover = figure;
      if (!selectedFigure || selectedFigure === figure) {
        showPreview(figure);
      }
    });

    // MOUSEOUT => se não houver imagem selecionada, volta ao texto padrão
    figure.addEventListener("mouseout", () => {
      currentHover = null;
      if (!selectedFigure) {
        revertToDefault();
      }
    });

    // FOCUS => comporta-se como mouseover para teclado
    figure.addEventListener("focus", () => {
      currentHover = figure;
      if (!selectedFigure || selectedFigure === figure) {
        showPreview(figure);
      }
    });

    // BLUR => se não houver seleção, reverte
    figure.addEventListener("blur", () => {
      currentHover = null;
      if (!selectedFigure) {
        revertToDefault();
      }
    });

    // CLIQUE => seleciona permanentemente
    figure.addEventListener("click", () => {
      alert(`Você clicou na ${index + 1}ª imagem.`);
      selectedFigure = figure; // Armazena a seleção
      showPreview(figure);
    });

    // KEYDOWN => Enter/Espaço => também seleciona
    figure.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        alert(`Você ativou a ${index + 1}ª imagem via teclado.`);
        selectedFigure = figure;
        showPreview(figure);
      }
    });
  });

  // Eventos globais (opcional)
  document.addEventListener("mousemove", (e) => {
    console.log(`Mouse movido para: X=${e.clientX}, Y=${e.clientY}`);
  });
  document.addEventListener("keydown", (e) => {
    console.log(`Tecla pressionada: ${e.key}`);
  });

  console.log("Galeria de Fotos Carregada!");

  // Ao iniciar, sem seleção => mostra texto padrão
  revertToDefault();

  // =========================
  // Funções Principais
  // =========================

  /**
   * Exibe a imagem do <figure> passado,
   * atualizando #displayedImage e #imageDescription
   */
  function showPreview(figure) {
    const previewPic = figure.querySelector("img");
    if (!previewPic) return;

    const displayedImage = document.getElementById("displayedImage");
    const imageDescription = document.getElementById("imageDescription");

    // Atribui src/alt da imagem real
    displayedImage.src = previewPic.src;
    displayedImage.alt = previewPic.alt;

    // Fade-in (classe .visible => opacity:1)
    displayedImage.classList.add("visible");
    imageDescription.textContent = previewPic.alt;
    imageDescription.classList.add("visible");
  }

  /**
   * Restaura o texto padrão, removendo a imagem exibida
   * somente se não houver imagem selecionada
   */
  function revertToDefault() {
    const displayedImage = document.getElementById("displayedImage");
    const imageDescription = document.getElementById("imageDescription");

    // Inicia fade-out => remove .visible
    displayedImage.classList.remove("visible");
    imageDescription.classList.remove("visible");

    // Aguardar 0.5s (tempo da transição de opacidade)
    setTimeout(() => {
      displayedImage.src = "";
      displayedImage.alt = "";
      imageDescription.textContent =
        "Passe o mouse sobre uma imagem abaixo para exibir aqui";
    }, 500);
  }

  /**
   * Deseleciona a imagem, se houver
   * e chama revertToDefault() para texto padrão
   */
  function deselectImage() {
    selectedFigure = null;
    revertToDefault();
  }
});
