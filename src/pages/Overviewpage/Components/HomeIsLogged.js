import { Component } from 'react';
import '../Styles/styles.css';
import Loader from '../../../global/Components/Loader';
import NoAccess from '../../../global/Components/NoAccess';
import CookieService from '../../../global/Services/CookieService';
import AuthService from '../../../global/Services/AuthService';
import { Link, useLocation} from 'react-router-dom';

import Button from "@material-ui/core/Button";


export const LocationDisplay = () => {
    const location = useLocation()
  
    return <div data-testid="location-display">{location.pathname}</div>
  }


class HomeIsLogged extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading : true, authenticated : false, 
        }
    }

    

    componentDidMount() {
        // Henter authtoken-cookie
        const token = CookieService.get("authtoken");

        if(token !== undefined) {
            // Om token eksisterer sjekker vi mot serveren om brukeren har en gyldig token
            AuthService.isAuthenticated(token).then(res => {
                if(!res.authenticated) {
                    // Sletter authtoken om token eksisterer lokalt men ikke er gyldig på server
                    CookieService.remove("authtoken");
                }
                this.setState({
                    authenticated : res.authenticated,
                    loading: false
                });
            });
        } else {
            this.setState({
                authenticated : false,
                loading: false
            });
        }
    }

    render() {
        const {loading, authenticated, usertype} = this.state;

        if(loading) {
            // Om vi er i loading fasen (Før mottatt data fra API) vises det et Loading ikon
            return(
                <section id="loading">
                    <Loader />
                </section>
            );
        }
        
        if(!loading && authenticated) {
            return (            
                <div className="main">
                    Hjemmeside for innloggede brukere
                    <Button 
                  component={Link} 
                  to='/course'>
                  Kurs
                </Button>
                </div>
            );
        } else {
            return (
                // Ugyldig eller ikke-eksisterende token 
                <NoAccess />
            );
        }
    }    
}   


export default HomeIsLogged; 