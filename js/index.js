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
    arrival_airport_logo: "ber.svg"
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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}, ${day}.${month}.${year}`;
}

function createFlightCard(flight) {
    return `
        <div class="tm-recommended-place-wrap">
            <div class="tm-recommended-place">
                <img src="img/${flight.departure_airport_logo}" alt="${flight.departure_airport}" class="img-fluid img-thumbnail tm-logo-medium tm-recommended-img">

                <div class="tm-recommended-description-box">
                    <h3 class="tm-recommended-title">
                        From ${flight.departure_country}, ${flight.departure_city}
                        to ${flight.arrival_country}, ${flight.arrival_city}
                    </h3>

                    <p class="tm-text-highlight">
                        ${formatDate(flight.departure_time)} - ${formatDate(flight.arrival_time)}
                    </p>

                    <p class="tm-text-gray">
                        ${flight.departure_country}, ${flight.departure_airport}
                        - ${flight.arrival_country}, ${flight.arrival_airport}
                    </p>
                </div>

                <a href="#" class="tm-recommended-price-box">
                    <p class="tm-recommended-price">$${Math.floor(Math.random() * 500 + 200)}</p>
                    <p class="tm-recommended-price-link">Continue Reading</p>
                </a>
            </div>
        </div>
        <br>
    `;
}

function renderFlights() {
    flights.forEach(flight => {
        const continentPane = document.getElementById(flight.arrival_continent);

        if (continentPane) {
            continentPane.innerHTML += createFlightCard(flight);
        }
    });
}

renderFlights();