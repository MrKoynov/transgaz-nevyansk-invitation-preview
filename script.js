const rsvpForm = document.querySelector('#rsvp-form');
const workshopField = document.querySelector('#workshop-field');
const result = document.querySelector('#form-result');
const resultStatus = document.querySelector('#result-status');
const receiptFrame = document.querySelector('#rsvp-receipt');
const submitButton = rsvpForm?.querySelector('button[type="submit"]');
let awaitingReceipt = false;

if (rsvpForm && workshopField && result && resultStatus && receiptFrame && submitButton) {
  rsvpForm.querySelectorAll('input[name="entry.1104383228"]').forEach((option) => {
    option.addEventListener('change', () => {
      const isDeclining = rsvpForm.querySelector('input[name="entry.1104383228"]:checked')?.value === 'Нет, не смогу прийти';
      workshopField.disabled = isDeclining;
      if (isDeclining) {
        workshopField.querySelectorAll('input[type="checkbox"]').forEach((workshop) => { workshop.checked = false; });
      }
    });
  });

  rsvpForm.addEventListener('submit', () => {
    awaitingReceipt = true;
    submitButton.disabled = true;
    result.hidden = false;
    rsvpForm.hidden = true;
    result.querySelector('h3').textContent = 'Проверяем ответ';
    resultStatus.textContent = 'Ожидаем подтверждение Google Формы…';
    receiptFrame.hidden = true;
    result.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });

  receiptFrame.addEventListener('load', () => {
    if (!awaitingReceipt) return;
    try {
      if (receiptFrame.contentWindow.location.href === 'about:blank') return;
    } catch {
      // The Google confirmation page has a different origin.
    }
    awaitingReceipt = false;
    result.querySelector('h3').textContent = 'Ответ отправлен';
    resultStatus.textContent = 'Проверьте сообщение Google ниже. Если возникла ошибка, вернитесь к анкете и попробуйте снова.';
    receiptFrame.hidden = false;
    receiptFrame.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });

  document.querySelector('#result-back').addEventListener('click', () => {
    awaitingReceipt = false;
    submitButton.disabled = false;
    result.hidden = true;
    rsvpForm.hidden = false;
    rsvpForm.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}
