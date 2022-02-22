import React from 'react';
import CreateEventSection from '../components/CreateEventSection';

function CreateEvent() {
  return (
    <div>
      <CreateEventSection />

      <p>
        If you havent decided on a date or location dont worry, you can decide
        this later by adding a poll on the event and editing the event details
        once decided.
      </p>
      <button>Confirm Event</button>
    </div>
  );
}

export default CreateEvent;
