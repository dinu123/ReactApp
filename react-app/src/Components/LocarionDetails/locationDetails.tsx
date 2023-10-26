import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Card from '../UI/Card/card';
import { Circles } from 'react-loader-spinner';
import { TENT_CODE } from '../../Constant';


const GET_LOCATION = gql`
query LocationRead($locationReadId: String!, $tenant: String!) {
    locationRead(id: $locationReadId, tenant: $tenant) {
      id
      resource {
        address
        alias
        description
        id
        managingOrganization
        name
        npi
        partOf
        status
        tag
        taxId
        tenant
        type
        updatedAt
      }
    }
  }
`;
const LocationDetails = (props: any) => {
    const { locationId } = props;
    const { loading, error, data } = useQuery(GET_LOCATION, {
      fetchPolicy: 'network-only',
        variables: { tenant: TENT_CODE.code, locationReadId: locationId },
    });

    if (loading) return <Circles
        height="80"
        width="80"
        color="#000"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
    />;
    if (error) return <p>Error: {error.message}</p>;

    // Access the data and render it in your component
    const locations = data.locationRead.resource;
    console.log(locations);
    return (
        <Card data={locations} isEditable={true} deleteClick={props.delteLocation} />
    )
}

export default LocationDetails;