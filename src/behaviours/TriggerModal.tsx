import React, { useEffect, useState } from 'react'
import { Trigger } from '../client/types'
import ReactDOM from 'react-dom'
import { useCollector } from '../hooks/useCollector'

type Props = {
  trigger: Trigger
}

const Modal = ({ trigger }: Props) => {
  const { resetDisplayTrigger } = useCollector()
  const [open, setOpen] = useState(true)

  const closeModal = () => {
    resetDisplayTrigger()
    setOpen(false)
  }

  console.log('trigger', trigger, trigger?.data?.buttonURL)

  useEffect(() => {
    const css = `
  @charset "UTF-8";
  @import "https://fonts.smct.co/Din/font.css";
  .variant-bg,
  .variant-overlay-outer,
  .variant-bar,
  .variant-final-message,
  .variant-success-message {
    display: none;
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .variant-bg,
  .variant-bar {
    z-index: 99999999999;
  }
  .variant-bar,
  .variant-handle,
  .variant-final-message,
  .variant-success-message-inner,
  .variant-overlay-inner {
    background-color: rgba(0, 0, 0, 1);
  }
  .variant-bar,
  .variant-option,
  .variant-handle,
  .variant-final-message,
  .variant-text-outer > .variant-text,
  a.variant-link {
    color: #fff;
  }
  .variant-bg,
  .variant-bg * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .variant-bg * {
    line-height: 100%;
  }
  .variant-overlay-inner,
  .variant-input,
  .variant-text,
  .variant-text-outer,
  .variant-item,
  .variant-progress,
  .variant-panel .variant-bg,
  .variant-handle > span,
  .variant-loader,
  .variant-loader-single,
  .variant-loader-double,
  .variant-option,
  .variant-long-close {
    display: block;
  }
  .variant-text-outer,
  .variant-option {
    width: 50%;
    min-width: 280px;
    margin: auto;
  }
  .variant-input {
    background-color: rgba(255, 255, 255, 0.8);
  }
  .variant-bg {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .variant-overlay-outer {
    position: relative;
    transition: height 0.2s ease;
  }
  .variant-overlay-inner {
    width: 700px;
    min-height: 400px;
    position: relative;
    margin: 10% auto;
    transition: all 0.2s ease;
    padding: 10px 10px 30px;
    min-width: 300px;
  }
  .variant-close {
    border-radius: 50%;
    color: #333;
    cursor: pointer;
    display: block;
    font-size: 20px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 10px;
    width: 30px;
    z-index: 100;
  }
  .variant-close a {
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .variant-close:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .variant-close-safe {
    text-shadow: 1px 1px 1px #000;
    color: #fff;
    width: 100%;
    text-align: center;
    cursor: pointer;
    display: none;
    position: fixed;
    bottom: 30px;
    left: 0;
  }
  .variant-close-safe a {
    color: #fff !important;
  }
  .variant-closer {
    cursor: pointer;
  }
  .variant-long-close {
    font-size: 14px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    left: 0;
    text-align: center;
  }
  .variant-long-close a.variant-link {
    width: auto;
  }
  a.variant-link {
    display: inline-block;
    text-decoration: none;
    height: 100%;
    width: 100%;
  }
  .variant-input,
  .variant-button,
  .variant-reveal {
    width: 100%;
  }
  .variant-button,
  .variant-cover {
    background: #333;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .variant-input {
    color: #000;
    text-align: center;
    border: 1px solid #333;
    margin: 10px auto;
    padding: 10px;
  }
  .variant-input::-webkit-input-placeholder,
  .variant-input:-moz-placeholder,
  .variant-input::-moz-placeholder,
  .variant-input:-ms-input-placeholder {
    color: #ccc;
    text-transform: uppercase;
  }
  .variant-input:focus {
    outline: none;
  }
  .variant-button {
    border: medium none;
    color: #fff;
    outline: medium none;
    display: block;
    margin: 10px auto;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }
  .variant-reveal {
    display: block;
    margin: 10px auto;
    position: relative;
    text-align: center;
  }
  .variant-cover,
  .variant-code {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    font-size: 20px;
  }
  .variant-cover {
    z-index: 2;
    color: #fff;
    padding: 11px;
    cursor: pointer;
  }
  .variant-button:hover,
  .variant-cover:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .variant-code {
    z-index: 1;
    border: 1px solid #333;
    background: rgba(255, 255, 255, 0.8);
    color: #333;
    font-weight: 700;
    -moz-user-select: text;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .variant-text {
    text-align: center;
    font-size: 20px;
  }
  .variant-text2 {
    font-size: 40px;
    font-weight: 700;
  }
  .variant-img-outer {
    position: relative;
    width: 100%;
    display: block;
  }
  .variant-img {
    display: block;
    width: 100%;
  }
  .variant-img img {
    border: medium none;
    display: block;
    margin: auto;
    outline: medium none;
    max-width: 100%;
  }
  .variant-clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  .variant-clearfix {
    display: inline-block;
    height: 1%;
    display: block;
  }
  .variant-item {
    height: 80px;
    padding: 10px;
    border-bottom: 1px dashed #ccc;
  }
  .variant-item .variant-item-img {
    display: inline-block;
    text-align: center;
  }
  .variant-item .variant-item-img img {
    max-width: 60px;
    max-height: 60px;
  }
  .variant-item .variant-title {
    font-weight: 700;
    display: inline-block;
  }
  .variant-item .variant-price {
    display: inline-block;
  }
  .variant-item .variant-qty {
    display: inline-block;
  }
  .variant-progress {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    height: 21px;
    margin-bottom: 21px;
    overflow: hidden;
    width: 100%;
  }
  .variant-progress-bar {
    background-color: #007932;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15) inset;
    color: #fff;
    float: left;
    font-size: 12px;
    height: 100%;
    line-height: 21px;
    text-align: center;
    transition: width 0.6s ease 0s;
    width: 0;
  }
  .variant-progress .variant-progress-bar {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: 0.5s linear 0s normal none infinite running
      .variant-progress-bar-stripes;
  }
  @-webkit-keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  @-o-keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  @keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  .variant-overlay {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  .variant-overlay:before,
  .variant-overlay:after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-radius: 100px / 10px;
  }
  .variant-overlay:after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }
  .variant-panel .variant-bg {
    width: 0;
    height: 100%;
    position: fixed;
    z-index: 1001;
    top: 0;
    background-color: #111;
    padding: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: width 0.5s;
  }
  .variant-panel-body-cover {
    position: fixed;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  .variant-panel.variant-panel-left .variant-bg {
    right: auto;
  }
  .variant-panel.variant-panel-right .variant-bg {
    left: auto;
  }
  .variant-panel .variant-overlay-inner {
    width: 90%;
  }
  .variant-input-group {
    display: block;
    text-align: center;
  }
  .variant-input-group input[type="checkbox"],
  .variant-input-group input[type="radio"] {
    margin-right: 3px;
    margin-left: 10px;
  }
  .variant-input-error ::-webkit-input-placeholder,
  .variant-input-error :-moz-placeholder,
  .variant-input-error ::-moz-placeholder,
  .variant-input-error :-ms-input-placeholder {
    color: #d30003;
  }
  .variant-input-error label {
    color: #d30003;
  }
  .variant-input-error input,
  .variant-input-error select,
  .variant-input-error textarea {
    border-color: #d30003;
  }
  .variant-bar,
  .variant-handle {
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .variant-bar {
    display: none;
    position: fixed;
    top: 0;
    left: 25%;
    right: 25%;
    width: 50%;
    font-weight: 700;
    font-size: 16px;
    text-shadow: none;
    text-align: center;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    .variant-bar {
      width: 80%;
      left: 10%;
    }
  }
  .variant-bar-close {
    cursor: pointer;
    height: 10px;
    line-height: 10px;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 10px;
  }
  .variant-handle {
    position: absolute;
    width: 50px;
    margin-left: -25px;
    height: 20px;
    left: 50%;
    bottom: -20px;
    cursor: pointer;
    line-height: 12px;
    letter-spacing: -2px;
  }
  .variant-handle > span {
    position: absolute;
    width: 60%;
    left: 20%;
    height: 2px;
    background: #fff;
  }
  .variant-bar1 {
    top: 20%;
  }
  .variant-bar2 {
    top: 40%;
  }
  .variant-bar3 {
    top: 60%;
  }
  .variant-arrow-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #000;
  }
  .variant-arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000;
  }
  .variant-arrow-right {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #000;
  }
  .variant-arrow-left {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #000;
  }
  .variant-preview {
    position: fixed;
    top: 20px;
    left: 50%;
    margin-left: -160px;
    width: 320px;
    padding: 5px 10px;
    background: #ff0;
    color: #000;
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .variant-preview-close {
    font-size: 7px;
    height: 3px;
    position: absolute;
    right: 4px;
    top: 0;
    width: 3px;
  }
  .variant-preview .variant-arrow-up {
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -10px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ff0;
  }
  .variant-notices {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: height 0.3s ease;
  }
  .variant-notice-box {
    padding: 5px 10px;
    background: #ec6952;
    font-size: 12px;
    text-align: left;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    min-height: 30px;
    min-width: 100px;
    max-width: 500px;
    width: auto;
    margin-bottom: 5px;
    color: #fff;
    float: right;
    clear: both;
    z-index: 100;
    transition: all 0.5s ease;
    overflow: hidden;
  }
  .variant-notice-box.success {
    background: #24a233;
  }
  .variant-notice-box.warning {
    background: #cf9d0f;
  }
  .variant-notice-box.danger {
    background: #d30003;
  }
  @media screen {
    .variant-preloader {
      position: fixed;
      left: -9999px;
      top: -9999px;
    }
    .variant-preloader img {
      display: block;
    }
  }
  @media print {
    .variant-preloader,
    .variant-preloader img {
      visibility: hidden;
      display: none;
    }
  }
  .variant-final-message {
    border-radius: 2px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    bottom: 10px;
    font-size: 16px;
    padding: 10px 20px;
    position: fixed;
    right: 10px;
    z-index: 1e15;
  }
  .variant-final-message-close {
    position: absolute;
    top: 3px;
    right: 1px;
    width: 10px;
    height: 10px;
    cursor: pointer;
    font-size: 10px;
    opacity: 0.5;
  }
  .variant-final-message .variant-select {
    font-weight: 700;
  }
  .variant-final-message:hover .variant-final-message-close {
    opacity: 1;
  }
  .variant-success-message {
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
  .variant-success-message-inner {
    background: #08ad00 none repeat scroll 0 0;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
    color: #fff;
    display: inline-block;
    font-size: 30px;
    margin: 20% auto auto;
    padding: 10px 30px;
    position: relative;
  }
  .variant-success-close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    font-size: 12px;
  }
  @-webkit-keyframes .variant-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes .variant-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes .variant-pulse {
    50% {
      background: #fff;
    }
  }
  @keyframes .variant-pulse {
    50% {
      background: #fff;
    }
  }
  .variant-loader-bg,
  .variant-dc-placeholder {
    position: absolute;
    top: 10%;
    left: 50%;
    background: rgba(0, 0, 0, 0.8);
    width: 60px;
    margin-left: -30px;
    height: 60px;
    z-index: 10;
    border-radius: 10px;
    display: none;
  }
  .variant-loader,
  .variant-loader-single,
  .variant-loader-double {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 0.25rem solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
    -webkit-animation: variant-spin 1s infinite linear;
    animation: variant-spin 1s infinite linear;
  }
  .variant-loader-double {
    border-style: double;
    border-width: 0.5rem;
  }
  .variant-loader-pulse {
    -webkit-animation: variant-pulse 750ms infinite;
    animation: variant-pulse 750ms infinite;
    -webkit-animation-delay: 250ms;
    animation-delay: 250ms;
    height: 30px;
    left: 25px;
    position: absolute;
    top: 14px;
    width: 10px;
  }
  .variant-loader-pulse:before,
  .variant-loader-pulse:after {
    content: "";
    position: absolute;
    display: block;
    height: 16px;
    width: 6px;
    top: 50%;
    background: rgba(255, 255, 255, 0.2);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-animation: variant-pulse 750ms infinite;
    animation: variant-pulse 750ms infinite;
  }
  .variant-loader-pulse:before {
    left: -12px;
  }
  .variant-loader-pulse:after {
    left: 16px;
    -webkit-animation-delay: 500ms;
    animation-delay: 500ms;
  }
  .variant-loader-bg[data-theme="white"],
  .variant-dc-placeholder {
    background: rgba(255, 255, 255, 0.8);
  }
  .variant-loader-bg[data-theme="white"] .variant-loader-single,
  .variant-dc-placeholder .variant-loader-single,
  .variant-loader-bg[data-theme="white"] .variant-loader-double,
  .variant-dc-placeholder .variant-loader-double,
  .variant-loader-bg[data-theme="white"] .variant-loader-pulse,
  .variant-dc-placeholder .variant-loader-pulse {
    border-color: rgba(0, 0, 0, 0.2);
    border-top-color: #000;
  }
  .variant-terms {
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 3px;
    bottom: 5%;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    left: 5%;
    padding: 10px;
    position: absolute;
    right: 5%;
    top: 5%;
    z-index: 101;
    display: none;
  }
  .variant-terms-header,
  .variant-terms-para,
  .variant-terms-close,
  .variant-terms-close-x {
    color: #333;
    display: block;
  }
  .variant-terms-scroller {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 30px;
    overflow: auto;
  }
  .variant-terms-header {
    font-size: 20px;
    font-weight: 700;
    margin: 5px 0;
    text-align: center;
  }
  .variant-terms-para {
    margin: 5px 0;
    font-size: 12px;
  }
  .variant-terms-close {
    bottom: 10px;
    cursor: pointer;
    left: 10px;
    position: absolute;
    right: 10px;
    text-align: center;
  }
  .variant-show-terms,
  .variant-show-terms {
    text-decoration: underline;
    cursor: pointer;
  }
  .variant-terms[data-theme="dark"] {
    background-color: #333;
  }
  .variant-terms[data-theme="dark"] .variant-terms-header,
  .variant-terms[data-theme="dark"] .variant-terms-para,
  .variant-terms[data-theme="dark"] .variant-terms-close,
  .variant-terms[data-theme="dark"] .variant-terms-close-x {
    color: #fff;
  }
  .variant-terms-close-x {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: 0.7;
    -webkit-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    transition: transform all 0.25s ease-in-out;
  }
  .variant-terms-close-x:hover {
    opacity: 1;
    -webkit-transform: rotate(180deg) scale(1.3);
    -ms-transform: rotate(180deg) scale(1.3);
    -o-transform: rotate(180deg) scale(1.3);
    -moz-transform: rotate(180deg) scale(1.3);
    transform: rotate(180deg) scale(1.3);
  }
  .variant-cp {
    -youbkit-touch-callout: none;
    -youbkit-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .variant-cp,
  .variant-cp-msg {
    display: none;
  }
  .variant-hidden-consents {
    opacity: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 1px;
    visibility: hidden;
  }
  .variant-requestNotifications .variant-agree-yes,
  .variant-requestNotifications .variant-agree-no {
    display: none;
  }
  .variant-notices {
    padding: 10px;
    right: 20px;
    left: auto;
    max-width: 300px;
    z-index: 100;
  }
  .variant-dc-placeholder {
    display: block;
    height: 30px;
    width: 30px;
    top: 3px;
  }
  .variant-dc-placeholder > * {
    height: 20px;
    width: 20px;
  }
  .variant-shake-msg {
    display: none;
  }
  .variant-animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .variant-animated.variant-infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .variant-animated.variant-hinge {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }
  .variant-animated.variant-bounceIn,
  .variant-animated.variant-bounceOut,
  .variant-animated.variant-flipOutX,
  .variant-animated.variant-flipOutY {
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
  }
  @-webkit-keyframes .variant-fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes .variant-fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .variant-fadeIn {
    -webkit-animation-name: variant-fadeIn;
    animation-name: variant-fadeIn;
  }
  @-webkit-keyframes .variant-bounceInDown {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInDown {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInDown {
    -webkit-animation-name: variant-bounceInDown;
    animation-name: variant-bounceInDown;
  }
  .variant-animDelay2 {
    -webkit-animation-delay: 0.2s !important;
    -moz-animation-delay: 0.2s !important;
    -ms-animation-delay: 0.2s !important;
    -o-animation-delay: 0.2s !important;
    animation-delay: 0.2s !important;
  }
  .variant-animDelay6 {
    -webkit-animation-delay: 0.6s !important;
    -moz-animation-delay: 0.6s !important;
    -ms-animation-delay: 0.6s !important;
    -o-animation-delay: 0.6s !important;
    animation-delay: 0.6s !important;
  }
  @-webkit-keyframes .variant-bounceInRight {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInRight {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInRight {
    -webkit-animation-name: variant-bounceInRight;
    animation-name: variant-bounceInRight;
  }
  .variant-animDelay8 {
    -webkit-animation-delay: 0.8s !important;
    -moz-animation-delay: 0.8s !important;
    -ms-animation-delay: 0.8s !important;
    -o-animation-delay: 0.8s !important;
    animation-delay: 0.8s !important;
  }
  .variant-animDelay10 {
    -webkit-animation-delay: 1s !important;
    -moz-animation-delay: 1s !important;
    -ms-animation-delay: 1s !important;
    -o-animation-delay: 1s !important;
    animation-delay: 1s !important;
  }
  .variant-animDelay12 {
    -webkit-animation-delay: 1.2s !important;
    -moz-animation-delay: 1.2s !important;
    -ms-animation-delay: 1.2s !important;
    -o-animation-delay: 1.2s !important;
    animation-delay: 1.2s !important;
  }
  .variant-animDelay4 {
    -webkit-animation-delay: 0.4s !important;
    -moz-animation-delay: 0.4s !important;
    -ms-animation-delay: 0.4s !important;
    -o-animation-delay: 0.4s !important;
    animation-delay: 0.4s !important;
  }
  @-webkit-keyframes .variant-bounceInLeft {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInLeft {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInLeft {
    -webkit-animation-name: variant-bounceInLeft;
    animation-name: variant-bounceInLeft;
  }
  @-webkit-keyframes .variant-fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInLeft {
    -webkit-animation-name: variant-fadeInLeft;
    animation-name: variant-fadeInLeft;
  }
  @-webkit-keyframes .variant-fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInRight {
    -webkit-animation-name: variant-fadeInRight;
    animation-name: variant-fadeInRight;
  }
  @-webkit-keyframes .variant-bounceInUp {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  @keyframes .variant-bounceInUp {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  .variant-bounceInUp {
    -webkit-animation-name: variant-bounceInUp;
    animation-name: variant-bounceInUp;
  }
  .variant-animDelay7 {
    -webkit-animation-delay: 0.7s !important;
    -moz-animation-delay: 0.7s !important;
    -ms-animation-delay: 0.7s !important;
    -o-animation-delay: 0.7s !important;
    animation-delay: 0.7s !important;
  }
  .variant-animDelay9 {
    -webkit-animation-delay: 0.9s !important;
    -moz-animation-delay: 0.9s !important;
    -ms-animation-delay: 0.9s !important;
    -o-animation-delay: 0.9s !important;
    animation-delay: 0.9s !important;
  }
  @-webkit-keyframes .variant-fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInUp {
    -webkit-animation-name: variant-fadeInUp;
    animation-name: variant-fadeInUp;
  }
  .variant-animDelay14 {
    -webkit-animation-delay: 1.4s !important;
    -moz-animation-delay: 1.4s !important;
    -ms-animation-delay: 1.4s !important;
    -o-animation-delay: 1.4s !important;
    animation-delay: 1.4s !important;
  }
  .variant-animDelay1 {
    -webkit-animation-delay: 0.1s !important;
    -moz-animation-delay: 0.1s !important;
    -ms-animation-delay: 0.1s !important;
    -o-animation-delay: 0.1s !important;
    animation-delay: 0.1s !important;
  }
  @-webkit-keyframes .variant-fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInDown {
    -webkit-animation-name: variant-fadeInDown;
    animation-name: variant-fadeInDown;
  }
  @-webkit-keyframes .variant-fadeOutUp {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes .variant-fadeOutUp {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .variant-fadeOutUp {
    -webkit-animation-name: variant-fadeOutUp;
    animation-name: variant-fadeOutUp;
  }
  @-webkit-keyframes .variant-fadeOutDown {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
  @keyframes .variant-fadeOutDown {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
  .variant-fadeOutDown {
    -webkit-animation-name: variant-fadeOutDown;
    animation-name: variant-fadeOutDown;
  }
  @-webkit-keyframes .variant-fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes .variant-fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .variant-fadeOut {
    -webkit-animation-name: variant-fadeOut;
    animation-name: variant-fadeOut;
  }
  @-webkit-keyframes .variant-bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -2000px, 0);
      transform: translate3d(0, -2000px, 0);
    }
  }
  @keyframes .variant-bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -2000px, 0);
      transform: translate3d(0, -2000px, 0);
    }
  }
  .variant-bounceOutUp {
    -webkit-animation-name: variant-bounceOutUp;
    animation-name: variant-bounceOutUp;
  }
  @-webkit-keyframes .variant-bounceOutDown {
    20% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 2000px, 0);
      transform: translate3d(0, 2000px, 0);
    }
  }
  @keyframes .variant-bounceOutDown {
    20% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 2000px, 0);
      transform: translate3d(0, 2000px, 0);
    }
  }
  .variant-bounceOutDown {
    -webkit-animation-name: variant-bounceOutDown;
    animation-name: variant-bounceOutDown;
  }
  @-webkit-keyframes .variant-rubberBand {
    0% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    to {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  @keyframes .variant-rubberBand {
    0% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    to {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  .variant-rubberBand {
    -webkit-animation-name: variant-rubberBand;
    animation-name: variant-rubberBand;
  }
  @-webkit-keyframes .variant-shake {
    0%,
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }
  @keyframes .variant-shake {
    0%,
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }
  .variant-shake {
    -webkit-animation-name: variant-shake;
    animation-name: variant-shake;
  }
  @-webkit-keyframes .variant-rollOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);
      transform: translate3d(100%, 0, 0) rotate(120deg);
    }
  }
  @keyframes .variant-rollOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);
      transform: translate3d(100%, 0, 0) rotate(120deg);
    }
  }
  .variant-rollOut {
    -webkit-animation-name: variant-rollOut;
    animation-name: variant-rollOut;
  }
  .variant-bg * {
    font-family: "DINCompPro-CondMedium";
  }
  .variant-overlay-inner {
    background-size: cover;
    width: 420px;
    min-height: 520px;
    border-radius: 5px;
    padding-bottom: 0;
    border: 2px solid #fff;
  }
  .variant-text-outer,
  .variant-option {
    width: 380px;
    margin: auto;
  }
  .variant-text1,
  .variant-text2 {
    font-size: 26px;
    font-weight: 400;
    margin: 15px auto;
    text-align: center;
    color: #4e5255;
    text-transform: uppercase;
  }
  .variant-text1 {
    font-size: 34px;
    font-weight: 600;
    margin: 25px auto 15px;
    color: #016543;
  }
  .variant-button {
    font-size: 24px;
    padding: 10px;
    text-transform: uppercase;
    margin: 300px auto auto;
    color: #fff;
    width: 340px;
    transition: all 0.5s ease !important;
  }
  .variant-button:hover {
    background-color: #016543;
  }
  .variant-close {
    font-size: 14px;
    background-color: #fff;
    top: -10px;
    right: -10px;
  }
  .variant-close a.variant-link {
    color: #000;
  }
  @media screen and (max-width: 420px) {
    .variant-close-safe {
      display: block;
    }
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.95);
      transform-origin: 5% 0 0;
    }
    .variant-overlay-outer {
      height: 420px;
    }
  }
  @media screen and (max-width: 412px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.93);
      transform-origin: 4.9% 0 0;
    }
    .variant-overlay-outer {
      height: 412px;
    }
  }
  @media screen and (max-width: 403px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.91);
      transform-origin: 4.8% 0 0;
    }
    .variant-overlay-outer {
      height: 403px;
    }
  }
  @media screen and (max-width: 395px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.89);
      transform-origin: 4.7% 0 0;
    }
    .variant-overlay-outer {
      height: 395px;
    }
  }
  @media screen and (max-width: 386px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.87);
      transform-origin: 4.6% 0 0;
    }
    .variant-overlay-outer {
      height: 386px;
    }
  }
  @media screen and (max-width: 378px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.85);
      transform-origin: 4.5% 0 0;
    }
    .variant-overlay-outer {
      height: 378px;
    }
  }
  @media screen and (max-width: 370px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.84);
      transform-origin: 4.4% 0 0;
    }
    .variant-overlay-outer {
      height: 370px;
    }
  }
  @media screen and (max-width: 361px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.82);
      transform-origin: 4.3% 0 0;
    }
    .variant-overlay-outer {
      height: 361px;
    }
  }
  @media screen and (max-width: 353px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.8);
      transform-origin: 4.2% 0 0;
    }
    .variant-overlay-outer {
      height: 353px;
    }
  }
  @media screen and (max-width: 344px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.78);
      transform-origin: 4.1% 0 0;
    }
    .variant-overlay-outer {
      height: 344px;
    }
  }
  @media screen and (max-width: 336px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.76);
      transform-origin: 4% 0 0;
    }
    .variant-overlay-outer {
      height: 336px;
    }
  }
  @media screen and (max-width: 328px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.74);
      transform-origin: 3.9% 0 0;
    }
    .variant-overlay-outer {
      height: 328px;
    }
  }
  @media screen and (max-width: 319px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.72);
      transform-origin: 3.8% 0 0;
    }
    .variant-overlay-outer {
      height: 319px;
    }
  }
  @media screen and (max-width: 311px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.7);
      transform-origin: 3.7% 0 0;
    }
    .variant-overlay-outer {
      height: 311px;
    }
  }
  @media screen and (max-width: 302px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.68);
      transform-origin: 3.6% 0 0;
    }
    .variant-overlay-outer {
      height: 302px;
    }
  }
  @media screen and (max-width: 294px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.66);
      transform-origin: 3.5% 0 0;
    }
    .variant-overlay-outer {
      height: 294px;
    }
  }
  @media screen and (max-width: 286px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.65);
      transform-origin: 3.4% 0 0;
    }
    .variant-overlay-outer {
      height: 286px;
    }
  }
  @media screen and (max-width: 277px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.63);
      transform-origin: 3.3% 0 0;
    }
    .variant-overlay-outer {
      height: 277px;
    }
  }
  @media screen and (max-width: 269px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.61);
      transform-origin: 3.2% 0 0;
    }
    .variant-overlay-outer {
      height: 269px;
    }
  }
  @media screen and (max-width: 260px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.59);
      transform-origin: 3.1% 0 0;
    }
    .variant-overlay-outer {
      height: 260px;
    }
  }
  @media screen and (max-width: 252px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.57);
      transform-origin: 3% 0 0;
    }
    .variant-overlay-outer {
      height: 252px;
    }
  }
  @media screen and (max-width: 244px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.55);
      transform-origin: 2.9% 0 0;
    }
    .variant-overlay-outer {
      height: 244px;
    }
  }
  @media screen and (max-width: 235px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.53);
      transform-origin: 2.8% 0 0;
    }
    .variant-overlay-outer {
      height: 235px;
    }
  }
  @media screen and (max-width: 227px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.51);
      transform-origin: 2.7% 0 0;
    }
    .variant-overlay-outer {
      height: 227px;
    }
  }
`
    const styles = document.createElement('style')
    styles.type = 'text/css'
    styles.appendChild(document.createTextNode(css))
    document.head.appendChild(styles)
  })

  if (!open) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999
      }}
    >
      <div
        id='variant-overlay-106412'
        data-browser='firefox'
        data-device='desktop'
      >
        <div
          className='variant-bg variant-animated variant-fadeIn'
          style={{ display: 'block' }}
        >
          <div
            className='variant-overlay-outer variant-animated variant-bounceInDown variant-animDelay2'
            style={{ display: 'block' }}
          >
            <div
              className='variant-overlay-inner smc_clearfix'
              data-bgtheme='dark'
              data-changes='variant-overlay-inner|width,background-image,background-color'
              data-edits='content6'
              style={{
                backgroundImage: `url(${trigger?.data?.backgroundURL})`,
                backgroundColor: '#f1f1f1'
              }}
            >
              <div className='variant-img-outer'>
                <div
                  className='variant-img variant-img1 variant-animated variant-bounceInDown variant-animDelay6'
                  data-changes='.variant-img1|margin-top,margin-bottom,image-upload'
                  data-edits='content1'
                />
                <div
                  className='variant-img variant-img2 variant-animated variant-bounceInRight variant-animDelay8'
                  data-changes='.variant-img2|margin-top,margin-bottom,image-upload'
                  data-edits='content2'
                />
                <div
                  className='variant-img variant-img3 variant-animated variant-bounceInRight variant-animDelay10'
                  data-changes='.variant-img3|margin-top,margin-bottom,image-upload'
                  data-edits='content3'
                />
                <div
                  className='variant-img variant-img4 variant-animated variant-bounceInRight variant-animDelay12'
                  data-changes='.variant-img4|margin-top,margin-bottom,image-upload'
                  data-edits='content4'
                />
              </div>
              <div className='variant-text-outer'>
                <div
                  className='variant-text variant-text1 variant-animated variant-bounceInDown variant-animDelay4'
                  data-edits='text1'
                  data-changes='.variant-text1|font-size,color,margin-top,margin-bottom'
                  style={{
                    color: 'white',
                    marginTop: 40,
                    textShadow: '0 1px 4px #000'
                  }}
                >
                  {trigger?.data?.heading}
                </div>
                <div
                  className='variant-text variant-text2 variant-animated variant-bounceInRight variant-animDelay6'
                  data-edits='text2'
                  data-changes='.variant-text2|font-size,color,margin-top,margin-bottom'
                  style={{
                    color: 'white',
                    textShadow: '0 1px 4px #000',
                    fontSize: 45
                  }}
                >
                  {trigger?.data?.paragraph}
                </div>
                <div
                  className='variant-text variant-text3 variant-animated variant-bounceInLeft variant-animDelay8'
                  data-edits='text3'
                  data-changes='.variant-text3|font-size,color,margin-top,margin-bottom'
                />
                <div
                  className='variant-text variant-text4 variant-animated variant-bounceInRight variant-animDelay10'
                  data-edits='text4'
                  data-changes='.variant-text4|font-size,color,margin-top,margin-bottom'
                />
              </div>
              <div
                className='variant-option variant-clickRedirect'
                onClick={(e) => {
                  e.preventDefault()
                  trigger?.data?.buttonURL
                    ? window.open(trigger?.data?.buttonURL)
                    : closeModal()
                }}
              >
                <div className='variant-input-group'>
                  <span
                    className='variant-button variant-animated variant-fadeInRight variant-animDelay10'
                    data-edits='text10'
                    data-changes='.variant-button|font-size,background-color,color'
                  >
                    {trigger?.data?.buttonText}
                  </span>
                </div>
              </div>
              <div
                className='variant-long-close variant-animated variant-fadeInUp variant-animDelay14'
                data-engage-class='variant-engaged'
              >
                <a
                  data-close-type='long_close'
                  className='variant-link variant-closer'
                  href='#rdl'
                  data-engage-text=''
                  data-edits='text7,text11'
                  data-changes='variant-long-close a.variant-link|font-size,color,margin-top,margin-bottom'
                  onClick={(e) => {
                    e.preventDefault()
                    closeModal()
                  }}
                />
              </div>
              <div className='variant-close variant-animated variant-fadeInRight variant-animDelay4 variant-closer'>
                <a
                  data-close-type='x_close'
                  className='variant-link'
                  href='#rdl'
                  onClick={(e) => {
                    e.preventDefault()
                    closeModal()
                  }}
                >
                  ✕
                </a>
              </div>
            </div>
          </div>
          <div className='variant-close-safe variant-closer'>
            <a
              data-close-type='x_close'
              className='variant-link'
              href='#rdl'
              onClick={(e) => {
                e.preventDefault()
                closeModal()
              }}
            >
              [close]
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TriggerModal = ({ trigger }: Props) => {
  return ReactDOM.createPortal(<Modal trigger={trigger} />, document.body)
}
