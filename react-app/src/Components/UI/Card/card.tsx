import { SlCalender } from 'react-icons/sl';
import { BiTime, BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai'
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import React from 'react';
import "./card.css";
import { CardInterface } from "../../../Interfase/card";
import { useState } from 'react';
import EditableCard from '../../EdiatbleCard/editableCard';
import { Circles } from 'react-loader-spinner';
import { RefreshContext } from '../../../Context/refreshContext';
import { TENT_CODE } from '../../../Constant';

const EDIT_LOCATION = gql`
mutation LocationUpdate($locationUpdateId: String!, $requestBody: LocationWriteInput!, $tenant: String!) {
    locationUpdate(id: $locationUpdateId, requestBody: $requestBody, tenant: $tenant) {
      ... on LocationCommandResponse {
        resourceID
      }
    }
  }
`;


const Card = (props: any) => {
    const { name, npi, status, updatedAt, id } = props.data;
    const getForamtedDate = (timestamp: any) => {
        const date = new Date(timestamp);
        // Define an array for month names
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        // Get the month, day, and year
        const month = monthNames[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        // Get the time components
        const hours: any = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Determine if it's AM or PM
        const amOrPm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        const formattedHours = (hours % 12) || 12; // 12:00 AM should be displayed as 12:00 AM

        // Format date and time
        const formattedDate = `${month}-${day}`;
        const formattedTime = `${formattedHours}:${minutes} ${amOrPm}`;

        return {
            formattedDate,
            formattedTime
        }
    }
    const formatedDateTime = getForamtedDate(updatedAt);
    const [isLoading, setIsLoading] = useState(false);
    const [locationUpdate] = useMutation(EDIT_LOCATION);
    const {setIsListRefresh} = React.useContext(RefreshContext);

    const handleEdit = async (updatedValue: any, apiLabel: any) => {
        setIsLoading(true);
        try {
            const updatedData = { ...props.data };
            delete updatedData.__typename;
            const result = await locationUpdate({
                variables: {
                    "locationUpdateId": id,
                    "requestBody": { ...updatedData, [apiLabel]: updatedValue },
                    "tenant": TENT_CODE.code
                },
            });
            setIsListRefresh();

            console.log('Location updated:', result.data.locationUpdate);
            // Handle success or update the UI as needed
        } catch (error) {
            console.error('Error editing location:', error);
            // Handle the error
        }
        setIsLoading(false);
    };

    return (
        <section className="card-container" onClick={() => { if (props.isEditable) { return; } else { props.cardClick(id) } }}>
            {isLoading && <Circles
                height="80"
                width="80"
                color="#000"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />}
            {props.isEditable && <AiOutlineDelete onClick={() => { props.deleteClick(id) }} />}
            <div className='card-inner-container'>
                <p className="name">
               {props.isEditable && <EditableCard label="First Name:" value={props.data.name} blurEvent={handleEdit} apiLabel="name" />}
                {!props.isEditable && <span className="first-name">{name}</span>}
                </p>
                 {props.isEditable && <EditableCard label="Status:" className = "badge" value={props.data.status} blurEvent={handleEdit} apiLabel="status" />}
                 {!props.isEditable && status&& <span className="badge">{status}</span>}
                
            </div>
            <div>
            {props.isEditable && <EditableCard label="NPI:" value={props.data.npi} blurEvent={handleEdit} apiLabel="npi" />}
                {!props.isEditable && <span className="location">{npi}</span>}
            </div>
            <div className='time-container card-inner-container'>
                <p>
                    <span>
                        <SlCalender /> <span>{formatedDateTime.formattedDate}</span>
                    </span>
                    <time>
                        <BiTime /> <span>{formatedDateTime.formattedTime}</span>
                    </time>
                </p>
                {/*  <span className='time-stamp'>{timeStamp}</span> */}
            </div>
            {props.isEditable && <div className='time-container card-inner-container extra-location-info'>

                <ul>
                   <li>
                        <EditableCard label="Description:" value={props.data.description} blurEvent={handleEdit} apiLabel="description" />
                    </li>
                     <li>
                        <EditableCard label="Managing Organization:" value={props.data.managingOrganization} blurEvent={handleEdit} apiLabel="managingOrganization" />
                    </li>
                     <li>
                        <EditableCard label="Part Of:" value={props.data.partOf} blurEvent={handleEdit} apiLabel="partOf" />
                    </li>
                        <li>
                            <EditableCard label="Tags:" value={props.data.tag} blurEvent={handleEdit} apiLabel="tag" />
                        </li>
                        <li>
                            <EditableCard label="Type:" value={props.data.type} blurEvent={handleEdit} apiLabel="type" />
                        </li>
                </ul>
                {/*  <span className='time-stamp'>{timeStamp}</span> */}
            </div>
            }

        </section>
    )
}
export default Card;