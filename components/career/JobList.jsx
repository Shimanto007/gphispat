import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import Button from "../Button";
import Select, {components} from "react-select";
import {body_ms14, body_ms18, title} from "../../styles/globalStyleVars";
import indicator from '../../public/icons/indicator.svg'
import Link from "next/link";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import ReactHtmlParser from "react-html-parser";
import DcLink from "../Link";

gsap.registerPlugin(ScrollTrigger);

const JobList = ({data}) => {

    const [selectedYear, setSelectedYear] = useState('')
    const options = data?.years?.map(year => ({value: year.year, label: year.year}));
    const handleSelect = (value) => {
        setSelectedYear(value)
    }
    let filteredNewsList = selectedYear ? data?.list.filter(data => data.page_data.year.includes(selectedYear)) : data?.list;


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

    // const options = [
    //     {value: '2022', label: '2022'},
    //     {value: '2021', label: '2021'},
    //     {value: '2020', label: '2020'},
    //     {value: '2019', label: '2019'},
    // ];

    const customStyles = {
        dropdownIndicator: (base, state) => ({
            ...base,
            transition: "all .2s ease",
            transform: state.selectProps.menuIsOpen && "rotate(180deg)"
        }),
        control: (base, state) => ({
            ...base,
            backgroundColor: 'transparent',
            borderColor: "#222222",
            borderRadius: 0,
            paddingLeft: 30,
            paddingRight: 30,
            height: 60,
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                borderColor: "#222222",
                cursor: 'pointer'
            },
        }),
        option: (styles, state) => ({
            ...styles,
            backgroundColor: state.isSelected ? '#221F1F' : '#FFF',
            "&:hover": {
                backgroundColor: "transparent",
                color: '#222222',
                cursor: 'pointer'
            },
        }),
        indicatorContainer: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen && "rotate(180deg)"
        })
    };
    const CaretDownIcon = () => {
        return <img src={indicator} style={{width: 20, height: 10}}/>;
    };

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon/>
            </components.DropdownIndicator>
        );
    };
    return (
        <StyledJobList className='joblist pt-150 pb-150'>
            <Container>
                <Row className='joblist__select'>
                    <Col md={6} lg={4} xs={12} className=''>
                        <Select styles={customStyles}
                                onChange={op => handleSelect(op.value)}
                                options={options}
                                components={{DropdownIndicator}}
                                classNamePrefix={'react-select'}
                            // defaultValue={{label: '2022', value: '2022'}}
                        />
                    </Col>
                </Row>
                <Row>
                    {
                        filteredNewsList &&
                        filteredNewsList.map(element => (
                            <Col md={6} lg={4} xs={12} className='joblist__single fade-up'>
                                <div className='joblist__single__box'>
                                    <p>Deadline: {element?.page_data?.subtitle}</p>
                                    <h3>{element?.page_data?.title}</h3>
                                    {ReactHtmlParser(element?.page_data?.short_desc)}
                                    <DcLink link={`/career/job-details?job=${element?.page_data?.slug}`} text={'Read more'}/>
                                    {/*<Link href={`/career/job-details?job=${element?.page_data?.slug}`}>*/}
                                    {/*    <div className='joblist__single__box__btn'>*/}
                                    {/*        <svg id="Component_60_36" data-name="Component 60 – 36"*/}
                                    {/*             xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink"*/}
                                    {/*             width="40" height="40" viewBox="0 0 40 40">*/}
                                    {/*            <defs>*/}
                                    {/*                <linearGradient id="linear-gradient" x2="1" y2="1"*/}
                                    {/*                                gradientUnits="objectBoundingBox">*/}
                                    {/*                    <stop offset="0" stop-color="#ad0000"/>*/}
                                    {/*                    <stop offset="1" stop-color="red"/>*/}
                                    {/*                </linearGradient>*/}
                                    {/*            </defs>*/}
                                    {/*            <circle id="Ellipse_452" data-name="Ellipse 452" cx="20" cy="20" r="19"*/}
                                    {/*                    fill="url(#linear-gradient)"/>*/}
                                    {/*            <circle class="btn-hover" id="Ellipse_466" data-name="Ellipse 466"*/}
                                    {/*                    cx="0.5" cy="0.5" r="0.5" transform="translate(20 20)"*/}
                                    {/*                    fill="#222"/>*/}
                                    {/*            <g id="Group_15053" data-name="Group 15053"*/}
                                    {/*               transform="translate(13 13)">*/}
                                    {/*                <line id="Line_3815" data-name="Line 3815" y1="15"*/}
                                    {/*                      transform="translate(7.5)" fill="none" stroke="#fff"*/}
                                    {/*                      stroke-linecap="round" stroke-width="1"/>*/}
                                    {/*                <line id="Line_3816" data-name="Line 3816" y1="15"*/}
                                    {/*                      transform="translate(15 7.5) rotate(90)" fill="none"*/}
                                    {/*                      stroke="#fff" stroke-linecap="round" stroke-width="1"/>*/}
                                    {/*            </g>*/}
                                    {/*        </svg>*/}

                                    {/*    </div>*/}
                                    {/*</Link>*/}
                                </div>
                            </Col>
                        ))}
                </Row>
                {/*<Row className='joblist__load'>*/}
                {/*    <div className='joblist__load__btn'>*/}
                {/*        <Button text={'Load More'} background={'#E9E9E9'}> </Button>*/}
                {/*    </div>*/}
                {/*</Row>*/}
                {/*<Row className='joblist__load'>*/}
                {/*    <div className='joblist__load__btn'>*/}
                {/*       <Button text={'Load More'} background={'#E9E9E9'}> </Button>*/}
                {/*    </div>*/}
                {/*</Row>*/}
            </Container>

        </StyledJobList>
    );
};
const StyledJobList = styled.section`
  background-color: #E9E9E9;

  .joblist {
    &__single {
      margin-bottom: 30px;

      &__box {
        background-color: #FFFFFF;
        padding: 40px 30px 40px 30px;
        height: 100%;
        position: relative;

        p {
          font-size: 12px;
          font-weight: 500;
          color: #222222;
          margin-bottom: 10px;
        }

        h3 {
          ${body_ms18};
          font-weight: 500;
          font-family: ${title};
        }

        &__lower {
          margin-top: 30px;
          margin-bottom: 38px;
          min-height: 80px;
          padding-bottom: 38px;

          @media (max-width: 1165px) {
            min-height: 100% !important;
          }

          h2 {
            ${body_ms14};
            font-weight: 400;
            margin-bottom: 10px;
          }
        }

        &__btn {
          height: 40px;
          width: 40px;
          background: #E9E9E9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 40px;
          transition: all .3s ease;
          background-image: linear-gradient(#AD0000, #FF0000);

          svg {
            font-size: 20px;
            transition: all .4s ease;
            position: relative;
            z-index: 3;
            //color: #5D4E4D;
          }

          .btn-hover {
            transition: all .4s ease;
          }

          &:hover {
            border-color: transparent;
            cursor: pointer;

            .btn-hover {
              transition: all .4s ease;
              r: 20px;
            }

          }

        }
      }

      @media (max-width: 767px) {
        :last-child {
          margin-bottom: 0px;
        }
      }

    }

    &__load {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      &__btn {
        .dc-btn {
          svg {
            transform: rotate(90deg);
          }
        }
      }
    }

    &__select {
      margin-bottom: 30px;
      display: flex;
      justify-content: end;
      align-items: center;

      @media (max-width: 767px) {
        margin-bottom: 60px;
      }
    }

  }

  .react-select {

    &__menu-list {
      padding: 10px;
    }

    &__menu {
      //border-radius: 10px;
      //padding: 30px,
    }

    &__control {
      //padding: 18px 30px;
      border-image: initial;
      border-bottom-style: solid;
      background-color: transparent;
      border-color: #222222;

    }

    &__indicator {
      color: black;
    }

    &__option {
      background-color: white;
      color: black;
      font-size: 15px;

      &--is-focused {

      }
    }

  }

  .css-1okebmr-indicatorSeparator {
    background-color: transparent;
  }

  .css-yk16xz-control {
    border-radius: 0px;
  }

`
export default JobList;