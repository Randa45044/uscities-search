"use strict";

const BASE_URL =
    "https://randa45044-uscities-microservices-ehhqffhagcfefxdx.eastus-01.azurewebsites.net";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

let debounceTimer = null;
let latestRequestNumber = 0;

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function displayResults(data) {
    if (!Array.isArray(data)) {
        throw new Error("Malformed response received from the microservice.");
    }

    if (data.length === 0) {
        results.innerHTML =
            '<p class="status-message">No cities found.</p>';
        return;
    }

    const rows = data.map((city) => {
        const cityName = escapeHTML(city.city);
        const stateId = escapeHTML(city.state_id);
        const stateName = escapeHTML(city.state_name);
        const countyName = escapeHTML(city.county_name);
        const timezone = escapeHTML(city.timezone);
        const zips = escapeHTML(city.zips);

        return `
            <tr>
                <td>${cityName}</td>
                <td>${stateId}</td>
                <td>${stateName}</td>
                <td>${countyName}</td>
                <td>${timezone}</td>
                <td>${zips}</td>
            </tr>
        `;
    }).join("");

    results.innerHTML = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>City</th>
                    <th>State ID</th>
                    <th>State</th>
                    <th>County</th>
                    <th>Timezone</th>
                    <th>ZIP Codes</th>
                </tr>
            </thead>

            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

async function searchCities() {
    const query = searchInput.value.trim();

    if (!query) {
        results.innerHTML =
            '<p class="status-message">Please enter a city name or ZIP code.</p>';
        return;
    }

    const requestNumber = ++latestRequestNumber;

    results.innerHTML =
        '<p class="status-message">Searching...</p>';

    try {
        const requestURL =
            `${BASE_URL}/uscities-search/${encodeURIComponent(query)}`;

        console.log("Debug>request URL:", requestURL);

        const response = await fetch(requestURL);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}.`);
        }

        const data = await response.json();

        if (requestNumber !== latestRequestNumber) {
            return;
        }

        displayResults(data);
    } catch (error) {
        console.error("Debug>search error:", error);

        if (requestNumber !== latestRequestNumber) {
            return;
        }

        results.innerHTML = `
            <p class="error-message">
                Error: Could not load city results.
            </p>
        `;
    }
}

searchBtn.addEventListener("click", searchCities);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        clearTimeout(debounceTimer);
        searchCities();
    }
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        return;
    }

    clearTimeout(debounceTimer);

    const query = searchInput.value.trim();

    if (query.length < 2) {
        latestRequestNumber++;

        results.innerHTML =
            '<p class="status-message">Type at least 2 characters for live search.</p>';

        return;
    }

    debounceTimer = setTimeout(searchCities, 300);
});
