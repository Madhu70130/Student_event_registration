const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

function selectEvent(eventName) {
  document.getElementById("event").value = eventName;
  document.getElementById("register").scrollIntoView({ behavior: "smooth" });
}

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(error => error.textContent = "");
  successMessage.style.display = "none";
}

function getSelectedGender() {
  const selected = document.querySelector('input[name="gender"]:checked');
  return selected ? selected.value : "";
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const college = document.getElementById("college").value.trim();
  const department = document.getElementById("department").value;
  const year = document.getElementById("year").value;
  const selectedEvent = document.getElementById("event").value;
  const date = document.getElementById("date").value;
  const gender = getSelectedGender();
  const terms = document.getElementById("terms").checked;

  let valid = true;

  if (!/^[A-Za-z ]{3,50}$/.test(name)) {
    setError("nameError", "Enter a valid name (letters and spaces only).");
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("emailError", "Enter a valid email address.");
    valid = false;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    setError("phoneError", "Enter a valid 10-digit mobile number.");
    valid = false;
  }

  if (college.length < 3) {
    setError("collegeError", "Enter your college name.");
    valid = false;
  }

  if (!department) {
    setError("departmentError", "Please select your department.");
    valid = false;
  }

  if (!year) {
    setError("yearError", "Please select your year.");
    valid = false;
  }

  if (!selectedEvent) {
    setError("eventError", "Please select an event.");
    valid = false;
  }

  if (!date) {
    setError("dateError", "Please select the registration date.");
    valid = false;
  }

  if (!gender) {
    setError("genderError", "Please select your gender.");
    valid = false;
  }

  if (!terms) {
    setError("termsError", "Please confirm that the information is accurate.");
    valid = false;
  }

  if (!valid) return;

  const registrationId = "EVT" + Math.floor(100000 + Math.random() * 900000);

  const registration = {
    id: registrationId,
    name,
    email,
    phone,
    college,
    department,
    year,
    event: selectedEvent,
    date,
    gender,
    status: "Confirmed"
  };

  localStorage.setItem("eventRegistration", JSON.stringify(registration));

  successMessage.innerHTML = `
    <strong>Registration Successful!</strong><br>
    Your Registration ID is <strong>${registrationId}</strong>.<br>
    Event: <strong>${selectedEvent}</strong><br>
    Please save your registration ID for tracking.
  `;
  successMessage.style.display = "block";

  form.reset();
  successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
});

function trackRegistration() {
  const enteredId = document.getElementById("trackingId").value.trim().toUpperCase();
  const result = document.getElementById("trackingResult");
  const saved = JSON.parse(localStorage.getItem("eventRegistration"));

  if (!enteredId) {
    result.textContent = "Please enter a registration ID.";
    return;
  }

  if (saved && enteredId === saved.id) {
    result.innerHTML = `
      <div>
        ✅ Registration Found<br>
        <strong>Name:</strong> ${saved.name}<br>
        <strong>Event:</strong> ${saved.event}<br>
        <strong>Status:</strong> ${saved.status}
      </div>
    `;
  } else {
    result.textContent = "Registration ID not found. Please check the ID and try again.";
  }
}
