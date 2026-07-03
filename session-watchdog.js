// ⏱️ AUTO LOGOUT TIME (in milliseconds)
// 1 hour = 60 * 60 * 1000
const AUTO_LOGOUT_TIME = 60 * 60 * 1000;

// For testing (example: 30 seconds)
// const AUTO_LOGOUT_TIME = 30 * 1000;
let inactivityTimer;

// Call your existing logout logic here
function autoLogout() {
  alert("You have been logged out due to inactivity.");
  sessionStorage.clear();
  localStorage.clear(); // optional
  window.location.href = "login.html";
}

// Reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(autoLogout, AUTO_LOGOUT_TIME);
}

// Activity events to monitor
const activityEvents = [
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
  "touchstart"
];

// Attach listeners
activityEvents.forEach(event => {
  document.addEventListener(event, resetInactivityTimer, true);
});

// Start timer on page load
resetInactivityTimer();