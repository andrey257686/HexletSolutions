

window.onload = function() {  

  const app = () => {

    const getLocationProps = () => {
      const location = document.location;
      let locationProps = [];
      for (const key in location) {
        const entry = location[key];
        if ((typeof entry !== 'function') && (typeof entry !== 'object') && (entry !== '')){
          locationProps.push([key, location[key]]);
        }
      }
      const sortedLocationProps = locationProps.sort();
      let objectedLocationProps = {};
      sortedLocationProps.forEach((element) => {
        objectedLocationProps = {...objectedLocationProps, [element[0]]: element[1]};
      });
      return objectedLocationProps;
    }

    const render = () => {
      const locationProps = getLocationProps();
      console.log(locationProps);
      const container = document.querySelector('.container');
      container.innerHTML = '';
      const table = document.createElement('table');
      table.classList.add('table');
      const tbody = document.createElement('tbody');
      const trFirst = `<th><a href="">Name (Asc)</a></th><th><a href="">Value (Unsorted)</a></th>`;
      tbody.innerHTML = trFirst;
      table.append(tbody);
      container.append(table);
      for (const key in locationProps){
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.textContent = key;
        const tdValue = document.createElement('td');
        tdValue.textContent = locationProps[key];
        tr.append(tdName, tdValue);
        table.append(tr);
      }
    }

    render();

  }

  app();
}