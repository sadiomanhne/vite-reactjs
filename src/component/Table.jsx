import { Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";


const AntdTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users"
        );
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (text) => moment(text).format("YYYY/MM/DD"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const paginationConfig = {
    pageSizeOptions: ["10", "20", "50"],
    showSizeChanger: true,
    defaultPageSize: 10,
  };

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={paginationConfig}
    />
  );
};

export default AntdTable;
