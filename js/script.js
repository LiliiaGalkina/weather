//Погода в городе
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiUrlGeo = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "4b6f940cd94a66a21c9115fac69c67e1";
const city = document.querySelector(".city__name");
const resultCity = document.querySelector(".city__result");
const resultGeo = document.querySelector(".geolocation__result");
const buttonCity = document.querySelector(".city__button");
const buttonGeo = document.querySelector(".geolocation__button");
const buttonClear = document.querySelector(".city__button-clear");
const buttonClearGeo = document.querySelector(".city__button-clear-geo");

let cityInput;
let now;

city.focus();

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

const makeBlockWeather = (obj, block) => {
	let cityName = document.createElement("h3");
		cityName.innerHTML = cityInput;
		cityName.classList.add("result__city");
		cityName.classList.add("title");
		let cityDate = document.createElement("div");
		cityDate.innerHTML = getDate();
		cityDate.classList.add("result__date");
		let cityTemp = document.createElement("div");
		cityTemp.innerHTML = `Температура воздуха ${(obj.main.temp).toFixed(0)} <sup>o</sup>C`;
		cityTemp.classList.add("result__temperature");
		let cityCloudy = document.createElement("div");
		cityCloudy.innerHTML = `${obj.weather[0].description[0].toUpperCase() + obj.weather[0].description.slice(1)}`;
		cityCloudy.classList.add("result__cloudy");
		let cityRain = document.createElement("div");
		cityRain.innerHTML = `Влажность воздуха  ${obj.main.humidity}%`;
		cityRain.classList.add("result__rain");
		let cityWind = document.createElement("div");
		cityWind.innerHTML = `Скорость ветра  ${obj.wind.speed} м/с`;
		cityCloudy.classList.add("result__wind");
		 block.append(cityName, cityDate, cityTemp, cityCloudy, cityRain, cityWind);
}

const getWeatherCity = async () => {
	let URL = `${apiUrl}${cityInput}&appid=${apiKey}&units=metric&lang=ru`;
	try {
		const res = await fetch(URL);
		if (!res.ok) {
		 alert("Вы ввели некорректное название города");
		 throw new Error("Upload failed");
		 
    }
    const data = await res.json();
		if (data) {
			resultCity.innerHTML = "";
			resultGeo.innerHTML = "";
		makeBlockWeather(data, resultCity);
		 resultCity.style.display = "block";
    }
	} catch (error) {
    console.error("Error: " + error.message);
  }
}

buttonCity.addEventListener("click", () => {
	if (city.value == "") {
		alert("Вы забыли ввести название города");
		city.focus();
	} else {
		resultGeo.style.display = "none";
		getWeatherCity();
	}
});

buttonClear.addEventListener("click", () => {
	city.value = "";
	resultCity.innerHTML = "";
	resultCity.style.display = "none";
})

//погода по геолокации

const getGeoWeather = () => {
	let latit;
	let long;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async (position) => {
			latit = position.coords.latitude;
			long = position.coords.longitude;
			let urlGeo = `${apiUrlGeo}lat=${latit}&lon=${long}&appid=${apiKey}&units=metric&lang=ru`;
			try {
			const res = await fetch(urlGeo);
			if (!res.ok) {
				alert("Невозможно получить Ваши координаты, возможно вы запретили определение геолокации, либо ваш браузер не поддерживает ее определение!");
					throw new Error("Upload failed");
			}
			const data = await res.json();
				if (data) {
					resultCity.innerHTML = "";
					resultGeo.innerHTML = "";
					makeBlockWeather(data, resultGeo);
					let cityGeo = document.querySelector(".result__city");
					cityGeo.innerHTML = data.name;
					resultGeo.style.display = "block";
				}
			} catch (error) {
				alert("Невозможно получить Ваши координаты, возможно вы запретили определение геолокации, либо ваш браузер не поддерживает ее определение!");
				console.error("Error: " + error.message);
			}
      });
	} else {
		resultGeo.innerHTML = `<div style ="color:red">Не удалось получить ваши координаты, возможно вы запретили определение геолокации, либо ваш браузер не поддерживает ее определение!</div>`;
	}	
}

buttonGeo.addEventListener("click", () => {
	resultCity.style.display = "none";
	city.value = "";
	getGeoWeather();
});

buttonClearGeo.addEventListener("click", () => {
  resultGeo.innerHTML = "";
  resultGeo.style.display = "none";
});
	