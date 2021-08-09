import  React from 'react';
import { useEffect, useState} from 'react';
// import "..components/ToggleSwitch.css"

// import Switch from "react-switch"


const AsideRight = (props) => {

    
        // const [isToggled, setIsToggled] = useState(false);
        // const onToggle = () => setIsToggled(!isToggled);


    return (
        <aside>
            {/* {props.currentUser.id != null && 
            <div>
            <label className="switch-container">
             <label className="toggle-switch">
            <input type="checkbox" checked={props.edit}
             onChange={props.editToggle} />
            <span className="switch" />
            </label>
            <p>edit</p>
            </label>
            </div>
        
        } */}
        <button onClick={() => props.reorderSubmit()} >submit reorder</button>
        </aside>
    )

    

    }
export default AsideRight