import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Search,
  Label
} from 'semantic-ui-react'
import _ from 'lodash'
import faker from 'faker'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReserverPlace from './reserver-place.jsx' ;
import HistoriquesVoyages from './historiques-voyages'
import ListeVoiture from './liste-voiture.jsx' ;


// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */


 const initialState = { 
   isLoading: false, 
   results: [], 
   value: '',
   menu:{
      home : true,
      historique_voyage:false,
      liste_voiture : false
    } 
  }

 const source = _.times(5, () => ({
   title: faker.company.companyName(),
   description: faker.company.catchPhrase(),
   image: faker.internet.avatar(),
   price: faker.finance.amount(0, 100, 2, '$'),
 }))

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })


  /*
    search
  */

  state = initialState


  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  restaureSelectMenu(){
    this.setState({
      menu:{
        home : false,
        historique_voyage:false,
        liste_voiture : false
      } 
    })
  }

  handleSelectMenu(event){
    let id=event.target.id
    this.restaureSelectMenu()
    let menu_=this.state.menu
    menu_[id]=true
    this.setState({
      menu:menu_
    })
  }
  render() {
    const { children } = this.props
    const { fixed } = this.state

    const { isLoading, value, results } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
        >
          <Segment
            textAlign='center'
            style={{ padding: '0em 0em', backgroundColor: '#975B33', marginBottom:'80px' }}
            vertical
          >
            <Menu
              fixed='top'
              inverted
              size='small'
              style={{ padding: '0em 0em', backgroundColor: '#975B33', color:'#ffffff !important' }}
              horizontal
            >
            <Container
              style={{margin:'0px !important' }}
            >
                <Link to="/" style={{paddingBottom:0}} key='home'> 
                  <Menu.Item as='a' id="home" onClick={this.handleSelectMenu.bind(this)} active={this.state.menu.home} style={{marginBottom:0, height: '100%'}}>
                    Reservation place
                  </Menu.Item>
                </Link>
                <Link to="/programmes-voiture">
                  <Menu.Item id="programmes_voitures" onClick={this.handleSelectMenu.bind(this)} active={this.state.menu.historique_voyage} as='a' style={{marginBottom:0, height: '100%'}}>
                    Programmes des voitures
                  </Menu.Item>
                </Link>
                <Link to="/historiques-voyages">
                  <Menu.Item id="historique_voyage" onClick={this.handleSelectMenu.bind(this)} active={this.state.menu.historique_voyage} as='a' style={{marginBottom:0, height: '100%'}}>
                    Historiques des voyages
                  </Menu.Item>
                </Link>

                <Link to="/liste-voiture">
                  <Menu.Item id="liste_voiture" onClick={this.handleSelectMenu.bind(this)} active={this.state.menu.liste_voiture} as='a' style={{marginBottom:0, height: '100%'}}>
                    Liste des voiture
                  </Menu.Item>
                </Link>
                <Menu.Item position='right'>
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                      leading: true,
                    })}
                    results={results}
                    value={value}
                    {...this.props}
                  />
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  /*
    search
  */

  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }
  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    const { isLoading, value, results } = this.state
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='overlay'
          direction='left'
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
          color='white'
          style={{position:'fixed', width: '80%', height:'100%', backgroundColor: '#FFFFFF',padding:'0px !important', margin:'0px !important' , border:'0px solid #000 !important'}}
        >
          <Menu.Item
            style={{ backgroundColor: '#975B33', margin:'0px !important' }}
            
          >
            <Grid
              container
              columns={2}
              stackable
              style={{
                marginTop:5,
                marginBottom: 5
              }}
              >
              <Grid.Column>
                <Image
                  circular
                  width={100}
                  verticalAlign='middle'
                  horizontalAlign='middle'
                  src='https://scontent.ftnr2-1.fna.fbcdn.net/v/t31.0-8/fr/cp0/e15/q65/20247754_831351377042266_7529852046823853701_o.jpg?_nc_cat=108&efg=eyJpIjoiYiJ9&_nc_ohc=dKxla_cHVsQAX89F6a1&_nc_ht=scontent.ftnr2-1.fna&_nc_tp=14&oh=3fe1f8f10ce3322f7764c31ed48719e8&oe=5EB9FAE3'
                />
              </Grid.Column>
              <Grid.Column>
                <Label as='a'
                  className="profile-name"
                  style={{backgroundColor:'transparent', color:'#ffffff'}}
                >
                  Havana Andriambolaharimihanta
                </Label>
              </Grid.Column>
            </Grid>
          </Menu.Item>
          <Link to="/" onClick={this.handleSidebarHide}>
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
          </Link>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened} fixed='top'
        >
          <Menu 
            color='brown' 
            inverted 
            fixed='top' 
            pointing 
            secondary 
            size='small' >
            <Menu.Item onClick={this.handleToggle}>
              <Icon name='sidebar' size='large'/>
            </Menu.Item>
            <Menu.Item position='right'
              style={{ paddingTop:'0px !important', paddingBottom:'0px !important'}}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
                results={results}
                value={value}
                {...this.props}
                placeholder='hitady koperativa...'
                style={{ width:'100%'}}
              />
            </Menu.Item>
          </Menu>
{children}

        </Sidebar.Pusher>


      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class SideBarMenu extends React.Component{
  render(){
    return(
      <Router>
        <ResponsiveContainer>
          <Route exact path="/" component={ReserverPlace} />
          <Route path='/historiques-voyages' component={HistoriquesVoyages}></Route>
          <Route path="/liste-voiture" component={ListeVoiture} />

        </ResponsiveContainer>
      </Router>
    ) ;
  }
}

export { SideBarMenu as default };
