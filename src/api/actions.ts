import axios, { AxiosError } from "axios";

const API_URL = "https://vigilant-train-xg456g4j6px3v6vp-3000.app.github.dev/api";

//weather
export const getWeatherData = async (city: string): Promise<WeatherData> => {
  return new Promise<WeatherData>((resolve, reject) => {
    axios
      .get(`${API_URL}/weather/${city}`)
      .then((res) => {
        resolve({
          city: city,
          temperature: res.data.temperature,
          humidity: res.data.humidity,
          wind: res.data.wind,
          rain: res.data.rain,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};


//flower
export const getFlowerData = async (flower: string): Promise<FlowerData> => {
  return new Promise<FlowerData>((resolve, reject) => {
    axios
      .get(`${API_URL}/flower/${flower}`)
      .then((res) => {
        resolve({
          flowerName: flower,
          temperature: res.data.temperature,
          waterNeeds: res.data.waterNeeds,
          fertilizerNeeds: res.data.fertilizerNeeds,
          sunHour: res.data.sunHour,
          
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Flower not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};