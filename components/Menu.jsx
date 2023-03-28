import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Link from 'next/link'
import styled from "styled-components";
import Logo from '../public/images/static/logo.svg'
import {Container, Row, Col, Form} from "react-bootstrap";
import {body_ms14, body_ms16, gradient, hover, text, title, title_ms20, title_ms24} from "../styles/globalStyleVars";
import {CSSPlugin, gsap, TimelineLite} from "gsap";
import Title from "./Title";
import LogoBlack from '../public/images/static/logo_black.svg';
import Router, {useRouter} from "next/router";
import {wrapper} from "../pages/api/store";
import {ApiServices} from "../pages/api/network/ApiServices";
import {ApiParamKey} from "../pages/api/network/ApiParamKey";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../pages/api/redux/menu";
import {Img} from "./Img";
import {fetchHome, fetchHomeProduct} from "../pages/api/redux/home";
import Home from "../pages";

gsap.registerPlugin(CSSPlugin);


const MyComponent = () => {
    let tl = new TimelineLite();
    let tl2 = new TimelineLite();
    const router = useRouter()

    const dispatch = useDispatch();

    const searchClickRef = useRef()
    const getData = useSelector(state => state.menuReducer);


    const menuItems = getData?.data?.menu_items;


    useEffect(() => {

        let api_services = ApiServices.GET_MENU;
        let param = {
            [ApiParamKey.menu_id]: 1,
        }
        dispatch(fetchData([api_services, param]))

    }, [router]);


    // on click search input toggle action --  desktop menu
    useEffect(() => {
        let searchInput = document.querySelector('.search-form');
        searchClickRef.current.addEventListener('click', (e) => {
            setTimeout(() => {
                searchInput.querySelector('input').focus();
            }, 200);
            if (searchClickRef.current.classList.contains('search-open')) {
                tl.to('.search-form', {
                    duration: .4,
                    width: 0,
                    opacity: 1
                }).to('.search-form input', {
                    padding: 0,
                }, '-=.4').to('.search-form', {
                    display: 'none'
                }, '-=.3')
                searchClickRef.current.classList.remove('search-open')
            } else {
                tl.to('.search-form', {
                    display: 'block'
                }).to('.search-form', {
                    duration: .4,
                    width: 300,
                    opacity: 1
                }, '-=.2').to('.search-form input', {
                    padding: '0 20px',
                }, '-=.4')
                searchClickRef.current.classList.add('search-open')
            }
        })

        window.addEventListener("click", (e) => {
            if (searchClickRef.current.classList.contains('search-open')) {
                if (!e.target.matches('.search-form, .search-form input,.search-bar,.search-bar svg,.circle,.search-bar path,.search-bar g, .search-bar defs ')) {
                    tl.to('.search-form', {
                        duration: .4,
                        width: 0,
                        opacity: 1
                    }).to('.search-form input', {
                        padding: 0,
                    }, '-=.4').to('.search-form', {
                        display: 'none'
                    }, '-=.3')
                    searchClickRef.current.classList.remove('search-open')
                }
            }
        });
        searchInput.addEventListener('click', (e) => {
            e.stopPropagation()
        })

    }, []);

    // search api action
    const [searchKewWord, setSearchKeyword] = useState('')
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        Router.push({
            pathname: '/search', query: {keyword: searchKewWord}
        })
    }


    //------- on scroll menu fixed action --  desktop menu
    useEffect(() => {
        if (document.body.classList.contains("scroll-down")) {
            document.body.classList.remove("scroll-down");
        }
    });

    useEffect(() => {
        const body = document.body;
        const scrollUp = "scroll-up";
        const scrollDown = "scroll-down";
        let lastScroll = 0;
        let howMuchScroll = 150;
        if (window.screen.width < 991) {
            howMuchScroll = 80;
        } else {
            howMuchScroll = 150;
        }

        window.addEventListener("scroll", () => {
            let currentScroll = window.pageYOffset;

            if (currentScroll <= howMuchScroll) {
                body.classList.remove(scrollUp);
                return;
            }
            if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
                // down
                body.classList.remove(scrollUp);
                body.classList.add(scrollDown);
            } else if (
                currentScroll < lastScroll &&
                body.classList.contains(scrollDown)
            ) {
                // up
                body.classList.remove(scrollDown);
                body.classList.add(scrollUp);
            }
            lastScroll = currentScroll;
        });
    }, []);

    // on click menu hide
    useEffect(() => {
        let getAllA = document.querySelectorAll('ul.main-menu__items .sub-menu a');
        let getAllSub = document.querySelectorAll('ul.main-menu__items .sub-menu')
        getAllA.forEach(e => {
            e.addEventListener('click', () => {
                getAllSub.forEach(i => {
                    i.style = `
                        display:none
                    `
                })

                setTimeout(() => {
                    getAllSub.forEach(i => {
                        i.removeAttribute('style')
                    })
                }, 600)
            })
        })
    }, [])


    //----- mobile menu action
    useEffect(() => {
        let getMobileMenuBar = document.querySelector('.main-menu-mobile');
        let getItemsParent = document.querySelector('.main-menu-mobile__items');

        let getItems = document.querySelectorAll('.main-item');

        let getBacks = document.querySelectorAll('.sub-menu-back');
        let getHamburgerClick = document.querySelector('#open-click')
        let getHamburgerCloseClick = document.querySelector('#close-click')


        // menu open toggle
        getHamburgerClick.addEventListener('click', () => {
            getMobileMenuBar.classList.add('menu-open')
            document.body.classList.add('stop-scroll')
            tl2.to(getItemsParent, {
                duration: .2,
                display: 'block',
            }).to(getItemsParent, {
                duration: .2,
                x: 0
            }, '-=.2')


        })

        getHamburgerCloseClick.addEventListener('click', () => {
            getMobileMenuBar.classList.remove('menu-open')
            document.body.classList.remove('stop-scroll')
            if (document.querySelector('.main-item.active')) {
                getItemsParent.classList.remove('active')
                document.querySelector('.main-item.active').classList.remove('active')
            }

            tl2.to(getItemsParent, {
                duration: .2,
                x: '100%'
            }).to(getItemsParent, {
                duration: .2,
                display: 'none'
            })
        });


        // sub menu toggle
        getItems.forEach(i => {
            i.addEventListener('click', () => {
                getItemsParent.classList.add('active')
                i.classList.add('active')
            })
        })

        getBacks.forEach(i => {
            i.addEventListener('click', (e) => {

                getItemsParent.classList.remove('active')
                i.parentNode.parentElement.classList.remove('active')
                e.stopPropagation()
            })
        })

        // on click a tag menu hide
        let getAlla = document.querySelectorAll('.main-menu-mobile a');
        getAlla.forEach(i => {
            i.addEventListener('click', (e) => {
                // e.stopPropagation();
                getMobileMenuBar.classList.remove('menu-open');
                document.body.classList.remove('stop-scroll');
                setTimeout(() => {
                    if (document.querySelector('.main-item.active')) {

                        getItemsParent.classList.remove('active')
                        document.querySelector('.main-item.active').classList.remove('active')
                    }
                }, 300)

                tl2.to(getItemsParent, {
                    duration: .3,
                    x: '100%'
                }).to(getItemsParent, {
                    duration: .3,
                    display: 'none'
                })
            })
        })

    }, [getData])


    return (

        <>
            {/*desktop menu*/}
            <StyledMenu className='main-menu'>
                <Container>

                    <Row>
                        <Col className={'d-flex justify-content-between'}>
                            {/*logo    */}
                            <ul>
                                <li className={'ghp_logo'}><Link href={'/'}><a className={'d-block'}><img
                                    alt='GPH ispat' src={Logo}/></a></Link></li>
                            </ul>

                            {/*menu item*/}

                            <ul className={'main-menu__items'}>

                                {
                                    menuItems && menuItems?.length > 0 &&
                                    menuItems?.map((element) => {
                                        return (

                                            element?.child_items?.length ?
                                                <li><Link
                                                    href={'javascript:void(0)'}><a>{element?.page_data?.subtitle}</a></Link>
                                                    <div className="sub-menu">
                                                        <div className="sub-menu__text">
                                                            <h3>{element?.page_data?.short_desc}</h3>
                                                            <p>{element?.page_data?.description}</p>
                                                        </div>
                                                        <ul>
                                                            {
                                                                element?.child_items && element?.child_items?.length > 0 &&
                                                                element?.child_items?.map((item) => {
                                                                    if (item?.page_data?.status === 1) {
                                                                        if(item?.item_title==''){
                                                                            return (
                                                                                <li className={`${router.asPath === `/${element?.item_title}` ? 'active' : ''}`}><Link
                                                                                    href={`/${element?.item_title}/${item?.item_title}`}><a>{item?.page_data?.title}</a></Link>
                                                                                </li>
                                                                            );
                                                                        }
                                                                        else
                                                                        {
                                                                            return (
                                                                                <li className={`${router.asPath === `/${element?.item_title}/${item?.item_title}` ? 'active' : ''}`} ><Link
                                                                                    href={`/${element?.item_title}/${item?.item_title}`}><a>{item?.page_data?.title}</a></Link>
                                                                                </li>
                                                                            );
                                                                        }


                                                                    }
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </li> : <li><Link
                                                    href={`/${element?.item_title}`}><a>{element?.page_data?.subtitle}</a></Link>
                                                </li>

                                        );
                                    })
                                }
                                {/*<li><Link href={'/contact'}><a>Contact Us</a></Link></li>*/}
                            </ul>
                            {/*search */}
                            <ul className='main-menu__search'>
                                <li className='hover-here'>
                                    <Link href="https://wa.me/01734059648/?text=Hello"><a target='_blank'>
                                        <svg id="Component_70_1" data-name="Component 70 – 1"
                                             xmlns="http://www.w3.org/2000/svg"
                                             xmlns="http://www.w3.org/1999/xlink" width="40" height="40"
                                             viewBox="0 0 40 40">
                                            <defs>
                                                <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1"
                                                                gradientUnits="objectBoundingBox">
                                                    <stop offset="0" stop-color="#ad0000"/>
                                                    <stop offset="1" stop-color="red"/>
                                                </linearGradient>
                                            </defs>
                                            <g id="Button_-_Search" data-name="Button - Search"
                                               transform="translate(-1490 50)">
                                                <g id="Ellipse_450" data-name="Ellipse 450"
                                                   transform="translate(1490 -50)"
                                                   fill="none" stroke="#fff" stroke-width="1">
                                                    <circle cx="20" cy="20" r="20" stroke="none"/>
                                                    <circle cx="20" cy="20" r="19.5" fill="none"/>
                                                </g>
                                                <circle className='circle' id="Ellipse_486" data-name="Ellipse 486"
                                                        cx="1"
                                                        cy="1" r="1"
                                                        transform="translate(1509 -31)" opacity="0"
                                                        fill="url(#linear-gradient)"/>
                                                <path id="Icon_awesome-whatsapp" data-name="Icon awesome-whatsapp"
                                                      d="M13.6,4.575A7.931,7.931,0,0,0,1.125,14.143L0,18.25l4.2-1.1a7.9,7.9,0,0,0,3.789.964H8a8,8,0,0,0,8-7.929,7.96,7.96,0,0,0-2.4-5.607ZM8,16.775a6.578,6.578,0,0,1-3.357-.918L4.4,15.714l-2.493.654.664-2.432-.157-.25a6.6,6.6,0,1,1,12.246-3.5A6.664,6.664,0,0,1,8,16.775Zm3.614-4.936c-.2-.1-1.171-.579-1.354-.643s-.314-.1-.446.1-.511.643-.629.779-.232.15-.429.05a5.393,5.393,0,0,1-2.7-2.357c-.2-.35.2-.325.582-1.082a.367.367,0,0,0-.018-.346c-.05-.1-.446-1.075-.611-1.471s-.325-.332-.446-.339-.246-.007-.379-.007a.734.734,0,0,0-.529.246,2.226,2.226,0,0,0-.693,1.654,3.881,3.881,0,0,0,.807,2.05,8.853,8.853,0,0,0,3.386,2.993,3.877,3.877,0,0,0,2.379.5,2.029,2.029,0,0,0,1.336-.943,1.657,1.657,0,0,0,.114-.943C11.939,11.986,11.807,11.936,11.611,11.839Z"
                                                      transform="translate(1502 -40.25)" fill="#fff"/>
                                            </g>
                                        </svg>
                                    </a></Link>


                                </li>

                                <li className='hover-here search-bar' ref={searchClickRef}>

                                    <Form className='search-form' onSubmit={handleSubmitSearch}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control value={searchKewWord}
                                                          onChange={(e) => setSearchKeyword(e.target.value)}
                                                          type="text" placeholder="Search"/>
                                        </Form.Group>
                                    </Form>

                                    <svg id="Component_701" data-name="Component 70 – 1"
                                         width="40" height="40" viewBox="0 0 40 40">
                                        <defs>
                                            <linearGradient id="linear-gradient" x2="1" y2="1"
                                                            gradientUnits="objectBoundingBox">
                                                <stop offset="0" stop-color="#ad0000"/>
                                                <stop offset="1" stop-color="red"/>
                                            </linearGradient>
                                        </defs>
                                        <g id="Button-_Search" data-name="Button - Search"
                                           transform="translate(-1490 50)">
                                            <g id="Ellipse_450" data-name="Ellipse 450" transform="translate(1490 -50)"
                                               fill="none" stroke="#fff" stroke-width="1">
                                                <circle cx="20" cy="20" r="20" stroke="none"/>
                                                <circle cx="20" cy="20" r="19.5" fill="none"/>
                                            </g>
                                            <circle className='circle' id="Ellipse_485" data-name="Ellipse 485" cx="1"
                                                    cy="1" r="1"
                                                    transform="translate(1509 -31)" opacity="0"
                                                    fill="url(#linear-gradient)"/>
                                            <path id="Path_8306" data-name="Path 8306"
                                                  d="M-40.214,508.284a.5.5,0,0,1-.354-.146l-4.323-4.324a7.042,7.042,0,0,1-4.684,1.745h0a7.1,7.1,0,0,1-5.046-2.09,7.094,7.094,0,0,1-2.092-5.049,7.149,7.149,0,0,1,7.141-7.142h0a7.1,7.1,0,0,1,5.05,2.091,7.1,7.1,0,0,1,2.092,5.05,7.06,7.06,0,0,1-1.748,4.685l4.319,4.327a.5.5,0,0,1,0,.707A.5.5,0,0,1-40.214,508.284Zm-9.36-3.725h.013a6.164,6.164,0,0,0,4.327-1.79l.006-.006h0a6.076,6.076,0,0,0,1.8-4.34,6.1,6.1,0,0,0-1.8-4.344,6.1,6.1,0,0,0-4.343-1.8h0a6.148,6.148,0,0,0-6.141,6.142,6.1,6.1,0,0,0,1.8,4.341,6.1,6.1,0,0,0,4.34,1.8Z"
                                                  transform="translate(1558.215 -529.781)" fill="#fff"/>
                                        </g>
                                    </svg>

                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

            </StyledMenu>


            {/*mobile menu*/}
            <StyledMobileMenu className='main-menu-mobile'>
                <div className="main-menu-mobile__bar">
                    <div className="main-menu-mobile__bar__logo">
                        <Link href={'/'}><a><img alt='GPH ispat' src={Logo}/></a></Link>
                    </div>

                    <div className="main-menu-mobile__bar__hamburger">
                        <ul>
                            <li className='hover-here'>
                                <Link href="https://wa.me/01734059648/?text=Hello"><a>
                                    <svg id="Component_70_1" data-name="Component 70 – 1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         xmlns="http://www.w3.org/1999/xlink" width="40" height="40"
                                         viewBox="0 0 40 40">
                                        <defs>
                                            <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1"
                                                            gradientUnits="objectBoundingBox">
                                                <stop offset="0" stop-color="#ad0000"/>
                                                <stop offset="1" stop-color="red"/>
                                            </linearGradient>
                                        </defs>
                                        <g id="Button_-_Search" data-name="Button - Search"
                                           transform="translate(-1490 50)">
                                            <g id="Ellipse_450" data-name="Ellipse 450"
                                               transform="translate(1490 -50)"
                                               fill="none" stroke="#fff" stroke-width="1">
                                                <circle cx="20" cy="20" r="20" stroke="none"/>
                                                <circle cx="20" cy="20" r="19.5" fill="none"/>
                                            </g>
                                            <circle className='circle' id="Ellipse_486" data-name="Ellipse 486"
                                                    cx="1"
                                                    cy="1" r="1"
                                                    transform="translate(1509 -31)" opacity="0"
                                                    fill="url(#linear-gradient)"/>
                                            <path id="Icon_awesome-whatsapp" data-name="Icon awesome-whatsapp"
                                                  d="M13.6,4.575A7.931,7.931,0,0,0,1.125,14.143L0,18.25l4.2-1.1a7.9,7.9,0,0,0,3.789.964H8a8,8,0,0,0,8-7.929,7.96,7.96,0,0,0-2.4-5.607ZM8,16.775a6.578,6.578,0,0,1-3.357-.918L4.4,15.714l-2.493.654.664-2.432-.157-.25a6.6,6.6,0,1,1,12.246-3.5A6.664,6.664,0,0,1,8,16.775Zm3.614-4.936c-.2-.1-1.171-.579-1.354-.643s-.314-.1-.446.1-.511.643-.629.779-.232.15-.429.05a5.393,5.393,0,0,1-2.7-2.357c-.2-.35.2-.325.582-1.082a.367.367,0,0,0-.018-.346c-.05-.1-.446-1.075-.611-1.471s-.325-.332-.446-.339-.246-.007-.379-.007a.734.734,0,0,0-.529.246,2.226,2.226,0,0,0-.693,1.654,3.881,3.881,0,0,0,.807,2.05,8.853,8.853,0,0,0,3.386,2.993,3.877,3.877,0,0,0,2.379.5,2.029,2.029,0,0,0,1.336-.943,1.657,1.657,0,0,0,.114-.943C11.939,11.986,11.807,11.936,11.611,11.839Z"
                                                  transform="translate(1502 -40.25)" fill="#fff"/>
                                        </g>
                                    </svg>
                                </a></Link>


                            </li>
                            <li className='hover-here'>
                                <svg id='open-click' xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                     viewBox="0 0 40 40">
                                    <g id="Group_5147" data-name="Group 5147"
                                       transform="translate(2715 -21637) rotate(180)">
                                        <rect id="Rectangle_1100" data-name="Rectangle 1100" width="40" height="40"
                                              rx="20" transform="translate(2675 -21677)" fill="#ee1b24"/>
                                        <g id="Group_13922" data-name="Group 13922" transform="translate(0 2)">
                                            <line id="Line_3585" data-name="Line 3585" x2="18"
                                                  transform="translate(2686 -21655)" fill="none" stroke="#fff"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                                            <line id="Line_536" data-name="Line 536" x2="18"
                                                  transform="translate(2686 -21663)" fill="none" stroke="#fff"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                                        </g>
                                    </g>
                                </svg>

                                <svg id='close-click' xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                     viewBox="0 0 40 40">
                                    <g id="Group_5147" data-name="Group 5147"
                                       transform="translate(2715 -21637) rotate(180)">
                                        <rect id="Rectangle_1100" data-name="Rectangle 1100" width="40" height="40"
                                              rx="20" transform="translate(2675 -21677)" fill="#ee1b24"/>
                                        <g id="Group_18365" data-name="Group 18365"
                                           transform="translate(-0.363 3.634)">
                                            <line id="Line_536" data-name="Line 536" x2="18"
                                                  transform="translate(2688.636 -21667.363) rotate(45)" fill="none"
                                                  stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1"/>
                                            <line id="Line_4006" data-name="Line 4006" x2="18"
                                                  transform="translate(2688.636 -21654.635) rotate(-45)" fill="none"
                                                  stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="1"/>
                                        </g>
                                    </g>
                                </svg>


                            </li>
                        </ul>
                    </div>
                </div>

                <div className="main-menu-mobile__items">
                    <ul>
                        {
                            menuItems && menuItems?.length > 0 &&
                            menuItems?.map((element, index) => {
                                return (
                                    element?.child_items?.length ?
                                        <li className='main-item'>{element?.page_data?.subtitle}({element?.child_items?.length})
                                            <ul>
                                                <p className='sub-menu-back'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="7.014"
                                                         height="13.413"
                                                         viewBox="0 0 7.014 13.413">
                                                        <g id="Group_14802" data-name="Group 14802"
                                                           transform="translate(6.307 12.706) rotate(180)">
                                                            <line id="Line_3789" data-name="Line 3789" x2="5.6" y2="5.6"
                                                                  transform="translate(0 0)" fill="none"
                                                                  stroke="#fb091a"
                                                                  stroke-linecap="round" stroke-width="1"/>
                                                            <line id="Line_3790" data-name="Line 3790" y1="6.4" x2="5.6"
                                                                  transform="translate(0 5.6)" fill="none"
                                                                  stroke="#fb091a"
                                                                  stroke-linecap="round" stroke-width="1"/>
                                                        </g>
                                                    </svg>
                                                    <span>Back</span>
                                                </p>
                                                <h3>{element?.page_data?.subtitle}</h3>
                                                {
                                                    element?.child_items && element?.child_items?.length > 0 &&
                                                    element?.child_items?.map((item) => {

                                                        if(item?.item_title==''){
                                                            return (
                                                                <li className={`${router.asPath === `/${element?.item_title}` ? 'active' : ''}`}><Link
                                                                    href={`/${element?.item_title}/${item?.item_title}`}><a>{item?.page_data?.title}</a></Link>
                                                                </li>
                                                            );
                                                        }
                                                        else{
                                                            return (
                                                                <li className={`${router.asPath === `/${element?.item_title}/${item?.item_title}` ? 'active' : ''}`}><Link
                                                                    href={`/${element?.item_title}/${item?.item_title}`}><a>{item?.page_data?.title}</a></Link>
                                                                </li>
                                                            );

                                                        }

                                                    })
                                                }
                                            </ul>
                                        </li> :
                                        <li className='main-item'>
                                            <Link href={`/${element?.item_title}`}>
                                                <a>{element?.page_data?.subtitle}</a>
                                            </Link>
                                        </li>
                                );
                            })
                        }

                    </ul>
                </div>

            </StyledMobileMenu>
        </>

    );
};


//----- desktop  menu

const StyledMenu = styled.section`
  height: 90px;
  border-bottom: 1px solid ${hover};
  background-color: rgba(34, 34, 34, 0.30);
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  transition: all 0.4s ease;

  @media (max-width: 990px) {
    display: none;
  }

  ul {
    display: flex;
    align-items: center;
    height: 90px;
    justify-content: space-between;
    position: relative;

    &.main-menu__items {
      li {
        height: 100%;
        //position: relative;


        a {
          ${body_ms14};
          color: #ffffff;
          text-transform: capitalize;
          height: 100%;
          align-items: center;
          display: flex;
          white-space: nowrap;
        }

        &:not(:nth-last-of-type(1)) {
          margin-right: 25px;

        }

        //sub menu
        .sub-menu {
          min-height: 300px;
          padding: 0 50px 0 0;
          display: flex;
          position: absolute;
          width: calc(100% + 40px);
          left: -20px;
          top: 90px;
          z-index: 9999;
          background-color: #fff;
          border-radius: 0 0 10px 10px;
          overflow: hidden;
          visibility: hidden;
          opacity: 0;
          transition: all .4s ease;
          box-shadow: 0 0 20px rgba(34, 34, 34, 0.20);

          &__text {
            max-width: 300px;
            min-width: 300px;
            padding: 50px 50px 0 50px;
            ${gradient};

            h3 {
              ${title_ms24};
              color: #ffffff;
              margin-bottom: 30px;
              font-weight: 500;
              text-transform: capitalize;
            }

            p {
              color: #ffffff;
              font-weight: 500;
              font-family: ${title};
              ${body_ms14};

            }
          }

          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 50px 0 20px 70px;
            height: 100%;
            align-items: flex-start;
            width: 100%;

            li {
              display: flex;
              margin: 0;
              width: 45%;
              //flex: 1;
              &.active {
                a {
                  color: ${hover};
                  pointer-events: none;
                }
              }

              a {
                ${body_ms14};
                text-transform: capitalize;
                color: ${text};
                margin-bottom: 15px;
                padding: 0 0 5px;
                width: 100%;
                font-family: ${title};
                white-space: break-spaces;
              }
            }
          }
        }

        &:hover {
          .sub-menu {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }

    &.main-menu__search {
      li:not(:nth-last-of-type(1)) {
        margin-right: 20px;
      }

      li:nth-last-of-type(1) {
        cursor: pointer;
      }

      .search-form {
        position: absolute;
        width: 0px;
        right: 0;
        top: 90px;
        z-index: 9;
        display: none;
        opacity: 0;

        input {
          border-radius: 0;
          height: 48px;
          padding: 0 20px;
          ${body_ms14};
          border: none;
          box-shadow: 0 0 20px rgba(34, 34, 34, 0.20);
        }
      }
    }
  }


  @media (max-width: 1180px) {
    .main-menu__items {
      li {
        margin-right: 10px !important;

        a {
          font-size: 12px !important;
        }
      }
    }
  }


`;


//----- mobile menu
const StyledMobileMenu = styled.section`
  position: fixed;
  width: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  //height: 100vh;
  //overflow-x: hidden;
  //overflow-y: auto;
  //background-color: #fff;
  //display: none;
  //transition: all .4s ease;

  @media (min-width: 989px) {
    display: none;
  }

  .main-menu-mobile__bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${hover};
    padding: 0 15px;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    background-color: rgba(34, 34, 34, 0.30);
    z-index: 999;
    transition: all .4s ease;

    &__hamburger {
      ul {
        display: flex;
        height: 90px;
        align-items: center;

        li {
          &:nth-of-type(1) {
            margin-right: 15px;
          }

          svg {
            &:nth-of-type(2) {
              display: none;
            }
          }
        }
      }
    }


  }


  .main-menu-mobile__items {
    padding: 0 15px;
    position: relative;
    transform-origin: top left;
    transition: all .3s ease-out;
    //display: none;
    height: calc(100vh);
    //margin-top: 170px;
    //overflow-x: hidden;
    //overflow-y: auto;
    overflow-y: auto;
    padding-bottom: 10px;
    padding-top: 150px;
    overflow-x: hidden;
    background-color: #FFF;
    width: 200vw;
    transform: translateX(100%);
    display: none;

    ul {
      width: 100%;

      li {
        font-size: 30px;
        font-family: ${title};
        line-height: 40px;
        text-transform: capitalize;
        display: block;
        width: 100%;

        &:hover {
          color: ${hover};
        }

        &:not(:nth-last-of-type(1)) {
          margin-bottom: 30px;

        }

        a {

        }

        //sub menus
        ul {
          left: 0;
          list-style: none;
          margin: 0;
          position: absolute;
          top: 130px;
          padding: 0 15px;
          //height: 100vh;
          opacity: 0;
          transform: translate3d(100vw, 0, 0);
          transition: all .3s ease;
          //padding-bottom: 40px;
          width: 100vw;
          padding-bottom: 25px;

          p {
            margin-bottom: 20px;

            span {

              font-size: 12px;
              font-weight: 500;
              color: ${hover};
              padding-left: 15px;
            }

          }

          h3 {
            font-size: 30px;
            line-height: 40px;
            font-weight: 400;
            font-family: ${title};
            margin: 0;
            text-transform: capitalize;
            padding-bottom: 20px;
            border-bottom: 1px solid ${hover};
            margin-bottom: 40px;
          }

          li {
            &:not(:nth-last-of-type(1)) {
              margin-bottom: 30px;
            }
            &.active {
              a {
                color: ${hover};
                pointer-events: none;
              }
            }


            a {
              font-size: 18px;
              line-height: 24px;
              font-family: ${title};
              text-transform: capitalize;
              display: block;
              width: 100%;
            }

          }
        }

        &.active {
          ul {
            opacity: 1;
            z-index: 2;
          }
        }

      }
    }

    &.active {
      transform: translate3d(-100vw, 0, 0) !important;
    }
  }

  //toggle action
  &.menu-open {
    .main-menu-mobile__bar {
      background-color: #fff;

      &__logo {
        img {
          content: url(${LogoBlack});
        }
      }

      &__hamburger {
        li:nth-of-type(1) {
          svg {
            g {
              stroke: ${text};
            }

            path {
              fill: ${text};
            }
          }
        }

        #open-click {
          display: none;
        }

        #close-click {
          display: block;
        }
      }
    }
  }
`;
// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async () => {
//         let api_services = ApiServices.GET_MENU;
//         let param = {
//             [ApiParamKey.menu_id]: 1,
//         }
//         await store.dispatch(fetchData([api_services, param]))
//     });

export default MyComponent;
