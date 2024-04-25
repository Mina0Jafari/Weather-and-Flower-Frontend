import "./App.css";
import NavBar from "./components/NavBar";
import {WeatherCard, FlowerCard} from "./components/cards";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-row gap-4 items-center align-middle justify-center  h-full w-full">
        <WeatherCard />
        <FlowerCard />
      </div>
    </div>
  );
};

export default App;
