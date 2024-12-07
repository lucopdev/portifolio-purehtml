// Importa dados dos projetos de um arquivo separado
import projectsData from './utils/projectsData.js';

// Cria o HTML para um card de projeto individual
function createProjectCard(project) {
  return `
        <div class="project-card" data-module="${project.module}">
            <img src="${project.images[0]}" alt="${project.name}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-tech">${project.tech}</p>
                <div class="project-links">
                    <a href="${project.url}" target="_blank" class="project-link">Demo</a>
                    <a href="${project.repository}" target="_blank" class="project-link">GitHub</a>
                </div>
            </div>
        </div>
    `;
}

// Renderiza os projetos com base no filtro selecionado
function renderProjects(projects, filter = 'all') {
  const container = document.getElementById('projectsContainer');
  if (!container) {
    console.error('Container de projetos não encontrado!');
    return;
  }
  container.innerHTML = '';

  projects.forEach((project) => {
    if (filter === 'all' || project.module === filter) {
      container.innerHTML += createProjectCard(project);
    }
  });
}

// Adiciona eventos de clique aos botões de filtro
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(projectsData, btn.dataset.filter);
  });
});

// Configura o botão de voltar ao topo
const initBackToTop = () => {
  const backToTopButton = document.getElementById('backToTop');

  // Mostra/esconde o botão baseado no scroll
  function checkScroll() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll);

  // Scroll suave ao topo quando clicado
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};

// Inicializa funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  renderProjects(projectsData);

  // Configura menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });

  // Fecha menu ao clicar em um link
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navList.classList.remove('active');
    });
  });
});
