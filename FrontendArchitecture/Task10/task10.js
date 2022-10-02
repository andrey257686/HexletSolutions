import onChange from 'https://cdn.skypack.dev/on-change@2.2.0';
import i18next from 'https://deno.land/x/i18next/index.js'
import resources from './locales/index.js';

window.onload = function() {

  const i18nInstance = i18next.createInstance();

  const state = {
    languages: {
      Русский: 'ru',
      English: 'en',
    },
    activeLng: 'English',
    clickValue: 0,
  }

  const renderClickValue = () => {
    const infoBtn = document.querySelector('.btn-info');
    infoBtn.textContent = `${state.clickValue} clicks`;  
  }

  const renderLng = () => {
    const resetBtn = document.querySelector('.btn-warning');
    const infoBtn = document.querySelector('.btn-info');
    const langBtns = document.querySelectorAll('.btn-group .btn');

    langBtns.forEach((button) => {
      if (button.textContent === state.activeLng){
        button.setAttribute('class', 'btn btn-primary');
      }
      else {
        button.setAttribute('class', 'btn btn-outline-primary');
      }
    });

    
    i18nInstance.changeLanguage(state.languages[state.activeLng]);
    console.log(i18nInstance.language);
    infoBtn.textContent = i18nInstance.t('clickButton.key', {  count: state.clickValue });
    resetBtn.textContent = i18nInstance.t('resetButton');
    resetBtn.textContent = i18nInstance.t('resetButton');
  }
  
  const app = async () => {

    const resetBtn = document.querySelector('.btn-warning');
    const infoBtn = document.querySelector('.btn-info');
    const langBtns = document.querySelectorAll('.btn-group .btn');

    await i18nInstance.init({
      lng: state.languages[state.activeLng],
      debug: false,
      resources,
    });

    const watchedState = onChange(state, (path, value, previousValue) => {
      if (path === 'activeLng'){
        renderLng();
      }
      if (path === 'clickValue'){
        renderClickValue();
      }
    });

    langBtns.forEach((button) => {
      button.addEventListener('click', (event) => {
        watchedState.activeLng = event.target.textContent;
      })
    })

    infoBtn.addEventListener('click', (event) => {
      event.preventDefault();
      watchedState.clickValue = state.clickValue + 1;
    });
    resetBtn.addEventListener('click', (event) => {
      event.preventDefault();
      watchedState.clickValue = 0;
    })
  }

  app();
}