const STORAGE_KEY = 'feedback-form-state';
let formData = { email: '', message: '' };

const refs = {
  form: document.querySelector('.feedback-form'),
};


refs.form.addEventListener('input', e => {
    formData.email = e.currentTarget.elements.email.value.trim();
    formData.message = e.currentTarget.elements.message.value.trim();

    saveToLocalStorage(STORAGE_KEY, formData);
});

function checkStorage() {
  const localData = loadFromLocalStorage(STORAGE_KEY);

  if(localData){
    refs.form.elements.email.value = localData.email || '';
    refs.form.elements.message.value = localData.message || '';
  }
}

checkStorage();


refs.form.addEventListener('submit', e => {
  e.preventDefault();
  formData.email = e.currentTarget.elements.email.value.trim();
  formData.message = e.currentTarget.elements.message.value.trim();
  
  if (!formData.message || !formData.message) {
     alert("Fill please all fields");
    return;
  } 

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  e.currentTarget.reset();
});



function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
  const userData = localStorage.getItem(key);
  try {
    return JSON.parse(userData);
  } catch {
    return userData;
  }
}

