import onChange from 'https://cdn.skypack.dev/on-change@~2.2.0';

window.onload = function() {  
  
  const state = {
    active: 'list-home-list',
  }

  const app = () => {
    const containers = document.querySelectorAll('.list-group-item');
    const listHome = document.getElementById('list-home-list');
    const listProfile = document.getElementById('list-profile-list');
    const watchedState = onChange(
      state, (path, value, previousValue) => {
        const previousActive = document.getElementById(previousValue);
        const nowActive = document.getElementById(value);
        const previousContent = document.querySelector(`[aria-labelledby='${previousValue}']`);
        const nowContent = document.querySelector(`[aria-labelledby='${value}']`);
        previousActive.classList.remove('active');
        nowActive.classList.add('active');
        previousContent.classList.remove('show');
        previousContent.classList.remove('active');
        nowContent.classList.add('active');
        nowContent.classList.add('show');
      }
    )
    // watchedState.active = 'something';
    console.log(containers);
    containers.forEach((container) => {
      container.addEventListener('click', (event) => {
        event.preventDefault();
        watchedState.active = container.id;
      })
    })
  }

  app();
}