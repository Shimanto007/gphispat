import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import InvestorsMatters from "./InvestorsMatters";
import BrochureList from "../media-events/BrochureList";
import InnerBanner from "../InnerBanner";
import BannerImage from "../../public/images/dynamic/investor/investorBanner.jpg";
import Title from "../Title";
import indicator from "../../public/icons/indicator.svg";
import Select, {components} from "react-select";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import ListWithGrid from "../ListWithGrid";
import CityList from "../../public/data/city_data.json";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = ({data}) => {
    const [filterState, setFilterState] = useState('')

    const otherSec = data?.data?.sections;

    // filter data
    const Years = otherSec?.map(item => (
        {value: item?.page_data?.subtitle, label: item?.page_data?.subtitle}
    ));

    const handleFilter = (e) => {
        setFilterState(e)
    }
    const filter = filterState !== '' ? otherSec?.filter(f => f?.page_data?.subtitle === filterState) : otherSec;
    
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
// animation
    ScrollTrigger.refresh()
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
        <StyledComponent>
            <InnerBanner title={data?.data?.page_data?.short_desc}
                         des={data?.data?.page_data?.description}
                         subtitle={data?.data?.page_data?.subtitle} img={data?.data?.images?.list[0]?.full_path}/>


            <div className="section_first pt-150 pb-120">

                {Years?.length > 1 &&
                    <Container>
                        <Row>
                            <Col md={4} className={'filter '}>
                                <Select styles={customStyles} onChange={oc => handleFilter(oc.value)}
                                    // defaultValue={selectedOption}
                                        options={Years}
                                        components={{DropdownIndicator}}
                                        classNamePrefix={'react-select'}
                                        defaultValue={{label: 'Select Year', value: 'Select Year'}}
                                />
                            </Col>
                        </Row>
                    </Container>

                }

                {
                    // otherSec && otherSec?.length > 0 &&
                    filter?.map((element) => {
                        return (
                            <div className="item fade-up" key={element?.data?.id}>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Title margin="0 0 40px" text={element?.page_data?.subtitle}/>
                                        </Col>
                                    </Row>
                                </Container>
                                <BrochureList data={element}/>
                            </div>
                        );
                    })
                }
            </div>


        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #F9F9F9;

    .filter {
      margin-bottom: 80px;
      @media (max-width: 767px) {
        margin-bottom: 40px;
      }
    }

    .item {

      margin-bottom: 80px;

      &:last-child {
        margin-bottom: 0;
      }

      .brochurelist {
        padding: 0;
      }
    }

  }
`;

export default MyComponent;
