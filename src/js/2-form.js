const refs = {
  formEl: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

const fillFormFields = event => {
  const formDataFormLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (formDataFormLS === null) {
    return;
  }

  formData = formDataFormLS;

  Object.keys(formDataFormLS).forEach(key => {
    event.elements[key].value = formDataFormLS[key];
  });
};

fillFormFields(refs.formEl);

const onFormInput = event => {
  const formField = event.target;
  const formFieldValue = formField.value.trim();
  const formFieldName = formField.name;

  formData[formFieldName] = formFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Please fill in all fields');
    return;
  }

  console.log(formData);

  event.target.reset();
  localStorage.removeItem('feedback-form-state');

  formData = { email: '', message: '' };
};

refs.formEl.addEventListener('input', onFormInput);
refs.formEl.addEventListener('submit', onFormSubmit);
