import onChange from 'https://cdn.skypack.dev/on-change@2.2.0';
import i18next from 'https://deno.land/x/i18next/index.js';
import resources from './locales/index.js';

window.onload = function() {  

  const app = async () => {

    const i18nInstance = i18next.createInstance();
    await i18nInstance.init({
      lng: 'en',
      resources,
    });

    const state = {
      name: 'asc',
      value: 'unsorted',
    }

    const watchedState = onChange(state, (path, value, previousValue) => {
      if (value !== 'unsorted'){
        render();
      }
    })  

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

    const nextSortDirection = {
      asc: 'desc',
      desc: 'asc',
      unsorted: 'asc'
    }

    const handleClickOnNameLink = (event) => {
      event.preventDefault();
      const nextStateLink = nextSortDirection[watchedState.name];
      watchedState.value = 'unsorted';
      watchedState.name = nextStateLink;
    }

    const handleClickOnValueLink = (event) => {
      event.preventDefault();
      const nextStateLink = nextSortDirection[watchedState.value];
      watchedState.name = 'unsorted';
      watchedState.value = nextStateLink;
    }

    const sortProps = (currentState, props) => {
      const sortedColumn = Object.keys(state).find((key) => state[key] === 'asc' || state[key] === 'desc');
      const arrEntries = Object.entries(props);
      const sortedProps = arrEntries.sort((el1, el2) => {
        let [val1, val2] = sortedColumn === 'name' ? [el1[0], el2[0]] : [el1[1], el2[1]];
        return currentState[sortedColumn] === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      });
      return Object.fromEntries(sortedProps);
    }

    const render = () => {
      
      const locationProps = getLocationProps();
      const sortedLocationProps = sortProps(state, locationProps);
      const container = document.querySelector('.container');
      container.innerHTML = '';
      const table = document.createElement('table');
      table.classList.add('table');
      const tbody = document.createElement('tbody');
      const trFirst = document.createElement('tr');
      const thName = document.createElement('th');
      const thValue = document.createElement('th');
      thName.innerHTML = `<a href = '#'>${i18nInstance.t('name')} (${i18nInstance.t(`${state.name}`)})</a>`;
      thValue.innerHTML = `<a href = '#'>${i18nInstance.t('value')} (${i18nInstance.t(`${state.value}`)})</a>`;
      trFirst.append(thName,thValue);
      tbody.append(trFirst);
      table.append(tbody);
      container.append(table);
      const [nameLink, valueLink] = container.querySelectorAll('a');
      nameLink.addEventListener('click', handleClickOnNameLink);
      valueLink.addEventListener('click', handleClickOnValueLink);
      for (const key in sortedLocationProps){
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.textContent = key;
        const tdValue = document.createElement('td');
        tdValue.textContent = sortedLocationProps[key];
        tr.append(tdName, tdValue);
        tbody.append(tr);
      }
    }


    render();

  }

  app();
}