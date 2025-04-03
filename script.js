document.getElementById('date').addEventListener('input', function () {
  const val = this.value.replace(/[^\d]/g, '');
  if (val.length >= 4) {
    document.getElementById('time').focus();
  }
});

document.getElementById('event-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const response = await fetch('https://tgwebapp-backend.onrender.com/create-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: document.getElementById('title').value,
      datetime: `2025-04-${document.getElementById('date').value.slice(0, 2)}T${document.getElementById('time').value}`,
      location: document.getElementById('location').value,
      description: document.getElementById('description').value,
      email: document.getElementById('email').value
    })
  });

  const data = await response.json();
  document.getElementById('result').innerText = data.status === 'success' ? 'Событие создано!' : ('Ошибка: ' + data.message);
});

function toggleDropdown() {
  const el = document.getElementById("dropdown");
  el.style.display = el.style.display === "none" ? "block" : "none";
}