import React, { Component } from "react";
import { isMobile } from "react-device-detect";
/* eslint-disable jsx-a11y/no-static-element-interactions */

class Ribbon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  toggleHover() {
    this.setState({hover: !this.state.hover})
  }

  render() {
    const { available, name } = this.props;
    const id = 'ribbon' + name;

    if(available) {
      const price = this.props.price

      if (this.state.hover || isMobile) {
        return (
          <div id={id} className="ribbon ribbon-blue ribbon-top-right">
            <span onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})} style={{textDecoration: 'underline'}}>
              {price}
            </span>
          </div>
        )
      } else {
        return (
          <div id={id} className="ribbon ribbon-blue ribbon-top-right">
            <span onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})}>available</span>
          </div>
        )
      }
    } else {
      return (
        <div id={id} className="ribbon ribbon-top-right"><span>sold</span></div>
      )
    }
  }
}

export default Ribbon;