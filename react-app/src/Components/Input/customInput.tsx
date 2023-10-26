import React from 'react'
const CustomInput = (props:any) => {
    const {type,placeholder, InputchangeHandler} = props;
    const[value,setValue] = React.useState('');
    const onChangeHandler = (event:any) => {
        setValue(event.target.value);
    }
    const blurHandler = () => {
        InputchangeHandler(placeholder,value);
    }
    return (
        <input type= {type} placeholder={placeholder} onChange={onChangeHandler} value={value} onBlur={blurHandler}/>
    )
}

export default CustomInput;