import Image from 'next/image';
import Link from 'next/link';
// import {Head} from 
//import { HomePage } from '../src/components/home/home-page'

const EventsPage = ({data}) => {
  
    return (
      <div>
      <Head>
        <title>Events app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage data={data} />
    </div>
    )
}
export default EventsPage;


export async function getStaticProps(){
  const {events_categories}=await import('/Users/Admin/Desktop/Projects/events_app/data/data.json');
 console.log(events_categories);
  return {
      props:{
         data: events_categories,
      },
  };
}