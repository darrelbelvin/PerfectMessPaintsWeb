import React, { Component } from "react";
import Slider from "react-slick";
import Img from "gatsby-image"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class ComboSlickCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    var settingsFirst = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      swipeToSlide: true,
      asNavFor: this.state.nav2,
      ref: (slider) => (this.slider1 = slider)
    };
    var settings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      swipeToSlide: true,
      asNavFor: this.state.nav1,
      ref: (slider) => (this.slider2 = slider)
    };

    return (
      <div className="container">
        <Slider {...settingsFirst}>
          {this.props.imageList.map((img, index) => (
            <Img key={index}
              fluid={{ ...img.localFile.childImageSharp.fluid }}
            />
          ))}
        </Slider>
        <Slider {...settings}>
          {this.props.imageList.map((img, index) => (
            <Img key={index}
              fluid={{ ...img.localFile.childImageSharp.fluid }}
            />
          ))}
        </Slider>
      </div>
    );
  }
}
