import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { TiWeatherDownpour, TiWeatherSunny} from "react-icons/ti";
import { GiFlowerPot, GiDandelionFlower, GiSpotedFlower, GiRose } from "react-icons/gi";
import { PiFlowerTulip } from "react-icons/pi";
import { TbFlowerOff } from "react-icons/tb";
import { getWeatherData } from "../api/actions";
import { getFlowerData } from "../api/actions";

const WeatherCard: React.FC = () => {
  const [data, setData] = useState<WeatherData>();
  const [loadingState, setLoadingState] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Weather Data...");
    console.log(city);
    setLoadingState(true);
    getWeatherData(city)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="cityname"
              type="text"
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            {data.temperature > 20 ? (
              <div>
                <TiWeatherSunny className="w-36 h-36" />
              </div>
            ) : (
              <div>
                <TiWeatherDownpour className="w-36 h-36" />
              </div>
            )}
            <h1 className="text-3xl font-bold">{data.city}</h1>
            <p className="text-3xl">{data.temperature}°C</p>
            <p className="text-lg">Humidity: {data.humidity}%</p>
            <p className="text-lg">Wind: {data.wind} km/h</p>
            <p className="text-lg">Rain: {data.rain} %</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Enter a city name</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};




//flower 
const FlowerCard: React.FC = () => {
  const [data, setData] = useState<FlowerData>();
  const [loadingState, setLoadingState] = useState(false);
  const [flower, setFlower] = useState("");
  const [error, setError] = useState("");

  const getIcon = (flowerName: string) => {
    switch (flowerName.toLowerCase()) {
      case "rose":
        return <GiRose className="w-36 h-36" />;
      case "tulip":
        return <PiFlowerTulip className="w-36 h-36" />;
      case "hydrangea":
        return <GiDandelionFlower className="w-36 h-36" />;
      case "orchid":
        return <GiSpotedFlower className="w-36 h-36" />;
      case "lily":
        return <GiFlowerPot className="w-36 h-36" />;
      default:
        return <TbFlowerOff className="w-36 h-36" />; // Default icon if no match
    }
};

  const handleSearch = () => {
    console.log("Fetching Flower Data...");
    console.log(flower);
    setLoadingState(true);
    getFlowerData(flower)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="flowerName"
              type="text"
              label="Flower"
              value={flower}
              onChange={(e) => {
                setFlower(e.target.value);
              }}
            />
            <Button
              className=""
              color="danger"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
      <CardBody>
       <div className="flex flex-col items-center">
         {getIcon(data.flowerName)}
         <h1 className="text-3xl font-bold">{data.flowerName}</h1>
         <p className="text-lg">Temperature: {data.temperature}°C</p>
         <p className="text-lg">Water Needs: {data.waterNeeds} times a week</p>
         <p className="text-lg">Fertilizer Needs: {data.fertilizerNeeds} doses per month</p>
         <p className="text-lg">Sun Hour: {data.sunHour} hours per day</p>
       </div>
     </CardBody>
   ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Enter a flower name</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export { WeatherCard };
export { FlowerCard };
