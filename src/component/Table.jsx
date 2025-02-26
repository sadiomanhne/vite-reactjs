import { Table } from "antd";

const AntdTable = ({ data }) => {
  const columns = [
    {
      title: "Company",
      dataIndex: "Company",
      key: "company",
    },
    {
      title: "Contact",
      dataIndex: "Contact",
      key: "contact",
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "country",
    },
    
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={(record) => record.id || record.Company}
    />
  );
};

export default AntdTable;
