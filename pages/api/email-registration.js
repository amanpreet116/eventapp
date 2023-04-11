
  //access our data , exract the data(AllEvents)
  //res(404) if there are no AllEvents
  //AllEvents -  loop through them and identify the eventID
  // add the email into email-registered - write on our data

import path from 'path';
import fs from 'fs';

//1.access the data
//build a path to join data file
function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json');
}
//cwd- current working directory 

//2. extract the data
function extractData(filePath) {
  //read the data base
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);
// if not got all events return 404
  if (!allEvents) {
    return res.status(404).json({
      status: 404,
      message: 'Events data not found',
    });
  }
//if the method is POST then extract the email id
  if (method === 'POST') {
    const { email, eventId } = req.body;
//check if the format of the email is not ok
    if (!email | !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
    }

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res.status(409).json({ message: 'This email has already been registered' });
          return ev;
        }
        //return all the data in the object
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      //else
      return ev;
    });

    //update the data base with new entered email
    fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

    res.status(201).json({
      message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
    });
  }
}