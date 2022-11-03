import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'reactjs-popup';

class RegistrationForm extends React.Component {
  render () {
    return (
      <div id="container" class="container m-3">
        <div class="col-5">
          <h1 class="my-4">Регистрация</h1>
          <form class="">
            <div class="mb-3">
              <label class="form-label" for="firstName">Имя</label>
              <input
                aria-describedby="popup-1"
                type="text"
                id="firstName"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="lastName">Фамилия</label>
              <input
                aria-describedby="popup-2"
                type="text"
                id="lastName"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="email">Email</label>
              <input
                aria-describedby="popup-3"
                type="email"
                id="email"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="password">Пароль</label>
              <input
                aria-describedby="popup-4"
                type="password"
                id="password"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const PopupExample = () => (  <Popup trigger={<button> Trigger</button>} position="right center">    <div>Popup content here !!</div>  </Popup>);

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<RegistrationForm />);
// root.render(<Test />);