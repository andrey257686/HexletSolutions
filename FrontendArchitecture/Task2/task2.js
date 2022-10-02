window.onload = function() {  
  const app = () => {
    let resultValue = 0;
    const result = document.getElementById('result');
    result.textContent = resultValue;

    const number = document.getElementById('number');
    let currentValue = parseInt(number.value, 10);

    const incHandler = () => {
      resultValue = resultValue + currentValue;
      result.textContent = resultValue;
    }

    const decHandler = () => {
      resultValue = resultValue - currentValue;
      result.textContent = resultValue;
    }

    const inc = document.getElementById('increment');
    inc.addEventListener('click', incHandler);
    const dec = document.getElementById('decrement');
    dec.addEventListener('click', decHandler);
  }

  app();
}