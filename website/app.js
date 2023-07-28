/* Global Variables */
// HTML element to listen for click events
const button = document.getElementById("generate");

// HTML elements to get the values
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");

// HTML elements to update dynamically
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// OpenWeatherApi configuration
const url = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "da679c2d4528dfac90fb943fbf6d61db&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/* Function to GET Web API Data*/
const fetchWeatherData = async (baseURL, zip, apiKey) => {
  try {
    const request = await fetch(
      `${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`
    );
    const result = await request.json();
    const {
      main: { temp },
    } = result;
    return temp;
  } catch (e) {
    throw e;
  }
};

/* Function to GET Project Data */
const getDataFromServer = async () => {
  try {
    const request = await fetch("/api/projectdata");
    const result = await request.json();
    return result;
  } catch (e) {
    throw e;
  }
};

// POST Request to store date, temp and user input
const saveData = async (path, data) => {
  try {
    await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    throw e;
  }
};

// Update UI dynamically
const updateUI = async (temperature, newDate, feelings) => {
  date.innerText = newDate;
  temp.innerText = `${temperature} deg`;
  content.innerText = feelings;
};

// Event listener
button.addEventListener("click", async () => {
  try {
    const temp = await fetchWeatherData(url, zip.value, APIKey);
    console.log("temp: ", temp);
    const data = { date: newDate, temp, content: feelings.value };
    saveData("/api/projectdata", data);
    updateUI(data.temp, data.date, data.content);
  } catch (error) {
    console.error(error);
  }
});

getDataFromServer().then((data) => {
  console.log("dataRes", data);
});
