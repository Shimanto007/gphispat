import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import moment from 'moment';
import {body_ms14, gradientColor, title_ms20} from "../../styles/globalStyleVars";
import Select, {components} from "react-select";
import indicator from "../../public/icons/indicator.svg";
import {Img} from "../Img";
import {LightgalleryItem} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

import {useState} from 'react';
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import MediaEvents from "../NewsEvents";
import Press from "../Press";
import {useRouter} from "next/router";
import {Loader} from "../loader";

gsap.registerPlugin(ScrollTrigger);


const PressRelease = ({
                          data,
                          totalData,
                          paginate,
                          paginatePrev,
                          paginateNext,
                          postPerPage,
                          selectedYear,
                          setSelectedYear,
                          loading
                      }) => {
    // const [selectedYear, setSelectedYear] = useState('')
    const options = data?.years?.map(year => ({value: year.year, label: year.year}));

    const handleSelect = (value) => {
        setSelectedYear(value)
    }
    let filteredNewsList = selectedYear ? data?.list?.filter(data => data.page_data.year.includes(selectedYear)) : data?.list;

    ScrollTrigger.refresh()
    // animation
    const router = useRouter();
    const query = router?.query?.page ? router?.query?.page : 1;


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalData / postPerPage); i++) {
        pageNumbers.push(i);
    }


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

        document.querySelector('body').classList.add('news_events')

    }, [])

    const [selectedOption, setSelectedOption] = useState(null);
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
        <StyledPressList className='presslist pt-150 pb-150'>
            <Container>
                <Row className='presslist__select '>
                    <Col md={6} lg={4} xs={12}>
                        <Select styles={customStyles}
                            // defaultValue={selectedOption}
                                onChange={op => handleSelect(op.value)}
                                options={options}
                            // classNamePrefix={'react-select'}
                                components={{DropdownIndicator}}
                                classNamePrefix="find-retainer-filter"
                        />
                    </Col>
                </Row>

                <>
                    {
                        filteredNewsList?.length > 0 ?
                            <>
                                {loading && <Loader/>}
                                <Row>
                                    {
                                        filteredNewsList &&
                                        filteredNewsList.map((singleNews, key) => {
                                            const thumbImage = singleNews?.images?.list?.find(f => f?.is_thumb === 'on');
                                            const actualImage = singleNews?.images?.list?.find(f => f?.is_banner === 'on');
                                            return (
                                                <Col md={6} lg={4} xs={12} key={key}
                                                     className='presslist__single fade-up'
                                                     src={thumbImage?.full_path}>
                                                    {/*<MediaEvents key={key} data={singleNews.page_data} src={thumbImage?.full_path}/>*/}
                                                    <Press key={key} data={singleNews.page_data}
                                                           src={thumbImage?.full_path}></Press>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </>
                            :
                            <div className='d-flex justify-content-center'>
                                <div className='pt-5 pb-5'>
                                    <h5>No Data found</h5>
                                </div>

                            </div>
                    }

                </>
                <Row>
                    {
                        query < pageNumbers.length ?
                            <Col lg={12}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {
                                            router?.query?.page >= 2 ?
                                                <li className="page-item"
                                                    onClick={() => paginatePrev(router?.query?.page)}>
                                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">
                                           <svg xmlns="http://www.w3.org/2000/svg" width="9.811" height="18.121"
                                                viewBox="0 0 9.811 18.121">
                                             <path id="Path_253" data-name="Path 253" d="M-1260.242,634.779l8,8,8-8"
                                                   transform="translate(643.529 1261.303) rotate(90)" fill="none"
                                                   stroke="#ddd" stroke-linecap="round" stroke-linejoin="round"
                                                   stroke-width="1.5"/>
                                           </svg>
                                        </span>
                                                    </a>
                                                </li> :
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">
                                           <svg xmlns="http://www.w3.org/2000/svg" width="9.811" height="18.121"
                                                viewBox="0 0 9.811 18.121">
                                             <path id="Path_253" data-name="Path 253" d="M-1260.242,634.779l8,8,8-8"
                                                   transform="translate(643.529 1261.303) rotate(90)" fill="none"
                                                   stroke="#ddd" stroke-linecap="round" stroke-linejoin="round"
                                                   stroke-width="1.5"/>
                                           </svg>
                                        </span>
                                                    </a>
                                                </li>

                                        }
                                        {
                                            pageNumbers.map(number => (
                                                <li key={number} onClick={() => paginate(number)} className="page-item">
                                                    <a className="page-link" href="#">{number}</a></li>
                                            ))
                                        }
                                        {
                                            router?.query?.page < pageNumbers.length ?
                                                <li className="page-item"
                                                    onClick={() => paginateNext(router?.query?.page)}>
                                                    <a className="page-link" href="#" aria-label="Next">
                                           <span aria-hidden="true">
                                               <svg xmlns="http://www.w3.org/2000/svg" width="9.811" height="18.121"
                                                    viewBox="0 0 9.811 18.121">
                                                   <path id="Path_254" data-name="Path 254"
                                                         d="M-1260.242,634.779l8,8,8-8"
                                                         transform="translate(-633.718 -1243.182) rotate(-90)"
                                                         fill="none" stroke="#ddd" stroke-linecap="round"
                                                         stroke-linejoin="round" stroke-width="1.5"/>
                                               </svg>
                                            </span>
                                                    </a>
                                                </li> :
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next">
                                           <span aria-hidden="true">
                                               <svg xmlns="http://www.w3.org/2000/svg" width="9.811" height="18.121"
                                                    viewBox="0 0 9.811 18.121">
                                                   <path id="Path_254" data-name="Path 254"
                                                         d="M-1260.242,634.779l8,8,8-8"
                                                         transform="translate(-633.718 -1243.182) rotate(-90)"
                                                         fill="none" stroke="#ddd" stroke-linecap="round"
                                                         stroke-linejoin="round" stroke-width="1.5"/>
                                               </svg>
                                            </span>
                                                    </a>
                                                </li>
                                        }
                                    </ul>
                                </nav>
                            </Col> : ''
                    }
                </Row>
            </Container>

        </StyledPressList>
    );
};
const StyledPressList = styled.section`
  background-color: #f9f9f9;


  .pagination {
    margin-top: 30px;

    li {
      a.active {
        background-color: #EE1B24 !important;
        color: white !important;
      }

      &.page-item:first-child {
        .page-link {
          border: 0px solid transparent !important;

          :hover {
            background-color: transparent;
          }
        }
      }

      &.page-item:last-child {
        .page-link {
          border: 0px solid transparent !important;

          :hover {
            background-color: transparent;
          }
        }
      }
    }

    .page-item {
      margin: 10px;

      &:hover {
        svg {
          path {
            stroke: #EE1B24;
          }
        }
      }

      .page-link {
        position: relative;
        display: block;
        padding: 0.5rem 0.75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #EE1B24;
        background-color: transparent;
        border: 1px solid #dee2e6;
        border-radius: 3px;

        &:hover {
          color: white !important;
          background-color: #EE1B24;
        }

        :focus {
          outline: none;
          box-shadow: none;
        }
      }
    }
  }

  .presslist {
    &__select {
      margin-bottom: 40px;
      @media (max-width: 767px) {
        margin-bottom: 60px;
      }
    }

    &__single {
      margin-bottom: 30px;

      &__box {
        position: relative;
        cursor: pointer;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          height: 2px;
          background: ${gradientColor};
          left: 0;
          width: 0;
          transition: width .4s ease-out;
        }

        &:hover:after {
          width: 100%;
        }

        &__img {
          position: relative;
          padding-top: calc(370 / 370 * 100%);
          overflow: hidden;

        }

        &__content {
          padding: 35px 30px 35px 30px;
          background-color: #FFFFFF;

          h2 {
            ${title_ms20};
            margin-bottom: 10px;
          }

          h3 {
            ${body_ms14};
            color: #707070;
          }
        }

        @media (max-width: 767px) {
          :last-child {
            margin-bottom: 0px;
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
      padding: 18px 30px;
      border-image: initial;
      border-bottom-style: solid;
      background-color: transparent;
      border-color: #222222;

      &--is-focused {
        border-color: red;
      }

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

      }
    }

  }

  .css-1okebmr-indicatorSeparator {
    background-color: transparent;
  }

  .css-yk16xz-control {
    border-radius: 0px;

    &:focus {
      border-color: #222222;
      box-shadow: none;

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
      padding: 0px 22px;
      border-image: initial;
      border-bottom-style: solid;
      background-color: transparent;
      border-color: #222222;
      border-radius: 0;
      height: 60px;

      &:focus {
        outline: none;
        box-shadow: unset !important;
        border: none;
      }
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
        //outline: none;
        //box-shadow: unset !important;
        //border: none;
        //background-color: black;
      }
    }

  }

  .css-1okebmr-indicatorSeparator {
    background-color: transparent;
  }

  .css-yk16xz-control {
    border-radius: 0px;
  }

  .lg-backdrop {
    display: none !important;
  }
`
export default PressRelease;
