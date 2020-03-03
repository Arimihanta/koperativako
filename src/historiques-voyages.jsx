import React, {Component,Fragment} from 'react';
import { Table, Button, Icon, TransitionablePortal, Modal as ModalComponent } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' ;
import './App.css'
import _ from 'lodash'
import {Conversion,Dictionnaire} from './lib/oark-lib.js'

export const DEFAULT_PROPS = {
  transition: {
    animation: "zoom",
    duration: 1000
  }
};

class ListePassager extends Component{
  constructor(props){
    super(props) ;
  }

  state={
    open: false,
    closeOnDimmerClick :false,
    reservation_par_date:[],
  }
  setOpen = open => {
    this.setState((prevState, props) => ({
      open
    }));
  };

  handleTriggerClick = event => {
    this.setOpen(true);
  };

  handleClose = (event, data) => {
    this.setOpen(false);
  };

  componentDidMount(){
    this.refreshDataReservationParDate()
  }
  refreshDataReservationParDate(){
    let f={
      numero_voiture:this.props.numero_voiture,
      lieu_depart:this.props.lieu_depart,
      lieu_destination:this.props.lieu_destination,
      date:this.props.date
    }
    console.log(JSON.stringify(f))
    let url="http://localhost:9096/records/reservation/"+JSON.stringify(f)
    fetch(url,{
      headers:{
        "content-type":"application/json"
      }
    }).then(async(response)=>{
      let data=await response.json()
      console.log(data)
      this.setState({
        reservation_par_date:data
      })
    })
  }


  render(){
    const { open } = this.state;
    const { transition } = this.props;
    return(
      <Fragment>
        <Button onClick={this.handleTriggerClick} icon animated color='grey' style={{padding:'12px'}}>
          <Button.Content visible>voir</Button.Content>
          <Button.Content hidden>
            <Icon name='eye' />
          </Button.Content>
        </Button>
        <TransitionablePortal {...{ open }} {...{ transition }}>
          <ModalComponent closeIcon centered={false} open onClose={this.handleClose} closeOnDimmerClick={this.state.closeOnDimmerClick}
            style={{padding:0}}
          >
            <ModalComponent.Content image scrolling style={{padding:0,}} className='invisible-scroll'>
              <ModalComponent.Description style={{padding:0, margin : 0}}>
                <div style={{padding:0, margin : 0}}>
                  <Table sortable size='small'>
                    <Table.Header style={{height:'30px !important', fontWeight:'200 !important', fontSize:'11px' , background:'blue'}}>
                      <Table.Row>
                        <Table.HeaderCell>Place</Table.HeaderCell>
                        <Table.HeaderCell>Nom du voyageur</Table.HeaderCell>
                        <Table.HeaderCell>Telephone</Table.HeaderCell>
                        <Table.HeaderCell>Carte d'identité Nationale</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body style={{fontSize:'11px'}} className='body-table'>
                      {_.map(this.state.reservation_par_date, ({ id,voiture,voyageur,lieu_depart,lieu_destination,date,place}) => (
                        <Table.Row>
                          <Table.Cell>{place}</Table.Cell>
                          <Table.Cell>{voyageur.nom} {voyageur.prenom}</Table.Cell>
                          <Table.Cell>0340000000</Table.Cell>
                          <Table.Cell>{voyageur.cin}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </ModalComponent.Description>
            </ModalComponent.Content>
          </ModalComponent>
        </TransitionablePortal >
      </Fragment>
    )
  }
}
ListePassager.defaultProps = DEFAULT_PROPS

export default class HistoriquesVoyages extends Component{
  constructor(props){
    super(props) ;
  }
  state={
    historiques_voyages:[]
  }

  componentDidMount(){
    this.getHistoriquesVoyages()
  }
  getHistoriquesVoyages(){
    let url="http://localhost:9096/records/voyage/"
    fetch(url,{
      headers:{
        "content-type":"application/json"
      }
    }).then(async(response)=>{
      let data=await response.json()
      console.log(data)
      this.setState({
        historiques_voyages:data
      })
    })
  }

  render(){
    return (
      <div className="main-conteneur"> 
        <Table celled selectable  sortable inverted style={{ margin:'auto'}} 
          >
          <Table.Header style={{height:'30px !important', fontWeight:'200 !important', fontSize:'14px'}} className='entete-table'>
            <Table.Row>
              <Table.HeaderCell
              >
                Date du voyage</Table.HeaderCell>
              <Table.HeaderCell
                >Numero du voiture</Table.HeaderCell>
              <Table.HeaderCell
                >Lieu de depart</Table.HeaderCell>
              <Table.HeaderCell
              >Lieu de destination</Table.HeaderCell>
              <Table.HeaderCell
              >Nombre de voyageur</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(this.state.historiques_voyages, ({ numero_voiture,lieu_depart,lieu_destination,date }) => (
              <Table.Row>
                <Table.Cell>{Conversion.dateFrLettre(date)}</Table.Cell>
                <Table.Cell >{numero_voiture}</Table.Cell>
                <Table.Cell >{lieu_depart}</Table.Cell>
                <Table.Cell >{lieu_destination}</Table.Cell>
                <Table.Cell padding={0} style={{padding:'0px !important'}}>
                  <ul className="ul-nom">
                    <li>
                      <div padding={0}>
                      {18}
                      </div>
                    </li>
                    <li className="menu-edit-delete">
                      <ListePassager numero_voiture={numero_voiture} lieu_depart={lieu_depart} lieu_destination={lieu_destination} date={date}/>
                    </li>
                  </ul>
                </Table.Cell>
              </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    ) ;
  }
}
