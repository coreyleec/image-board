import React, {useEffect} from 'react'
import DndContainer from "./containers/DndContainer";
const Homepage = () => {
    // fetch admin photos 
    //account public or private unless admin
    const [photos, setPhotos] = useState();
  useLayoutEffect(() => {
    fetch(`http://localhost:3000/photos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((photos) => {
        setPhotos(photos);
        // console.log("photos", photos)
      });
  }, []);
    // edit switch saves to local storage
    //sidebar has folder
    // sidebar has about me 
    // home button takes user back to thier account or my account
    
    return (
        <div>
            <DndContainer/>
        </div>
    )
}

export default Homepage
