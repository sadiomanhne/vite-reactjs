
import './App.css'
import Table from './component/Table';

const tableData = [
  {
    "Company": "Alfreds Futterkiste",
    "Contact": "Maria Anders",
    "Country": "Germany"
  },
  {
    "Company": "Centro comercial Moctezuma",
    "Contact": "Francisco Chang",
    "Country": "Mexico"
  },
  {
    "Company": "Ernst Handel",
    "Contact": "Roland Mendel",
    "Country": "Austria"
  },
  {
    "Company": "Island Trading",
    "Contact": "Helen Bennett",
    "Country": "UK"
  },
  {
    "Company": "Laughing Bacchus Winecellars",
    "Contact": "Yoshi Tannamuri",
    "Country": "Canada"
  },
  {
    "Company": "Magazzini Alimentari Riuniti",
    "Contact": "Giovanni Rovelli",
    "Country": "Italy"
  }
];

function App() {
  return (
    <>
      <Table data={tableData} />
    </>
  );
}


export default App
