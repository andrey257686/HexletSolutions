window.onload = function() {  
  const state = {
    companies: {
      Hexlet: { id: 1, name: "Hexlet", description: "online courses" },
      Google: { id: 2, name: "Google", description: "search engine" },
      Facebook: { id: 3, name: "Facebook", description: "social network" },
    },
    uiState: {
      visible: null,
    },
  };
  
  const renderDescription = () => {
    const card = document.querySelector('.card');
    const name = state.uiState.visible;
    if (!name) {
      card.classList.add('collapse');
      card.innerHTML = "";
    }
    else {
      const description = state.companies[name].description;
      card.innerHTML = description;
      card.classList.remove('collapse');
    }
  }

  const app = () => {
    const container = document.querySelector('.container');
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault;
        const name = e.target.innerText
        state.uiState.visible = state.uiState.visible === name ? null : name;
        renderDescription();
      })
    })
  }

  app();
}