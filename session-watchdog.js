// ⏱️ AUTO LOGOUT TIME (in milliseconds)
// 1 hour = 60 * 60 * 1000
const AUTO_LOGOUT_TIME = 60 * 60 * 1000;
 
// For testing (example: 30 seconds)
// const AUTO_LOGOUT_TIME = 30 * 1000;
let inactivityTimer;

let hasLoggedOut = false;

// Call your existing logout logic here
function autoLogout() {
  if (hasLoggedOut) return;
  hasLoggedOut = true;
  alert("You have been logged out due to inactivity.");

  sessionStorage.clear();
  localStorage.removeItem("lastActivityTime");
  window.location.replace("login.html");

}
// Reset inactivity timer
function resetInactivityTimer() {
  // Save only ONE timestamp.
  // Every activity overwrites the previous one.
  localStorage.setItem("lastActivityTime", Date.now());
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(autoLogout, AUTO_LOGOUT_TIME);
}

function checkInactivity() {
  const lastActivity = Number(localStorage.getItem("lastActivityTime"));
  if (!lastActivity) {
    resetInactivityTimer();
    return;
  }
  const inactiveFor = Date.now() - lastActivity;
  if (inactiveFor >= AUTO_LOGOUT_TIME) {
    autoLogout();
  } else {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(
      autoLogout,
      AUTO_LOGOUT_TIME - inactiveFor
    );
  }
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
checkInactivity();

window.addEventListener("focus", checkInactivity);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    checkInactivity();
  }
});
