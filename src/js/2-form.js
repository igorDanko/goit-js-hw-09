const refs = {
  formEl: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

const fillFormFields = form => {
  const formDataFormLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (formDataFormLS === null) {
    return;
  }

  formData = formDataFormLS;

  const formDataFormLSKeys = Object.keys(formDataFormLS);

  formDataFormLSKeys.forEach(key => {
    form.elements[key].value = formDataFormLS[key];
  });
};

fillFormFields(refs.formEl);

const onFormInput = ({ target: formField }) => {
  const formFieldValue = formField.value.trim();
  const formFieldName = formField.name;

  formData[formFieldName] = formFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = event => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  event.target.reset();
  localStorage.removeItem('feedback-form-state');
};

refs.formEl.addEventListener('input', onFormInput);

refs.formEl.addEventListener('submit', onFormSubmit);
