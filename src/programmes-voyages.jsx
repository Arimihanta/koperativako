import React from 'react';
import { Table, Button, Icon, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' ;
import './App.css'
import _ from 'lodash'
import { Conversion } from './lib/oark-lib';
import NouveauProgrammeVoyage from './ajouter-programmes-voyages.jsx'

var mainState={
    programmes : [],
    closeOnDimmerClick:false,
    modalSuppressionOpen : false,
}

class SupprimerProgramme extends React.Component{
    state=mainState
    handleValiderSuppression(event){
        event.preventDefault()
    }
    handleModalSuppressionOpen = () => this.setState({ modalSuppressionOpen: true })

    handleModalSuppressionClose = () => this.setState({ modalSuppressionOpen: false })

    render(){
        return(
            <Modal
                trigger={
                    <Button icon color='red' size='small'>
                        <Icon name='delete' />
                    </Button>
                }
                size='small'
                closeIcon
                style={{width:360}}
                onClose={this.handleModalSuppressionClose}
                onOpen={this.handleModalSuppressionOpen}
                open={this.state.modalSuppressionOpen}
                closeOnDimmerClick={this.state.closeOnDimmerClick}
                centered={false}
            >
                <Modal.Header icon='question' content='Question' />
                <Modal.Content>
                    <p>
                Etes-vous sur de vouloir supprimer?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.handleModalSuppressionClose}>
                        <Icon name='remove' /> Non
                    </Button>
                    <Button color='green' onClick={this.handleValiderSuppression.bind(this)}>
                        <Icon name='checkmark' /> Oui
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default class ProgrammesVoyages extends React.Component{
    state=mainState

    componentDidMount(){
        this.getDataProgrammes()
    }

    getDataProgrammes(){
        let url="http://localhost:9098/records/programme_voyage/"
        fetch(url,{
        method:'GET',
        headers:{
            "content-type":"application/json"
        }
        }).then(async(response)=>{
            let data=await response.json()
            this.setState({programmes:data})
        })
    }
    
    render(){
        return(
            <div className="main-conteneur"> 
                <Table inverted style={{ margin:'auto'}} className='bordered-table'>
                    <Table.Header className='entete-table'>
                        <Table.Row className='entete-table'>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Numero du voiture</Table.HeaderCell>
                            <Table.HeaderCell>Lieu de depart</Table.HeaderCell>
                            <Table.HeaderCell>Lieu de destination</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body className='body-table'>
                    {_.map(this.state.programmes, ({ numero_voiture,lieu_depart,lieu_destination,date_voyage, id }) => (
                        <Table.Row inverted className='row-table'>
                            <Table.Cell >{Conversion.dateFrLettre(date_voyage)}</Table.Cell>
                            <Table.Cell>{numero_voiture}</Table.Cell>
                            <Table.Cell >{lieu_depart}</Table.Cell>
                            <Table.Cell padding={0} style={{padding:'0px !important'}}>
                                <ul className="ul-nom">
                                    <li className="l-d-lab-t">
                                        {lieu_destination}
                                    </li>
                                    <li className="menu-edit-delete">
                                        <div padding={0} style={{padding:'0px !important',margin:'0px !important'}}>
                                            <ul class='c-b-2b'>
                                                <li>
                                                    <NouveauProgrammeVoyage method={'PUT'} numero_voiture={numero_voiture} lieu_depart={lieu_depart} lieu_destination={lieu_destination} date_voyage={date_voyage} id={id}/>
                                                </li>
                                                <li>
                                                    <SupprimerProgramme/>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </Table.Cell>
                        </Table.Row>
                        ))
                    }
                    </Table.Body>
                </Table>
                <div className='c-b-r'>
                    <NouveauProgrammeVoyage method={'POST'} numero_voiture={''} lieu_depart={''} lieu_destination={''} date_voyage={''} id={-1}/>
                </div>
            </div>
        )
    }
}