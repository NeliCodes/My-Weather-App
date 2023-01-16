let weatherApp = {
    apiKey: "e64c32984485eab3f1cf01c27ee541d2",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      let s = new Date();
      
      document.querySelector(".place").innerText = name + ", " + data.sys.country;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".date").innerText = s;
      
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
        document.querySelector(".humid").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".like").innerText = "Feels like: " + data.main.feels_like + "°C";
      document.querySelector(".place").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".display").value);
    }
  };
  
  document.querySelector(".bi").addEventListener("click", function () {
    weatherApp.search();
  });
  
  document.querySelector(".display").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weatherApp.search();
    }
  });
  
  weatherApp.fetchWeather("Beijing");
  