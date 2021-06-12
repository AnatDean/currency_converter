import TextInput from "./components/Input";
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <form>
        <TextInput id="converter__amount" label="amount" />
      </form>
    </div>
  );
}

export default App;
