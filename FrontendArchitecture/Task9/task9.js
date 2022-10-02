import * as y from 'https://cdn.skypack.dev/yup@0.30.0';
// import axios from 'https://cdn.skypack.dev/axios@0.21.0';
import onChange from 'https://cdn.skypack.dev/on-change@2.2.0';

window.onload = function() {  

  const yup = !y.object ? y.default : y;
  
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    passwordConfirmation: yup.string().required().oneOf([yup.ref("password"), null],"Password confirmation does not match to password"),
    },
  );

  const app = () => {

    const state = {
      RegistrationForm: {
        state: 'invalid',
        data: {
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        },
        errors: {},
      }
    };

    const divs = {
      name: 'Name is a required field',
      email: 'Value is not a valid email',
      password: 'Must be at least 6 letters',
      passwordConfirmation: 'Password confirmation does not match to password',
    }

    const form = document.querySelector('form');
    const button = document.querySelector('.btn');
    
    const validate = (item) => {
      schema
        .validateAt(`${item}`, state.RegistrationForm.data)
        .then(() => {
          delete state.RegistrationForm.errors[item];
          validateAll();
          render();
        })
        .catch(err  => {
          state.RegistrationForm.errors[item] = err.errors;
          watchedState.RegistrationForm.state = 'invalid';
          render();
        })
    }

    const validateAll = () => {
      try{
        schema.validateSync(state.RegistrationForm.data ,{ abortEarly: false });
        state.RegistrationForm.state = 'valid';
      }
      catch (err) {
        state.RegistrationForm.state = 'invalid';
      }
    }

    const render = () => {
      const dataKeys = Object.keys(state.RegistrationForm.data);
      const errors = state.RegistrationForm.errors;
      if (state.RegistrationForm.state === 'invalid'){
        button.disabled = true;
        dataKeys.forEach((key) => {
          if (errors[key]){
            form.elements[key].classList.add("is-invalid");
            const parentForm = form.elements[key].parentNode;
            if (!parentForm.querySelector('.invalid-feedback')){
              const errDiv = document.createElement('div');
              errDiv.classList.add('invalid-feedback');
              const errDivText = document.createTextNode(divs[key]);
              errDiv.append(errDivText);
              parentForm.append(errDiv);
            }
          }
          else {
            form.elements[key].classList.remove("is-invalid");
          }
        })
      }
      else {
        dataKeys.forEach((key) => form.elements[key].classList.remove("is-invalid"));
        button.disabled = false;
      }
    }

    const watchedState = onChange(state, async (path, value, previousValue) => {
      const arrPath = path.split('.');
      const item = arrPath[arrPath.length - 1];
      validate(item);
    }
    );

    const formElements = form.elements;
    [...formElements].forEach((element) => {
      element.addEventListener('input', (event) => {
        watchedState.RegistrationForm.data[element.name] = event.target.value;
      })})

  }

  app();
}