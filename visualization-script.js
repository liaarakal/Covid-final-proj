document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('covid-chart').getContext('2d');
    let covidChart;

    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
        .then(response => response.json())
        .then(data => {
            const labels = Object.keys(data.cases);
            const dailyCases = calculateDailyCases(data.cases);

            covidChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Daily New Cases',
                        data: dailyCases,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Cases'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `${context.dataset.label}: ${context.raw}`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again.');
        });

    function calculateDailyCases(cases) {
        const caseValues = Object.values(cases);
        const dailyCases = [];
        for (let i = 1; i < caseValues.length; i++) {
            dailyCases.push(caseValues[i] - caseValues[i - 1]);
        }
        return dailyCases;
    }
});