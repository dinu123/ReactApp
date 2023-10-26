import {BiRefresh} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai'
import React from 'react';

import './header.css';
import Modal from '../ModalWindow/modal';
import { useState } from 'react';
import CustomInput from '../Input/customInput';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { RefreshContext } from '../../Context/refreshContext';
import { TENT_CODE } from '../../Constant';

const ADD_LOCATION = gql`
mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
    locationCreate(requestBody: $requestBody, tenant: $tenant) {
      ... on LocationCommandResponse {
        resourceID
      }
    }
  }
`;



const Header = (props:any) => {
    const {search} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [locationCreate] = useMutation(ADD_LOCATION);
    const {setIsListRefresh} = React.useContext(RefreshContext)
    const changeHandler = (event:any) => {
            props.searchHandler(event.target.value)
    }
    const [isModalOpen, setModalOpen] = useState(false);
    const [formInput,setFormInput] = useState({});

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    const saveHandler = async() => {
        setIsLoading(true);
        try {
            const result = await locationCreate({
                variables: {
                    "requestBody": { ...formInput },
                    "tenant": TENT_CODE.code
                },
            });

            console.log('Location updated:', result.data.locationCreate);
            setIsListRefresh();
            // Handle success or update the UI as needed
        } catch (error) {
            console.error('Error editing location:', error);
            // Handle the error
        }
        setIsLoading(false);
        closeModal();
        console.log("Save Calll");
    }
    const changeStateValue = (apilable:any,value:any) => {
        const updatedFormInput = {...formInput,[apilable]:value};
        setFormInput(updatedFormInput)
    }
    return (
        <div className="header-container">
            <section className="top-container">
               <span className='refresh-icon' onClick={props.refreshHandler}><BiRefresh/></span>
               <span>Location</span>
               <span onClick={openModal}><AiOutlinePlus/></span>
            </section>
            <section className="search-container"> 
            <input type='search'placeholder='Search Location...' className='search-input' value={search} onChange={changeHandler} />
            </section>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSave = {saveHandler}>
                <section className='modal-container'>
                    <div>
                        <div>
                        <label>Address</label>
                        <CustomInput type = "text" placeholder='address' InputchangeHandler = {changeStateValue}/>
                        </div>
                        <div>
                        <label>description</label>
                        <CustomInput type = "text" placeholder='description' InputchangeHandler = {changeStateValue}/>
                        </div>
                    </div>
                    <div>
                    <div>
                        <label>managingOrganization</label>
                        <CustomInput type = "text" placeholder='managingOrganization' InputchangeHandler = {changeStateValue}/>
                        </div>
                        <div>
                        <label>name</label>
                        <CustomInput type = "text" placeholder='name' InputchangeHandler = {changeStateValue}/>
                        </div>
                    </div>
                    <div>
                    <div>
                        <label>npi</label>
                        <CustomInput type = "text" placeholder='npi' InputchangeHandler = {changeStateValue}/>
                        </div>
                        <div>
                        <label>partOf</label>
                        <CustomInput type = "text" placeholder='partOf' InputchangeHandler = {changeStateValue}/>
                        </div>
                    </div>
                    <div>
                    <div>
                        <label>status</label>
                        <CustomInput type = "text" placeholder='status' InputchangeHandler = {changeStateValue}/>
                        </div>
                        <div>
                        <label>tag</label>
                        <CustomInput type = "text" placeholder='tag' InputchangeHandler = {changeStateValue}/>
                        </div>
                    </div>
                    <div>
                    <div>
                        <label>taxId</label>
                        <CustomInput type = "text" placeholder='taxId' InputchangeHandler = {changeStateValue}/>
                        </div>
                        <div>
                        <label>type</label>
                        <CustomInput type = "text" placeholder='type' InputchangeHandler = {changeStateValue}/>
                        </div>
                    </div>
                </section>
            </Modal>
       </div>
    )
}
export default Header;