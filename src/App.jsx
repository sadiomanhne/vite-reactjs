
import { useEffect, useState } from 'react';
import './App.css'
import Table from './component/Table';



function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/d9870639-fb48-42dc-ada7-fd6ef256e938');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Có lỗi:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Table data={tableData} />
    </>
  );
}


export default App
