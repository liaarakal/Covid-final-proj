const ctx = document.getElementById('covidChart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'COVID-19 Cases',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                hidden: true // Initially hidden
            },
            {
                label: 'COVID-19 Deaths',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
                hidden: true // Initially hidden
            },
            {
                label: 'COVID-19 Hospitalized',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false,
                hidden: true // Initially hidden
            },
            {
                label: 'COVID-19 Tests Conducted',
                data: [],
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: false,
                hidden: true // Initially hidden
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MM/dd/yyyy',
                    displayFormats: {
                        day: 'MM/dd/yyyy'
                    }
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Count'
                },
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString(); // Display values with commas
                    }
                }
            }
        }
    }
});

async function fetchData() {
    const endpoint = 'https://api.covidtracking.com/v1/us/daily.json';
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

async function updateChart(status) {
    try {
        const data = await fetchData();

        const labels = data.map(item => new Date(item.dateChecked));
        let values = [];

        switch (status) {
            case 'cases':
                values = data.map(item => item.positive || 0);
                break;
            case 'deaths':
                values = data.map(item => item.death || 0);
                break;
            case 'hospitalized':
                values = data.map(item => item.hospitalizedCurrently || 0);
                break;
            case 'tests':
                values = data.map(item => item.totalTestResults || 0);
                break;
        }

        chart.data.labels = labels.reverse();

        chart.data.datasets.forEach((dataset, index) => {
            if (index === {
                'cases': 0,
                'deaths': 1,
                'hospitalized': 2,
                'tests': 3
            }[status]) {
                dataset.data = values.reverse();
                dataset.label = `COVID-19 ${status.charAt(0).toUpperCase() + status.slice(1)}`;
                dataset.hidden = false; 
            } else {
                dataset.hidden = true; // Hide other datasets
            }
        });

        chart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
    }
}

document.getElementById('casesButton').addEventListener('click', () => updateChart('cases'));
document.getElementById('deathsButton').addEventListener('click', () => updateChart('deaths'));
document.getElementById('hospitalizedButton').addEventListener('click', () => updateChart('hospitalized'));
document.getElementById('testsButton').addEventListener('click', () => updateChart('tests'));
updateChart('cases');
