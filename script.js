window.Telegram?.WebApp?.expand();

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("app").style.display = "block";
  }, 1000);
};

function submitEvent() {
  const datetimeInput = document.getElementById("datetime").value;
  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const note = document.getElementById("note").value;
  const email = document.getElementById("email").value;

  if (!datetimeInput || !title) {
    alert("Пожалуйста, заполните хотя бы название и дату");
    return;
  }

  const data = {
    title: title,
    datetime: datetimeInput,
    location: location,
    description: note,
    email: email
  };

  document.getElementById("result").innerText = "⏳ Отправка...";

  fetch("https://tgwebappcalendar-backend.onrender.com/create-event", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    document.getElementById("result").innerText = res.message || "Событие добавлено!";
    resetForm();
  })
  .catch(err => {
    document.getElementById("result").innerText = "Ошибка при создании события";
    console.error("Ошибка:", err);
  });
}

function resetForm() {
  document.getElementById("datetime").value = "";
  document.getElementById("title").value = "";
  document.getElementById("location").value = "";
  document.getElementById("note").value = "";
  document.getElementById("email").value = "";
}

function toggleExtra() {
  const el = document.getElementById("extra-fields");
  el.style.display = el.style.display === "none" ? "block" : "none";
}

document.addEventListener("click", function (e) {
  const active = document.activeElement;
  if (
    active &&
    (active.tagName === "INPUT" || active.tagName === "TEXTAREA") &&
    !e.target.closest("input, textarea")
  ) {
    active.blur();
  }
});
