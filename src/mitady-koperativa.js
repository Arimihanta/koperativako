import React from 'react' ;
import { Form,
  Button,
  Input,
  Dropdown,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Responsive
} from 'semantic-ui-react' ;
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css' ;
import './App.css' ;
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import KoperativaMandeha from './koperativa-mandeha.js' ;
import ReserverPlace from './reserver-place.jsx'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
] ;
const villesOptions = [
  { key: 'Ambatondrazaka', text: 'Ambatondrazaka', value: 'Ambatondrazaka' },
  { key: 'Antananarivo', text: 'Antananarivo', value: 'Antananarivo' },
  { key: 'Moramanga', text: 'Moramanga', value: 'Moramanga' },
  { key: 'Toamasina', text: 'Toamasina', value: 'Toamasina' },
  { key: 'Fianarantsoa', text: 'Fianarantsoa', value: 'Fianarantsoa' },
  { key: 'Farafangana', text: 'Farafangana', value: 'Farafangana' },
  { key: 'Mahajanga', text: 'Mahajanga', value: 'Mahajanga' },
  { key: 'Antsiranana', text: 'Antsiranana', value: 'Antsiranana' },
  { key: 'Fandriana', text: 'Fandriana', value: 'Fandriana' },
] ;



class MitadyKoperativa extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      dateTime: '',
      datesRange: ''
    };
  }
  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Grid
            container
            columns={4}
            stackable
            style={{
              marginTop:20,
              marginBottom: 20
            }}
            >
            <Grid.Column
              style={{ paddingBottom:'0px !important',  magin:'0px !important', }}
            >
              <Dropdown
                button
                className='icon choix-destination'
                placeholder='Toerana hiaingana'
                fluid
                options={villesOptions}
                search
                labeled
                icon='map marker alternate'
                style={{ marginBottom: '0vh' }}
                circular
              />
            </Grid.Column>
            <Grid.Column
              style={{ padding:'0rem 0rem !important' }}
              >
              <Dropdown
                button
                className='icon'
                placeholder='Toerana haleha'
                fluid
                options={villesOptions}
                search
                labeled
                icon='map marker alternate'
                style={{ marginBottom: '0vh' }}
                circular
              />
            </Grid.Column>
            <Grid.Column>
              <DateInput
                name="date"
                placeholder="Date"
                fluid
                value={this.state.date}
                iconPosition="left"
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Link to="/koperativa-mandeha">
                <Button className="b-valid-search" color='brown' fluid size='large' circular>Hitady</Button>
              </Link>
            </Grid.Column>
          </Grid>
          <ReserverPlace></ReserverPlace>
        </div>

        <Route path="/koperativa-mandeha" component={KoperativaMandeha} />
      </Router>

    );
  }
}

export { MitadyKoperativa as default };
