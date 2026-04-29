const flights = [
  {
    id: 1,
    departure_time: "2018-04-18 13:00:00",
    arrival_time: "2018-04-19 15:00:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "Thailand",
    arrival_city: "Bangkok",
    arrival_airport: "BKK",
    arrival_continent: "asia",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "bkk.png"
  },
  {
    id: 2,
    departure_time: "2018-04-19 09:30:00",
    arrival_time: "2018-04-19 10:45:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "Germany",
    arrival_city: "Berlin",
    arrival_airport: "BER",
    arrival_continent: "europe",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "ber.png"
  },
  {
    id: 3,
    departure_time: "2018-04-20 07:15:00",
    arrival_time: "2018-04-20 09:30:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "France",
    arrival_city: "Paris",
    arrival_airport: "CDG",
    arrival_continent: "europe",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "cdg.jpg"
  },
  {
    id: 4,
    departure_time: "2018-04-21 14:00:00",
    arrival_time: "2018-04-21 15:10:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "UK",
    arrival_city: "London",
    arrival_airport: "LHR",
    arrival_continent: "europe",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "lhr.png"
  },
  {
    id: 5,
    departure_time: "2018-04-22 11:20:00",
    arrival_time: "2018-04-22 14:50:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "Spain",
    arrival_city: "Madrid",
    arrival_airport: "MAD",
    arrival_continent: "europe",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "mad.svg"
  },
  {
    id: 6,
    departure_time: "2018-04-23 16:40:00",
    arrival_time: "2018-04-23 19:30:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "Italy",
    arrival_city: "Rome",
    arrival_airport: "FCO",
    arrival_continent: "europe",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "fco.png"
  },
  {
    id: 7,
    departure_time: "2018-04-24 12:00:00",
    arrival_time: "2018-04-24 15:30:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "USA",
    arrival_city: "New York",
    arrival_airport: "JFK",
    arrival_continent: "north-america",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "jfk.jpg"
  },
  {
    id: 8,
    departure_time: "2018-04-25 10:00:00",
    arrival_time: "2018-04-26 08:00:00",
    departure_country: "Denmark",
    departure_city: "Copenhagen",
    departure_airport: "CPH",
    arrival_country: "Japan",
    arrival_city: "Tokyo",
    arrival_airport: "HND",
    arrival_continent: "asia",
    departure_airport_logo: "cph.png",
    arrival_airport_logo: "hnd.svg"
  }
];

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function getFlightIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("id"));
}

function renderFlightDetails() {
    const flightId = getFlightIdFromUrl();
    const flight = flights.find(f => f.id === flightId);

    const container = document.getElementById("flightDetails");

    if (!flight) {
        container.innerHTML = `
            <h2>Flight not found</h2>
            <a href="../index.html" class="btn btn-primary mt-3">Back to flights</a>
        `;
        return;
    }

    const price = Math.floor(Math.random() * 500 + 200);
container.innerHTML = `
    <div class="mb-3">
        <button onclick="goBack()" class="btn btn-primary">
            <i class="fa fa-arrow-left"></i> Back
        </button>
    </div>

    <div class="flight-header">
        <h1 class="flight-route-title">
            ${flight.departure_city} → ${flight.arrival_city}
        </h1>
        <span class="flight-badge">${flight.arrival_continent}</span>
    </div>

    <div class="row flight-info-box">
        <div class="col-md-3 text-center">
            <img src="../img/${flight.departure_airport_logo}" class="flight-airport-logo">
            <h5 class="mt-3">${flight.departure_airport}</h5>
        </div>

        <div class="col-md-6">
            <h3>Flight Information</h3>

            <div class="flight-meta">
                <p><i class="fa fa-plane"></i>
                    ${flight.departure_city}, ${flight.departure_country}
                </p>

                <p><i class="fa fa-map-marker"></i>
                    ${flight.arrival_city}, ${flight.arrival_country}
                </p>

                <p><i class="fa fa-clock-o"></i>
                    Departure: ${formatDate(flight.departure_time)}
                </p>

                <p><i class="fa fa-clock-o"></i>
                    Arrival: ${formatDate(flight.arrival_time)}
                </p>
            </div>
        </div>

        <div class="col-md-3 text-center">
            <img src="../img/${flight.arrival_airport_logo}" class="flight-airport-logo">
            <h5 class="mt-3">${flight.arrival_airport}</h5>
        </div>
    </div>

    <div class="booking-box">
        <h2>$${price}</h2>
        <p>Secure your seat now.</p>

        <button class="btn-book-flight" onclick="createBooking(${flight.id})">
            Buy Ticket
        </button>
    </div>

    <div class="text-center mt-4">
        <a href="../index.html" class="btn btn-primary">
            Browse more flights
        </a>
    </div>
`;
}

function createBooking(flightId) {
    alert("Booking created for flight ID: " + flightId);

    // Senere kan du ændre den til fx:
    // window.location.href = `/booking.html?flightId=${flightId}`;

    // Eller kalde backend:
    // fetch("/api/bookings", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ flightId })
    // });
}

document.querySelector(".tm-current-year").textContent = new Date().getFullYear();

function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "../index.html";
    }
}

renderFlightDetails();