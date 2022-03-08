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
import "./CreateEvent.css";
import moment from "moment";
import "moment/locale/zh-cn";

import { API_URL } from "../../config/index.js";
const API_END_POINT = "/events";

function CreateEventSection(props) {
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js via CreateEvent page

    // States
    const [event, setEvent] = useState({
        eventTitle: "",
        people: [],
        eventLocation: "",
        eventDescription: "",
    });
    const [eventDate, setEventDate] = useState("date pending");
    const [eventTime, setEventTime] = useState("");
    const [personMenu, setPersonMenu] = useState([]);

    function postData() {
        async function createEvent() {
            //07Mar - updating the POST to set the OrganiserID to the loggedInUserId
            const newEvent = {
                organiserUserId: loggedInUserId,
                eventTitle: event.eventTitle,
                eventDescription: event.eventDescription,
                eventLocation: event.eventLocation,
                eventDate: eventDate,
                eventTime: eventTime,
                eventRequirements: "Booze",
                eventCategory: "Drinks",
            };
            console.log(
                "src/components/CreateEventSection/index.js: new event="
            );
            console.log(newEvent);

            // POST (Insert) the newly created event to the database and return with the eventId for the newly created Event.
            //07Mar - updating the POST to use the URL constants
            const response = await fetch(
                // "https://hexcode-safety-net-server.herokuapp.com/events/",
                // `https://hexcode-arrange-group-event.herokuapp.com/events/`,
                // `${API_URL}/events`,
                `${API_URL}${API_END_POINT}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newEvent),
                }
            );

            //TODO: capture the new eventId returned and update the Event object in state with it.
            // consider moving state up a level so that the new event can be passed into Display Event without re-fetching
            const data = await response.json();
            console.log(
                `src/components/CreateEventSection/index.js - postData - createEvent: data=`
            );

            console.log({ data });
        }
        createEvent();
    }

    //SC: when create event button is clicked, it calles handleClick(), which calls postData(), which calls internal ASYNC function createEvent(), which calls fetch() to post the data, and receive back the new event id
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

    // TODO: STEP 2 (HARDER) - change this handleMenuClick to add the new invitee's user id to the list of users
    function handleMenuClick(e) {
        const selectedUser = e.key;

        const addUser = [...personMenu, selectedUser];

        setPersonMenu(addUser);
    }
    console.log(`src/components/CreateEventSection/index.js: personMenu=`);
    console.log(personMenu);

    // OnClick function to create Event
    // function handleClick(e) {
    //   <Link to="/Event"></Link>;
    // }

    // Ant components stuff
    const { TextArea } = Input;

    // TODO: STEP 1 - change this menu to a FETCH of contacts based on the loggedInUserId
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="Belinda" icon={<UserOutlined />}>
                Belinda
            </Menu.Item>
            <Menu.Item key="Luke" id="Luke" icon={<UserOutlined />}>
                Luke
            </Menu.Item>
            <Menu.Item id="James" key="James" icon={<UserOutlined />}>
                James
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="createEventSection">
            <h2 className="createEventTitle">Create an Event</h2>
            <div className="formContainer">
                <form>
                    <h3 className="inputTitle">Title</h3>
                    <label>
                        <Input
                            id="title"
                            maxLength={30}
                            placeholder="Set a title for your event"
                            name="eventTitle"
                            value={event.eventTitle}
                            onChange={handleChange}
                        />
                    </label>
                    <h3 className="inputTitle">Location</h3>
                    <label>
                        <Input
                            id="location"
                            maxLength={40}
                            className="titleInput"
                            placeholder="Set a location for your event"
                            name="eventLocation"
                            value={event.eventLocation}
                            onChange={handleChange}
                        />
                    </label>
                    <h3 className="inputTitle">People</h3>
                    <div className="createPeople">
                        <Space className="dropdownPeople" wrap>
                            <Input
                                className="inputedpeople"
                                prefix={<UserOutlined />}
                                value={personMenu}
                            />
                            <Dropdown.Button
                                className="addingpeople"
                                overlay={menu}
                                placement="bottomCenter"
                                icon={<UserOutlined id="dropdown" />}
                            >
                                Add people
                            </Dropdown.Button>
                        </Space>
                    </div>
                    <h3 className="inputTitle">Date</h3>
                    <label>
                        <DatePicker
                            id="date"
                            format="YYYY-MM-DD"
                            className="datePicker"
                            name="date"
                            onChange={onChange}
                        />
                    </label>
                    <h3 className="inputTitle">Time</h3>
                    <label>
                        <DatePicker
                            id="time"
                            className="timePicker"
                            picker="time"
                            name="time"
                            onChange={onChangeTime}
                        />
                    </label>
                    <p className="disclaimer">
                        <i>
                            {" "}
                            If you havent decided on a date or location dont
                            worry, you can decide this later by adding a poll on
                            the event and editing the event details once
                            decided.
                        </i>
                    </p>
                    <h3 className="inputTitle">Description</h3>
                    <label>
                        <TextArea
                            id="description"
                            maxLength={255}
                            className="descriptionInput"
                            placeholder="Add a description for your event.."
                            autoSize
                            name="eventDescription"
                            value={event.eventDescription}
                            onChange={handleChange}
                        />
                        <div style={{ margin: "24px 0" }} />
                    </label>
                    <Link to="/homepage">
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
