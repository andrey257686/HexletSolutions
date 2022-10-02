window.onload = function() {  
  const states = {
    name: {
      def: 'name',
      value: '',
      state: 'waiting',
    },
    email: {
      def: 'email',
      value: '',
      state: 'waiting',
    }
  }

  const render = (container) => {
    const type = container.dataset.editableTarget;
    if (states[type].state === 'changing'){
      container.innerHTML = `<form>
        <input type="text" name="${type}">
        <input type="submit" value="Save">
      </form>`;
    }
    if (states[type].state === 'submited'){
      container.innerHTML = states[type].value ? states[type].value : `<i>${states[type].def}</i>`;
    }
  }

  const app = () => {
    const containers = document.querySelectorAll("div");
    containers.forEach((container) => {
      container.addEventListener('click', (e) => {
        const type = container.dataset.editableTarget;
        if (states[type].state === 'waiting'){
          states[type].state = 'changing'
          render(container);
          const form = container.querySelector('form');
          const fieldText = document.querySelector(`input[name=${type}]`);
          fieldText.focus();
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            states[type].value = fieldText.value;
            states[type].state = 'submited';
            render(container);
            states[type].state = 'waiting';
          })
        }
      })
    })
  }

  app();
}