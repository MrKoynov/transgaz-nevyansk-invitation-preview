const form = document.querySelector('#rsvp-form');
const error = document.querySelector('#form-error');
const result = document.querySelector('#form-result');
const resultText = document.querySelector('#result-text');
const workshopFieldset = document.querySelector('#workshop-fieldset');

form.querySelectorAll('input[name="attendance"]').forEach(input => {
  input.addEventListener('change', () => {
    const cannotAttend = input.checked && input.value === 'no';
    workshopFieldset.hidden = cannotAttend;
    workshopFieldset.disabled = cannotAttend;
    if (cannotAttend) {
      workshopFieldset.querySelectorAll('input').forEach(checkbox => { checkbox.checked = false; });
    }
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.guestName.value.trim();
  const attendance = form.querySelector('input[name="attendance"]:checked');
  if (!name || !attendance) {
    error.textContent = 'Укажите ФИО и выберите вариант ответа.';
    error.hidden = false;
    if (!name) form.elements.guestName.focus();
    else form.querySelector('input[name="attendance"]').focus();
    return;
  }

  error.hidden = true;
  const workshops = [...form.querySelectorAll('input[name="workshop"]:checked')].map(input => input.value);
  resultText.textContent = `${name}: ${attendance.value === 'yes' ? 'приду' : 'не смогу прийти'}.${workshops.length ? ` Интересуют мастер-классы: ${workshops.join(', ')}.` : ''}`;
  form.hidden = true;
  result.hidden = false;
  result.querySelector('button').focus();
});

document.querySelector('#edit-response').addEventListener('click', () => {
  result.hidden = true;
  form.hidden = false;
  form.elements.guestName.focus();
});
