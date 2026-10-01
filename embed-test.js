const guestFormFrame = document.querySelector('.form-embed iframe');

if (guestFormFrame) {
  let guestHasFocusedForm = false;

  guestFormFrame.addEventListener('focus', () => { guestHasFocusedForm = true; });
  window.addEventListener('blur', () => {
    if (document.activeElement === guestFormFrame) guestHasFocusedForm = true;
  });

  guestFormFrame.addEventListener('load', () => {
    if (!guestHasFocusedForm) return;
    document.querySelector('#guest-form').scrollIntoView({ block: 'start' });
    guestHasFocusedForm = false;
  });
}
