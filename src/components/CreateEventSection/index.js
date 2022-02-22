import React from 'react';
import TitleSection from '../TitleSection';
import PeopleSection from '../PeopleSection';
import LocationSection from '../LocationSection';
import DateSection from '../DateSection';

function CreateEventSection() {
  return (
    <div>
      <h2>Create an Event</h2>
      <div>
        <h3>Title</h3>
        <input type='text' />
      </div>
      <div>
        <h3>People</h3>
        <input type='text' />
      </div>
      <div>
        <h3>Date</h3>
        <input type='text' />
      </div>
      <div>
        <h3>Time</h3>
        <input type='text' />
      </div>
      <p></p>
      <div>
        <h3>Description</h3>
        <input type='text' />
      </div>
    </div>
  );
}

export default CreateEventSection;
