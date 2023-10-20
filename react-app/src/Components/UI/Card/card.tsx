import {SlCalender} from 'react-icons/sl';
import {BiTime} from 'react-icons/bi';

import "./card.css";
import { CardInterface } from "../../../Interfase/card";

const Card = () => {
   /*  const {firstName,lastName,status,location,date,time,timeStamp} = props; */
    return (
        <section className="card-container">
            <div className='card-inner-container'>
                <p className="name">
                    <span className="first-name">dinesh</span>
                    <span className="last-name">Kumar</span>
                </p>
                <span className="badge">Active</span>
            </div>
            <div>
                <text>394739473449</text>
            </div>
            <div className='time-container card-inner-container'>
               <p>
                <span>
                    <SlCalender/> <span>28 Aug</span>
                </span>
                <time>
                    <BiTime/> <span>08:00 Am</span>
                </time>
               </p>
               <span className='time-stamp'>0h</span>
            </div>

        </section>
    )
}
export default Card;