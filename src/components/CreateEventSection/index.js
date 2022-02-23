import React, { useState } from "react";
import {
  DatePicker,
  Input,
  TimePicker,
  Menu,
  Dropdown,
  Button,
  Space,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function CreateEventSection() {
  // Create event state
  const [event, setEvent] = useState({
    title: "",
    people: [],
    date: "Date pending",
    time: "",
    description: "",
  });

  // Handle change function for input fields on form
  function handleChange(e) {}

  // Ant components stuff
  const { TextArea } = Input;
  const menu = (
    <Menu>
      <Menu.Item key="Belinda" icon={<UserOutlined />}>
        Belinda
      </Menu.Item>
      <Menu.Item key="Luke" icon={<UserOutlined />}>
        Luke
      </Menu.Item>
      <Menu.Item key="James" icon={<UserOutlined />}>
        James
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="formContainer">
      <h2>Create an Event</h2>
      <form>
        <label>
          <h3>Title</h3>
          <Input placeholder="Set a title for your event" />
        </label>
        <label>
          <h3>People</h3>
          <Space wrap>
            <Dropdown.Button
              overlay={menu}
              placement="bottomCenter"
              icon={<UserOutlined />}
            >
              Add people
            </Dropdown.Button>
          </Space>
        </label>
        <label>
          <h3>Date</h3>
          <DatePicker />
        </label>
        <label>
          <h3>Time</h3>
          <TimePicker />
        </label>
        <label>
          <h3>Description</h3>
          <TextArea placeholder="Add a description for your event.." autoSize />
          <div style={{ margin: "24px 0" }} />
        </label>
      </form>
    </div>
  );
}

export default CreateEventSection;
