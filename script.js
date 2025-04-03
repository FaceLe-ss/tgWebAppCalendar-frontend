
document.getElementById('event-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    datetime: document.getElementById('datetime').value,
    title: document.getElementById('title').value,
    location: document.getElementById('location').value,
    description: document.getElementById('description').value,
    email: document.getElementById('email').value
  };

  const response = await fetch('https://tgwebapp-backend.onrender.com/create-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.text();
  document.getElementById('result').textContent = result;
});

function toggleDropdown() {
  const dropdown = document.getElementById('dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}
