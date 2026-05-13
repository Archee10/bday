const CORRECT_PASSCODE = '1905';
let currentInput = '';

const slots = document.querySelectorAll('.slot');
const keys = document.querySelectorAll('.key');
const errorMessage = document.getElementById('error-message');
const passcodeContainer = document.querySelector('.passcode-slots');

keys.forEach(key => {
  key.addEventListener('click', () => {
    const keyValue = key.getAttribute('data-key');

    // Ignore star and hash for now, or clear on them
    if (keyValue === '*' || keyValue === '#') {
      currentInput = '';
      updateSlots();
      errorMessage.classList.remove('show');
      return;
    }

    if (currentInput.length < 4) {
      currentInput += keyValue;
      updateSlots();

      if (currentInput.length === 4) {
        checkPasscode();
      }
    }
  });
});

function updateSlots() {
  slots.forEach((slot, index) => {
    if (index < currentInput.length) {
      slot.textContent = currentInput[index];
      slot.classList.add('filled');
    } else {
      slot.textContent = '';
      slot.classList.remove('filled');
    }
  });
}

function checkPasscode() {
  // Small delay to let user see the last entered digit
  setTimeout(() => {
    if (currentInput === CORRECT_PASSCODE) {
      // Correct! Add some success visual and redirect
      slots.forEach(slot => {
        slot.style.borderColor = 'var(--light-blue)';
        slot.style.color = 'var(--light-blue)';
      });
      setTimeout(() => {
        window.location.href = 'video.html';
      }, 500);
    } else {
      // Incorrect! Show error, animate shake, and clear
      passcodeContainer.classList.add('shake');
      errorMessage.classList.add('show');

      setTimeout(() => {
        passcodeContainer.classList.remove('shake');
        currentInput = '';
        updateSlots();
      }, 500);

      // Hide error message after a while
      setTimeout(() => {
        errorMessage.classList.remove('show');
      }, 2000);
    }
  }, 150);
}
