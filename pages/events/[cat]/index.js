import Image from 'next/image';
import Link from 'next/link';
import CatEvent from '../../../src/components/events/catEvent';

const EventsPerCityPage = ({ data , pageName }) =><CatEvent data={data} pageName={pageName}/>

export default EventsPerCityPage; 

export async function getStaticPaths() {
    
const {events_categories}=await import('/Users/Admin/Desktop/Projects/events_app/data/data.json');
const allPaths = events_categories.map((ev)=> {
    return{
        params: {
            cat:ev.id.toString() ,
        },
    };
});
 console.log(allPaths);

    return{
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context){
    console.log(context);
    const id = context?.params.cat;
    const {allEvents}=await import('/Users/Admin/Desktop/Projects/events_app/data/data.json');
   //console.log(id)
   const data = allEvents.filter( (ev) => ev.city === id);
   console.log(data);

    return {props:{ data, pageName : id}
    };

}