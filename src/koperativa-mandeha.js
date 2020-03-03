import React from 'react';
import { List, Responsive, Segment, Grid, Input } from 'semantic-ui-react' ;
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css' ;

class KoperativaMandeha extends React.Component{
  constructor(props) {
    super(props);

    this.lisitraKoperativa=[
      {koperativa:'Kompima', toerana:'Moramanga/Antananarivo/Toamasina'},
      {koperativa:'Anjara Trans', toerana:'Antananarivo/Ambatondrazaka/Amparafaravola/Toamasina'},
      {koperativa:'Zizah Trans', toerana:'Antananarivo/Ambatondrazaka/Amparafaravola/Toamasina'},
      ] ;

      
    this.lik=this.lisitraKoperativa.map((lisitraKoperativa)=>{
      return(
        <List.Item>
          <List.Icon name='car' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a' color='brown' >{lisitraKoperativa['koperativa']}</List.Header>
            <List.Description as='a'>{lisitraKoperativa['toerana']}</List.Description>
          </List.Content>
        </List.Item>
      ) ;
    }) ;
  }

  render(){
    return (
      <Router>
        <Responsive as={Segment} minWidth={320}
        >
          <Grid textAlign='left' style={{ height: '100vh'}} verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 320 }}>
              <Input fluid icon='search'
                iconPosition='right'
                placeholder='Anarana koperativa...'
              />
              <List divided relaxed>
                {this.lik}
              </List>
            </Grid.Column>
          </Grid>
        </Responsive>
      </Router>
    ) ;
  }
}
export { KoperativaMandeha as default };
