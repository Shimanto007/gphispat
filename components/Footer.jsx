import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../public/images/static/logo.svg";
import { body_ms14, body_ms16, body_ms18, gradientColor, hover, text, title } from "../styles/globalStyleVars";
import moment from "moment";
import FooterImg from "../public/images/static/footer_shadow.svg";
import { Parallax } from "react-scroll-parallax";
import DcLink from "./Link";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

const MyComponent = () => {
   let [open, setOpen] = useState(false);
   let [videoId, setVideo] = useState("");
   let [windowWidth, setWindowWidth] = useState("");

   let handelOpen = (open, id) => {
      setOpen(open);
      setVideo(id);
   };

   useEffect(() => {
      setWindowWidth(window.innerWidth);
   }, []);

   return (
      <>
         <ModalVideo channel="youtube" isOpen={open} videoId={videoId} onClose={() => handelOpen(false, "")} />
         <StyledFooterTop className="footer-top  pt-100 pb-100">
            <Container>
               <Row className="fade-up">
                  <Col sm={5} className="footer-top__left">
                     <h2>
                        Order our product <br />
                        To build y0ur dream.
                     </h2>
                     <DcLink link={"/product/order"} text={"Order now"} />
                  </Col>

                  <Col className="footer-top__right d-flex " sm={{ span: 6, offset: 1 }}>
                     <Col sm={6}>
                        <div className="footer-top__right__inner">
                           <Link href={"/media-events/brochure"}>
                              <a>
                                 <svg width="26" height="26" viewBox="0 0 26 26">
                                    <g
                                       id="Icon_feather-download"
                                       data-name="Icon feather-download"
                                       transform="translate(-3.5 -3.5)"
                                    >
                                       <path
                                          id="Path_89"
                                          data-name="Path 89"
                                          d="M28.5,22.5v5.333A2.667,2.667,0,0,1,25.833,30.5H7.167A2.667,2.667,0,0,1,4.5,27.833V22.5"
                                          transform="translate(0 -2)"
                                          fill="none"
                                          stroke="#ee1b24"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                       />
                                       <path
                                          id="Path_90"
                                          data-name="Path 90"
                                          d="M10.5,15l6.667,6.667L23.833,15"
                                          transform="translate(-0.667 -1.167)"
                                          fill="none"
                                          stroke="#ee1b24"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                       />
                                       <path
                                          id="Path_91"
                                          data-name="Path 91"
                                          d="M18,20.5V4.5"
                                          transform="translate(-1.5)"
                                          fill="none"
                                          stroke="#ee1b24"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                       />
                                    </g>
                                 </svg>
                              </a>
                           </Link>

                           <p>
                              Download <br />
                              <span>Our catalog</span>
                           </p>
                        </div>
                     </Col>

                     <Col sm={6} onClick={() => handelOpen(true, `X6kgO3eEbDI`)}>
                        <div className="footer-top__right__inner">
                           <svg width="20.667" height="26" viewBox="0 0 20.667 26">
                              <path
                                 id="Icon_feather-play"
                                 data-name="Icon feather-play"
                                 d="M7.5,4.5l18.667,12L7.5,28.5Z"
                                 transform="translate(-6.5 -3.5)"
                                 fill="none"
                                 stroke="#fff"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                              />
                           </svg>
                           <p>
                              Video <br />
                              <span>About our company</span>
                           </p>
                        </div>
                     </Col>
                  </Col>
               </Row>
            </Container>
         </StyledFooterTop>

         <StyledComponent className="footer pb-60 pt-120">
            <div className="parallax-logo">
               {windowWidth > 767 ? (
                  <Parallax speed={10} translateY={[50, -50]}>
                     <img src={FooterImg} alt="" />
                  </Parallax>
               ) : (
                  <img src={FooterImg} alt="" />
               )}
            </div>

            <Container>
               <Row>
                  <Col sm={3} className="footer__logo">
                     <img src={Logo} alt="" />
                     <p>
                        GPH Ispat Limited is one of the leading integrated steel manufacturing companies in Bangladesh
                        engaged in the manufacturing and trading of M. S. Billet and M. S. Rod.
                     </p>
                     <ul>
                        <li className="hover-here">
                           <Link href="https://www.facebook.com/gphispat.com.bd">
                              <a target="_blank">
                                 <svg
                                    className=""
                                    id="Component_58_10"
                                    data-name="Component 58 – 10"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       className="circle"
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       fill="url(#linear-gradient)"
                                    />
                                    <path
                                       id="Path_2115"
                                       data-name="Path 2115"
                                       d="M1206.295,104.537l.416-2.715h-2.6V100.06a1.357,1.357,0,0,1,1.53-1.466h1.185V96.283a14.438,14.438,0,0,0-2.1-.184,3.314,3.314,0,0,0-3.547,3.654v2.069h-2.385v2.715h2.385V111.1h2.935v-6.562Z"
                                       transform="translate(-1182.787 -84.1)"
                                       fill="#222"
                                    />
                                 </svg>
                              </a>
                           </Link>
                        </li>

                        <li className="hover-here">
                           <Link href="https://twitter.com/gphispat?lang=en">
                              <a target="_blank">
                                 <svg
                                    id="Component_58_9"
                                    data-name="Component 58 – 9"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       className="circle"
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       fill="url(#linear-gradient)"
                                    />
                                    <path
                                       id="Path_7835"
                                       data-name="Path 7835"
                                       d="M1239.656,104.437a6.191,6.191,0,0,1-1.517.432c.244-.041.6-.483.746-.661a2.782,2.782,0,0,0,.5-.918c.013-.026.023-.059,0-.079a.087.087,0,0,0-.08.007,7.748,7.748,0,0,1-1.8.688.12.12,0,0,1-.124-.033,1.457,1.457,0,0,0-.157-.161,3.177,3.177,0,0,0-.871-.534,3.032,3.032,0,0,0-1.336-.215,3.19,3.19,0,0,0-1.268.358,3.273,3.273,0,0,0-1.023.835,3.14,3.14,0,0,0-.61,1.223,3.3,3.3,0,0,0-.032,1.291c.009.072,0,.082-.062.072a9.607,9.607,0,0,1-6.18-3.146c-.072-.082-.111-.082-.171.006a3.133,3.133,0,0,0,.534,3.7c.121.115.246.23.38.334a3.15,3.15,0,0,1-1.193-.334c-.072-.046-.109-.02-.115.062a1.873,1.873,0,0,0,.02.354,3.168,3.168,0,0,0,1.953,2.526,1.84,1.84,0,0,0,.4.121,3.533,3.533,0,0,1-1.17.036c-.085-.016-.118.027-.085.108a3.289,3.289,0,0,0,2.457,2.058c.111.02.223.02.335.046-.007.01-.014.01-.02.02a3.891,3.891,0,0,1-1.678.889,6.008,6.008,0,0,1-2.549.326c-.137-.02-.166-.018-.2,0s0,.056.039.091c.174.115.351.217.531.315a8.4,8.4,0,0,0,1.7.681,9.076,9.076,0,0,0,8.81-2.06,9.245,9.245,0,0,0,2.438-6.745c0-.1.115-.15.182-.2a5.953,5.953,0,0,0,1.2-1.247.38.38,0,0,0,.08-.239v-.013C1239.718,104.4,1239.717,104.409,1239.656,104.437Z"
                                       transform="translate(-1211.718 -88.957)"
                                       fill="#222"
                                    />
                                 </svg>
                              </a>
                           </Link>
                        </li>

                        <li className="hover-here">
                           <Link href="https://www.instagram.com/gphispatltd/?hl=en">
                              <a target="_blank">
                                 <svg
                                    id="Component_58_8"
                                    data-name="Component 58 – 8"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       className="circle"
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       fill="url(#linear-gradient)"
                                    />
                                    <g id="Group_17407" data-name="Group 17407" transform="translate(13 13)">
                                       <path
                                          id="Path_2109"
                                          data-name="Path 2109"
                                          d="M1095.8,105.945a.879.879,0,1,0,.879.88A.879.879,0,0,0,1095.8,105.945Z"
                                          transform="translate(-1084.324 -103.267)"
                                          fill="#222"
                                       />
                                       <path
                                          id="Path_2110"
                                          data-name="Path 2110"
                                          d="M1082.749,108.605a3.694,3.694,0,1,0,3.694,3.694A3.7,3.7,0,0,0,1082.749,108.605Zm0,6.06a2.366,2.366,0,1,1,2.366-2.366A2.368,2.368,0,0,1,1082.749,114.665Z"
                                          transform="translate(-1075.187 -104.799)"
                                          fill="#222"
                                       />
                                       <path
                                          id="Path_2111"
                                          data-name="Path 2111"
                                          d="M1080.426,114.628h-5.989a4.511,4.511,0,0,1-4.506-4.506v-5.989a4.511,4.511,0,0,1,4.506-4.505h5.989a4.51,4.51,0,0,1,4.506,4.505v5.989A4.511,4.511,0,0,1,1080.426,114.628Zm-5.989-13.589a3.1,3.1,0,0,0-3.095,3.094v5.989a3.1,3.1,0,0,0,3.095,3.094h5.989a3.1,3.1,0,0,0,3.094-3.094v-5.989a3.1,3.1,0,0,0-3.094-3.094Z"
                                          transform="translate(-1069.932 -99.628)"
                                          fill="#222"
                                       />
                                    </g>
                                 </svg>
                              </a>
                           </Link>
                        </li>

                        <li className="hover-here">
                           <Link href="https://www.youtube.com/c/GPHispatBangladesh">
                              <a target="_blank">
                                 <svg
                                    id="Component_58_7"
                                    data-name="Component 58 – 7"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       className="circle"
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       fill="url(#linear-gradient)"
                                    />
                                    <path
                                       id="Path_7836"
                                       data-name="Path 7836"
                                       d="M1149.075,113.609a3.292,3.292,0,0,0-3.292-3.292h-8.417a3.291,3.291,0,0,0-3.291,3.292v3.917a3.291,3.291,0,0,0,3.291,3.292h8.417a3.292,3.292,0,0,0,3.292-3.292Zm-4.95,2.252-3.775,1.867c-.148.08-.65-.027-.65-.2V113.7c0-.17.507-.277.655-.193l3.613,1.966C1144.119,115.559,1144.278,115.778,1144.125,115.861Z"
                                       transform="translate(-1121.075 -95.316)"
                                       fill="#222"
                                    />
                                 </svg>
                              </a>
                           </Link>
                        </li>
                     </ul>
                  </Col>
                  <Col className="p-0" sm={{ span: 2, offset: 1 }}>
                     <ul>
                        <li>
                           <Link href={"/"}>
                              <a>Home</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/about/directors"}>
                              <a>Directors' Profile</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/about/directors-committe"}>
                              <a>Directors' committee</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/product/quantum-eaf"}>
                              <a>Quantum EAF</a>
                           </Link>
                        </li>
                     </ul>
                  </Col>
                  <Col className="p-0" sm={{ span: 2, offset: 1 }}>
                     <ul>
                        <li>
                           <Link href={"/product"}>
                              <a>Products</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/product/product-services"}>
                              <a>Services</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/sustainability"}>
                              <a>Sustainability</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/investor-matters"}>
                              <a>Investors</a>
                           </Link>
                        </li>
                        {/*<li><Link href={'/'}><a>Annual Reports</a></Link></li>*/}
                     </ul>
                  </Col>
                  <Col className="p-0 m-dn" sm={{ span: 2, offset: 1 }}>
                     <ul>
                        <li>
                           <Link href={"/media-events/news-events"}>
                              <a>News & Events</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/media-events/brochure"}>
                              <a>GPH Brochure</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/contact"}>
                              <a>Contact Us</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/terms-of-use"}>
                              <a>Terms of Use</a>
                           </Link>
                        </li>
                        <li>
                           <Link href={"/privacy-policy"}>
                              <a>Privacy Policy</a>
                           </Link>
                        </li>
                     </ul>
                  </Col>
                  <Col className="p-0" sm={{ span: 2, offset: 1 }}>
                     <ul className="social">
                        <li>
                           <Link href="https://www.facebook.com/gphispat.com.bd">
                              <a target="_blank">
                                 <svg
                                    id="Component_58_10"
                                    data-name="Component 58 – 10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns="http://www.w3.org/1999/xlink"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       fill="url(#linear-gradient)"
                                    />
                                    <path
                                       id="Path_2115"
                                       data-name="Path 2115"
                                       d="M1206.295,104.537l.416-2.715h-2.6V100.06a1.357,1.357,0,0,1,1.53-1.466h1.185V96.283a14.438,14.438,0,0,0-2.1-.184,3.314,3.314,0,0,0-3.547,3.654v2.069h-2.385v2.715h2.385V111.1h2.935v-6.562Z"
                                       transform="translate(-1182.787 -84.1)"
                                       fill="#222"
                                    />
                                 </svg>
                              </a>
                           </Link>
                        </li>

                        <li>
                           <Link href="https://twitter.com/gphispat?lang=en">
                              <a target="_blank">
                                 <svg
                                    id="Component_58_9"
                                    data-name="Component 58 – 9"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns="http://www.w3.org/1999/xlink"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       fill="url(#linear-gradient)"
                                    />
                                    <path
                                       id="Path_7835"
                                       data-name="Path 7835"
                                       d="M1239.656,104.437a6.191,6.191,0,0,1-1.517.432c.244-.041.6-.483.746-.661a2.782,2.782,0,0,0,.5-.918c.013-.026.023-.059,0-.079a.087.087,0,0,0-.08.007,7.748,7.748,0,0,1-1.8.688.12.12,0,0,1-.124-.033,1.457,1.457,0,0,0-.157-.161,3.177,3.177,0,0,0-.871-.534,3.032,3.032,0,0,0-1.336-.215,3.19,3.19,0,0,0-1.268.358,3.273,3.273,0,0,0-1.023.835,3.14,3.14,0,0,0-.61,1.223,3.3,3.3,0,0,0-.032,1.291c.009.072,0,.082-.062.072a9.607,9.607,0,0,1-6.18-3.146c-.072-.082-.111-.082-.171.006a3.133,3.133,0,0,0,.534,3.7c.121.115.246.23.38.334a3.15,3.15,0,0,1-1.193-.334c-.072-.046-.109-.02-.115.062a1.873,1.873,0,0,0,.02.354,3.168,3.168,0,0,0,1.953,2.526,1.84,1.84,0,0,0,.4.121,3.533,3.533,0,0,1-1.17.036c-.085-.016-.118.027-.085.108a3.289,3.289,0,0,0,2.457,2.058c.111.02.223.02.335.046-.007.01-.014.01-.02.02a3.891,3.891,0,0,1-1.678.889,6.008,6.008,0,0,1-2.549.326c-.137-.02-.166-.018-.2,0s0,.056.039.091c.174.115.351.217.531.315a8.4,8.4,0,0,0,1.7.681,9.076,9.076,0,0,0,8.81-2.06,9.245,9.245,0,0,0,2.438-6.745c0-.1.115-.15.182-.2a5.953,5.953,0,0,0,1.2-1.247.38.38,0,0,0,.08-.239v-.013C1239.718,104.4,1239.717,104.409,1239.656,104.437Z"
                                       transform="translate(-1211.718 -88.957)"
                                       fill="#222"
                                    />
                                 </svg>
                              </a>
                           </Link>
                        </li>

                        <li>
                           <Link href="https://www.instagram.com/gphispatltd/?hl=en">
                              <a target="_blank">
                                 <svg
                                    id="Component_58_8"
                                    data-name="Component 58 – 8"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns="http://www.w3.org/1999/xlink"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       opacity="0"
                                       fill="url(#linear-gradient)"
                                    />
                                    <g id="Group_17407" data-name="Group 17407" transform="translate(13 13)">
                                       <path
                                          id="Path_2109"
                                          data-name="Path 2109"
                                          d="M1095.8,105.945a.879.879,0,1,0,.879.88A.879.879,0,0,0,1095.8,105.945Z"
                                          transform="translate(-1084.324 -103.267)"
                                          fill="#222"
                                       />
                                       <path
                                          id="Path_2110"
                                          data-name="Path 2110"
                                          d="M1082.749,108.605a3.694,3.694,0,1,0,3.694,3.694A3.7,3.7,0,0,0,1082.749,108.605Zm0,6.06a2.366,2.366,0,1,1,2.366-2.366A2.368,2.368,0,0,1,1082.749,114.665Z"
                                          transform="translate(-1075.187 -104.799)"
                                          fill="#222"
                                       />
                                       <path
                                          id="Path_2111"
                                          data-name="Path 2111"
                                          d="M1080.426,114.628h-5.989a4.511,4.511,0,0,1-4.506-4.506v-5.989a4.511,4.511,0,0,1,4.506-4.505h5.989a4.51,4.51,0,0,1,4.506,4.505v5.989A4.511,4.511,0,0,1,1080.426,114.628Zm-5.989-13.589a3.1,3.1,0,0,0-3.095,3.094v5.989a3.1,3.1,0,0,0,3.095,3.094h5.989a3.1,3.1,0,0,0,3.094-3.094v-5.989a3.1,3.1,0,0,0-3.094-3.094Z"
                                          transform="translate(-1069.932 -99.628)"
                                          fill="#222"
                                       />
                                    </g>
                                 </svg>
                              </a>
                           </Link>
                        </li>

                        <li>
                           <Link href="https://www.youtube.com/c/GPHispatBangladesh">
                              <a target="_blank">
                                 <svg
                                    id="Component_58_7"
                                    data-name="Component 58 – 7"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns="http://www.w3.org/1999/xlink"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                 >
                                    <defs>
                                       <linearGradient
                                          id="linear-gradient"
                                          x1="0.5"
                                          x2="0.5"
                                          y2="1"
                                          gradientUnits="objectBoundingBox"
                                       >
                                          <stop offset="0" stop-color="#ad0000" />
                                          <stop offset="1" stop-color="red" />
                                       </linearGradient>
                                    </defs>
                                    <circle
                                       id="Ellipse_447"
                                       data-name="Ellipse 447"
                                       cx="20"
                                       cy="20"
                                       r="20"
                                       fill="#f7f7f9"
                                    />
                                    <circle
                                       id="Ellipse_474"
                                       data-name="Ellipse 474"
                                       cx="1"
                                       cy="1"
                                       r="1"
                                       transform="translate(19 19)"
                                       opacity="0"
                                       fill="url(#linear-gradient)"
                                    />
                                    <path
                                       id="Path_7836"
                                       data-name="Path 7836"
                                       d="M1149.075,113.609a3.292,3.292,0,0,0-3.292-3.292h-8.417a3.291,3.291,0,0,0-3.291,3.292v3.917a3.291,3.291,0,0,0,3.291,3.292h8.417a3.292,3.292,0,0,0,3.292-3.292Zm-4.95,2.252-3.775,1.867c-.148.08-.65-.027-.65-.2V113.7c0-.17.507-.277.655-.193l3.613,1.966C1144.119,115.559,1144.278,115.778,1144.125,115.861Z"
                                       transform="translate(-1121.075 -95.316)"
                                       fill="#222"
                                    />
                                 </svg>
                              </a>
                           </Link>
                        </li>
                     </ul>
                  </Col>
               </Row>

               <Row className="copyright">
                  <Col className="d-flex justify-content-between">
                     <p>© {moment(Date()).format("YYYY")} GPH Ispat Limited. All Rights Reserved.</p>
                     {/*<p>Designed & Developed by Brandmyth Digital</p>*/}
                     <a href={"https://brandmyth.agency/"} target="_blank">
                        Powered by Brandmyth Digital
                     </a>
                  </Col>
               </Row>
            </Container>
         </StyledComponent>
      </>
   );
};

const StyledFooterTop = styled.section`
   .row {
      position: relative;

      &:after {
         content: "";
         background-color: #f9f9f9;
         left: 15px;
         right: 15px;
         top: 0;
         bottom: 0;
         position: absolute;
      }
   }

   .footer-top__left {
      padding: 70px 0 70px 70px;
      position: relative;
      z-index: 2;

      h2 {
         font-size: 30px;
         font-weight: 500;
         font-family: ${title};
         line-height: 30px;
         margin-bottom: 40px;
         text-transform: uppercase;
      }
   }

   .footer-top__right {
      position: relative;
      z-index: 2;

      &__inner {
         padding-top: calc(305 / 330 * 100%);
         position: relative;
         z-index: 2;
      }

      .col-sm-6 {
         cursor: pointer;
         position: relative;
         overflow: hidden;

         &:nth-of-type(1) {
            background-color: #dddddd;

            &:after {
               transform: translateX(-100%);
            }
         }

         &:nth-of-type(2) {
            background: ${gradientColor};

            &:after {
               transform: translateX(100%);
            }

            p {
               color: #ffffff;
            }
         }

         &:after {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            background: ${gradientColor};
            content: "";
            transition: 0.7s all ease;
         }

         &:hover {
            &:nth-of-type(1) {
               svg {
                  path {
                     stroke: white;
                  }
               }

               p {
                  color: white;
               }
            }

            &:nth-of-type(2) {
               &:after {
                  background: ${text};
               }

               p {
                  color: #ee1b24;
               }

               svg {
                  path {
                     stroke: #ee1b24;
                  }
               }
            }

            &:after {
               transform: translateX(0);
            }
         }
      }

      svg {
         position: absolute;
         right: 30px;
         top: 30px;
      }

      a {
         position: absolute;
         height: 100%;
         width: 100%;
         top: 0;
         left: 0;
         right: 0;
         z-index: 2;
         bottom: 0;
      }

      p {
         ${body_ms14};
         font-weight: 300;
         color: #ee1b24;
         position: absolute;
         bottom: 0px;
         right: 30px;
         left: 30px;
         line-height: 14px;
         text-align: right;
         text-transform: uppercase;
         transition-delay: 0.2s;

         @media (max-width: 767px) {
            bottom: 30px;
         }
         span {
            font-weight: bold;
            text-transform: uppercase;
         }
      }
   }

   @media (min-width: 1550px) {
      .footer-top__left {
         h2 {
            font-size: 36px;
            line-height: 40px;
         }
      }

      .footer-top__right {
         svg {
            top: 40px;
         }

         p {
            font-size: 18px;
            line-height: 18px;
            bottom: 40px;
         }
      }
   }

   @media (max-width: 767px) {
      .footer-top__left {
         min-width: 100%;
         padding: 35px 45px 35px 45px;

         h2 {
            font-size: 24px;
            line-height: 24px;
         }
      }

      .footer-top__right {
         flex-wrap: wrap;
         min-width: 100%;
         margin: 0;

         .col-sm-6 {
            min-width: 100%;
         }

         &__inner {
            padding-top: calc(180 / 373 * 100%);

            p {
               text-align: left;
               font-size: 20px;
               line-height: 20px;
            }
         }
      }
   }
`;

const StyledComponent = styled.section`
   background-color: #222222;
   position: relative;
   overflow: hidden;
   z-index: 99;

   .parallax-logo {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
   }

   .footer__logo {
      p {
         margin-top: 60px;
         ${body_ms14};
         color: rgba(255, 255, 255, 0.8);
         font-family: ${title};
      }

      ul {
         margin-top: 80px;
         display: flex;

         li {
            margin-bottom: 0 !important;

            &:not(:nth-last-of-type(1)) {
               margin-right: 15px;
            }

            &:hover {
            }
         }
      }
   }

   ul {
      li {
         &:not(:nth-last-of-type(1)) {
            margin-bottom: 30px;
         }

         a {
            color: #ffffff;
            ${body_ms16};
            font-weight: 500;
         }
      }
   }

   .copyright {
      padding-top: 20px;
      margin-top: 60px;
      position: relative;

      &:before {
         position: absolute;
         content: "";
         top: 0;
         left: 15px;
         right: 15px;
         background-color: ${hover};
         height: 1px;
      }

      p,
      a {
         color: #ffffff;
         ${body_ms14};
         font-family: ${title};
      }
   }

   @media (min-width: 768px) {
      .social {
         display: none;
      }
   }

   @media (max-width: 767px) {
      .footer__logo {
         min-width: 100%;
         margin-bottom: 30px;

         p {
            margin-top: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid #fff;
         }

         ul {
            display: none;
         }
      }

      .col-sm-2 {
         margin: 0 0 40px 0 !important;
         min-width: 33.333%;
         padding: 0 15px !important;
      }

      .social {
         display: flex;

         li {
            margin-right: 20px !important;
         }
      }

      .copyright {
         margin-top: 0;

         .justify-content-between {
            flex-wrap: wrap;
         }
      }
   }

   @media (max-width: 580px) {
      .col-sm-2 {
         min-width: 50%;
         max-width: 50%;
      }

      .m-dn {
         display: none;
      }

      .parallax-logo {
         width: 100%;

         img {
            position: absolute;
            bottom: 0;
            width: 99%;
         }
      }
   }
`;

export default MyComponent;
