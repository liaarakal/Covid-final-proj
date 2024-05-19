let charts = {};
let map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

document.addEventListener('DOMContentLoaded', function() {
    fetchInitialData('USA', 'usa-chart', 'usa-tooltip', 'usa-map', 37.0902, -95.7129);
    fetchInitialData('Russia', 'russia-chart', 'russia-tooltip', 'russia-map', 55.751244, 37.618423);
    fetchInitialData('China', 'china-chart', 'china-tooltip', 'china-map', 35.86166, 104.195397);
});

function fetchInitialData(country, chartId, tooltipId, mapId, lat, long) {
    fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then(response => response.json())
        .then(data => {
            const { cases, deaths, recovered, active, population } = data;
            const stats = [deaths, recovered, active];
            createChart(chartId, tooltipId, stats, population);
            updateInitialMap(mapId, lat, long, country);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchCovidData() {
    const country = document.getElementById('country-input').value;
    fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('initial-stats').style.display = 'none';
            document.getElementById('stats').style.display = 'block';

            const { cases, deaths, recovered, active, population, countryInfo } = data;
            const stats = [deaths, recovered, active];
            updateChart('covid-chart', 'tooltip', stats, population);
            updateMap(countryInfo.lat, countryInfo.long, country);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again.');
        });
}

function createChart(chartId, tooltipId, data, population) {
    const size = Math.max(200, Math.min(600, population / 1000000));
    const chartContainer = document.getElementById(chartId).parentElement;
    chartContainer.style.width = `${size}px`;

    const ctx = document.getElementById(chartId).getContext('2d');
    if (charts[chartId]) {
        charts[chartId].destroy();
    }
    charts[chartId] = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Deaths', 'Recovered', 'Active'],
            datasets: [{
                label: 'COVID-19 Stats',
                data: data,
                backgroundColor: ['#dc3545', '#28a745', '#ffc107'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    onHover: (event, legendItem) => {
                        const tooltip = document.getElementById(tooltipId);
                        tooltip.innerHTML = `${legendItem.text}: ${data[legendItem.index]}`;
                        tooltip.style.display = 'block';
                        tooltip.style.left = `${event.clientX}px`;
                        tooltip.style.top = `${event.clientY}px`;
                    },
                    onLeave: () => {
                        const tooltip = document.getElementById(tooltipId);
                        tooltip.style.display = 'none';
                    }
                }
            }
        }
    });
}

function updateChart(chartId, tooltipId, data, population) {
    createChart(chartId, tooltipId, data, population);
}

function updateInitialMap(mapId, lat, long, country) {
    const mapInstance = L.map(mapId).setView([lat, long], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(mapInstance);
    L.marker([lat, long]).addTo(mapInstance)
        .bindPopup(`${country}`)
        .openPopup();
}

function updateMap(lat, long, country) {
    map.setView([lat, long], 5);
    L.marker([lat, long]).addTo(map)
        .bindPopup(`${country}`)
        .openPopup();
}