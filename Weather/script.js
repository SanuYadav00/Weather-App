const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '587678549d453953373dd825102eed14';

$(document).ready(function () {
    handleFunc('Bhubaneswar');
});

async function handleFunc(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            fetchWeatherData(data);
        } else {
            alert('City not found. Please enter correct name');
        }
    } catch (error) {
        console.error('Error while fetching data reports:', error);
    }
}

function fetchWeatherData(data) {
    const $cityName = $('#city-name');
    const $date = $('#date');
    const $temperature = $('#temperature');
    const $description = $('#description');
    const $windSpeed = $('#wind-speed');
    const $weatherIcon = $('#weather-icon');
    const $weatherInfo = $('#weather-info');

    $cityName.text(data.name);
    $date.text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $temperature.html(`${data.main.temp}°C`);
    $description.text(data.weather[0].description);
    $windSpeed.html(`Wind Speed: ${data.wind.speed} m/s`);
    $weatherIcon.attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    $weatherInfo.fadeIn();
}