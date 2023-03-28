import React from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import NewsEvents from "../../components/media-events/NewsEvents";
import BannerImage from "../../public/images/dynamic/career/available-jobs.jpg";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";

const MyComponent = () => {
    let title = "Career";
    let sub = "Available jobs";
    let des =
        "GPH Ispat is looking for you. If you think you fit,\n                   " +
        "please join with us.";
    return (
        <>

            <StyledComponent>
                <InnerBanner title={title} img={BannerImage} subtitle={sub} des={des}/>
                <NewsEvents/>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`

`;

export default MyComponent;
