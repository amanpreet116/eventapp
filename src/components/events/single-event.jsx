import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const SingleEvent = ({ data }) => {
  // TO GET REFERENCE OF ANY ELEMENT 
  const inputEmail = useRef();  
  const router = useRouter();
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    //TO ENSURE DEFAULT RELOADING OF THE PAGE ON CLICKING SUBMIT BUTTON
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;
//Valid email format
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }

    try {
      //POST fetch request 
      // body emailValue and the event ID
      const response = await fetch('/api/email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //sending email and id of the page in the body 
        //converting javascript value into a json string value
        body: JSON.stringify({ email: emailValue, eventId }),
      });
// if the response is not ok send an error code
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log('POST',data);
      setMessage(data.message);
      inputEmail.current.value = '';
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  return (
    <div className="event_single_page">
      <h1> {data.title} </h1>
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <p> {data.description} </p>
      <form onSubmit={onSubmit} className="email_registration">
        <label> Get Registered for this event!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        <button type="submit"> Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SingleEvent;