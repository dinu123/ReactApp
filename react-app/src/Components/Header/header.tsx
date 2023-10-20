import {BiRefresh} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai'

import './header.css';
const Header = () => {
    return (
        <div className="header-container">
            <section className="top-container">
               <span className='refresh-icon'><BiRefresh/></span>
               <span>Location</span>
               <span><AiOutlinePlus/></span>
            </section>
            <section className="search-container"> 
            <input type='search' className='search-input'/>
            </section>
            <section className="filter-container">
                <ul>
                    <li>
                        <button>Filter1</button>
                    </li>
                    <li>
                        <button>Filter2</button>
                    </li>
                    <li>
                        <button>Filter3</button>
                    </li>
                    <li>
                        <button>Filter4</button>
                    </li>
                </ul>
            </section>
       </div>
    )
}
export default Header;