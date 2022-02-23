import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  // States
  const [event, setEvent] = useState({
    eventTitle: "",
    people: [],
    eventLocation: "",
    eventDescription: "",
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
  }

  // OnClick function to create Event
  // function handleClick(e) {
  //   <Link to="/Event"></Link>;
  // }

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
            name="eventTitle"
            value={event.eventTitle}
            onChange={handleChange}
          />
        </label>
        <label>
          <h3>Location</h3>
          <Input
            placeholder="Set a location for your event"
            name="eventLocation"
            value={event.eventLocation}
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
          <DatePicker name="date" onChange={onChange} />
        </label>
        <label>
          <h3>Time</h3>
          <DatePicker picker="time" name="time" onChange={onChangeTime} />
        </label>
        <p>
          If you havent decided on a date or location dont worry, you can decide
          this later by adding a poll on the event and editing the event details
          once decided.
        </p>
        <label>
          <h3>Description</h3>
          <TextArea
            placeholder="Add a description for your event.."
            autoSize
            name="eventDescript"
            value={event.eventDescription}
            onChange={handleChange}
          />
          <div style={{ margin: "24px 0" }} />
        </label>
        <Link to="/Event">
          <Button type="primary">Create Event</Button>
        </Link>
      </form>
    </div>
  );
}

export default CreateEventSection;
