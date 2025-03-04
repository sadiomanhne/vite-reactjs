import { Table } from "antd";
import { useEffect, useState } from "react";

const AntdTable = () => {
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1, 
    pageSize: 10,
    total: 0, 
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    const url = new URL("https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users");
    url.searchParams.append("page", page);
    url.searchParams.append("limit", pageSize);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setTableData(data);
       
        setPagination((prev) => ({ ...prev, total: 50 })); 
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize); 
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (paginationConfig) => {
    setPagination((prev) => ({
      ...prev,
     
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
      
    }));
    
  };

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
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    
  ];
   
  return (
    <Table
      dataSource={tableData}
      columns={columns}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default AntdTable;
