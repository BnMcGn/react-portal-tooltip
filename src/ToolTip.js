import React, { Component } from "react"
import ReactDOM from 'react-dom'
import PropTypes from "prop-types"

import Card from "./Card"

const portalNodes = {}

export default class ToolTip extends React.Component {
  state = {
    display: false
  }

  static propTypes = {
    parent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    active: PropTypes.bool,
    group: PropTypes.string,
    tooltipTimeout: PropTypes.number
  }

  static defaultProps = {
    active: false,
    group: 'main',
    tooltipTimeout: 500
  }

  static createPortal() {
    const portalNode = {
      node: document.createElement('div'),
      closeIt: null,
      timeout: false
    }
    portalNode.node.className = 'ToolTipPortal'
    document.body.appendChild(portalNode.node)
    return portalNode
  }

  static getPortal(group) {
    let portalNode = portalNodes[group]
    if (!portalNode) {
      portalNode = ToolTip.createPortal()
      portalNodes[group] = portalNode
    }
		return portalNode
  }

  static renderPortal(portalNode, props) {
    const {parent, ...other} = props
    const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent
    return ReactDOM.createPortal(<Card parentEl={parentEl} {...other}/>, portalNode.node)
  }

  componentDidMount() {
    this.componentDidUpdate(ToolTip.defaultProps, this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    let portalNode = portalNodes[this.props.group]

    if (this.props.active) {
      if (!portalNode) {
        portalNode = ToolTip.createPortal()
        portalNodes[this.props.group] = portalNode
      }

      if (portalNode.timeout) {
        clearTimeout(portalNode.timeout)
        if (portalNode.closeIt) {
					portalNode.closeIt()
          portalNode.closeIt = null
				}
      }
      portalNode.timeout = setTimeout(() => {
				this.setState({display: true})
      }, 0)
    } else if (portalNode && (prevProps.active || this.state.display)) {
      if (portalNode.timeout) {
        clearTimeout(portalNode.timeout)
      }
			portalNode.closeIt = () => {
				if (!this.props.active) {
					this.setState({display: false})
				}
			}
      portalNode.timeout = setTimeout(() => {
				this.setState({display: false})
      }, this.props.tooltipTimeout)
    }
  }

  componentWillUnmount() {
    const portalNode = portalNodes[this.props.group]
    if (portalNode) {
      ReactDOM.unmountComponentAtNode(portalNode.node)
      clearTimeout(portalNode.timeout)

      try {
        document.body.removeChild(portalNode.node)
      }
      catch(e) {}

      portalNodes[this.props.group] = null
    }
  }

  render() {
		let portal = ToolTip.getPortal(this.props.group)
      return ToolTip.renderPortal(portal, {...this.props,
                                           active: this.state.display || this.props.active})
  }
}
