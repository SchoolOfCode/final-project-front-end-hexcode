# Component Tree

## App Component

- Hamburger Container (Banner) Rendered on App so it is on every page then the page components rendered below it
  - hamburger menu
    - On Click to toggle the Dashboard menu Component view on/off

## Low-Fi Frame 2:

- DashboardMenu
  - profile image
    - Add event button (Hardcode for MVP)
      - On click - when clicked redirected using Routes to the create Event page - listed events (hardcode for MVP)

## Low-Fi Frame 3:

- Create event Page:
- Create Event Section
  - Title section
    - H4 tag with “Title”
      - Input Section (Reusable)
        - On Change on the component so it will regsiter any changes to input box and save it in a sate called title ( const [title, setTitle] = useState("") )
  - People section
    - H4 tag with “People”
      - Dropdown Section (Hard coded contacts) \* On Change on the component so it will regsiter any changes to input box and save it in a sate called people ( const [people, setPeople] = useState([]) )
      - Add person Button Component (maybe not mvp but a on click function to bring something up to select contacts)
- Location section
  - H4 tag with “Location”
    - Input Section (Reusable) - maybe a map UI componenent to search an address on a map.
      - On Change on the component so it will regsiter any changes to input box/map component and save it in a sate called location ( const [location, setLocation] = useState)
- Date section
  - H4 tag with “Date”
    - Calendar Section (Reusable)
      - On Change on the component so it will regsiter any changes to input box/map component and save it in a sate called date ( const [date, setDate] = useState)
- Time section
  - H4 tag with “Time”
  - Input Section (Reusable)
  * On Change on the component so it will regsiter any changes to input box/map component and save it in a sate called time ( const [time, setTime] = useState)
- P tag (If you haven't decided …..)
- Description section
  - H4 tag with “Description”
    - Input Section (Reusable)
      - On Change on the component so it will regsiter any changes to input box/map component and save it in a sate called description ( const [description, setDescription] = useState)
- Confirm Event Button
  - A way of saving who the organsier is with the event ID in a state? Organiser state [organsier, setOrganiser] = useState([img src, organiser name])
  - On Click that activates a UseEffect to the database. Do a post of what the state values are
  - ON click that will redirect you to the event page (Spinner on the event page if it takes a ferw seconds? Creating your event some sort of fun emoji)

## Low-Fi Frame 4.1:

- Event Page:

- Event Information Section
  - Fetch the data from the database to get the event information. Save the information from the fetch request into states.
  - Organiser state [img src, organiser name]
  - Organiser Section - User Icon Image Component - passed in as prop from the event information section - User Name Component - passed in as prop from the event information section - Settings Cog Component (Functionality not MVP)

All still within event information Section:

- Event Title Component - passed in as prop from the event information section
- Confirm Attendance Component (Functionality not MVP)
- Event Date (If not set it says “Date pending”). The value of the event date could be a state with the initial value of "Date pending". If it has been set then change the state to the date which comes from the fetch
- Event Location (If not set it says “Location pending”)

  - People Section
    - H4 tag that says People
    - Maybe an extra component called people container - need the people invited saved in an array state - map through and render a user icon image component.
      - User Icon Image Component (People that have been invited)
    - Add Person button
  - Description Component - passed in as prop from the event information section
  - Collapse Event Information section (Button)
    - On click function that activates some form of conditional rendering (toggles on/off) that hides people, organiser and description to only shopw key information on the event (date, title, location)

- Poll Section

  - H4 tag that says “Poll”
  - Add poll button

    - Add poll button has an onClick that will redirect to CREATE A POLL PAGE.

  - Poll Component (The poll options will need to be saved to a state in array- map method which will map through array returning the poll option- the index of the array will need to be passed thorugh as a prop as a key) - Poll Option ( Each poll option wil need an onClick function- if that particular poll (referenced to specific index) is picked- useEffect (post/write to the polls table in the database what option was selected - also doing fetch to get all the other results (shows how everyone voted)))
    Collapse Poll Section button
  - On click function that activates some form of conditional rendering (toggles on off) will hide the add poll button and the poll component.

- Post Section - would want all the comments saved in a database- run fect that gets all the comments and saves them in a state in the form of an array. Map through state and return below comments section and its contents.
  - Comment Section -
    - User Icon Image Component - (Contents passed to here s a prop from the map)
    - Comment Component - (Contents passed to here s a prop from the map)
  - Sumbit Comment section
    - Input Box (has an onchange function that registers the change and saves it into a state)
    - Send Button (will set the state of the input box, onClick- also post request to write to the databse) (MAYBE CHECK JAMES WEEK PROJECT)

Low-Fi Frame 6:

- Event Page:
  - Hamburger Container (Banner) - hamburger menu

Create a Poll Section
P Tag “Add a title for your Poll”
Input Section (Reusable)
P tag “Category”
Drop down of categories (Functionality not MVP)
Add an option Section
Add an option button (On click this will render the component below)
Input Section (Reusable)
Confirm button (On click will move the input contents into the ‘Confirmed options’ section)

     - Confirmed options Section

Options component
Bin icon button to remove option from list

- Create Poll Button
