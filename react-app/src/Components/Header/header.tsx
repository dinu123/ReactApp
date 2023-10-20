import {BiRefresh} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai'

import './header.css';

const Header = (props:any) => {
    const {search} = props;
    const changeHandler = (event:any) => {
            props.searchHandler(event.target.value)
    }
    return (
        <div className="header-container">
            <section className="top-container">
               <span className='refresh-icon' onClick={props.refreshHandler}><BiRefresh/></span>
               <span>Location</span>
               <span><AiOutlinePlus/></span>
            </section>
            <section className="search-container"> 
            <input type='search'placeholder='Search Location...' className='search-input' value={search} onChange={changeHandler} />
            </section>
       </div>
    )
}
export default Header;