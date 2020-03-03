import React from 'react';
import { Button, Icon,Modal, Form, Input, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' ;
import './App.css'
import { Conversion, Dictionnaire } from './lib/oark-lib';
import {DateInput} from 'semantic-ui-calendar-react';

export const DEFAULT_PROPS = {
    transition: {
        animation: "zoom",
        duration: 1000
    }
};

class NouveauProgrammeVoyage extends React.Component{
    
    state={
        openModalNewProgramme: false,
        closeOnDimmerClick :false,
        date_voyage : Conversion.dateToFr(this.props.date_voyage),
        numero_voiture : this.props.numero_voiture,
        lieu_depart : this.props.lieu_depart,
        lieu_destination : this.props.lieu_destination
    }

    setTrigger(){
        if(this.props.method=='POST'){
            return(
            <Button className='b-n' onClick={this.handleModalNewProgrammeOpen} icon animated color='blue'>
                <Button.Content visible>Nouveau programme</Button.Content>
                <Button.Content hidden>
                    <Icon name='add' />
                </Button.Content>
            </Button>)
        }
        if(this.props.method=='PUT') {
            return(
                <Button icon color='blue' size='small'>
                    <Icon name='edit' />
                </Button>
            )
        }
    }


    handleModalNewProgrammeOpen = () => this.setState({ openModalNewProgramme: true })

    handleModalNewProgrammeClose = () => this.setState({ openModalNewProgramme: false })


    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
            console.log('numero_voiture : '+this.state.numero_voiture)
        }
    }

    handleSubmit(event){
        event.preventDefault()
        let url=''
        if(this.props.method=='POST') url= "http://localhost:9098/records/programme_voyage/"
        else url="http://localhost:9098/records/programme_voyage/put/"

        let data_programme={
            date_voyage : Conversion.dateToEn(this.state.date_voyage),
            numero_voiture : this.state.numero_voiture,
            lieu_depart : this.state.lieu_depart,
            lieu_destination : this.state.lieu_destination,
            id:parseInt(this.props.id)
        }
        fetch(url,{
            method:this.props.method,
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data_programme)
          }).then(async(response)=>{
            let data=await response.json()
            this.setState({
                openModalNewProgramme:false
            })
          })
    }

    render(){
        return(
            <Modal
                trigger={
                    this.setTrigger()
                }
                centered={false} 
                onClose={this.handleModalNewProgrammeClose} 
                closeOnDimmerClick={this.state.closeOnDimmerClick}
                style={{width:'320px'}}
                onOpen={this.handleModalNewProgrammeOpen}
                open={this.state.openModalNewProgramme}
            >
                <Modal.Header style={{background: '#1678C2', color:'#ffffff'}}>
                    Programme de voyage
                    <Button onClick={this.handleModalNewProgrammeClose} style={{backgroundColor:'transparent', position:'fixed', right:0}} >
                        <Icon name='close' style={{color:'#ffffff'}}/>
                    </Button>
                </Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <div className="form-select-voiture">
                            <Form>
                                <Form.Field>
                                    <label>Numero voiture</label>
                                    <Input name='numero_voiture' onChange={this.handleChange} placeholder='Numero voiture' value={this.state.numero_voiture}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>De</label>
                                    <Dropdown
                                    button
                                    className='icon choix-destination'
                                    placeholder='Départ'
                                    fluid
                                    options={Dictionnaire.villes}
                                    search
                                    labeled
                                    icon='map marker alternate'
                                    style={{ marginBottom: '0vh' }}
                                    circular
                                    name='lieu_depart'
                                    onChange={this.handleChange}
                                    value={this.state.lieu_depart}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>A</label>
                                    <Dropdown
                                    button
                                    className='icon choix-destination'
                                    placeholder='Destination'
                                    fluid
                                    options={Dictionnaire.villes}
                                    search
                                    labeled
                                    icon='map marker alternate'
                                    style={{ marginBottom: '0vh' }}
                                    circular
                                    name='lieu_destination'
                                    onChange={this.handleChange}
                                    value={this.state.lieu_destination}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Date du voyage</label>
                                    <DateInput
                                    name="date_voyage"
                                    placeholder="Date"
                                    fluid
                                    value={this.state.date_voyage}
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form>
                        
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary requered onClick={this.handleSubmit.bind(this)}>
                        Enregistrer <Icon name='save' />
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export { NouveauProgrammeVoyage as default };