window.onload = function() {  
  const laptops = [
    {
      model: "v1",
      processor: "intel",
      memory: 16,
      frequency: 1.7,
    },
    {
      model: "d3",
      processor: "intel",
      memory: 8,
      frequency: 3.5,
    },
    {
      model: "d2",
      processor: "amd",
      memory: 16,
      frequency: 2.5,
    },
  ];

  const render = (state) => {
    const result = document.querySelector('.result');
    let data = laptops;
    // let countFalse = 0;
    // for (let prop in state) {
    //   if (state[prop] === false || state[prop] === 0){
    //     countFalse = countFalse + 1;
    //   }
    // }
    // countFalse === 4 ? data = laptops : data = state;
    // console.log(data);
    data = laptops
      .map((laptop) => {
        if (state.processor) {
          if (state.processor !== laptop.processor) return false;
        }
        if (state.memory) {
          if (state.memory != laptop.memory) return false;
        }
        if (state["frequency_gte"]) {
          if (laptop.frequency < state["frequency_gte"]) return false;
        }
        if (state["frequency_lte"]) {
          if (laptop.frequency > state["frequency_lte"]) return false;
        }
        return laptop;
      })
      .filter(Boolean);
    let filtered = data.map((laptop) => `<li>${laptop.model}</li>`);
    result.innerHTML = filtered.length ? `<ul>${filtered.join("")}</ul>` : "";
  }

  const app = () => {
    const state = {
      model: false,
      processor: false,
      memory: false,
      frequency_gte: false,
      frequency_lte: false,
    };
    render(state);
    const selectors = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input');
    selectors.forEach((selector) => {
      selector.addEventListener('change', (event)=>{
        const name = selector.name.slice(0,-3);
        state[name] = event.target.value;
        return render(state);
      })
    });
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        const name = input.name;
        state[name] = event.target.value;
        console.log(state[name]);
        return render(state);
      });
    });
  }

  app();
}