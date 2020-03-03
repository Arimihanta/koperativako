import React from 'react';
import { Header, Image, Table, Button, Modal, Icon,  Checkbox, Form, Grid, Label, Container, Menu, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css' ;
import './App.css'
import _ from 'lodash'
import AjoutuerVoiture from './ajouter-voiture.jsx'
import ProfilePersonne from './profile-personne.jsx'

class ModifierVehicule extends React.Component{
  constructor(props){
    super(props) ;
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  state={
    champ:{
      numero : this.props.numero,
      cin_chauffeur : this.props.cin_chauffeur,
      cin_proprietaire :this.props.cin_proprietaire,
    },
    modifMode:false,
    modalOpen: false
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
      method:'PUT',
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
  }

  render(){
    return(
      <Modal trigger={<Button onClick={this.handleOpen} icon animated color='blue' style={{padding:'10px', width:100}}>
        <Button.Content visible>Modifier</Button.Content>
        <Button.Content hidden>
          <Icon name='edit' />
        </Button.Content>
      </Button>
        }
        centered={false}
        size='small'
        
      >
        <Modal.Header style={{background: '#1678C2', color:'#ffffff'}}>
          Modifier la propriété
        </Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://scontent.ftnr2-1.fna.fbcdn.net/v/t31.0-8/fr/cp0/e15/q65/20247754_831351377042266_7529852046823853701_o.jpg?_nc_cat=108&efg=eyJpIjoiYiJ9&_nc_ohc=dKxla_cHVsQAX89F6a1&_nc_ht=scontent.ftnr2-1.fna&_nc_tp=14&oh=3fe1f8f10ce3322f7764c31ed48719e8&oe=5EB9FAE3' />
          <Modal.Description>
            <div>
              <Form>
                <Form.Field>
                  <label>Numero de matriculation</label>
                  <input requered onChange={this.handleChange} placeholder='ex: 1545TBK' name='numero' value={this.props.numero}/>
                </Form.Field>
                <Form.Field>
                  <label>CIN du chauffeur</label>
                  <input requered onChange={this.handleChange} fluid placeholder='CIN du chauffeur' name='cin_chauffeur' value={this.state.champ.cin_chauffeur}/>
                </Form.Field>
                <Form.Field>
                  <label>CIN du proprietaire du voiture</label>
                  <input requered onChange={this.handleChange} fluid placeholder="CIN du proprietaire du voiture" name='cin_proprietaire' value={this.state.champ.cin_proprietaire}/>
                </Form.Field>
              </Form>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.handleSubmit}>
            Modifier
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

class SupprimerVehicule extends React.Component{
  constructor(props){
    super(props) ;
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  state={
    modalOpen: false
  }
  render(){
    return(
      <Modal trigger={<Button onClick={this.handleOpen} icon animated color='red' style={{padding:'10px', width:100}}>
        <Button.Content visible>Supprimer</Button.Content>
        <Button.Content hidden>
          <Icon name='delete' />
        </Button.Content>
      </Button>
    }
    size='small'
    closeIcon
    style={{width:360}}
    >
        <Header icon='question' content='Question' />
        <Modal.Content>
          <p>
            Etes-vous sur de vouloir supprimer la voiture portant le numero {this.props.numero}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green'>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}


class ListeVoiture extends React.Component{
  constructor(props){
    super(props) ;
  }
  state = {
    column: null,
    direction: null,
    listVehicule:[],
  }

  handleSort = (clickedColumn) => () => {
    const { column, listVehicule, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending',
        listVehicule: _.sortBy(listVehicule, [clickedColumn]),
      })
      return
    }

    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
      listVehicule: listVehicule.reverse(),
    })
  }
  componentWillMount(){
    this.getVehicules()
  }
  getVehicules(){
    let url="http://localhost:9090/records/vehicule"
    fetch(url,{
      headers:{
        "content-type":"application/json"
      }
    }).then(async(response)=>{
      let data=await response.json()
      console.log(data)
      this.setState({
        listVehicule:data
      })
    })
  }

  render(){
    const { column,  direction, listVehicule} = this.state
    return (
      <div className="main-conteneur">
        <Table celled selectable  sortable inverted style={{ margin:'auto'}} 
          >
          <Table.Header style={{height:'30px !important', fontWeight:'200 !important', fontSize:'14px'}} className='entete-table'>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'numero' ? direction : null}
                onClick={this.handleSort('numero')}
              >
                Numéro de plaque</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'chauffeur' ? direction : null}
                onClick={this.handleSort('chauffeur')}
                >Nom du chauffeur</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'proprietaire' ? direction : null}
                onClick={this.handleSort('proprietaire')}
                >Nom du propriétaire</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {_.map(listVehicule, ({ numero, chauffeur, proprietaire }) => (
                <Table.Row key="numero">
                  <Table.Cell>{numero}</Table.Cell>
                  <Table.Cell ><ProfilePersonne cin={chauffeur.cin}/></Table.Cell>
                  <Table.Cell padding={0} style={{padding:'0px !important'}}>
                    <ul className="ul-nom">
                      <li>
                        <div padding={0}>
                          <ProfilePersonne cin={proprietaire.cin}/>
                        </div>
                      </li>
                      <li className="menu-edit-delete">
                        <div padding={0}>
                          <Dropdown
                            icon='ellipsis vertical'
                            floating
                            pointing='right'
                            className='icon'
                            style={{margin:'0px !important', padding:'0px !important', border:'none', boxShadow:'none'}}
                          >
                            <Dropdown.Menu style={{background: 'transparent',padding:'0px !important', border:'none', boxShadow:'none !important'}}>
                              <Grid verticalAlign='middle'
                              horizontalAlign='middle' style={{background: '#f0f0f0',padding:'5px 5px 0px 5px !important', border:'none', boxShadow:'none !important'}}>
                                <Grid.Row style={{margin:'0px !important'}}>
                                  <Grid.Column width={7} style={{padding:'0px !important',margin:'0px !important'}}>
                                    <ModifierVehicule numero={numero} cin_chauffeur={chauffeur.cin} cin_proprietaire={proprietaire.cin}/>
                                  </Grid.Column>
                                  <Grid.Column width={7} style={{padding:'0px !important',margin:'0px !important'}}>
                                    <SupprimerVehicule numero={numero}/>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </li>
                    </ul>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <div
          style={{position:'fixed',bottom:'20px', right:'20px', backgroundColor: 'transparent', margin:'20px !important' }}
        >
          <AjoutuerVoiture num='1' 
            position='right'
            verticalAlign='middle'
            horizontalAlign='right'/>
        </div>
      </div>

    ) ;
  }
}
export { ListeVoiture as default };
