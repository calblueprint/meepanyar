import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

const duration = 1000

const navbarStyle = {
  transition: `width ${duration}ms`
}

const navbarTransitionStyles = {
  entering: { width: 0 },
  entered: { width: '200px' },
  exiting: { width: '200px' },
  exited: { width: 0 }
}

const linkStyle = {
  transition: `opacity ${duration}ms`
}

const linkTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
}

export default class NavbarContent extends Component {
  renderLinks = () => {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div style={{
          ...linkStyle,
          ...linkTransitionStyles[state]
        }}>
          <div className="navbar-link">Home</div>
          <div className="navbar-link">About</div>
          <div className="navbar-link">Contact</div>
        </div>
      )}
    </Transition>
  }

  render() {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div className="navbar" style={{
          ...navbarStyle,
          ...navbarTransitionStyles[state]
        }}>
          {this.renderLinks()}
        </div>
      )}
    </Transition>
  }
}
