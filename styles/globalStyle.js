import {createGlobalStyle, css} from 'styled-components';
import {body_ms16, body_ms18, gradient, hover, text, title_ms12, title_ms24} from './globalStyleVars';
import LogoBlack from '../public/images/static/logo_black.svg';

function createCSS() {
    let styles = '';

    for (let i = 2; i < 20; i += 1) {
        styles += `
        .anim-active.fade-up:nth-child(${i}) {
          transition-delay: ${i * .12}s;
        }
     `
    }

    for (let a = 2; a < 100; a += 1) {
        styles += `
        .anim-active.fade-right span:nth-child(${a}) {
          transition-delay: ${a * .03}s;
        }
     `
    }

    return css`${styles}`;
}

export default createGlobalStyle`


  ${createCSS()}
  #root {
    overflow: hidden !important;
  }

  img {
    pointer-events: none;
  }


  //@font-face {
  //  font-family: 'EMprint';
  //  src: url('/fonts/EMprint-Bold.woff2'),
  //  url('/fonts/EMprint-Bold.woff');
  //  font-weight: bold;
  //  font-style: normal;
  //  font-display: swap;
  //}

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Black.woff2') format('woff2'),
    url('/fonts/Graphik-Black.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Bold.woff2') format('woff2'),
    url('/fonts/Graphik-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Extralight.woff2') format('woff2'),
    url('/fonts/Graphik-Extralight.woff') format('woff');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Medium.woff2') format('woff2'),
    url('/fonts/Graphik-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Light.woff2') format('woff2'),
    url('/fonts/Graphik-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Semibold.woff2') format('woff2'),
    url('/fonts/Graphik-Semibold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik Super';
    src: url('/fonts/Graphik-Super.woff2') format('woff2'),
    url('/fonts/Graphik-Super.woff') format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Regular.woff2') format('woff2'),
    url('/fonts/Graphik-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Graphik';
    src: url('/fonts/Graphik-Thin.woff2') format('woff2'),
    url('/fonts/Graphik-Thin.woff') format('woff');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  html {
    scroll-behavior: unset !important;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    font-weight: 400;

    &.stop-scroll {
      overflow: hidden;
      height: 100vh;
    }
  }

  a {
    transition: color .3s ease;
    cursor: pointer;

    &:hover {
      color: ${hover} !important;
    }
  }

  ::selection {
    background: ${hover};
    color: #FFF;
  }

  p, a, h1, h2, h4, h3, h5 {
    color: ${text};
    font-weight: 400;
    margin: 0;
  }

  p {
    ${body_ms16}
  }

  ul {
    margin: 0;
    padding: 0
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  a:hover, a:focus {
    text-decoration: none;
    outline: none;
    box-shadow: none;
    color: ${hover};
  }

  .btn:focus, button:focus, button:active:focus, .btn.active.focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn:active:focus, .btn:focus {
    outline: none;
    box-shadow: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid rgba(0, 0, 0, 0);
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  .MuiInput-underline:after {
    border-bottom: 1px solid rgba(97, 218, 251, 0);
  }

  table {
    width: 100%;
  }

  form div {
    position: relative;
  }

  .form-control {
    box-shadow: none;
    outline: 0;

    &:focus {
      box-shadow: none;
    }
  }

  .p-0 {
    padding: 0 !important;
  }

  .pt-10 {
    padding-top: 10px;
  }

  .pb-10 {
    padding-bottom: 10px;
  }

  .pt-20 {
    padding-top: 20px;
  }

  .pb-20 {
    padding-bottom: 20px;
  }

  .pt-30 {
    padding-top: 30px;
  }

  .pb-30 {
    padding-bottom: 30px;
  }

  .pt-40 {
    padding-top: 40px;
  }

  .pb-40 {
    padding-bottom: 40px;
  }

  .pt-45 {
    padding-top: 45px;
  }

  .pb-45 {
    padding-bottom: 45px;
  }

  .pt-50 {
    padding-top: 50px;
  }

  .pb-50 {
    padding-bottom: 50px;
  }

  .pt-60 {
    padding-top: 60px;
  }

  .pb-60 {
    padding-bottom: 60px;
    @media (max-width: 767px) {
      padding-bottom: 40px;
    }
  }

  .pt-70 {
    padding-top: 70px;
  }

  .pb-70 {
    padding-bottom: 70px;
  }

  .pt-80 {
    padding-top: 80px;
  }

  .pb-80 {
    padding-bottom: 80px;
  }

  .pt-90 {
    padding-top: 90px;
  }

  .pb-90 {
    padding-bottom: 90px;
  }

  .pt-100 {
    padding-top: 100px;
  }

  .pb-100 {
    padding-bottom: 100px;
  }

  .pt-120 {
    padding-top: 120px;
  }

  .pb-120 {
    padding-bottom: 120px;
  }

  .pt-130 {
    padding-top: 130px;
  }

  .pb-130 {
    padding-bottom: 130px;
  }

  .pt-140 {
    padding-top: 140px;
  }

  .pb-140 {
    padding-bottom: 140px;
  }

  .pt-150 {
    padding-top: 150px;
    @media (max-width: 767px) {
      padding-top: 80px;
    }
  }

  .pb-150 {
    padding-bottom: 150px;
    @media (max-width: 767px) {
      padding-top: 80px;
    }
  }

  .pt-160 {
    padding-top: 160px;
    @media (max-width: 767px) {
      padding-top: 80px;
    }
  }

  .pb-160 {
    padding-bottom: 160px;
    @media (max-width: 767px) {
      padding-bottom: 80px;
    }
  }

  .pt-180 {
    padding-top: 180px;
    @media (max-width: 767px) {
      padding-top: 80px;
    }
  }

  .pb-180 {
    padding-bottom: 180px;
    @media (max-width: 767px) {
      padding-bottom: 80px;
    }
  }

  .pb-130 {
    padding-bottom: 130px;
    @media (max-width: 767px) {
      padding-bottom: 60px;
    }
  }

  .pt-100 {
    padding-top: 100px;
    @media (max-width: 767px) {
      padding-top: 80px;
    }
  }

  .pb-100 {
    padding-bottom: 100px;
    @media (max-width: 767px) {
      padding-bottom: 80px;
    }
  }

  .pt-85 {
    padding-top: 85px;
    @media (max-width: 767px) {
      padding-top: 45px;
    }
  }

  .pb-85 {
    padding-bottom: 85px;
    @media (max-width: 767px) {
      padding-bottom: 45px;
    }
  }

  .pt-65 {
    padding-top: 65px;
    @media (max-width: 767px) {
      padding-bottom: 45px;
    }
  }

  .pb-65 {
    padding-bottom: 65px;
    @media (max-width: 767px) {
      padding-bottom: 45px;
    }
  }

  .pl-30 {
    padding-left: 30px;
    @media (max-width: 768px) {
      padding-left: 20px;
    }
  }

  .pr-30 {
    padding-right: 30px;
    @media (max-width: 768px) {
      padding-right: 20px;
    }
  }

  .pr-10 {
    padding-right: 10px;
  }

  .pl-98 {
    padding-left: 98px;
    @media (max-width: 1200px) {
      padding-left: 30px;
    }
  }

  .pr-98 {
    padding-right: 98px;
    @media (max-width: 1200px) {
      padding-right: 30px;
    }
  }

  .MuiDrawer-paper {
    width: 500px !important;
    padding: 20px;
    @media (max-width: 767px) {
      width: 100% !important;
    }
  }

  .swiper-button-disabled {
    opacity: 0 !important;
  }

  .gmnoprint, .gm-control-active {
    opacity: 0;
  }

  .swiper-button-next:after {
    display: none;
  }

  .swiper-button-prev:after {
    display: none;
  }

  @media (min-width: 1550px) {
    .container {
      //min-width: 1366px;
      min-width: 85%;
      margin: auto;
    }
  }

  @media (max-width: 1199px) and (min-width: 768px) {
    .container, .container-lg, .container-md, .container-sm {
      max-width: 90%;
      margin: auto;
    }
  }


  @media (max-width: 768px) {
    .container, .container-md, .container-sm {
      max-width: 90%;
      overflow: hidden;
    }
  }

  @media (max-width: 767px) {

    .container, .container-sm {
      max-width: 100%;
    }

    .pt-120, .pt-150 {
      padding-top: 80px;
    }

    .pb-120, .pb-150 {
      padding-bottom: 80px;
    }

  }


  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input:focus {
    outline: none;
    box-shadow: none;
  }

  #root {
    min-height: 100vh;
    overflow-x: hidden;
  }

  .MuiDialog-paperWidthSm {
    width: calc(100% - 98px) !important;
    max-width: calc(100% - 98px) !important;
  }

  @media (max-width: 959px) {
    .MuiDialog-paper {
      margin: 0px !important;
    }

    .MuiDialog-paperScrollPaper {
      position: fixed;
      bottom: 0px;
    }

    .MuiDialog-paperWidthSm {
      width: 100% !important;
      position: fixed !important;
      bottom: 0px;
      max-width: 100% !important;
    }
  }

  .modal-header {
    padding: 0 0 27px;
    margin-bottom: 40px;
  }

  .modal-dialog {
    width: 80%;
    max-width: unset;
  }

  .modal-content {
    border-radius: 0;
    padding: 50px 70px;

    p {
      span {
        color: #FB030C;
      }
    }

    .close {
      height: 50px;
      width: 50px;

      background-size: 25px;
      background-position: center;
      padding: 0;
      background-repeat: no-repeat;
      position: absolute;
      right: -34px;

      opacity: 1;
      top: 16px;
      transition: all .3s ease;

      span {
        display: none;
      }

    }
  }

  .modal-body {
    padding: 0;

    tbody {
      tr {
        &:nth-of-type(1) td {
          border-top: 0;
        }

        td {
          padding: 20px;
          font-size: 14px;
          font-weight: 300;
          border-color: #DFE6E5;

          &:nth-of-type(1) {
            padding-left: 0;
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.51);
          }

          p {
            font-size: 14px;
            font-weight: 300;
            margin-bottom: 10px;
          }
        }

        &:nth-last-of-type(1) {
          td p:last-child {
            margin-bottom: 0;
          }

          border-bottom: 1px solid #DFE6E5;
        }
      }
    }
  }


  @media (max-width: 991px) {
    .product-section__single-product {
      max-width: 33.33%;
      flex: 0 0 33.33%;
    }
  }

  @media (max-width: 767px) {
    .product-inside {
      padding-left: 7.5px;
      padding-right: 7.5px;
    }

    .product-section__single-product {
      max-width: 50%;
      flex: 0 0 50%;
      padding: 0 7.5px;

      &__inner {
        padding-bottom: 49px;
        margin-bottom: 20px;
      }

      p {
        font-size: 12px;
        line-height: 18px;
      }

      h1 {
        font-size: 18px;
        line-height: 24px;
        height: 50px;
      }

      h4 {
        font-size: 18px;
        line-height: 24px;
      }

      .add-to-cart {
        a {
          position: absolute;
          width: 100%;
          left: 0px;
          right: 0;
          bottom: 0;
          border-radius: 0;
        }
      }
    }
  }

  @media (max-width: 350px) {
    .product-section__single-product {
      max-width: 100%;
      flex: 100%;
    }
  }

  //menu fixed
  .scroll-down .desktop-menu {
    transform: translate3d(0, -100%, 0);
  }

  .scroll-down .menu-bar {
    transform: translate3d(0, -100%, 0);
  }

  .form-control:disabled {
    background-color: transparent;
  }

  @media (max-width: 600px) {
    .prevent-overflow {
      overflow: hidden;
      height: 100vh;
    }
  }

  .Toastify__toast-container {
    z-index: 99999999;
  }

  .mobile-menu {
    #fb-root, .fb_reset {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  }


  //---link border animation
  //animation: draw-line 0.25s ease-in-out;
  @keyframes draw-line {
    0% {
      background-size: 0 2px;
    }
    to {
      background-size: 100% 2px;
    }
  }


  .gradient-bg {

  }

  #header-shape-gradient {
    --color-stop: #f12c06;
    --color-bot: #faed34;
  }


  .hover-here {
    &.slick-disabled {
      cursor: not-allowed;

      &:hover {
        .circle:nth-last-of-type(1) {
          opacity: 0;
        }

        svg {
          line {
            stroke: #222222;
          }
        }
      }
    }

    .circle:nth-last-of-type(1) {
      opacity: 0;
    }

    .circle:nth-last-of-type(1), path {
      transition: all .3s ease;
    }

    &:hover {
      .circle:nth-last-of-type(1) {
        r: 50%;
        opacity: 1;
      }

      path {
        fill: #FFF;
      }
    }

    &.small {
      .circle {
        r: 20px;
      }
    }
  }

  .small-hover {
    .circle {
      opacity: 0;
    }

    .circle, path {
      transition: all .3s ease;
    }

    &:hover {
      .circle {
        r: 50%;
        opacity: 1;
        fill: red;
      }

      path {
        fill: #FFF;
      }
    }

    &.small {
      .circle {
        r: 20px;
      }
    }
  }

  //menu fixed
  .scroll-down {
    .main-menu {
      transform: translate3d(0, -100%, 0);
    }

    .main-menu-mobile__bar {
      transform: translate3d(0, -100%, 0);

    }
  }

  .scroll-up {
    .main-menu {
      background-color: #fff;

      img {
        content: url(${LogoBlack});
      }

      ul.main-menu__items li {
        a {
          color: ${text};
        }
      }


      ul.main-menu__search li {


        svg {
          stroke: ${text};

          g {
            stroke: ${text};
          }

          path {
            fill: ${text};
          }
        }

        &:hover {
          svg {
            stroke: #FFF;

            g {
              stroke: #FFF;
            }

            path {
              fill: #FFF;
            }
          }
        }
      }
    }

    .main-menu-mobile__bar {
      background-color: #ffffff;

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
      }
    }
  }


  //ul list style 
  ul {
    &.list {
      padding-left: 0;
      counter-reset: count;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 0 60px;

      li {

        position: relative;
        counter-increment: count;
        padding: 0 0px 20px 45px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        margin: 0 0 30px;
        flex: 0 0 calc(100% - 15px);

        &:before {
          content: counter(count, upper-alpha);
          position: absolute;
          height: 25px;
          width: 25px;
          padding: 0;
          background: linear-gradient(to bottom, rgba(173, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 100%);
          border-radius: 50%;
          color: white;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
        }

        &:last-child {
          margin: 0;
        }
      }

      @media (max-width: 767px) {
        margin: 0 0 40px;

        li {
          flex: 0 0 100%;

          &:last-child {
            margin-bottom: 0;
          }
        }

      }
    }

    &.grid_2 {
      display: flex;
      justify-content: space-between;

      li {
        flex: 0 0 calc(50% - 15px);
        padding: 0;

        p {
          margin: 0;
        }
      }

      margin: 0 0 40px;
    }

    &.grid_1 {
      li {
        flex: 0 0 100%;
        padding: 0;

        p {
          margin: 0;
        }
      }

      margin: 0 0 40px;

    }

    li {

      p {
        span {
          color: #FB030C;
        }
      }
    }
  }

  //table style
  table {
    &.table {
      margin: 0 0 25px;
      border: 1px solid #E9E9E9;

      th {
        ${gradient};
        width: 100%;
        display: flex;
        padding: 0;
        border: none;

        td {
          color: white;
          border-right: 1px solid white;

          &:last-child {
            border-right: none;
          }

        }


      }

      tr {
        width: 100%;
        display: flex;

        &:nth-of-type(even) {
          background: #F9F9F9;
        }

        &:nth-of-type(odd) {
          background: white;
        }
      }

      td {
        padding: 20px 5px;
        width: 100%;
        display: inline-flex;
        text-align: center;
        border-right: 1px solid #E9E9E9;
        align-items: center;
        justify-content: center;

        &:last-child {
          border-right: none;
        }
      }

      @media (max-width: 767px) {
        display: block;
        overflow-x: scroll;
        td {
          min-width: 225px;
        }
      }
    }
  }

  .lg-backdrop {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }

  //
  //.lg-actions .lg-prev:after {
  //
  //  content: '' !important;
  //  //list-style-image: url('../public/icons/arrow-left.svg') ;
  //  background-image: url('../public/icons/arrow-left.svg');
  //  height: 16px;
  //  width: 33px;
  //  position: absolute;
  //
  //  //background-image: url('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg') ;
  //  background-repeat: no-repeat;
  //  background-position: 95% 20%;
  //  background-size: cover;
  //  transition: fade 0.5s ease;
  //
  //}
  //
  //.lg .lg-next, .lg-actions .lg-prev {
  //  background-color: rgba(0, 0, 0, 0.45);
  //  border-radius: 50%;
  //  color: #fffdfd;
  //  cursor: pointer;
  //  display: block;
  //  font-size: 22px;
  //  margin-top: -10px;
  //  padding: 8px 10px 9px;
  //  position: absolute;
  //  top: 50%;
  //  z-index: 1080;
  //  outline: none;
  //  border: none;
  //  height: 80px;
  //  width: 80px;
  //
  //}


  .css-1okebmr-indicatorSeparator {
    background-color: transparent !important;
    z-index: 2;
  }

  .gph_modal {
    background: #F4F4F4;
    overflow: hidden !important;

    .slider-nav {
      //position: absolute;
      //top: 7px;
      //right: 15px;
      position: absolute;
      left: 0;
      right: 0;
      width: calc(100% - 15px);
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;

      ul {
        display: flex;
        justify-content: space-between;
        display: flex;
        padding: 0 20px;
      }

      li {
        height: 50px;
        width: 50px;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        border: 1px solid white;

        &:nth-of-type(1) {
          margin-right: 20px;
        }

        svg {
          color: #ffffff;
          z-index: 2;
          font-size: 20px;
        }
      }
    }

    .hover {
      height: 40px;
      width: 40px;

      svg {
        font-size: 17px;
      }
    }

    .modal-dialog {
      margin: 0;
      width: 100%;
      height: 100%;
      background: #F4F4F4;

      .btn-close {
        display: none;
      }

      .modal-header {
        padding: 0;
        margin-bottom: 0;
        background: #F4F4F4;

        .h4 {
          color: #222222;
          ${title_ms24};
          font-weight: 500;
        }

        .header_wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 15px 20px;

          .close_button {
            cursor: pointer;

            &:hover {
              opacity: 0.7;
            }
          }

        }

      }

      .custombar {
        position: relative;

        &:after {
          z-index: 1;
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: transparent;
          background: linear-gradient(to bottom, rgba(244, 244, 244, 0) 0%,
          rgba(244, 244, 244, 1) 100%);
        }
      }

      .modal-content {
        height: 100vh;
        padding: 0;
        background: #F4F4F4;
        border: none;

        .left_col {
          padding: 60px 15px 60px;

          h3 {
            font-size: 20px;
            font-weight: 500;
            line-height: 30px;
            color: #222222;
            margin: 0 0 10px;
          }

          p {
            ${body_ms18};
            font-weight: 400;
            color: #222222;

            &.deg {
              font-size: 14px;
              font-weight: 500;
              line-height: 18px;
              color: #FB030C;
              margin: 0 0 40px;
            }
          }
        }

        .right_col {
          padding: 60px 15px 60px;

          .custombar {
            &:after {
              display: none;
            }
          }

          .right_col_img {
            position: relative;
            padding-top: calc(550 / 500 * 100%);
          }
        }

      }
    }

    .simplebar-track.simplebar-vertical {
      display: none;
    }

    @media (max-width: 767px) {
      overflow-y: scroll !important;
      .custombar {
        position: relative;
        height: auto !important;

        .simplebar-content-wrapper {
          overflow: auto;
        }
      }

      .modal-content {
        overflow: hidden !important;
      }

      .row {
        flex-direction: column-reverse;

        .left_col {
          padding: 0 15px 40px !important;
        }

        .right_col {
          padding: 40px 15px !important;
        }
      }

    }

    @media (min-width: 767px) {
      .main_scroll {
        position: relative;
        height: auto !important;

        .simplebar-content-wrapper {
          overflow: auto;
        }
      }
    }
  }

  .hover {
    position: relative;
    overflow: hidden;

    span {
      z-index: 2;
    }

    &:after {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: ${hover};
      transition: all .5s ease;
      border-radius: 19px;
    }

    &:hover {
      &:after {
        height: 100%;
        width: 100%;
      }
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

      font-size: 14px;
      font-weight: 400;
      color: ${text};

      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${text};
      }
    }

    .react-select__single-value {
      font-size: 14px;
      font-weight: 400;
      color: ${text};
    }

    textarea {
      border-radius: 0;
      border-color: #DDDDDD;
      font-size: 14px;
      font-weight: 400;
      color: ${text};

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

  .max_size {
    font-size: 10px;
    font-weight: 300;
    line-height: 20px;
    color: rgba(34, 34, 34, 0.8);
    margin: 5px 0 0;
  }

  .gph_upload {
    position: relative;
    cursor: pointer;

    &:after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      content: attr(text);
      background: #F9F9F9;
      z-index: 1;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      color: rgba(34, 34, 34, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.7s all ease;
    }

    &:hover {
      &:after {
        background: #E9E9E9;
      }
    }
  }

  .has-error {
    border-color: #EE1B24 !important;
  }

  .StyledErrorPage {
    //background: red;
  }

  .loading-before-content {
    position: fixed;
    height: 100vh;
    width: 100vw;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.90);
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;

    img {
      height: 40px;
    }

    @keyframes ldio-2p01d405ya4 {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    .ldio-2p01d405ya4 div {
      position: absolute;
      width: 40px;
      height: 40px;
      border: 5px solid ${text};
      border-top-color: ${hover};
      border-radius: 50%;
    }

    .ldio-2p01d405ya4 div {
      animation: ldio-2p01d405ya4 1s linear infinite;
      top: 100px;
      left: 100px
    }

    .loadingio-spinner-rolling-qx6ynrq7t2 {
      width: 200px;
      height: 200px;
      display: inline-block;
      overflow: hidden;
      background: none;
    }

    .ldio-2p01d405ya4 {
      width: 100%;
      height: 100%;
      position: relative;
      transform: translateZ(0) scale(1);
      backface-visibility: hidden;
      transform-origin: 0 0; /* see note above */
    }

    .ldio-2p01d405ya4 div {
      box-sizing: content-box;
    }


  }

  //second menu style 
  .second-menu {

    .main-menu {
      background-color: #fff;

      img {
        content: url(${LogoBlack});
      }

      ul.main-menu__items li {
        a {
          color: ${text};
        }
      }


      ul.main-menu__search li {


        svg {
          stroke: ${text};

          g {
            stroke: ${text};
          }

          path {
            fill: ${text};
          }
        }

        &:hover {
          svg {
            stroke: #FFF;

            g {
              stroke: #FFF;
            }

            path {
              fill: #FFF;
            }
          }
        }
      }
    }

  }


  //news event light gallery
  .news_events {
    .lg-thumb-outer, .lg-actions {
      display: none;
    }

    .lg-toolbar {
      #lg-counter, #lg-actual-size {
        display: none;
      }
    }
  }

  textarea {
    &:focus {
      outline: none !important;
      border-color: #DDDDDD !important;
    }
  }

  .page-loader {
    position: fixed;
    background-color: ${text};
    height: 100vh;
    z-index: 999999999;
    //left: 0; //width: 0;
    //transition: all 2.6s ease;
  }
  .in-home {
    .ghp_logo {
      pointer-events: none;
    }
  }
`;



