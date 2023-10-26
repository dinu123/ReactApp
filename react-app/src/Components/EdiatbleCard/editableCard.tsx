import { BiTime, BiEditAlt } from 'react-icons/bi';
import React from 'react';


const EditableCard = (props:any) => {
    const [value,setValue] = React.useState(props.value);
    const [isEditable,setIsEditable] = React.useState(false);
   
    return (
        <div>
        <label>{props.label}</label>
        {!isEditable && <span className={props.className}>{value} <BiEditAlt onClick={() => setIsEditable(true)}/> </span> }
        {isEditable && <input type='text' value={value} onChange={(e) => setValue(e.target.value) } onBlur={() => {setIsEditable(false); props.blurEvent(value,props.apiLabel)}}/>}
        </div>
    )
}

export default EditableCard;