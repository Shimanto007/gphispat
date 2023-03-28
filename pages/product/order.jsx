import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col, Form} from "react-bootstrap";
import Title from "../../components/Title";
import {body_ms14, body_ms16, hover, title_ms30} from "../../styles/globalStyleVars";
import Button from "../../components/Button";
import Select from "react-select";
import {clear, postForm} from "../api/redux/product/order";
import {useDispatch, useSelector} from "react-redux";
import {ApiServices} from "../api/network/ApiServices";
import CityList from "../../public/data/city_data.json";
import {emailValidation, emptyNumber, emptyValidation} from "../api/config/validator";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import {Loader} from "../../components/loader";
import select_icon from '../../public/images/static/select_icon.svg'

const MyComponent = () => {

    const formData = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()


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

    // drop down
    const DropDownName = [
        {value: 'Deformed Bar (GPH Quantum B500CWR)', label: 'Deformed Bar (GPH Quantum B500CWR)'},
        {value: 'Deformed Bar (GPH Quantum B500DWR)', label: 'Deformed Bar (GPH Quantum B500DWR )'},
    ];

    const city = CityList?.data?.map(item => (
        {value: item?.title, label: item?.title}
    ));

    // repeated form action
    const [form, setForm] = useState([
        {
            'product_name': '',
            'product_size': '',
            'product_quantity_ton': '',
        },
    ]);


    const handleFromIncrement = () => {
        setForm([...form, {
            'product_name': '',
            'product_size': '',
            'product_quantity_ton': '',
        }])
    };

    const handleFormDecrement = (e) => {
        const formList = [...form]
        formList.splice(form.length - 1, 1)
        setForm(formList)
    };

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const formList = [...form]
        formList[index][name] = value;
        setForm(formList)
    }

    // dropdown on change
    const [targetedName, setTargetedName] = useState('')
    const handleName = (e) => {
        setTargetedName(e)
    }
    const [targetedSize, setTargeteSize] = useState('')
    const handleSize = (e) => {
        setTargeteSize(e)
    }


    const [district, setDistrict] = useState('')
    const HandleDistrict = (e) => {
        setDistrict(e)
    }

    // get right form data
    const [reg, setReg] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        thana: "",
        message: "",
    });

    // validate inputs
    const [validName, setValidName] = useState(false)
    const [validPhone, setValidPhone] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validMsg, setValidMsg] = useState(false)

    const handleInput = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setReg({...reg, [name]: value})


        if (name === 'name') {
            emptyValidation(value) ? setValidName(true) : setValidName(false)
        }
        if (name === 'mobile') {
            emptyNumber(value) ? setValidPhone(true) : setValidPhone(false)
        }
        if (name === 'email') {
            emailValidation(value) ? setValidEmail(true) : setValidEmail(false)
        }

    }


    // form submit  api call
    const handleFormSubmit = (e) => {
        let api_services = ApiServices.POST_ORDER
        e.preventDefault()
        let formData = new FormData()
        formData.append('form_id', 'order-form')
        formData.append('business', reg.business)
        formData.append('name', reg.name)
        formData.append('email', reg.email)
        if (validPhone) {
            formData.append('mobile', reg.mobile)
        }
        formData.append('address', reg.address)
        formData.append('district', district)
        formData.append('thana', reg.thana)
        formData.append('message', reg.message)
        formData.append('product_info', JSON.stringify(form))
        if (reg.email !== '' && reg.name !== '' && reg.phone !== '') {
            dispatch(postForm([api_services, formData]))
            setTimeout(() => {
                setReg({
                    name: "",
                    email: "",
                    mobile: "",
                    address: "",
                    thana: "",
                    message: "",
                })

            }, 300)

        } else {
            error('Please fill out the inputs')
            if (reg.email === '') {
                setValidEmail(false)
            }
            if (reg.name === '') {
                setValidName(true)
            }
            if (reg.mobile === '') {
                setValidPhone(false)
            }

        }

    }


    // message
    useEffect(() => {
        if (formData?.error?.message !== '') {
            error(formData?.error?.message)
            setTimeout(() => {
                dispatch(clear())
            }, 500)
        }

        if (formData && formData?.success !== '') {
            success(formData?.success)
            setTimeout(() => {
                dispatch(clear())
            }, 500)

            setTimeout(() => {
                location.reload();
            }, 1500)
        }

    }, [formData])

    return (
        <>
            <StyledComponent>
                {formData?.loading && <Loader/>}
                <ToastContainer position="top-right" autoClose={4000} closeOnClick hideProgressBar={true}/>
                <section className="form_section">
                    <Container>
                        <Row>
                            <Col md={12} className="d-flex justify-content-between backbutton">
                                <div className="content">
                                    <Title margin="0 0 40px" text="Order now"/>
                                    <p>

                                    </p>
                                </div>
                                <Button src={'/'} text="back"/>
                            </Col>
                            <Form onSubmit={handleFormSubmit}>
                                <Row>
                                    <Col md={6} className="from_wrapper formContact incremental">
                                        <h3>01. Product information</h3>
                                        {form.map((form, index) => (
                                            <Row key={index} className={'m-0'}>

                                                <Col sm={12}>
                                                    <label>Product Name</label>
                                                    <select className={'custom_select'}
                                                            onChange={oc => handleChange(oc, index)}
                                                            name={'product_name'}
                                                            id="">
                                                        <option
                                                            value="Deformed Bar (GPH Quantum B500CWR  – 400w)">Deformed
                                                            Bar
                                                            (GPH Quantum B500CWR)
                                                        </option>
                                                        <option value="Deformed Bar (GPH Quantum B500DWR )">Deformed Bar
                                                            (GPH
                                                            Quantum B500DWR )
                                                        </option>
                                                    </select>
                                                </Col>

                                                <Col sm={12}>
                                                    <label>size</label>
                                                    <select className={'custom_select'}
                                                            onChange={oc => handleChange(oc, index)}
                                                            name={'product_size'}
                                                            id="">
                                                        <option value="8">8mm</option>
                                                        <option value="10">10mm</option>
                                                        <option value="12">12mm</option>
                                                        <option value="16">16mm</option>
                                                        <option value="20">20mm</option>
                                                        <option value="22">22mm</option>
                                                        <option value="25">25mm</option>
                                                        <option value="28">28mm</option>
                                                        <option value="32">32mm</option>
                                                        <option value="40">40mm</option>
                                                        <option value="50">50mm</option>
                                                    </select>
                                                </Col>


                                                <Form.Group className="col-md-12 pb-30">
                                                    <Form.Label>Quantity (Ton)</Form.Label>
                                                    <Form.Control name={'product_quantity_ton'} value={form.product_qty}
                                                                  onChange={oc => handleChange(oc, index)}
                                                                  className="form-control-lg" type="number"
                                                                  placeholder="Enter Pcs."/>
                                                </Form.Group>


                                            </Row>
                                        ))}

                                        <div className="d-flex padding justify-content-between">
                                            <p onClick={handleFromIncrement}>Add More Product</p>
                                            {form.length > 1 && <p onClick={handleFormDecrement}>Remove</p>}
                                        </div>

                                    </Col>
                                    <Col md={6} className="from_wrapper formContact">
                                        <h3>02. Contact Information</h3>

                                        <Row className={'m-0'}>
                                            <input type="hidden" name={'spam_protector'}/>
                                            <Form.Group className="col-md-6 pb-30">
                                                <Form.Label>Business Name</Form.Label>
                                                <Form.Control className="form-control-lg" onChange={handleInput}
                                                              onBlur={handleInput} value={reg.business} type="text"
                                                              name='business'
                                                              placeholder="Business Name"/>
                                            </Form.Group>
                                            <Form.Group className="col-md-6 pb-30">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control
                                                    className={validName ? 'has-error form-control-lg' : 'form-control-lg'}
                                                    onChange={handleInput}
                                                    onBlur={handleInput} value={reg.name} type="text" name='name'
                                                    placeholder="Full Name"/>
                                            </Form.Group>
                                            <Form.Group className="col-md-6 pb-30">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    className={!validEmail ? 'has-error form-control-lg' : 'form-control-lg'}
                                                    onChange={handleInput}
                                                    onBlur={handleInput} value={reg.email} type="email"
                                                    name='email'
                                                    placeholder="Enter your email address"/>
                                            </Form.Group>
                                            <Form.Group className="col-md-6 pb-30">
                                                <Form.Label>Mobile number</Form.Label>
                                                <Form.Control
                                                    className={!validPhone ? 'has-error form-control-lg' : 'form-control-lg'}
                                                    onChange={handleInput}
                                                    onBlur={handleInput} value={reg.mobile} type="number"
                                                    name='mobile'
                                                    placeholder="Enter your mobile number"/>
                                            </Form.Group>
                                            <Form.Group className="col-md-12 pb-30">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control className="form-control-lg" onChange={handleInput}
                                                              onBlur={handleInput} value={reg.address} type="text"
                                                              name='address'
                                                              placeholder="Full Name"/>
                                            </Form.Group>

                                            <Form.Group className="col-md-6 pb-30">
                                                <Form.Label>Police Station</Form.Label>
                                                <Form.Control className="form-control-lg" onChange={handleInput}
                                                              onBlur={handleInput} value={reg.thana} type="text"
                                                              name='thana'
                                                              placeholder="Enter your police station"/>
                                            </Form.Group>

                                            <Form.Group className="col-md-6 pb-30">
                                                <Form.Label>Select District</Form.Label>
                                                <Select onChange={oc => HandleDistrict(oc.value)}
                                                        placeholder={'Select Department'}
                                                        styles={{
                                                            dropdownIndicator: (provided, state) => ({
                                                                ...provided,
                                                                transform: state.selectProps.menuIsOpen && "rotate(180deg)"
                                                            })
                                                        }}
                                                        classNamePrefix={'react-select'}
                                                        className={'form-select'}
                                                        options={city}
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


                                            <Form.Group className="col-md-12 pb-30">
                                                <Form.Label>Cover Letter</Form.Label>
                                                <Form.Control className="form-control-lg" as="textarea" rows={3}
                                                              onChange={handleInput} value={reg.message} name='message'
                                                              aria-label="With textarea"
                                                              placeholder="Enter your message"/>
                                            </Form.Group>
                                            <Form.Group className="col-md-6 ">
                                                <div onClick={handleFormSubmit}>
                                                    <Button text={'Submit Order'} classname={'col-md-6'}/>
                                                </div>

                                            </Form.Group>


                                        </Row>
                                    </Col>
                                </Row>

                            </Form>
                        </Row>
                    </Container>
                </section>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`

  @media (min-width: 1550px) {
    //.widthHalf{
    //  flex: 0 0 50%;
    //  max-width: 50%;
    //}
  }

  .form_section {
    padding-top: 180px;
    padding-bottom: 150px;

    .title {
      ${title_ms30};
      font-weight: 500;
    }

    .backbutton {
      .dc-btn {
        a {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-color: #222222;
        }

        span {
          margin: 0;
        }

        svg {
          display: none;
        }
      }

      @media (max-width: 767px) {
        flex-direction: column-reverse;
        .dc-btn {
          margin-bottom: 40px;
        }
      }
    }

    .from_wrapper {
      margin-top: 60px;

      &.incremental {
        p {
          ${body_ms14};
          font-weight: 500;
          cursor: pointer;
          transition: color .4s ease;

          &:hover {
            color: ${hover};
          }
        }

        .row {
          //border-bottom: 1px solid #DDD;
          padding-bottom: 20px;

          &:after {
            content: '';
            position: absolute;
            left: 15px;
            right: 15px;
            bottom: 18px;
            height: 1px;
            background-color: #DDD;
          }

          &:nth-last-of-type(2) {
            padding-bottom: 0;

            &:after {
              display: none;
            }
          }
        }
      }

      .padding {
        padding: 0 15px;
      }

      .dc-link {
        a {
          background-image: none;

          &:hover {
            background-image: linear-gradient(currentColor, currentColor);
          }
        }
      }

      .dc-btn {
        width: 100%;
      }

      h3 {
        padding: 12px 30px;
        background: #F9F9F9;
        ${body_ms16};
        font-weight: 500;
        margin: 0 15px 50px;
      }
    }
  }

  .this-hide {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    z-index: -99;
  }

  .incremental {
    select {
      width: 100%;
      height: 50px;
      border-radius: 0;
      border-color: #DDD;
      padding: 10px;
      outline: none !important;
      margin-bottom: 30px;
    }
  }

  .custom_select {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
    background-image: url(${select_icon}) !important;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    background-position: calc(100% - 15px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), 100% 0;
    appearance: none;
    position: relative;
    z-index: 1;

  }

`;

export default MyComponent;
