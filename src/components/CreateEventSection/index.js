import React, { useState } from 'react';

import TitleSection from '../TitleSection';
import PeopleSection from '../PeopleSection';
import LocationSection from '../LocationSection';
import DateSection from '../DateSection';

function CreateEventSection() {
  const [event, setEvent] = useState({
    title: '',
    people: [],
    date: 'Date pending',
    time: '',
    description: '',
  });

  return (
    <div>
      <h2>Create an Event</h2>
      <form>
        <label>
          <h3>Title</h3>
          <input type='text' name='title' />
        </label>
        <label>
          <h3>People</h3>
          <input type='text' name='people' />
        </label>
        <label>
          <h3>Date</h3>
          <input type='text' name='date' />
        </label>
        <label>
          <h3>Time</h3>
          <input type='text' name='time' />
        </label>
        <label>
          <h3>Description</h3>
          <input type='text' name='description' />
        </label>
      </form>
    </div>
  );
}

export default CreateEventSection;
