import "./App.css";
import { SearchBar } from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <div className="leftSide"></div>
      <div className="rightSide">
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
