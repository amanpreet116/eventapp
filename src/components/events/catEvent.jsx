import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

//<div className="cat_events"></div>

const CatEvent = ({ data, pageName }) => {
  return (
    <div className="cat_events">
         <h1>Events in {pageName} </h1>

     <div className='content'>
        {
            data.map((ev) => (
                <Link legacyBehavior key={ev.id}  href={`/events/${ev.city}/${ev.id}`}
                passHref>

                {/* <a href='/events/${ev.city}/${ev.id}' > */}
               <a className="card">
               <img width={300} height={300} src={ev.image} alt={ev.title} />
                <h2> { ev.title} </h2>
                <p> {ev.description} </p>
                </a>
                </Link>
            ))
        }
     
        
     </div>
    </div>
  );
      };


export default CatEvent;