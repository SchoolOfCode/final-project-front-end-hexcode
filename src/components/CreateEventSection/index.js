import { useState } from "react";
// import { useState, useContext } from "react"; //useContext - commented out for now
// import { PageWrapper } from "../App/index.js"; //useContext - commented out for now
import { Link, useNavigate } from "react-router-dom"; //useNavigate
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
    // *** Use Context ***
    // let { pageState, setPageState } = useContext(PageWrapper); //useContext - commented out for now

    // *** Props ***
    const loggedInUserId = props.loggedInUserId; //coming from App/index.js via CreateEvent page

    // *** Use States ***
    const [event, setEvent] = useState({
        eventTitle: "",
        people: [],
        eventLocation: "",
        eventDescription: "",
    });
    const [eventDate, setEventDate] = useState(null); // FYI - must set initial date to null, not to a string like 'date pending' because it is of type date, not string, in the database
    const [eventTime, setEventTime] = useState("");
    const [personMenu, setPersonMenu] = useState([]);

    // *** use Navigate ***
    const navigate = useNavigate(); //useNavigate - must set in top level in a component
    let newEventId = 0; // FYI - moving this outside of async function so that link in return statement can access newEventId

    // function postData() {
    // async function createEvent() {
    async function handleCreateEventClick() {
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

        // POST (Insert) the newly created event to the database and return with the eventId for the newly created Event.
        const response = await fetch(`${API_URL}${API_END_POINT}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });
        //TODO: add error-checking - if eventId is empty/null/undefined/not an number - DO SOMETHING

        // TODO: consider moving state up a level so that the new event can be passed into Display Event without re-fetching - would then update the Event object in state with the new event ID
        const data = await response.json();

        // extract the REAL new Event id from data so we can navigate to the correct event page
        newEventId = data.eventId;
        navigate(`/Event/${newEventId}`); //useNavigate - redirect to event/id page for the newly created event
    }
    //     createEvent();
    // }

    // function handleCreateEventClick() {
    //     // postData();
    //     createEvent();
    // }

    // Handle change function for input fields on form
    function onChange(date, dateString) {
        setEventDate(dateString);
    }

    function onChangeTime(date, timeString) {
        setEventTime(timeString);
    }

    function handleChange(e) {
        const value = e.target.value;
        setEvent({ ...event, [e.target.name]: value });
    }

    // TODO: update to use contacts from database instead of hardcoded: STEP 2 - change this handleMenuClick to add the new invitee's user id to the list of users to be invited
    function handleMenuClick(e) {
        const selectedUser = e.key;
        const addUser = [...personMenu, selectedUser];
        setPersonMenu(addUser);
    }

    // OnClick function to create Event
    // function handleClick(e) {
    //   <Link to="/Event"></Link>;
    // }

    // Ant components stuff
    const { TextArea } = Input;

    // TODO: update to use contacts from database instead of hardcoded: STEP 1 - change this menu to (a) FETCH contacts based on the loggedInUserId, and (b) map through the fetched contacts, adding them to this menu one by one and (c) if we need to display correct Profile Pics, use <ProfileImage> component.
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
            <Menu.Item key="Dave" id="Dave" icon={<UserOutlined />}>
                Dave
            </Menu.Item>
            <Menu.Item key="Akito" id="Akito" icon={<UserOutlined />}>
                Akito
            </Menu.Item>
            <Menu.Item key="Maria" id="Maria" icon={<UserOutlined />}>
                Maria
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
                            <TextArea
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
                    <Link to={`/Event/${newEventId}`}>
                        <button
                            className="createEventButton"
                            type="primary"
                            // onClick={handleClick}
                            onClick={handleCreateEventClick}
                        >
                            Create Event
                        </button>
                    </Link>
                    <p className="disclaimer">
                        <i>
                            If you can't decide on a single date, you can add a
                            poll later to make things easier!
                        </i>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default CreateEventSection;
