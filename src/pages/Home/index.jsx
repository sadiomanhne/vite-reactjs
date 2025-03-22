import { Button, DatePicker, Form, Input, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updatePagination, updateSearchText } from "../../redux/userSlice";
const AntdTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Search = Input.Search;

  const loading = useSelector((state) => state.users.loading);
  const searchText = useSelector((state) => state.users.searchText);
  const pagination = useSelector((state) => state.users.pagination);
  const tableData = useSelector((state) => state.users.data);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form] = Form.useForm();
  
  useEffect(() => {
    dispatch(fetchUsers({ pagination, searchText }));
  }, [searchText, pagination.current, pagination.pageSize]);

  useEffect(() => {
    dispatch(updatePagination(pagination));
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (paginationConfig) => {
    dispatch(updatePagination(paginationConfig));
  };

  const handleSearch = (value) => {
    dispatch(updateSearchText(value));
    dispatch(updatePagination({ current: 1 })); 
  };

  const handleEdit = async (userId) => {
    try {
      const response = await axios.get(
        `https://67bfced4b9d02a9f22474c36.mockapi.io/api/v1/users/${userId}`
      );

      form.setFieldsValue({
        name: response.data.name,
        address: response.data.address,
        dateOfBirth: response.data.dateOfBirth
          ? moment(response.data.dateOfBirth)
          : null,
      });

      setEditingUserId(userId);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data.", 1.5);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUserId(null);
    form.resetFields();
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
        title={editingUserId ? "Edit User" : "Add User"}
      >
        <Form form={form} layout="vertical">
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
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AntdTable;
