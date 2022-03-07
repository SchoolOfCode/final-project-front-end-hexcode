# Routes for the Front End (MVP)

## Event

POST (INSERT) New Event - (USER_ID has to be passed in)- and returns new Event ID - needed by the Confirm Event Button in Frame 3 - Get Event for User

FETCH ALL Events for a given user (users/12/events)

FETCH (SELECT) specific Event (based on EVENT_ID) - + organiser user info + invited contacts + any polls + discussions

PATCH (UPDATE) Event: - to update Event attributes for a specific EVENT_ID

## (Event) Comments

POST a new comment (for a specific parent EVENT_ID)
FETCH ALL comments for a given Event

(don't need, i think, to retrieve a single comment)

## (Event) Replies (NOT MVP)

POST a new REPLY (for a specific parent COMMENT_ID, and need to include tthe author's USER_ID)
FETCH ALL comments for a given EVENT_ID

## User

## (User) Contacts

FETCH - all contacats for the logged in user (for the Add Person function - question - would we show/mark those not invited? That would be front-end?

## (Event) Polls

PUSH new poll + options - associated with an event. - return the IDs of the Poll Options
FETCH poll

PUSH Poll VOTE
FETCH all votes (and calc retulsts per option)

## Questions

ASK Coaches - do we do indivudla routes - so fetch event, then fetch comments for that event, and fetch polls etc - rather than doing all i none big fetch?
