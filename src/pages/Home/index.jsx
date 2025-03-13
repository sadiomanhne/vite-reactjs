import { Button, DatePicker, Form, Input, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const AntdTable = () => {
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  const Search = Input.Search;
  
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form] = Form.useForm();
  const fetchData = async (page, pageSize, searchText) => {
    setLoading(true);
    const url = new URL(
      "https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users"
    );
    url.searchParams.append("page", page);
    url.searchParams.append("limit", pageSize);
    url.searchParams.append("search", searchText);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setTableData(data);

        setPagination((prev) => ({ ...prev, total: 80 }));
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
    fetchData(pagination.current, pagination.pageSize, searchText);
  }, [pagination.current, pagination.pageSize, searchText]);

  const handleTableChange = (paginationConfig) => {
    setPagination((prev) => ({
      ...prev,

      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }));
  };
  const handleSearch = (value) => {
    setSearchText(value);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };
  const handleEdit = async (userId) => {
    try {
      const response = await axios.get(
        `https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users/${userId}`
      );
      form.setFieldValue(response.data);
      setEditingUserId(userId);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUserId) {
          axios
            .put(
              `https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users/${editingUserId}`,
              values
            )
            .then((response) => {
              const updateData = tableData.map((item) =>
                item.id === editingUserId ? response.data : item
              );
              setTableData(updateData);

              setEditingUserId(null);
              setIsModalVisible(false);
              message.success("Update user successfully!", 1.5);
            })
            .catch((err) => {
              console.error(err);
              message.error("Failed to update user!", 1.5);
            });
        } else {
          axios
            .post(
              "https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users",
              values
            )
            .then((response) => {
              setTableData((prevData) => [...prevData, response.data]);
              setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
              form.resetFields();
              setIsModalVisible(false);
              message.success("New added user successfully!", 1.5);
            })
            .catch((err) => {
              console.error(err);
              message.error("Failed to add user!", 1.5);
            });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUserId(null);
    form.resetFields();
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
    {
      title: "Operation",
      dataIndex: "",
      key: "x",
      render: (_, record) => {
    
        const handleView = (id) => {
          navigate(`/user/${id}`);
        };
    
        return (
          <>
            <a onClick={() => handleEdit(record.id)}>Edit</a> |{" "}
            <a onClick={() => handleView(record.id)}>View</a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="user-button">
        <Button
          style={{ marginBottom: 20 }}
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          Add user
        </Button>

        <Search
          placeholder="input search texts"
          onSearch={handleSearch}
          style={{ marginBottom: 20, width: 300 }}
        />
      </div>
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
      <Modal
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="DatePicker"
            name="DatePicker"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AntdTable;
