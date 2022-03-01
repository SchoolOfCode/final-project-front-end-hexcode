import { useState, useEffect } from "react";
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
import "./createEventSection.css";
//hexcode-safety-net-server.herokuapp.com"
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

  function postData() {
    async function createEvent() {
      const newEvent = {
        organiserUserId: 2,
        eventTitle: event.eventTitle,
        eventDescription: event.eventDescription,
        eventLocation: event.eventLocation,
        eventDate: event.eventDate,
        eventTime: eventTime,
        eventRequirements: "Booze",
        eventCategory: "Drinks",
      };
      console.log(newEvent);
      const response = await fetch(
        "https://hexcode-safety-net-server.herokuapp.com/events/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        }
      );

      const data = await response.json();
      console.log({ data });
    }
    createEvent();
  }

  function handleClick() {
    postData();
  }

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
    <div>
      <h2>Create an Event</h2>
      <div className="formContainer">
        <form>
          <h3 classname="input-name">Title</h3>
          <label>
            <Input
              placeholder="Set a title for your event"
              name="eventTitleInput"
              value={event.eventTitle}
              onChange={handleChange}
            />
          </label>
          <h3 classname="input-name">Location</h3>
          <label>
            <Input
              className="titleInput"
              placeholder="Set a location for your event"
              name="eventLocation"
              value={event.eventLocation}
              onChange={handleChange}
            />
          </label>
          <h3>People</h3>
          <label>
            <Space wrap>
              <Dropdown.Button
                className="dropdownPeople"
                overlay={menu}
                placement="bottomCenter"
                icon={<UserOutlined />}
              >
                Add people
              </Dropdown.Button>
            </Space>
          </label>
          <h3 classname="input-name">Date</h3>
          <label>
            <DatePicker
              className="datePicker"
              name="date"
              onChange={onChange}
            />
          </label>
          <h3 classname="input-name">Time</h3>
          <label>
            <DatePicker
              className="timePicker"
              picker="time"
              name="time"
              onChange={onChangeTime}
            />
          </label>
          <p className="disclaimer">
            <i>
              {" "}
              If you havent decided on a date or location dont worry, you can
              decide this later by adding a poll on the event and editing the
              event details once decided.
            </i>
          </p>
          <h3 classname="input-name">Description</h3>
          <label>
            <TextArea
              className="descriptionInput"
              placeholder="Add a description for your event.."
              autoSize
              name="eventDescription"
              value={event.eventDescription}
              onChange={handleChange}
            />
            <div style={{ margin: "24px 0" }} />
          </label>
          <Link to="/Event">
            <Button
              className="createEventButton"
              type="primary"
              onClick={handleClick}
            >
              Create Event
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CreateEventSection;
