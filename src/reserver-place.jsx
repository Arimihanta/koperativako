import React from 'react';
import 'semantic-ui-css/semantic.min.css' ;
import {
  Button,
  Label,
  Image,
  Icon,
  Grid,
  Form,
  Modal,
  Header,
  Input,
  Dropdown,
  Table
} from 'semantic-ui-react' ;
import {
  DateInput
} from 'semantic-ui-calendar-react';
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import volant from './images/volant.jpeg'
import './lib/oark-lib.js'
import {Conversion,Dictionnaire} from './lib/oark-lib.js'
import _ from 'lodash'


class ReserverPlace extends React.Component{
  constructor(props){
    super(props) ;
    this.handleGetReservationParDate=this.handleGetReservationParDate.bind(this)
  }
  state={
    lastPlace:[],
    place:{
      un : false,
      deux : false,
      trois:false,
      quatre:false,
      cinq:false,
      six:false,
      sept:false,
      huit:false,
      neuf:false,
      dix : false,
      onze : false,
      douze : false,
      treize:false,
      quatorze:false,
      quinze:false,
      seize : false,
      dix_sept:false,
      dix_huit:false,
    },
    modalOpen: false,
    place_selectionnee:'',
    nom_place_selectionnee:'',
    date_voyage: '',
    numero_voiture:'',
    cin_voyageur:'',
    nom_voyageur:'',
    telephone_voyageur:'',
    all_reservations:[],
    lieu_depart:'',
    lieu_destination:'',
    reservation_par_date:[],
    modalSaisieNomOpen :false,
    personne_info:{},
    modalMessageErreur:false,
    closeOnDimmerClick :false,
    programmes_voyages:[]
  }


  handleClick(event){
    event.preventDefault()
    let name=event.target.name
    let value=event.target.value
    let selectedPlace=this.state.place
    if(selectedPlace[name]==true){
      let reservation=this.state.reservation_par_date.filter(reservation=>reservation.place==parseInt(value))[0]
      console.log('data CIN to delete : '+reservation.voyageur.cin)
      this.setState({
        modalOpen:true,
        place_selectionnee:value,
        nom_place_selectionnee:name,
        cin_voyageur:reservation.voyageur.cin
      })
    } 
    else {
      if(this.state.numero_voiture!='' && this.state.lieu_depart!='' && this.state.lieu_destination!='' && this.state.date_voyage!=''){
        this.setState({
          modalSaisieNomOpen:true,
          place_selectionnee:value,
          nom_place_selectionnee:name
        })
      }
      else{
        this.setState({modalMessageErreur:true})
      }
    }
    this.setState({
      place:selectedPlace,
      clicked:name
    })
  }
  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
      if(name=='cin_voyageur'){
        this.getPersonne(value)
        let personne=this.state.personne_info
         console.log(JSON.stringify(personne))
         if(personne!=undefined){
          this.setState({
            [name]: value,
            nom_voyageur:personne.nom+" "+personne.prenom
          })
         }
      }
    }
  }
  getPersonne(cin){
    let url="http://localhost:9095/records/citoyen/"+cin
    fetch(url,{
    method:'GET',
    headers:{
        "content-type":"application/json"
    }
    }).then(async(response)=>{
        let data=await response.json()
        this.setState({personne_info:data})
    })
}
  
  getName(val){
    switch(val){
      case 1 :
        return 'un'
      case 2 :
          return 'deux'
      case 3 :
        return 'trois'
      case 4 :
          return 'quatre'
      case 5 :
          return 'cinq'
      case 6 :
          return 'six'
      case 7 :
          return 'sept'
      case 8 :
          return 'huit'
      case 9 :
          return 'neuf'
      case 10 :
          return 'dix'
      case 11 :
          return 'onze'
      case 12 :
          return 'douze'
      case 13 :
          return 'treize'
      case 14 :
          return 'quatorze'
      case 15 :
          return 'quize'
      case 16 :
          return 'seize'
      case 17 :
          return 'dix_sept'
      case 18 :
          return 'dix_huit'
    }
  }
  setColor(etat){
    if(etat==true) return 'brown'
    return 'blue'
  }
  setIcon(etat){
    if(etat==true) return 'check'
    return ''
  }
  addRanger(pl){
    return(
      <ul className="conteneur-place-der">
        <li>
          <Button 
            onClick={this.handleClick.bind(this)} 
            name={this.getName(pl[0])} 
            color={this.setColor(this.state.place[this.getName(pl[0])])} 
            style={{width:'100%', height:'100%', borderRadius:'0px'}}
            value={pl[0]}
            >
            {pl[0]}
          </Button>
        </li>
        <li>
          <Button 
            onClick={this.handleClick.bind(this)} 
            name={this.getName(pl[1])} 
            color={this.setColor(this.state.place[this.getName(pl[1])])} 
            style={{width:'100%', height:'100%', borderRadius:'0px'}}
            value={pl[1]}
            >
            {pl[1]}
          </Button>
        </li>
        <li>
          <Button 
            onClick={this.handleClick.bind(this)} 
            name={this.getName(pl[2])} 
            color={this.setColor(this.state.place[this.getName(pl[2])])} 
            style={{width:'100%', height:'100%', borderRadius:'0px'}}
            value={pl[2]}
            >
            {pl[2]}
          </Button>
        </li>
        <li>
          <Button 
            onClick={this.handleClick.bind(this)} 
            name={this.getName(pl[3])} 
            color={this.setColor(this.state.place[this.getName(pl[3])])} 
            style={{width:'100%', height:'100%', borderRadius:'0px'}}
            value={pl[3]}
            >
            {pl[3]}
          </Button>
        </li>
      </ul>
    )
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleValiderAnnulation(event){
    event.preventDefault()
    let selectedPlace=this.state.place
    let lastPlace=this.state.lastPlace
    selectedPlace[this.state.nom_place_selectionnee]=false
    lastPlace.remove(this.state.place_selectionnee)
    let f={
      numero_voiture:this.state.numero_voiture,
      cin_voyageur:this.state.cin_voyageur,
      lieu_depart:this.state.lieu_depart,
      lieu_destination:this.state.lieu_destination,
      date:Conversion.dateToEn(this.state.date_voyage),
      place:parseInt(this.state.place_selectionnee)
    }
    let url="http://localhost:9096/records/reservation/"+JSON.stringify(f)
    fetch(url,{
      method:'DELETE',
      headers:{
        "content-type":"application/json"
      }
    }).then(async(response)=>{
      this.setState({
        lastPlace:lastPlace,
        place:selectedPlace,
        modalOpen:false,
        nom_place_selectionnee:'',
        cin_voyageur:'',
      })
      this.restaurePlace()
      this.refreshDataReservationParDate()
      this.setReservedPlace()
    })
  }

  annulerCommande(){
    this.getPersonne(this.state.cin_voyageur)
    let personne=this.state.personne_info
    return(
      <Modal
        size='small'
        closeIcon
        style={{width:360}}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.modalOpen}
        closeOnDimmerClick={this.state.closeOnDimmerClick}
    >
        <Header icon='question' content='Question' />
        <Modal.Content>
          <p>
    Etes-vous sur de vouloir libérer la place {this.state.place_selectionnee} de <b>{personne.nom} {personne.prenom}</b>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>
            <Icon name='remove' /> Non
          </Button>
          <Button color='green' onClick={this.handleValiderAnnulation.bind(this)}>
            <Icon name='checkmark' /> Oui
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  handleModalMessageErreurOpen = () => this.setState({ modalMessageErreur: true })

  handleModalMessageErreurClose = () => this.setState({ modalMessageErreur: false })

  showModalMessageErreur(){
    return(
      <Modal
        size='small'
        closeIcon
        style={{width:360}}
        onClose={this.handleModalMessageErreurClose}
        onOpen={this.handleModalMessageErreurOpen}
        open={this.state.modalMessageErreur}
        closeOnDimmerClick={this.state.closeOnDimmerClick}
    >
        <Header icon='error' content='Attention' />
        <Modal.Content>
          <p>
            Veuillez remplir les champ manquant.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleModalMessageErreurClose}>
            <Icon name='cancel' /> Annuler
          </Button>
          <Button color='green' onClick={this.handleModalMessageErreurClose}>
            <Icon name='checkmark' /> remplir
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }



  componentDidMount(){
    this.getReservations()
    this.getDataProgrammesVoyages()
  }
  getReservations(){
    let url="http://localhost:9096/records/reservation"
    fetch(url,{
      method:'GET',
      headers:{
        "content-type":"application/json"
      }
    }).then(async(response)=>{
      let data=await response.json()
      console.log(data)
      this.setState({
        all_reservations:data
      })
    })
  }
  refreshDataReservationParDate(){
    let f={
      numero_voiture:this.state.numero_voiture,
      lieu_depart:this.state.lieu_depart,
      lieu_destination:this.state.lieu_destination,
      date:Conversion.dateToEn(this.state.date_voyage)
    }
    let url="http://localhost:9096/records/reservation/"+JSON.stringify(f)
    fetch(url,{
      method:'GET',
      headers:{
        "content-type":"application/json"
      }
    }).then(async(response)=>{
      let data=await response.json()
      this.setState({
        reservation_par_date:data
      })
      this.restaurePlace()
      this.setReservedPlace()
    })
  }
  handleGetReservationParDate(event){
    this.refreshDataReservationParDate()
  }

  restaurePlace(){
    let p={
      un : false,
      deux : false,
      trois:false,
      quatre:false,
      cinq:false,
      six:false,
      sept:false,
      huit:false,
      neuf:false,
      dix : false,
      onze : false,
      douze : false,
      treize:false,
      quatorze:false,
      quinze:false,
      seize : false,
      dix_sept:false,
      dix_huit:false,
    }
    this.setState({place:p})
  }
  setReservedPlace(){
    let selectedPlace=this.state.place
    this.state.reservation_par_date.map((reservation)=>{
      selectedPlace[this.getName(parseInt(reservation.place))]=true ;
      console.log('NOM : '+reservation.voyageur.nom)
    })
    this.setState({
      place:selectedPlace
    })
  }

  handleOpenModalSaisie = () => this.setState({ modalSaisieNomOpen: true })

  handleCloseModalSaisie = () => this.setState({ modalSaisieNomOpen: false })

  handleSubmitCommande(event){
    event.preventDefault()
    let selectedPlace=this.state.place
    let lastPlace=this.state.lastPlace

    let url="http://localhost:9096/records/reservation/"

    console.log('NUMERO VOITURE :' +this.state.numero_voiture)
    console.log('NUMERO CIN :' +this.state.cin_voyageur)
    console.log('DEPART :' +this.state.lieu_depart)
    console.log('DESTINATION :' +this.state.lieu_destination)
    console.log('DATE :' +Conversion.dateToEn(this.state.date_voyage))
    console.log('PLACE :' +parseInt(this.state.place_selectionnee))
    


    let champ={
      id:1,
      numero_voiture : this.state.numero_voiture,
      cin_voyageur : this.state.cin_voyageur,
      lieu_depart : this.state.lieu_depart,
      lieu_destination : this.state.lieu_destination,
      date : Conversion.dateToEn(this.state.date_voyage), 
      place : parseInt(this.state.place_selectionnee)
    }
    fetch(url,{
      method:'POST',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(champ)
    }).then(async(response)=>{
      let data=await response.json()
      selectedPlace[this.state.nom_place_selectionnee]=true
      lastPlace.push(this.state.place_selectionnee)
      this.setState({
        lastPlace:lastPlace,
        place:selectedPlace,
        modalSaisieNomOpen: false,
        cin_voyageur:'',
      })
      this.restaurePlace()
      this.refreshDataReservationParDate()
      this.setReservedPlace()
    })
  }

  insererCommandePersonne(){
    return(
      <Modal
        size='small'
        onClose={this.handleCloseModalSaisie}
        onOpen={this.handleOpenModalSaisie}
        open={this.state.modalSaisieNomOpen}
        closeOnDimmerClick={this.state.closeOnDimmerClick}
    >
        <Header icon='save' content='Identité du voyageur' />
        <Modal.Content>
          <div>
            <Form>
              <Form.Field>
                <label>CIN du voyageur</label>
                <Input name='cin_voyageur' onChange={this.handleChange} placeholder='CIN' value={this.state.cin_voyageur}/>
              </Form.Field>
              <Form.Field>
                <label>Nom du voyageur</label>
                <input value={this.state.nom_voyageur}/>
              </Form.Field>
              <Form.Field>
                <label>Telephone</label>
                <input name='telephone_voyageur' onChange={this.handleChange} disabled/>
              </Form.Field>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.handleCloseModalSaisie}>
            <Icon name='cancel' /> Annuler
          </Button>
          <Button color='green' onClick={this.handleSubmitCommande.bind(this)}>
            <Icon name='check' /> Valider
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  //
  // programmes des voyages
  //
  getDataProgrammesVoyages(){
    let url="http://localhost:9098/records/programme_voyage/"
    fetch(url,{
    method:'GET',
    headers:{
        "content-type":"application/json"
    }
    }).then(async(response)=>{
        let data=await response.json()

        this.setState({programmes_voyages:data})
    })
  }
  getVoitureDansProgrammes(){
    this.getDataProgrammesVoyages()
    let val=[]
    _.map(this.state.programmes_voyages, ({ date_voyage, numero_voiture,lieu_depart, lieu_destination}) => (
      val.push({ key: Conversion.dateToFr(date_voyage), text: Conversion.dateToFr(date_voyage), value: Conversion.dateToFr(date_voyage) })
    ))
    return val
  }

  render(){
    let reservation_par_date=this.state.reservation_par_date
    let all_reservations=this.state.all_reservations
    return(
      <Router>
        <div className="main-conteneur">
          <Grid
            container
            columns={3}
            stackable
            style={{
              marginTop:20,
              marginBottom: 20
            }}
            inverted
            className='container-reservation'
            >
            <Grid.Column className='container-column-reservation'>
              <div className="form-select-voiture">
                <Form>
                  <Form.Field>
                    <label>Numero voiture</label>
                    <Dropdown
                      button
                      className='icon choix-destination'
                      placeholder='Numero voiture'
                      fluid
                      options={this.getVoitureDansProgrammes()}
                      search
                      labeled
                      icon='map marker alternate'
                      style={{ marginBottom: '0vh' }}
                      circular
                      name='numero_voiture'
                      onChange={this.handleChange}
                    />
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
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Date du voyage</label>
                    <DateInput
                      name="date_voyage"
                      color='brown'
                      placeholder="Date"
                      fluid
                      value={this.state.date_voyage}
                      iconPosition="left"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button className="b-valid-search" color='brown' fluid size='small' onClick={this.handleGetReservationParDate}>valider</Button>
                  </Form.Field>
                </Form>
            
              </div>
            </Grid.Column>
            <Grid.Column className='container-column-reservation'>
              <Grid>
                <Grid.Row>
                  {this.annulerCommande()}
                  {this.insererCommandePersonne()}
                  {this.showModalMessageErreur()}
                  <div className="conteneur-place">
                    <ul className="conteneur-place-devant">
                      <li>
                        <Image src={volant} style={{width:'100%', height:'100%'}}/>
                      </li>
                      <li className="place-devant">
                        <Button 
                          onClick={this.handleClick.bind(this)} 
                          name={this.getName(1)} 
                          color={this.setColor(this.state.place[this.getName(1)])} 
                          style={{width:'100%', height:'100%', borderRadius:'0px'}}
                          value='1'
                          >
                            1
                        </Button>
                      </li>
                      <li className="place-devant">
                        <Button 
                          onClick={this.handleClick.bind(this)} 
                          name={this.getName(2)} 
                          color={this.setColor(this.state.place[this.getName(2)])} 
                          style={{width:'100%', height:'100%', borderRadius:'0px'}}
                          value='2'
                          >
                            2
                        </Button>
                      </li>
                    </ul>
                    {this.addRanger([3,4,5,6])}
                    {this.addRanger([7,8,9,10])}
                    {this.addRanger([11,12,13,14])}
                    {this.addRanger([15,16,17,18])}
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <Label><Label color='blue'></Label> Place libre</Label>
                  <Label><Label color='brown'></Label> Place reservée</Label>
                </Grid.Row>
              </Grid>
              
            </Grid.Column>
            <Grid.Column>
              <div className='form-select-place'>
                <Table celled sortable size='small' inverted>
                  <Table.Header className='entete-table' style={{height:'30px !important', fontWeight:'200 !important', fontSize:'11px'}}>
                    <Table.Row>
                      <Table.HeaderCell
                      >
                        Place</Table.HeaderCell>
                      <Table.HeaderCell
                        >Nom du voyageur</Table.HeaderCell>
                      <Table.HeaderCell
                        >Telephone</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body style={{maxHeight:'300px !important', overflow:'auto', fontSize:'11px'}}>
                    {_.map(this.state.reservation_par_date, ({ id,voiture,voyageur,lieu_depart,lieu_destination,date,place}) => (
                      <Table.Row>
                        <Table.Cell>{place}</Table.Cell>
                        <Table.Cell>{voyageur.nom} {voyageur.prenom}</Table.Cell>
                        <Table.Cell>0340000000</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    ) ;
  }
}
export { ReserverPlace as default };
