//Погода в городе
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "4b6f940cd94a66a21c9115fac69c67e1";
const city = document.querySelector(".city__name");
const resultCity = document.querySelector(".city__result");
const resultGeo = document.querySelector(".geolocation__result");
const buttonCity = document.querySelector(".city__button");
const buttonGeo = document.querySelector(".geolocation__button");

let cityInput;
let now;

city.addEventListener("change", () => {
	cityInput = city.value;
	
})

const getDate = () => {
	let date = new Date();
	const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
	let day = days[date.getDay()];
	let month = date.getMonth() + 1;
	month = month < 10 ? "0" + month : month;
	now = `${date.getDate()}.${month}.${date.getFullYear()}  ${day}`
	return now;
}

const getWeatherCity = async () => {
	let URL = `${apiUrl}${cityInput}&appid=${apiKey}&units=metric`;
	try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Upload failed");
    }
    const data = await res.json();
		if (data) {
		resultCity.innerHTML = "";
		 let cityName = document.createElement('h3');
		 cityName.innerHTML = cityInput;
		 cityName.classList.add("result__city");
		 cityName.classList.add("title");
		 let cityDate = document.createElement('div');
		 cityDate.innerHTML = getDate();
		 cityDate.classList.add("result__date");
		 let cityTemp = document.createElement('div');
		 cityTemp.innerHTML = `${(data.main.temp).toFixed(0)} <sup>o</sup>C`;
		 cityTemp.classList.add("result__temperature");
		 resultCity.append(cityName, cityDate, cityTemp);
		 resultCity.style.display = "block";
    }
	} catch (error) {
    console.error("Error: " + error.message);
  }
}

buttonCity.addEventListener("click", getWeatherCity);
