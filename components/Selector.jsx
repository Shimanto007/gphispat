import React from 'react';
import indicator from "../public/icons/indicator.svg";
import Select, {components} from "react-select";
import styled from "styled-components";


const Selector = ({Options}) => {
    const ColourOption = [
        {value: 'news1', label: 'news1', color: '#00B8D9', isFixed: true},
        {value: 'news2', label: 'news2', color: '#0052CC', isFixed: true},

    ];
    const CaretDownIcon = () => {
        return <img src={indicator}/>;
    };

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon/>
            </components.DropdownIndicator>
        );
    };
    return (
        <StyledSelector>
            <Select
                components={{DropdownIndicator}}
                styles={{
                    dropdownIndicator: (provided, state) => ({
                        ...provided,
                        transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                    })
                }}
                classNamePrefix={'react-select'}
                options={ColourOption}

            />
            
        </StyledSelector>
    );
};
const StyledSelector=styled.div`
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
export default Selector;