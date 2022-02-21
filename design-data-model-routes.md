# Routes for the Front End (MVP)

POST (INSERT) New Event - with the user - and returns new Event ID (needed by the Confirm Event Button in Frame 3 - Get Event for User)
FETCH (SELECT) specific Event (bsed on ID) - + organiser user info + invited contacts + any polls + discussions

PATCH (UPDATE) Event: - to update Event attributes for a specific event \_id

FETCH - all contacats for the logged in user (for the Add Person function - question - would we show/mark those not invited? That would be front-end?

PUSH new poll + options - associated with an event. - return the IDs of the Poll Options
FETCH poll

PUSH Poll VOTE
FETCH all votes (and calc retulsts per option)

## Questions

ASK Coaches - do we do indivudla routes - so fetch event, then fetch comments for that event, and fetch polls etc - rather than doing all i none big fetch?
