
import './App.css';
import FakeTable from './component/FakeTable';
import SeedForm from './component/SeedForm';
import CountryButtonGroup from './component/CountryButtonGroup';
import InputSlider from './component/Slider';
import {store} from  './state/index';
import {Provider} from 'react-redux';

function App() {
  return (
    <div>
      <Provider store = {store}>
      <CountryButtonGroup />
      <SeedForm />
      <InputSlider />
      <FakeTable />
      </Provider>
    </div>
  );
}

export default App;
