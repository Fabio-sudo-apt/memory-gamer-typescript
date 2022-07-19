import { Grid } from '../../components/Grid';
import { cards } from '../../data/cards';
import './style.css'


function App() {
  return(
    <div className='app'>
      <Grid cards={cards}/>
    </div>
  );
}

export default App
