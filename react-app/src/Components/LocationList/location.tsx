import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Header from "../Header/header";
import Card from "../UI/Card/card";
import Layout from "../UI/Layout/Layout";
import { useState } from "react";
import { Circles } from 'react-loader-spinner'
import './location.css'
import CustomPagination from '../Pagination/pagination';
import { TENT_CODE } from '../../Constant';
const GET_LOCATIONS = gql`
  query LocationList($tenant: String!, $orderBy: OrderBy12,$order: Order13,$search: String,$page: Int) {
    locationList(tenant: $tenant, orderBy: $orderBy,  order: $order, search: $search, page: $page) {
      pages
      resources {
        address
        name
        npi
        status
        updatedAt
        id
      }
    }
  }
`;

const LocationCard = (props: any) => {
    const [search, setSearch] = useState('');
    const [isRefresh, setIsRefresh] = useState(false);
    const [pageNumber,setPageNumber] = useState(0);
    const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
        fetchPolicy: 'network-only',
        variables: { tenant: TENT_CODE.code, "orderBy": "updated", "order": "desc", "search": search, "page":pageNumber },
    });
    if (error) return <p>Error: {error.message}</p>;

    // Access the data and render it in your component
    const locations = data?.locationList?.resources;
    const totalNumberOfPages = data?.locationList?.pages;

    const locationSearchHandler = (value: any) => {
        setSearch(value);
    }
    const refreshDataHandler = async () => {
        setIsRefresh(true);
        try {
            await refetch();
        } catch (error) {
            console.error(error);
        }
        setIsRefresh(false);
    }

    return (
        <Layout>
            <Header searchHandler={locationSearchHandler} search={search} refreshHandler={refreshDataHandler} />
            {(loading || isRefresh) && <Circles
                height="80"
                width="80"
                color="#000"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />}
            {!loading && locations?.map((rec: any) => {
                return <Card data={rec} key={rec.id} cardClick={props.onCardClikHandler} isEditable={false} />
            })}

            {totalNumberOfPages
               && <CustomPagination maxPages = {totalNumberOfPages} acivePageNumber = {pageNumber} onClickHandler = {(value:any) => {
                    setPageNumber(value);
               }}/>
           }
            

        </Layout>
    )
}

export default LocationCard;