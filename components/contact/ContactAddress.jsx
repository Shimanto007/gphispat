import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col, Form} from "react-bootstrap";
import AddressBox from "./AddressBox";
import {body_ms14, title_ms12, title_ms20, title_ms60, text, gradientColor} from "../../styles/globalStyleVars";
import Title from "../Title";
import Button from "../Button";
import Select, {components} from "react-select";
import indicator from "../../public/icons/indicator.svg";
import {emailValidation, emptyNumber, emptyValidation} from "../../pages/api/config/validator";
import {ApiServices} from "../../pages/api/network/ApiServices";
import {postForm, clear} from "../../pages/api/redux/contact";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {Img} from "../Img";
import ReactHtmlParser from "react-html-parser";

const DropdownOption = [
    {value: 'HEAD OFFICE', label: 'HEAD OFFICE'},
    {value: 'SHARE DEPARTMENT', label: 'SHARE DEPARTMENT'},
    {value: 'FACTORY', label: 'FACTORY'},
    {value: 'DHAKA OFFICE', label: 'DHAKA OFFICE'},
    {value: 'SALES DEPARTMENT', label: 'SALES DEPARTMENT'},
    {value: 'UK & EUROPE CORRESPONDENCE', label: 'UK & EUROPE CORRESPONDENCE'},
    {value: 'WEB SITE', label: 'WEB SITE'}
];

const ContactAddress = ({contactTopInfo, contactBottomInfo}) => {

    const dispatch = useDispatch()

    const formData = useSelector(state => state.contactReducer)

    //--- form submit
    const success = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 4000,
        closeOnClick: true,
        progress: undefined,

    });

    const error = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
        closeOnClick: true,
        progress: undefined,

    });

    // form submit
    const [reg, setReg] = useState({
        name: "",
        department: "",
        phone: "",
        email: "",
        msg: "",
    });


    // validate inputs
    const [validName, setValidName] = useState(false)
    const [validPhone, setValidPhone] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validMsg, setValidMsg] = useState(false)


    let name, value;
    const handleInput = (e) => {
        name = e.target.name;

        value = e.target.value;


        setReg({...reg, [name]: value})
        if (name === 'name') {
            emptyValidation(value) ? setValidName(true) : setValidName(false)

        }
        if (name === 'phone') {
            emptyNumber(value) ? setValidPhone(true) : setValidPhone(false)

        }
        if (name === 'email') {
            emailValidation(value) ? setValidEmail(true) : setValidEmail(false)

        }
        if (name === 'msg') {
            emptyValidation(value) ? setValidMsg(true) : setValidMsg(false)
        }
    }

    const handleDepartment = (e) => {
        setReg({...reg, department: e})
    }


    const handleSubmit = (e) => {

        let api_services = ApiServices.POST_FORM
        e.preventDefault();
        let formData = new FormData()
        formData.append('form_id', 'contact-form')
        formData.append('spam_protector', '')
        formData.append('email', reg.email)
        formData.append('name', reg.name)
        formData.append('department', reg.department)
        if (validPhone) {
            formData.append('phone', reg.phone)
        }
        formData.append('message', reg.msg)
        if (reg.email !== '' && reg.name !== '' && reg.phone !== '' && reg.msg !== '') {
            dispatch(postForm([api_services, formData]))
            setTimeout(() => {
                setReg({
                    name: "",
                    phone: "",
                    email: "",
                    msg: "",
                })
                let getSelectedData = document.querySelectorAll('.react-select__single-value');
                if (getSelectedData && getSelectedData[0]) {
                    getSelectedData[0].textContent = 'Select Department'
                }

            }, 300)

        } else {
            error('Please fill out the inputs')
            if (reg.email === '') {
                setValidEmail(false)
            }
            if (reg.name === '') {
                setValidName(true)
            }
            if (reg.phone === '') {
                setValidPhone(false)
            }
            if (reg.email === '') {
                setValidEmail(false)
            }
            if (reg.msg === '') {
                setValidMsg(true)
            }

        }
    }


    useEffect(() => {
        if (formData?.error?.message !== '') {
            error(formData?.error?.message)
            setTimeout(() => {
                // dispatch(clear())
            }, 500)
        }

        if (formData && formData?.success !== '') {
            success(formData?.success)
            setTimeout(() => {
                // dispatch(clear())
            }, 500)
        }

    }, [formData])


    const CaretDownIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16.828" height="9.414" viewBox="0 0 16.828 9.414">
                <path id="Path_7847" data-name="Path 7847" d="M338,803l7,7,7-7" transform="translate(-336.585 -801.586)"
                      fill="none" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        );
    };

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon/>
            </components.DropdownIndicator>
        );
    };
    return (
        <StyledComponent
            className={'pt-150 pb-150'}
            bgColor={'#E9E9E9'}
        >
            <Container>
                <Row className={'contactAddress__row'}>
                    <Col md={8} className={'contactAddress__col left'}>
                        <div className="mapIframe">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14602.662775180877!2d90.4144973!3d23.7949161!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd7e504c53cbddb37!2sGPH%20ispat%20Limited%20(Dhaka%20Office)!5e0!3m2!1sen!2sbd!4v1665475655378!5m2!1sen!2sbd"
                                allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"/>
                        </div>
                        <div className="formContact pb-80 ">
                            <Title varient={title_ms60} text={'Get in touch'} margin={"0 0 60px 0"}/>
                            <Form className="form_main" onSubmit={handleSubmit}>
                                <Row>
                                    <Form.Group className="col-md-6 pb-30">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            className={validName ? 'has-error form-control-lg' : 'form-control-lg'}
                                            onChange={handleInput}
                                            onBlur={handleInput} value={reg.name} type="text" name='name'
                                            placeholder="Enter your full name"/>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 pb-30">
                                        <Form.Label>Department</Form.Label>
                                        <Select
                                            components={{DropdownIndicator}}
                                            placeholder={'Select Department'}
                                            onChange={(e) => handleDepartment(e.value)}
                                            styles={{
                                                dropdownIndicator: (provided, state) => ({
                                                    ...provided,
                                                    transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                                                })
                                            }}
                                            classNamePrefix={'react-select'}
                                            className={'form-select'}
                                            options={DropdownOption}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#e9e9e9',
                                                    primary: 'black',
                                                },
                                            })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-md-6 pb-30">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            className={!validEmail ? 'has-error form-control-lg' : 'form-control-lg'}
                                            type="email"
                                            onChange={handleInput} name='email' onBlur={handleInput}
                                            value={reg.email}
                                            placeholder="Enter your mail address"/>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 pb-30">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control
                                            className={!validPhone ? 'has-error form-control-lg' : 'form-control-lg'}
                                            onChange={handleInput} onBlur={handleInput}
                                            value={reg.phone} name='phone' type="number"
                                            placeholder="Enter your phone number"/>
                                    </Form.Group>
                                    <Form.Group className="col-md-12 pb-30">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            className={validMsg ? 'has-error form-control-lg' : 'form-control-lg'}
                                            as="textarea"
                                            onChange={handleInput}
                                            onBlur={handleInput} value={reg.msg}
                                            name='msg' rows={3}
                                            aria-label="With textarea" placeholder="Enter your message"/>
                                    </Form.Group>
                                    <div className="col-xl-12 widthHalf" onClick={handleSubmit}>
                                        <Button text={'Submit'} classname={'col-md-6'}/>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col md={4} className={'contactAddress__col right'}>
                        {
                            contactTopInfo?.posts?.list && contactTopInfo?.posts?.list.length > 0 &&
                            contactTopInfo?.posts?.list?.map((element) => {
                                return (

                                    <AddressBox title={element?.data?.subtitle}
                                                data={ReactHtmlParser(element?.data?.description)}
                                                phone={element?.data?.short_desc}/>

                                );
                            })
                        }
                    </Col>
                    <Col className={'otherAddress'} md={12}>
                        <Row>
                            {
                                contactBottomInfo?.posts?.list && contactBottomInfo?.posts?.list.length > 0 &&
                                contactBottomInfo?.posts?.list?.map((element) => {
                                    return (
                                        <Col md={4}>
                                            <AddressBox title={element?.data?.subtitle}
                                                        data={ReactHtmlParser(element?.data?.description)}
                                                        phone={element?.data?.short_desc}/>
                                        </Col>
                                    );
                                })
                            }
                            {/*<Col md={4}>*/}
                            {/*    <AddressBox title={'UK & EUROPE CORRESPONDENCE'} data={OtherUK}*/}
                            {/*                phone={'004407961881234'}/>*/}
                            {/*</Col>*/}
                            {/*<Col md={4}>*/}
                            {/*    <AddressBox title={'Share department'} data={ShareDepartment} phone={'8801730085550'}/>*/}
                            {/*</Col>*/}
                            {/*<Col md={4}>*/}
                            {/*    <AddressBox title={'SALES DEPARTMENT'} data={SalesDepartment} phone={'+8801730087711'}/>*/}
                            {/*</Col>*/}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background-color: ${props => props.bgColor || '#E9E9E9'};

  .mapIframe {
    padding-top: calc(600 / 770 * 100%);
    position: relative;
    margin-bottom: 80px;
    border: 1px solid #EE1B24;
    @media (min-width: 1550px) {
      padding-top: 50%;
    }

    iframe {
      border: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .formContact {
    label {
      ${title_ms12};
      font-weight: 300;
    }

    input {
      &:not(.react-select__input input) {
        line-height: 20px;
        border-radius: 0;
        height: 48px;
        border-color: #DDDDDD;
      }

      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${text};
      }
    }

    textarea {
      border-radius: 0;
      border-color: #DDDDDD;

      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${text};
      }
    }

    .form-select {
      .react-select__control {
        height: 48px;
        border-color: #DDDDDD;
        box-shadow: none;
      }

      .react-select__placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${text};
      }
    }

    .dc-btn {
      a {
        justify-content: center;

        span {
          margin-right: 15px;
        }

        svg {
          margin-left: 15px;
        }
      }
    }
  }

  .otherAddress {
    .addressBox {
      height: 100%;
      position: relative;
      padding-bottom: 85px;
      margin-bottom: 0;
    }

    .ctaButton {
      position: absolute;
      //width: 100%;
      left: 0;
      right: 0;
      bottom: 0;

      &:before {
        left: 0;
        right: 0;
      }

      a {
        &:before {
          left: 0;
          right: 0;
        }

        &:hover {
          &:before {
            width: 100%;
          }
        }
      }
    }
  }

  .form_main {
    .title {
      margin: 0 0 20px;
    }
  }


  ul {
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      p {
        ${body_ms14};
        font-weight: 400;
        color: #222222;
        margin: 0;
        word-break: break-word;
        white-space: normal;

        a {
          display: inline-block;
        }
      }

      p:first-child {
        min-width: 80px;
      }
    }
  }

  table th {
    min-width: 80px;
  }

  @media (max-width: 1200px) {
    .contactAddress {
      &__row {
        //flex-direction: column;
      }

      &__col {
        //min-width: 100%;
        &.left {
        }

        &.right {
          //display: flex;
          .addressBox {
            //margin-left: 15px;
            //margin-right: 15px;
          }
        }
      }
    }
  }
  .widthHalf{
    flex: 0 0 50%;
    max-width: 50%;
    .dc-btn{
      width: 100%;
    }
  }
  @media(min-width: 1550px){
    .widthHalf{
      flex: 0 0 50%;
      max-width: 50%;
      
    }
  }
`;

export default ContactAddress;