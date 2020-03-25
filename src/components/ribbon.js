import React, { Component } from "react";
import { Link } from "gatsby";

class Ribbon extends Component {
  render() {
    const { available, name } = this.props;
    const id = 'ribbon' + name;

    if(available) {
      const price = this.props.price
      var buy_link;
      if(this.props.buy_link == null || !'buy_link' in this.props || this.props.buy_link == '') {
        buy_link = 'mailto:jennabelvin@gmail.com?subject=Purchase request for ' + name + '&body=Hello Jenna,\nI am interested in purchasing your painting named ' + name + '.';
      } else {
        buy_link = this.props.buy_link;
      }
      return (
        <div id={id} className="ribbon ribbon-blue ribbon-top-right"
              onMouseLeave={() => {document.getElementById(id).innerHTML = '<span>available</span>'}}
              onMouseEnter={() => {document.getElementById(id).innerHTML = "<a href='" + buy_link + "'><span style='text-decoration: underline;'>" + price + "</span></a>"}}
          >
          <span>available</span>
        </div>
      )
    } else {
      return (
        <div id={id} className="ribbon ribbon-top-right"><span>sold</span></div>
      )
    }
  }
}

export default Ribbon;