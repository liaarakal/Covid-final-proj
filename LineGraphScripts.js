const ctx = document.getElementById('covidChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'COVID-19 Data',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
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
                }
            }
        }
    }
});

async function fetchData(status) {
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
        const data = await fetchData(status);
        
        const labels = data.map(item => new Date(item.dateChecked));
        let values;
        
        switch(status) {
            case 'cases':
                values = data.map(item => item.positive);
                break;
            case 'deaths':
                values = data.map(item => item.death);
                break;
            case 'recovered':
                values = data.map(item => item.recovered);
                break;
        }

        chart.data.labels = labels.reverse();
        chart.data.datasets[0].data = values.reverse();
        chart.data.datasets[0].label = `COVID-19 ${status.charAt(0).toUpperCase() + status.slice(1)}`;
        chart.update();
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
    }
}

document.getElementById('casesButton').addEventListener('click', () => updateChart('cases'));
document.getElementById('deathsButton').addEventListener('click', () => updateChart('deaths'));
document.getElementById('recoveredButton').addEventListener('click', () => updateChart('recovered'));
