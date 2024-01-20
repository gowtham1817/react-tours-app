import { useEffect, useState } from 'react'

import './App.css'  
import Loading from './Loading';
import Tours from './Tours';
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [isLoading,setIsLoading] = useState(true)
  const [tours,setTours] = useState([]) 


  const removeTours = (id) => {
     console.log(id)
     const newTours = tours.filter((tour) => tour.id !== id);
     console.log(newTours)
     setTours(newTours);
  }

  const fetchData = async() =>{
    setIsLoading(true)
    try{
        const response = await fetch(url);
        const tours = await response.json();
        setTours(tours)
        console.log(tours)
      
    }
    catch(error){
       console.log(error)
    }
    setIsLoading(false)
}

  useEffect(()=>{
      
       fetchData();
  },[])

  if(isLoading){
      return(
        <main>
           <Loading />
        </main>
      );
  }

  if(tours.length === 0){
    return(
      <main>
         <div className='title'>
             <h2>NO TOURS LEFT</h2> 
             <button type='button' style={{marginTop:'2rem'}} className='btn' onClick={()=> fetchData()}>
                refresh
             </button>
         </div>
      </main>
    );
  }

  return (
      <main>
          <Tours tours={tours} removeTours={removeTours} />
      </main>
  )
}

export default App
