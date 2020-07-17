import React from 'react'
import styled from 'styled-components'
import './Slide.css';

const StyledSlide = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(191, 54, 12, 0.4)), url(${props => props.img});
    background-position: center;
    background-repeat: no-repeat;
    // rgba(191, 54, 12, 1)
    background-size: cover;
    // background: red;
    height: 90vh;
`;

export default function Slide({ slide: { bkg, text } }) {
    return (
        <StyledSlide img={bkg} className="slide">
            <h1> { text } </h1>
        </StyledSlide>
    )
}
