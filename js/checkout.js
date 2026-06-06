const API_URL = "http://localhost:5000/graphql";

const TICKET_PRICE = 500;
const BAGGAGE_PRICE_PER_KG = 10;

function formatDate(dateStr) {
    if (!dateStr) return "Unknown";

    return new Date(dateStr).toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function getFlightIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchFlightById(id) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
            query: `
                query {
                    flights {
                        id
                        flightNumber
                        airline
                        origin
                        destination
                        status
                        direction
                        scheduledDeparture
                        scheduledArrival
                        gate {
                            gateNumber
                            terminal
                        }
                    }
                }
            `
        })
    });

    const result = await response.json();
    const flights = result.data?.flights || [];

    return flights.find(f => f.id === id);
}

function calculateTotal() {
    const baggageWeight = Number(document.getElementById("baggageWeight").value || 0);
    const baggagePrice = baggageWeight * BAGGAGE_PRICE_PER_KG;
    const total = TICKET_PRICE + baggagePrice;

    document.getElementById("baggagePrice").innerText = `${baggagePrice} DKK`;
    document.getElementById("totalPrice").innerText = `${total} DKK`;
}

async function renderCheckout() {
    const flightId = getFlightIdFromUrl();
    const container = document.getElementById("checkoutDetails");

    if (!flightId) {
        container.innerHTML = `<h2>Missing flight ID</h2>`;
        return;
    }

    const flight = await fetchFlightById(flightId);

    if (!flight) {
        container.innerHTML = `<h2>Flight not found</h2>`;
        return;
    }

    const gateText = flight.gate
        ? `Gate ${flight.gate.gateNumber}, Terminal ${flight.gate.terminal}`
        : "Gate not assigned";

    container.innerHTML = `
        <div class="mb-3">
            <a href="flight-details.html?id=${flight.id}" class="btn btn-primary">
                <i class="fa fa-arrow-left"></i> Back to flight
            </a>
        </div>

        <h1 class="checkout-title">Checkout</h1>

        <div class="checkout-box">
            <h3>${flight.flightNumber} - ${flight.airline}</h3>

            <div class="checkout-meta">
                <p><i class="fa fa-plane"></i> From: ${flight.origin}</p>
                <p><i class="fa fa-map-marker"></i> To: ${flight.destination}</p>
                <p><i class="fa fa-clock-o"></i> Departure: ${formatDate(flight.scheduledDeparture)}</p>
                <p><i class="fa fa-clock-o"></i> Arrival: ${formatDate(flight.scheduledArrival)}</p>
                <p><i class="fa fa-map-signs"></i> ${gateText}</p>
                <p><i class="fa fa-info-circle"></i> Status: ${flight.status}</p>
            </div>
        </div>

        <div class="checkout-box">
            <h3>Baggage</h3>

            <label for="baggageWeight">Baggage weight in kg</label>
<input
    type="number"
    id="baggageWeight"
    class="form-control"
    min="0"
    step="0.5"
    placeholder="Enter baggage weight"
    value="0"
    onclick="if(this.value==='0') this.value='';"
    oninput="calculateTotal()"
/>
        </div>

        <div class="payment-box">
            <h2>Payment</h2>

            <div class="price-line">
                <span>Ticket</span>
                <span>${TICKET_PRICE} DKK</span>
            </div>

            <div class="price-line">
                <span>Baggage</span>
                <span id="baggagePrice">0 DKK</span>
            </div>

            <div class="price-line price-total">
                <span>Total</span>
                <span id="totalPrice">${TICKET_PRICE} DKK</span>
            </div>

            <button class="btn-pay mt-4" onclick="payNow('${flight.id}')">
                Pay
            </button>
        </div>
    `;
}

async function payNow(flightId) {
    const token = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user_info") || "{}");

    if (!token) {
        alert("You must be logged in to pay.");
        window.location.href = "login.html";
        return;
    }

    const baggageWeight = Number(document.getElementById("baggageWeight").value || 0);
    const baggagePrice = baggageWeight * BAGGAGE_PRICE_PER_KG;
    const totalPrice = TICKET_PRICE + baggagePrice;

    try {
        const bookingRequest = {
            flightId: flightId,
            returnFlightId: null,
            isOneWay: true,
            seatClass: 0,
            contactEmail: user.email || "test@example.com",
            contactPhone: "+4512345678",
            ticketPrice: totalPrice,
            passengers: [
                {
                    firstName: user.given_name || "Test",
                    lastName: user.family_name || "User",
                    dateOfBirth: "1995-01-01T00:00:00Z",
                    passportNumber: "TEST123456",
                    nationality: "Denmark",
                    isLeadPassenger: true,
                    hasExtraBaggage: baggageWeight > 0
                }
            ]
        };

        const bookingResponse = await fetch(
            "http://localhost:5000/api/Booking",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bookingRequest)
            }
        );

        const bookingText = await bookingResponse.text();

        if (!bookingResponse.ok) {
            alert("Booking failed: " + bookingText);
            return;
        }

        const booking = JSON.parse(bookingText);

        const paymentResponse = await fetch(
            "http://localhost:5000/api/payment/stripe/checkout",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    BookingId: booking.bookingId,
                    UserId: user.sub,
                    TotalPrice: totalPrice,
                    ContactEmail: bookingRequest.contactEmail,
                    ContactPhone: bookingRequest.contactPhone
                })
            }
        );

        const paymentText = await paymentResponse.text();

        if (!paymentResponse.ok) {
            alert("Payment failed: " + paymentText);
            return;
        }

        const payment = JSON.parse(paymentText);

        if (!payment.url) {
            alert("Stripe checkout URL missing.");
            return;
        }

        window.location.href = payment.url;

    } catch (error) {
        console.error(error);
        alert("Unexpected error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const year = document.querySelector(".tm-current-year");
    if (year) year.textContent = new Date().getFullYear();

    renderCheckout();
});