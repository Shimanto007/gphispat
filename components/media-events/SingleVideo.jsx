import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import img1 from "../../public/images/dynamic/tvc/video-1.jpg";
import img2 from "../../public/images/dynamic/tvc/video-2.jpg";
import img3 from "../../public/images/dynamic/tvc/video-3.jpg";
import img4 from "../../public/images/dynamic/tvc/video-4.jpg";
import img5 from "../../public/images/dynamic/tvc/video-5.jpg";
import img6 from "../../public/images/dynamic/tvc/video-6.jpg";
import {body_ms18} from "../../styles/globalStyleVars";
import playBtn from '../../public/icons/play-btn.svg'
import ModalVideo from "react-modal-video";
import 'react-modal-video/css/modal-video.min.css'
import {Img} from "../Img";
import indicator from "../../public/icons/indicator.svg";
import Select, {components} from "react-select";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import ListWithGrid from "../ListWithGrid";
import img from "../../public/icons/arrow.svg";

gsap.registerPlugin(ScrollTrigger);


const VideoList = ({element}) => {

    let [open, setOpen] = useState(false);
    let [videoId, setVideo] = useState('');

    let handelOpen = (open, id) => {
        setOpen(open);
        setVideo(id);
    };

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

        <StyledSingleVideo className='videolist'>
            <>
                {/*<ModalVideo channel='youtube' isOpen={open} videoId={videoId} onClose={() => handelOpen(false, '')}/>*/}
                <ModalVideo channel='youtube' isOpen={open}
                            videoId={videoId}
                            onClose={() => handelOpen(false, '')}/>

                <div className='videolist__single fade-up'
                     onClick={() => handelOpen(true, `${element?.images?.[0]?.short_title?.replaceAll('https://youtu.be/', '')}`)}
                     key={element?.data?.id}>
                    <div className='videolist__single__box'>
                        <div className='videolist__single__box__img'>
                            <Img src={element?.images?.[0]?.full_path}/>
                            <div className='play-btn'>
                                <div href="" className="playBtn">
                                </div>
                            </div>
                        </div>
                        <div className='videolist__single__box__content'>
                            <h1>{element?.data?.title}</h1>
                        </div>
                    </div>
                </div>
            </>
        </StyledSingleVideo>

    );
};
const StyledSingleVideo = styled.section`

  background-color: #f9f9f9;
  height: 100%;

  .videolist__select {
    margin: 0 0 40px;
    .selector_filter {
      margin: 0;
      padding-right: 20px;
      padding-left: 0;
      @media (max-width: 767px) {
        padding-right: 0px;
      }

    }

  }

  .videolist {

    &__single {
      cursor: pointer;
      height: 100%;


      &__box {
        height: 100%;
        background-color: #FFFFFF;
        border: 1px solid transparent;

        &__content {
          padding: 30px 25px 30px 25px;

          h1 {
            ${body_ms18};
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }

        &__img {
          position: relative;
          padding-top: calc(250 / 370 * 100%);

          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
          }

          .play-btn {
            margin: 0;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;

            display: flex;
            justify-content: center;
            align-items: center;

            div.playBtn {
              width: 40px;
              height: 40px;
              background-color: #FB030C;
              border-radius: 100%;
              //border: #fff solid 2px;
              position: relative;
              animation-name: ringPulse;
              animation-timing-function: ease-out;
              animation-direction: alternate;
              animation-iteration-count: infinite;
              animation-play-state: running;

              &:before {
                position: absolute;
                content: '';
                border-top: transparent 8px solid;
                border-bottom: transparent 8px solid;
                border-left: #fff 10px solid;
                top: 50%;
                left: 50%;
                transform: translate(-40%, -50%);
              }

              &:after {
                position: absolute;
                content: '';
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                //border: #fff solid 2px;
                border-radius: 100%;
                animation: ringPulse 1s infinite backwards;

              }

              &:hover {

              }
            }

            svg {
              width: 40px;
              height: 40px;
              z-index: 1;
              position: unset !important;
              top: unset;
              object-fit: unset;
            }
          }
        }

        &:hover {
          border: 1px solid #EE1B24;
          -webkit-transition: 1s ease-in-out;
          transition: 1s ease-in-out;
          -webkit-transition: all 0.2s ease-in-out;
          box-shadow: 0 5px 30px rgb(238 27 36 / 8%);
          border-radius: unset;

          div.playBtn {
            animation: shadowPulse 1s infinite linear;
            @keyframes shadowPulse {
              0% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 0 transparent,
                0 0 0 0 transparent;

              }

              10% {
                box-shadow: 0 0 8px 6px #FB030C,
                0 0 12px 10px transparent,
                0 0 12px 5px #FB030C;
              }

              80%, 100% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 40px transparent,
                0 0 0 40px transparent;
              }
            }
            @keyframes shadowPulse {
              0% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 0 transparent,
                0 0 0 0 transparent;
              }

              10% {
                box-shadow: 0 0 8px 6px #e1434b,
                0 0 12px 10px transparent,
                0 0 12px 5px #e1434b;
              }

              80%, 100% {
                box-shadow: 0 0 8px 6px transparent,
                0 0 0 40px transparent,
                0 0 0 40px transparent;
              }
            }
          }
        }
      }
    }


  }


  &__select {
    margin-bottom: 40px;
    @media (max-width: 767px) {
      margin-bottom: 60px;
    }
  }

  .react-select {
    &__menu-list {
      padding: 10px;
    }

    &__menu {

    }

    &__control {
      padding: 0px 22px;
      border-image: initial;
      border-bottom-style: solid;
      background-color: transparent;
      border-color: #222222;

    }

    &__indicator {
      color: #222222;

    }

    &__option {
      background-color: white;
      color: #222222;
      font-size: 15px;

      &--is-focused {
        //color: white;
        //background-color: black;
      }
    }

  }

  .css-1okebmr-indicatorSeparator {
    background-color: transparent !important;
  }

  .css-yk16xz-control {
    border-radius: 0px;
  }

`
export default VideoList;
