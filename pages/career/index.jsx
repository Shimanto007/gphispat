import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import JobList from "../../components/career/JobList";
import {ParallaxProvider} from "react-scroll-parallax";

// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = () => {

    ScrollTrigger.refresh()

    // animation
    useEffect(() => {
        let allAnim = document.querySelectorAll('.fade-up');

        allAnim.forEach((el, index) => {
            gsap.fromTo(el, {
                autoAlpha: 0,
                y: 50,
                ease: "none",
            }, {
                y: 0,
                autoAlpha: 1,
                ease: "power2",
                duration: 1,
                scrollTrigger: {
                    id: `${index + 1}`,
                    trigger: el,
                    // start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                }
            })
        })
    }, [])
    return (
        <>
            <StyledComponent>
                <ParallaxProvider>
                    <InnerBanner/>
                    <JobList/>
                </ParallaxProvider>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`

`;

export default MyComponent;
