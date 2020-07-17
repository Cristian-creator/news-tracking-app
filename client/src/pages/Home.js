import React from 'react'
import HomepageSlider from '../components/homepage-slider/HomepageSlider';
import { connect } from 'react-redux';
import NewsHome from '../components/news-home/NewsHome';

function Home({ firstName }) {
    return (
        <>
            { firstName ? <NewsHome /> : <HomepageSlider /> }
        </>
    )
}

const mapStateToProps = (state) => ({
    firstName: state.user.data.firstName
});

export default connect(mapStateToProps)(Home);