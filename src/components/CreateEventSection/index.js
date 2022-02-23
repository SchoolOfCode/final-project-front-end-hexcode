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
    location: "",
    description: "",
  });

  const [eventDate, setEventDate] = useState("date pending");
  const [eventTime, setEventTime] = useState("");

  // Handle change function for input fields on form
  function onChange(date, dateString) {
    setEventDate(dateString);
  }
  function onChangeTime(date, timeString) {
    setEventTime(timeString);
  }
  function handleChange(e) {
    const value = e.target.value;
    //const selected = e.target.selected;
    setEvent({ ...event, [e.target.name]: value });
    console.log(event.title);
  }
  console.log("this is the enet", event, eventDate, eventTime);
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
          <Input
            placeholder="Set a title for your event"
            name="title"
            value={event.title}
            onChange={handleChange}
          />
        </label>
        <label>
          <h3>Location</h3>
          <Input
            placeholder="Set a location for your event"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
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
          <DatePicker name="date" selected={event.date} onChange={onChange} />
        </label>
        <label>
          <h3>Time</h3>
          <DatePicker
            picker="time"
            name="time"
            selected={event.time}
            onChange={onChangeTime}
          />
        </label>
        <label>
          <h3>Description</h3>
          <TextArea
            placeholder="Add a description for your event.."
            autoSize
            name="description"
            value={event.description}
            onChange={handleChange}
          />
          <div style={{ margin: "24px 0" }} />
        </label>
      </form>
    </div>
  );
}

export default CreateEventSection;
