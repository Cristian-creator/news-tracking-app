import React, { Component } from "react";
import Slider from "react-slick";

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Slide from "./slide/Slide";

import './HomepageSlider.css';

import c from '../../images/1.jpeg';
import b from '../../images/2.jpeg';
import a from '../../images/3.jpeg';
import d from '../../images/4.jpeg';
// import e from '../../images/5.jpeg';



export default class HomepageSlider extends Component {
  render() {
    const settings = {
      // dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1200,
      autoplaySpeed: 5000,
      fade: true,
      cssFade: 'linear',
      pauseOnHover: false
    };
    const items = [
        { bkg: a, text: 'unlimited subscriptions' },
        { bkg: b, text: 'free to use' },
        { bkg: c, text: 'tracking news it has never been so easy' }
    ];
    return (
      <div className="homepage-slider-container">
        <Slider {...settings} className="slider">
          {
              items.map((item, index) => <Slide slide={item} key={index} /> )
          }
        </Slider>
      </div>
    );
  }
}