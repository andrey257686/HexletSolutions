import onChange from 'https://cdn.skypack.dev/on-change@2.2.0';
import i18next from 'https://deno.land/x/i18next/index.js'
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
      
      render();
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

    // const handleClickColumn = (event) => {
    //   const nextSortDirections = {
    //     asc: 'desc',
    //     desc: 'asc',
    //     unsorted: 'asc'
    //   }
    //   event.preventDefault();
    //   const idElement = event.target.id;
    //   // console.log(nextSortDirections[state[idElement]])
    //   watchedState[idElement] = nextSortDirections[state[idElement]];

    //   // if (state.activeCol === idElement){
    //     // watchedState.method = nextSortDirections[watchedState.method];
    //   // }  
    //   // watchedState.activeCol = idElement;
    // }

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

    const sortProps = () => {
      // TODO: Сделать сортировку
    }

    const render = (previousCol) => {
      
      const locationProps = getLocationProps();
      console.log(locationProps);

      const container = document.querySelector('.container');
      container.innerHTML = '';
      const table = document.createElement('table');
      table.classList.add('table');
      const tbody = document.createElement('tbody');
      const trFirst = document.createElement('tr');
      const thName = document.createElement('th');
      // thName.addEventListener('click', handleClickColumn);
      const thValue = document.createElement('th');
      // thValue.addEventListener('click', handleClickColumn);
      thName.innerHTML = `<a href = '#'>${i18nInstance.t('name')} (${i18nInstance.t(`${state.name}`)})</a>`;
      thValue.innerHTML = `<a href = '#'>${i18nInstance.t('value')} (${i18nInstance.t(`${state.value}`)})</a>`;
      // if (state.activeCol === 'name'){
      //   thName.innerHTML = `<a href = '#' id='name'>${i18nInstance.t('name')} (${i18nInstance.t(`${state.method}`)})</a>`;
      //   thValue.innerHTML = `<a href ='#' id='value'>${i18nInstance.t('value')} (${i18nInstance.t('unsorted')})</a>`;
      // }
      // else {
      //   thName.innerHTML = `<a href='#' id='name'>${i18nInstance.t('name')} (${i18nInstance.t('unsorted')})</a>`;
      //   thValue.innerHTML = `<a href ='#' id='value'>${i18nInstance.t('value')} (${i18nInstance.t(`${state.method}`)})</a>`;
      // }
      trFirst.append(thName,thValue);
      // const trFirst = `<th><a href="">${i18nInstance.t('name')} (${i18nInstance.t('asc')})</a></th>
      // <th><a href="">${i18nInstance.t('value')} (${i18nInstance.t('unsorted')})</a></th>`;
      // tbody.innerHTML = trFirst;
      tbody.append(trFirst);
      table.append(tbody);
      container.append(table);
      const [nameLink, valueLink] = container.querySelectorAll('a');
      nameLink.addEventListener('click', handleClickOnNameLink);
      valueLink.addEventListener('click', handleClickOnValueLink);
      for (const key in locationProps){
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.textContent = key;
        const tdValue = document.createElement('td');
        tdValue.textContent = locationProps[key];
        tr.append(tdName, tdValue);
        tbody.append(tr);
      }
    }


    render();

  }

  app();
}