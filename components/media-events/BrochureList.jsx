import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {body_ms16} from "../../styles/globalStyleVars";
import Selector from "../Selector";
import indicator from "../../public/icons/indicator.svg";
import Select, {components} from "react-select";
import Link from "next/link";
// import pdf from '../../public/images/static/sample.pdf'

// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import Title from "../Title";
import {Img} from "../Img";

gsap.registerPlugin(ScrollTrigger);


const BrochureList = ({data}) => {
    // animation
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
        <StyledBrochureList className='brochurelist pt-150 pb-150'>
            <Container>

                <Row>
                    {
                        data?.files?.list && data?.files?.list?.length > 0 &&
                        data?.files?.list?.map((e)=>{
                            return(
                                <Col md={6} lg={4} xs={12} className='brochurelist__single fade-up' key={e.data?.id} >
                                    <Link href={`${e?.full_path}`}>
                                        <a target="_blank">
                                            <div className='brochurelist__single__box'>
                                                <div className='brochurelist__single__box__img'>
                                                    <div >
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30">
                                                            <defs>
                                                                <clipPath id="clip-path">
                                                                    <rect id="Rectangle_5384" data-name="Rectangle 5384" width="30" height="30" fill="#fff"/>
                                                                </clipPath>                                    </defs>
                                                            <g id="Group_17756" data-name="Group 17756" transform="translate(-725 -1063)">
                                                                <g id="Mask_Group_492" data-name="Mask Group 492" transform="translate(725 1063)" clip-path="url(#clip-path)">
                                                                    <g id="pdf" transform="translate(1.875)">
                                                                        <path id="Path_7839" data-name="Path 7839" d="M24.375,0A1.881,1.881,0,0,0,22.5,1.875v26.25A1.881,1.881,0,0,0,24.375,30h18.75A1.881,1.881,0,0,0,45,28.125V7.5L37.5,0Z" transform="translate(-18.75)" fill="#e2e5e7"/>
                                                                        <path id="Path_7840" data-name="Path 7840" d="M84.375,7.5H90L82.5,0V5.625A1.881,1.881,0,0,0,84.375,7.5Z" transform="translate(-63.75)" fill="#b0b7bd"/>
                                                                        <path id="Path_7841" data-name="Path 7841" d="M95.625,35.625,90,30h5.625Z" transform="translate(-69.375 -22.5)" fill="#cad1d8"/>
                                                                        <path id="Path_7842" data-name="Path 7842" d="M30,66.563a.94.94,0,0,1-.937.938H8.438a.94.94,0,0,1-.937-.937V57.188a.94.94,0,0,1,.938-.937H29.063a.94.94,0,0,1,.938.938Z" transform="translate(-7.5 -42.188)" fill="#f15642"/>
                                                                        <g id="Group_17755" data-name="Group 17755" transform="translate(4.087 17.245)">
                                                                            <path id="Path_7843" data-name="Path 7843" d="M23.846,69.5a.516.516,0,0,1,.509-.518h1.732a1.874,1.874,0,0,1,0,3.748H24.835v.99a.471.471,0,0,1-.48.517.505.505,0,0,1-.509-.517Zm.989.427v1.868h1.252a.934.934,0,0,0,0-1.868Z" transform="translate(-23.846 -68.981)" fill="#fff"/>
                                                                            <path id="Path_7844" data-name="Path 7844" d="M44.539,74.438a.469.469,0,0,1-.517-.464V69.716a.51.51,0,0,1,.517-.465h1.717c3.426,0,3.351,5.187.067,5.187Zm.473-4.272v3.358h1.244c2.024,0,2.114-3.358,0-3.358Z" transform="translate(-38.978 -69.184)" fill="#fff"/>
                                                                            <path id="Path_7845" data-name="Path 7845" d="M68.278,70.223v1.192H70.19a.58.58,0,0,1,.54.532.521.521,0,0,1-.54.45H68.278v1.574a.444.444,0,0,1-.449.464.476.476,0,0,1-.532-.464V69.712a.474.474,0,0,1,.532-.465h2.632a.468.468,0,0,1,.525.465.518.518,0,0,1-.525.51H68.278Z" transform="translate(-56.435 -69.181)" fill="#fff"/>
                                                                        </g>
                                                                        <path id="Path_7846" data-name="Path 7846" d="M40.313,98.438H22.5v.938H40.313a.94.94,0,0,0,.937-.937V97.5A.94.94,0,0,1,40.313,98.438Z" transform="translate(-18.75 -73.125)" fill="#cad1d8"/>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <svg className="download" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                                            <g id="Icon_feather-download" data-name="Icon feather-download" transform="translate(1 1)">
                                                                <path id="Path_7940" data-name="Path 7940" d="M24.5,22.5v4.444a2.222,2.222,0,0,1-2.222,2.222H6.722A2.222,2.222,0,0,1,4.5,26.944V22.5" transform="translate(-4.5 -9.167)" fill="none" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                                                <path id="Path_7941" data-name="Path 7941" d="M10.5,15l5.556,5.556L21.611,15" transform="translate(-6.056 -7.222)" fill="none" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                                                <path id="Path_7942" data-name="Path 7942" d="M18,17.833V4.5" transform="translate(-8 -4.5)" fill="none" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='brochurelist__single__box__content'>
                                                    <h2>{e.short_title}</h2>
                                                </div>
                                            </div>
                                        </a>

                                    </Link>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </StyledBrochureList>
    );
};
const StyledBrochureList=styled.section`
  //padding: 150px 0;
  //@media(max-width: 767px){
  //  padding: 80px 0;
  //}
  background-color: #f9f9f9 ;

  .brochurelist{
    
    &__single{
      margin-bottom: 30px;
      @media (max-width: 767px) {
        :last-child {
          margin-bottom: 0px;
        }
      }
      &__box {
        padding: 25px 25px 28px 25px;
        background-color: #FFFFFF;
        border: 1px solid #DDDDDD ;
        transition: 0.2s ease-in-out ;
        -webkit-transition: all 0.2s ease-in-out;
        height: 100%;
        &__img {
          display: flex;
          align-items: center;
          justify-content: space-between;
          //padding-bottom: 20px;

        }
        &__content {
          h2 {
            ${body_ms16};
            font-weight: 500;
            margin-top: 20px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display:-webkit-box ;
            text-overflow: ellipsis;
            overflow: hidden;

          }
        }
        &:hover{
          border:1px solid #EE1B24 ;
          transition: 1s ease-in-out  ;
          -webkit-transition: all 0.2s ease-in-out;        
          .download {
            g{
              path{
                stroke: #EE1B24;
              }
            }
          }
          }
      
      

      }
    }
  }

  .react-select {

    &__menu-list {
      padding: 10px;
      //background-color: #e5b5b5;
      //border-radius: 10px;
    }

    &__menu {
      //border-radius: 10px;
      //padding: 30px,
    }

    &__control {

      border-image: initial;
      border-bottom-style: solid;
      background-color: transparent;
      border-color: #222222;

    }

    &__indicator {
      //background-color: crimson;
      //transform: rotate(-180deg);
      color: black;

    }

    &__option {
      background-color: white;
      color: black;
      font-size: 15px;

      &--is-focused {
        //color: white;
        //background-color: black;
      }
    }

  }

  .css-1okebmr-indicatorSeparator {
    background-color: transparent;
  }
`
export default BrochureList;