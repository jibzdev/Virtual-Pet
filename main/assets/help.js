function notify(msg, what) {
  const notificationContainer = document.querySelector('#notification-container');
  const notifications = notificationContainer.querySelectorAll('.notification');

  if (notifications.length >= 5) {
    const oldestNotification = notifications[0];
    oldestNotification.classList.add('hidden');
    setTimeout(() => {
      oldestNotification.remove();
    }, 500);
  }

  const visibleNotifications = notificationContainer.querySelectorAll('.notification:not(.hidden)');

  if (visibleNotifications.length > 4) {
    for (let i = 4; i < visibleNotifications.length; i++) {
      visibleNotifications[i].classList.add('hidden');
    }
  }
  const message = msg;
  const notification = document.createElement('div');
  notification.classList.add('notification', 'top-right');
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('hidden');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
}

const button = document.querySelector('button');
let enabled;
button.addEventListener('click', () => {
  if (enabled === false) {
    enabled = true;
    notify('Dev Tools Enabled. ✔️', 'clean');
    localStorage.setItem('devTools', enabled);
  } else {
    enabled = false;
    localStorage.setItem('devTools', enabled);
    notify('Dev Tools Disabled. ❌', 'clean');
  }
});
