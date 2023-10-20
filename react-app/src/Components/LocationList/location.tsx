import { CardInterface } from "../../Interfase/card";
import Header from "../Header/header";
import Card from "../UI/Card/card";
import Layout from "../UI/Layout/Layout";

const CardJSON:CardInterface = 
    {
        firstName:"dinesh",
        lastName:"kumar",
        status:"Active",
        location:"3455847584754",
        date:"22Dec",
        time:"08:00 AM",
        timeStamp:"oh"
    }

const Location = () => {
    return (
        <Layout>
           <Header/>
          <Card/>
          <Card/>
          
        </Layout>
    )
}

export default Location;