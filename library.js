async function search(country) {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}`);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
}

document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const countryName = document.getElementById('country').value.trim();
    const deathList = document.getElementById('deathlist');
    const load = document.getElementById('load');

    load.style.display = 'block';
    deathList.style.display = 'none';

    try {
        const data = await search(countryName);
        console.log('API response:', data); // Log the data to check the response structure

        deathList.innerHTML = "<tr><th>Country 🌍</th><th>Total Deaths</th></tr>";

        if (data && data.deaths != null) {
            const tr = document.createElement('tr');
            const countryTd = document.createElement('td');
            const deathsTd = document.createElement('td');

            countryTd.textContent = data.country;
            deathsTd.textContent = data.deaths;

            tr.appendChild(countryTd);
            tr.appendChild(deathsTd);
            deathList.appendChild(tr);
        } else {
            deathList.innerHTML = "<tr><th>Country 🌍</th><th>Total Deaths</th></tr><tr><td colspan='2'>No data available</td></tr>";
        }

        load.style.display = 'none';
        deathList.style.display = 'table';
    } catch (error) {
        console.error("Error:", error);
        load.textContent = `Error loading data: ${error.message}`;
        load.style.display = 'none';
    }
});
