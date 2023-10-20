import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Header from "../Header/header";
import Card from "../UI/Card/card";
import Layout from "../UI/Layout/Layout";
import { useState } from "react";
import { Circles } from 'react-loader-spinner'
import './location.css'
const GET_LOCATIONS = gql`
  query LocationList($tenant: String!, $orderBy: OrderBy12,$order: Order13,$search: String) {
    locationList(tenant: $tenant, orderBy: $orderBy,  order: $order, search: $search) {
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
    const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
        fetchPolicy: 'network-only',
        variables: { tenant: '692627ef-fda8-4203-b108-e8e9f52ad410', "orderBy": "updated", "order": "desc", "search": search },
    });
    if (error) return <p>Error: {error.message}</p>;

    // Access the data and render it in your component
    const locations = data?.locationList?.resources;

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

        </Layout>
    )
}

export default LocationCard;