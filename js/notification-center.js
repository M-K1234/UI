const notifications = [
    {
        id: 1,
        title: "Payment confirmed",
        message: "Your Bangkok flight has been booked.",
        time: "2 min ago",
        type: "success",
        read: false,
        link: "flight-details.html?id=1"
    },
    {
        id: 2,
        title: "Pending payment",
        message: "Your Paris booking needs payment.",
        time: "1 hour ago",
        type: "warning",
        read: false,
        link: "flight-details.html?id=3"
    },
    {
        id: 3,
        title: "Flight reminder",
        message: "Your Tokyo flight is tomorrow.",
        time: "Yesterday",
        type: "info",
        read: true,
        link: "flight-details.html?id=8"
    }
];

function getIcon(type) {
    switch(type) {
        case "success": return "fa-check-circle";
        case "warning": return "fa-exclamation-circle";
        default: return "fa-info-circle";
    }
}

function renderNotifications() {
    const container = document.getElementById("notificationList");

    if (!notifications.length) {
        container.innerHTML = `
            <div class="text-center">
                <h3>No notifications</h3>
            </div>
        `;
        return;
    }

    container.innerHTML = notifications.map(n => `
        <div class="notification-card ${!n.read ? "notification-unread" : ""}" 
             onclick="openNotification(${n.id})">

            <div class="notification-icon">
                <i class="fa ${getIcon(n.type)}"></i>
            </div>

            <div class="notification-content">
                <h4>${n.title}</h4>
                <p>${n.message}</p>
                <span class="notification-time">${n.time}</span>
            </div>

        </div>
    `).join("");
}

function openNotification(id) {
    const notif = notifications.find(n => n.id === id);

    if (!notif) return;

    notif.read = true;

    window.location.href = notif.link;
}

function markAllRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
}

document.querySelector(".tm-current-year").textContent = new Date().getFullYear();

renderNotifications();