import React, { Fragment } from 'react';
import { Header, Image, Button, Modal as ModalComponent, Icon, Form, TransitionablePortal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' ;
import './App.css'

export const DEFAULT_PROPS = {
  transition: {
    animation: "fly up",
    duration: 2000
  }
};
export default class AjoutuerVoiture extends React.Component{
  constructor(props){
    super(props) ;
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.restaurerChamp=this.restaurerChamp.bind(this)
  }

  state={
    champ:{
      numero : '',
      cin_chauffeur : '',
      cin_proprietaire :'',
    },
    modifMode:false,
    open: false,
    closeOnDimmerClick :false
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

  restaurerChamp(){
    let f={numero:'',cin_chauffeur:'',cin_proprietaire:''}
    this.setState({
      champ:f
    })
  }

  handleChange(event){
    let name=event.target.name ;
    let val=event.target.value ;

    let stateChamp=this.state.champ ;
    stateChamp[name]=val
    this.setState({
      champ:stateChamp
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let url="http://localhost:9090/records/vehicule"
    fetch(url,{
      method:'POST',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(this.state.champ)
    }).then(async(response)=>{
      let data=await response.json()
      if(data.numero!=undefined){
        this.restaurerChamp()
        this.setState({
          modifMode:false
        })
      }
    })
    this.setState({
      modalOpen: false
    })
  }


  render(){
    const { open } = this.state;
    const { transition } = this.props;
    return(
      <Fragment>
        <Button onClick={this.handleTriggerClick} icon animated color='blue' style={{padding:'12px'}}>
          <Button.Content visible>Ajouter une voiture</Button.Content>
          <Button.Content hidden>
            <Icon name='add' />
          </Button.Content>
        </Button>
        <TransitionablePortal {...{ open }} {...{ transition }}>
          <ModalComponent open onClose={this.handleClose} closeOnDimmerClick={this.state.closeOnDimmerClick}
          >
            <ModalComponent.Header style={{background: '#1678C2', color:'#ffffff'}}>
              Enregistrement de voiture
              <Button onClick={this.handleClose} style={{backgroundColor:'transparent', position:'fixed', right:0}} >
                <Icon name='close' style={{color:'#ffffff'}}/>
              </Button>
            </ModalComponent.Header>
            <ModalComponent.Content image>
              <ModalComponent.Description>
                <div>
                  <Form>
                    <Form.Field>
                      <label>Numéro de matriculation</label>
                      <input requered onChange={this.handleChange} placeholder='ohatra: 1545TBK' name='numero'/>
                    </Form.Field>
                    <Form.Field>
                      <label>CIN du chauffeur</label>
                      <input requered onChange={this.handleChange} name='cin_chauffeur'/>
                    </Form.Field>
                    <Form.Field>
                      <label>CIN du propriétaire</label>
                      <input requered onChange={this.handleChange} name='cin_proprietaire'/>
                    </Form.Field>
                  </Form>
                </div>
              </ModalComponent.Description>
            </ModalComponent.Content>
            <ModalComponent.Actions>
              <Button primary requered onClick={this.handleSubmit}>
                Enregistrer <Icon name='save' />
              </Button>
            </ModalComponent.Actions>
          </ModalComponent>
        </TransitionablePortal >
      </Fragment>
    )
  }
}

AjoutuerVoiture.defaultProps = DEFAULT_PROPS
