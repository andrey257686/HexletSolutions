import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'reactjs-popup';

const fields = [
  {
    id: 'firstName',
    title: 'Имя',
    type: 'text',
    description: 'Ваше имя',
  },
  {
    id: 'lastName',
    title: 'Фамилия',
    type: 'text',
    description: 'Ваша фамилия',
  },
  {
    id: 'email',
    title: 'Email',
    type: 'email',
    description: 'Ваш email',
  },
  {
    id: 'password',
    title: 'Пароль',
    type: 'password',
    description: 'Придумайте надёжный пароль',
  },
];

const Prompt = ({ text }) => (
  <label className="form-label">{text} </label>
);

const Input = ( { item } ) => {
  return (
    <div className='mb-3'>
    <label className="form-label" for={item.id}>{item.title}</label>
    <Popup
      trigger={<input
        aria-describedby="popup-1"
        type={item.type}
        id={item.id}
        className="form-control"
      />}
      position="right top"
      on="hover"
    >
    <Prompt text={item.description}/>
    </Popup>
    </div>
  )
}

class RegistrationForm extends React.Component {
  render () {
    return (
        <div className="col-5">
          <h1 className="my-4">Регистрация</h1>
          <form className="">
          {
            fields.map((field) => {
              return (
                <Input item={field} />
              )
            })
          }
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<RegistrationForm />);