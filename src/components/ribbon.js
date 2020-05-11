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
      const price = this.props.price,
      buy_link = '/policies/#howtobuy'
      // var buy_link;
      // if(this.props.buy_link == null || !('buy_link' in this.props) || this.props.buy_link === '') {
      //   buy_link = 'mailto:jennabelvin@gmail.com?subject=Purchase request for ' + name + '&body=Hello Jenna,\nI am interested in purchasing your painting named ' + name + '.';
      // } else {
      //   buy_link = this.props.buy_link;
      // }

      if (this.state.hover || isMobile) {
        return (
          <div id={id} className="ribbon ribbon-blue ribbon-top-right">
            <a href={buy_link}>
              <span onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})} style={{textDecoration: 'underline'}}>
                {price}
              </span>
            </a>
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