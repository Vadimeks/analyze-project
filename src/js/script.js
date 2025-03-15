document.addEventListener('DOMContentLoaded', () => {
  // Паказаць секцыю ўводу дадзеных
  document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('input-section').style.display = 'block';
  });

  // Даданне падказак і праверка ўводу ў рэальным часе
  document.querySelectorAll('input[name="parameter"]').forEach(input => {
    // Стварэнне элемента для падказкі
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.innerText =
      'Увядзіце цэлае чысло да 3 знакаў, максімум 2 знакі пасля кропкі';
    hint.style.display = 'none'; // Спачатку схавана
    input.parentElement.appendChild(hint);

    // Праверка валіднасці падчас уводу
    input.addEventListener('input', () => {
      const value = input.value.trim();
      if (/^\d{1,3}(\.\d{1,2})?$/.test(value)) {
        input.style.borderColor = 'green'; // Валідны інпут
        hint.style.display = 'none'; // Хаваем падказку
      } else {
        input.style.borderColor = 'red'; // Невалідны інпут
        hint.style.display = 'block'; // Паказваем падказку
      }
    });

    // Паказаць падказку пры фокусе
    input.addEventListener('focus', () => {
      if (!/^\d{1,3}(\.\d{1,2})?$/.test(input.value.trim())) {
        hint.style.display = 'block'; // Паказваем падказку
      }
    });

    // Схаваць падказку пры страце фокусу
    input.addEventListener('blur', () => {
      hint.style.display = 'none'; // Хаваем падказку
    });
  });

  // Захаванне дадзеных пры адпаведнасці ўсіх умоў
  document.getElementById('save-button').addEventListener('click', () => {
    const date = document.getElementById('date-input').value;

    // Правяраем, ці ўведзена дата
    if (!date) {
      alert('Калі ласка, выберыце дату.');
      return;
    }

    const inputs = document.querySelectorAll('input[name="parameter"]');
    let hasValidInput = false; // Каб праверыць, ці ёсць валідныя значэнні
    const values = {}; // Аб'ект для захавання

    inputs.forEach(input => {
      const value = input.value.trim();

      // Праверка валіднасці
      if (/^\d{1,3}(\.\d{1,2})?$/.test(value)) {
        input.style.borderColor = 'green'; // Валідны інпут
        hasValidInput = true; // Знойдзена валіднае значэнне
        values[input.id] = parseFloat(value); // Захоўваем як чысла
      } else {
        input.style.borderColor = 'red'; // Невалідны інпут
        values[input.id] = 0; // Калі не валідна, запісваецца як 0
      }
    });

    // Правяраем, ці ёсць хаця б адно валіднае значэнне
    if (!hasValidInput) {
      alert('Калі ласка, увядзіце хаця б адно валіднае значэнне.');
      return;
    }

    console.log(`Дата: ${date}`);
    console.log('Захаваныя значэнні:', values);

    alert('Дадзеныя захаваныя!');
    document.getElementById('input-section').style.display = 'none';
    document.getElementById('actions-section').style.display = 'block';
  });

  // Ачыстка для новага дня
  document.getElementById('input-another-day').addEventListener('click', () => {
    document.getElementById('actions-section').style.display = 'none';
    document.getElementById('input-section').style.display = 'block';

    // Скід інпутаў і даты
    document.getElementById('date-input').value = '';
    document.querySelectorAll('input[name="parameter"]').forEach(input => {
      input.value = '';
      input.style.borderColor = ''; // Скідаем рамку
      const hint = input.parentElement.querySelector('.hint'); // Знаходзім падказку
      if (hint) {
        hint.style.display = 'none'; // Скідаем стан падказкі
      }
    });
  });

  // Часовы аналіз
  document.getElementById('view-analysis').addEventListener('click', () => {
    alert('Тут будзе ваш аналіз дадзеных (рэалізуецца пазней).');
  });
});
