import DropDown from "./components/DropDown";
import TextInput from "./components/Input/";
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <form>
        <TextInput id="converter__amount" label="amount" />
        <DropDown
          onChange={() => {}}
          id="converter__currency--from"
          label="convert from"
        />
      </form>
    </div>
  );
}

export default App;
