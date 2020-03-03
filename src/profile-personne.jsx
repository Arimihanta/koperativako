import React from 'react';
import { Header, Image, Button, Modal, Icon, Form, Grid, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' ;
import './App.css'
class ProfilePersonne extends React.Component{
  constructor(props){
    super(props) ;
    this.getPersonne=this.getPersonne.bind(this)
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  state = {
    personne:{}
  }

  componentDidMount(){
    this.getPersonne()
  }

  getPersonne(){
    let url="http://localhost:9095/records/citoyen/"+this.props.cin
    console.log('tafiditra an-dapa')
    fetch(url,{
      headers:{
        "content-type":"application/json"
      }
    }).then(async(response)=>{
      let data=await response.json()
      console.log(data)
      this.setState({
        personne:data
      })
    })
  }


  render(){
    let personne=this.state.personne
    return(
      <Modal trigger={
          <Label className="link-name" as='a' onClick={this.handleOpen} style={{padding:'10px', margin:'0px'}}>
            {personne.nom} {personne.prenom}
          </Label>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        centered={false}
        size='small'
      >
        <Modal.Header style={{background: '#1678C2', color:'#ffffff'}}>
          {personne.nom} {personne.prenom}
          <Button onClick={this.handleClose} style={{backgroundColor:'transparent', position:'fixed', right:0}} >
            <Icon name='close' style={{color:'#ffffff'}}/>
          </Button>
        </Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://scontent.ftnr2-1.fna.fbcdn.net/v/t31.0-8/fr/cp0/e15/q65/20247754_831351377042266_7529852046823853701_o.jpg?_nc_cat=108&efg=eyJpIjoiYiJ9&_nc_ohc=dKxla_cHVsQAX89F6a1&_nc_ht=scontent.ftnr2-1.fna&_nc_tp=14&oh=3fe1f8f10ce3322f7764c31ed48719e8&oe=5EB9FAE3' />
          <Modal.Description>
            <Grid>
                <Grid.Row>
                  <Grid.Column>Nom</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{personne.nom}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>Prénom</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{personne.prenom}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>Date de naissance</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{personne.date_naisse}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>Lieu de naissance</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>{personne.lieu_naisse}</Grid.Column>
                </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary requered onClick={this.handleClose}>
            Fermer <Icon name='close' />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export { ProfilePersonne as default };
