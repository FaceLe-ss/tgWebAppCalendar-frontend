console.log("🔧 Telegram WebApp Init:", window.Telegram?.WebApp?.initData);

window.Telegram?.WebApp?.ready();

document.getElementById('date').addEventListener('input', function () {
  const val = this.value.replace(/[^\d]/g, '');
  if (val.length === 4) {
    document.getElementById('time').focus();
  }
});

document.getElementById('event-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const payload = {
    title: document.getElementById('title').value,
    datetime: `2025-04-${document.getElementById('date').value.slice(0, 2)}T${document.getElementById('time').value}`,
    location: document.getElementById('location').value,
    description: document.getElementById('description').value,
    email: document.getElementById('email').value
  };

  console.log("📦 Отправка запроса:", payload);

  try {
    const response = await fetch('https://tgwebapp-backend.onrender.com/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("✅ Ответ от сервера:", data);

    document.getElementById('result').innerText = 
      data.status === 'success' ? 'Событие создано!' : ('Ошибка: ' + data.message);
  } catch (error) {
    console.error("❌ Ошибка при fetch:", error);
    document.getElementById('result').innerText = "Ошибка соединения";
  }
});

function toggleDropdown() {
  const el = document.getElementById("dropdown");
  el.style.display = el.style.display === "none" ? "block" : "none";
}