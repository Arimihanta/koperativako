import React from 'react' ;
import {Button,Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react' ;
const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

class Login extends React.Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <div>
        <div class="ui top fixed inverted teal icon menu main">
            <Menu.Item as='a' onClick={this.handleShowClick}>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a' onClick={this.handleShowClick}>
              <Icon name='home' />
              lds
            </Menu.Item>
        </div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebars
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebars
          </Button>
        </Button.Group>

        <Sidebar.Pushable
          width={260}

        >
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='left'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='100vh'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export { Login as default };
