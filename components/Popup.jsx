import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {text, title_ms60} from "../styles/globalStyleVars";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Img} from "./Img";
import image_member from "../public/images/dynamic/directorsmd.jpg";
import image_bg from "../public/images/dynamic/gphlks.jpg";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import 'swiper/css/swiper.min.css';
import Swiper from 'react-id-swiper';
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";
import ReactHtmlParser from "react-html-parser";
import ListWithGrid from "./ListWithGrid";

const Popup = ({
                   show,
                   handleClose,
                   slider,
                   no_img,
                   item
               }) => {
    let sliderRef = useRef();
    let leftRef = useRef();
    let rightRef = useRef();
    let slider_enb = item?.images?.length;

    let img = item?.images?.find(f => f?.ext === "jpg");

    useEffect(() => {

        var element = document.getElementsByClassName('swiper-button-prev');


        if (slider) {
            if (show && slider_enb > 1) {
                leftRef.current.addEventListener('click', () => {

                    if (document.querySelector('.modal-body .swiper-button-prev')) {
                        document.querySelector('.modal-body .swiper-button-prev').click()
                    }
                });
                rightRef.current.addEventListener('click', () => {
                    if (document.querySelector('.modal-body .swiper-button-next')) {
                        document.querySelector('.modal-body .swiper-button-next').click()
                    }
                });
            }

        }

    }, [show, slider, item]) // slider next prev action


    let sliderParams = {
        slidesPerView: 1, // observer: true,
        loop: false,
        autoplay: false,
        pagination: true,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1099: {
                slidesPerView: 1,
            }, 768: {
                slidesPerView: 1,
            }, 600: {
                slidesPerView: 1,
            }

        },

    };

    return (

        <StyledModal slider_enb={slider_enb}>
            <Modal
                show={show}
                item={item}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="gph_modal"
            >
                <Modal.Header closeButton>
                    <Container>
                        <Row>
                            <Col className="header_wrap">
                                <Modal.Title>{item?.data?.title}</Modal.Title>
                                <div onClick={handleClose} className="close_button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21.414" height="21.414"
                                         viewBox="0 0 21.414 21.414">
                                        <g id="Group_13674" data-name="Group 13674"
                                           transform="translate(-1224.793 -42.793)">
                                            <line id="Line_1" data-name="Line 1" x2="28.284"
                                                  transform="translate(1225.5 43.5) rotate(45)" fill="none"
                                                  stroke="#222" stroke-linecap="round" stroke-width="1"/>
                                            <line id="Line_2" data-name="Line 2" x2="28.284"
                                                  transform="translate(1225.5 63.5) rotate(-45)" fill="none"
                                                  stroke="#222" stroke-linecap="round" stroke-width="1"/>
                                        </g>
                                    </svg>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <SimpleBar className="main_scroll" style={{height: '90vh'}}>

                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col className="left_col pr-0" md={no_img ? 12 : 6}>
                                    <SimpleBar className="custombar" style={{height: '70vh'}}>

                                        <div className="left_col__content">
                                            {/*{*/}
                                            {/*    (() => {*/}
                                            {/*        if (item?.data?.sub_title) {*/}
                                            {/*            return (*/}
                                            {/*                <h3>{item?.data?.sub_title}</h3>*/}

                                            {/*            )*/}
                                            {/*        } else {*/}
                                            {/*            return (*/}
                                            {/*                <h3>{item?.data?.subtitle}</h3>*/}

                                            {/*            )*/}
                                            {/*        }*/}
                                            {/*    })()*/}
                                            {/*}*/}
                                            <p>{item?.data?.short_desc}</p>
                                            {ReactHtmlParser(item?.data?.description)}
                                        </div>
                                        <br/><br/>
                                    </SimpleBar>
                                </Col>
                                {
                                    (() => {
                                        if (no_img) {

                                        } else {
                                            return (
                                                <Col className="right_col pl-0" md={{span: 5, offset: 1}}>

                                                    {
                                                        (() => {
                                                            if (slider) {

                                                                if (slider_enb > 1) {
                                                                    return (
                                                                        <div>
                                                                            <Swiper {...sliderParams} ref={sliderRef}>
                                                                                {
                                                                                    item?.images && item?.images?.length > 0 &&
                                                                                    item?.images?.map((element) => {
                                                                                        return (
                                                                                            <div className="">
                                                                                                <div
                                                                                                    className="right_col_img">
                                                                                                    <Img
                                                                                                        src={element?.full_path}/>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    })
                                                                                }
                                                                            </Swiper>
                                                                            <div className="slider-nav top">
                                                                                <ul>
                                                                                    <li className='hover' ref={leftRef}>
                                                                                        <BsChevronLeft/></li>
                                                                                    <li className='hover'
                                                                                        ref={rightRef}>
                                                                                        <BsChevronRight/></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <div className="right_col_img">
                                                                            <Img src={img?.full_path}/>
                                                                        </div>
                                                                    )
                                                                }


                                                            } else {
                                                                return (
                                                                    <div className="right_col_img">
                                                                        <Img src={img?.full_path}/>
                                                                    </div>
                                                                )
                                                            }
                                                        })()
                                                    }

                                                </Col>

                                            )
                                        }

                                    })()
                                }
                            </Row>
                        </Container>
                    </Modal.Body>
                </SimpleBar>
            </Modal>
        </StyledModal>

    )
};


const StyledModal = styled.div`

  .modal-dialog {
    margin: 0;
  }

`;


export default Popup;
