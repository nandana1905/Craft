import React from 'react'
import './Payment.css'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import toast, { Toaster } from 'react-hot-toast'

export default function Payment() {
    return (
        <div>
            <div classNameName="home-nav1">
                <Toaster />
                <HeaderNav />
            </div>
            <div classNameName="home-nav2">
                <Nav />

                <div className='userpaymentcard'>

                    <div className="card-payment">

                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-7">
                                    <div className="left border">
                                        <div className="row">
                                            <span className="header">Payment</span>
                                            <div className="icons">
                                                <img src="https://img.icons8.com/color/48/000000/visa.png" />
                                                <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                                                <img src="https://img.icons8.com/color/48/000000/maestro.png" />
                                            </div>
                                        </div>
                                        <form>
                                            <span>Cardholder's name:</span>
                                            <input placeholder="Linda Williams" />
                                            <span>Card Number:</span>
                                            <input placeholder="0125 6780 4567 9909" />
                                            <div className="row">
                                                <div className="col-4">
                                                    <span>Expiry date:</span>
                                                    <input placeholder="YY/MM" />
                                                </div>
                                                <div className="col-4">
                                                    <span>CVV:</span>
                                                    <input id="cvv" />
                                                </div>
                                            </div>
                                            <input type="checkbox" id="save_card" className="align-left" />
                                            <label htmlFor="save_card">Save card details to wallet</label>

                                            <div className="separator">
                                                <hr className="line" />
                                                <p>or pay using e-wallet</p>
                                                <hr className="line" />
                                            </div>
                                            <div className="payment--options">
                                                <button type="button" name="paypal">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        version="1.1"
                                                        id="Layer_1"
                                                        x="0px"
                                                        y="0px"
                                                        width="124px"
                                                        height="33px"
                                                        viewBox="0 0 124 33"
                                                        xmlSpace="preserve"
                                                    >
                                                        <path
                                                            fill="#253B80"
                                                            d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658  h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5  c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454  h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z"
                                                        />
                                                        <path
                                                            fill="#253B80"
                                                            d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332  c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031  c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95  c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449  c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301  c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z"
                                                        />
                                                        <path
                                                            fill="#253B80"
                                                            d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425  c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811  c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z"
                                                        />
                                                        <path
                                                            fill="#179BD7"
                                                            d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658  h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5  c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454  h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704  C95.809,11.668,95.918,12.292,95.781,13.154z"
                                                        />
                                                        <path
                                                            fill="#179BD7"
                                                            d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332  c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031  c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949  c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449  c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301  c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z"
                                                        />
                                                        <path
                                                            fill="#179BD7"
                                                            d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803  l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z"
                                                        />
                                                        <path
                                                            fill="#253B80"
                                                            d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1  c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917  c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812  c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183  c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73  c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215  c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z"
                                                        />
                                                        <path
                                                            fill="#179BD7"
                                                            d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55  c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533  c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32  c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622  C24.022,8.286,23.573,7.945,23.048,7.667z"
                                                        />
                                                        <path
                                                            fill="#222D65"
                                                            d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117  c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605  l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55  c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z"
                                                        />
                                                        <path
                                                            fill="#253B80"
                                                            d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352  c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15  c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392  C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791  l1.454-9.225L9.614,7.699z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button name="apple-pay" type="button">
                                                    <svg height="900" viewBox=".08 .07 2499.95 678.92" width="120" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m1716.78 533.51v-123.27c0-30.34-11.38-45.51-39.82-45.51-11.38 0-24.65 1.9-32.24 3.79v180.16c0 5.69-5.69 11.38-11.38 11.38h-43.62c-5.69 0-11.38-5.69-11.38-11.38v-210.5c0-7.59 5.69-13.27 11.38-15.17 28.45-9.48 56.89-15.17 87.23-15.17 68.27 0 106.2 36.03 106.2 102.41v140.33c0 5.69-5.69 11.38-11.38 11.38h-26.55c-17.06-.01-28.44-13.28-28.44-28.45zm170.68-73.96-1.9 17.07c0 22.76 15.17 36.03 39.82 36.03 18.96 0 36.03-5.69 55-15.17 1.9 0 3.79-1.9 5.69-1.9 3.79 0 5.69 1.9 7.59 3.79 1.9 1.9 5.69 7.59 5.69 7.59 3.79 5.69 7.59 13.27 7.59 18.96 0 9.48-5.69 18.96-13.27 22.76-20.86 11.38-45.51 17.07-72.06 17.07-30.34 0-55-7.59-73.96-22.76-18.96-17.07-30.34-39.82-30.34-68.27v-73.96c0-58.79 37.93-94.82 102.41-94.82 62.58 0 98.61 34.14 98.61 94.82v45.51c0 5.69-5.69 11.38-11.38 11.38h-119.47zm-1.9-41.72h72.06v-18.96c0-22.76-13.27-37.93-36.03-37.93s-36.03 13.27-36.03 37.93zm483.59 41.72-1.9 17.07c0 22.76 15.17 36.03 39.82 36.03 18.96 0 36.03-5.69 55-15.17 1.9 0 3.79-1.9 5.69-1.9 3.79 0 5.69 1.9 7.59 3.79 1.9 1.9 5.69 7.59 5.69 7.59 3.79 5.69 7.59 13.27 7.59 18.96 0 9.48-5.69 18.96-13.27 22.76-20.86 11.38-45.51 17.07-72.06 17.07-30.34 0-55-7.59-73.96-22.76-18.96-17.07-30.34-39.82-30.34-68.27v-73.96c0-58.79 37.93-94.82 102.41-94.82 62.58 0 98.61 34.14 98.61 94.82v45.51c0 5.69-5.69 11.38-11.38 11.38h-119.47v1.9zm-1.9-41.72h72.06v-18.96c0-22.76-13.27-37.93-36.03-37.93s-36.03 13.27-36.03 37.93zm-1115.09 144.12h26.55c5.69 0 11.38-5.69 11.38-11.38v-140.33c0-64.48-34.14-102.41-91.03-102.41-17.07 0-36.03 3.79-47.41 7.59v-70.17c0-15.17-13.27-28.45-28.45-28.45h-26.55c-5.69 0-11.38 5.69-11.38 11.38v322.39c0 5.69 5.69 11.38 11.38 11.38h43.62c5.69 0 11.38-5.69 11.38-11.38v-178.26c9.48-3.79 22.76-5.69 32.24-5.69 28.45 0 39.82 13.27 39.82 45.51v123.27c1.9 13.28 13.28 26.55 28.45 26.55zm286.36-159.3v70.17c0 58.79-39.82 94.82-106.2 94.82-64.48 0-106.2-36.03-106.2-94.82v-70.17c0-58.79 39.82-94.82 106.2-94.82s106.2 36.04 106.2 94.82zm-66.37 0c0-22.76-13.27-37.93-37.93-37.93s-37.93 13.27-37.93 37.93v70.17c0 22.76 13.27 36.03 37.93 36.03s37.93-13.27 37.93-36.03zm-422.9-32.23c0 60.69-45.51 102.41-106.2 102.41-15.17 0-28.45-1.9-41.72-7.59v85.34c0 5.69-5.69 11.38-11.38 11.38h-43.62c-5.69 0-11.38-5.69-11.38-11.38v-301.53c0-7.59 5.69-13.27 11.38-15.17 28.45-9.48 56.89-15.17 87.23-15.17 68.27 0 115.68 41.72 115.68 106.2.01-.01.01 45.51.01 45.51zm-68.27-49.31c0-30.34-20.86-45.51-49.31-45.51-17.07 0-28.45 5.69-28.45 5.69v125.16c11.38 5.69 17.07 7.59 30.34 7.59 28.45 0 49.31-17.07 49.31-45.51v-47.41h-1.89zm1293.35 49.31c0 60.69-45.51 102.41-106.2 102.41-15.17 0-28.45-1.9-41.72-7.59v85.34c0 5.69-5.69 11.38-11.38 11.38h-43.62c-5.69 0-11.38-5.69-11.38-11.38v-301.53c0-7.59 5.69-13.27 11.38-15.17 28.45-9.48 56.89-15.17 87.23-15.17 68.27 0 115.68 41.72 115.68 106.2.01-.01.01 45.51.01 45.51zm-68.27-49.31c0-30.34-20.86-45.51-49.31-45.51-17.07 0-28.45 5.69-28.45 5.69v125.16c11.38 5.69 17.07 7.59 30.34 7.59 28.45 0 49.31-17.07 49.31-45.51v-47.41h-1.89z" fill="#5f259f" /><circle cx="339.53" cy="339.53" fill="#5f259f" r="339.46" /><path d="m493.6 250.94c0-13.27-11.38-24.65-24.65-24.65h-45.51l-104.3-119.47c-9.48-11.38-24.65-15.17-39.82-11.38l-36.03 11.38c-5.69 1.9-7.59 9.48-3.79 13.27l113.78 108.1h-172.59c-5.69 0-9.48 3.79-9.48 9.48v18.96c0 13.27 11.38 24.65 24.65 24.65h26.55v91.03c0 68.27 36.03 108.1 96.72 108.1 18.96 0 34.14-1.9 53.1-9.48v60.69c0 17.07 13.27 30.34 30.34 30.34h26.55c5.69 0 11.38-5.69 11.38-11.38v-271.19h43.62c5.69 0 9.48-3.79 9.48-9.48zm-121.37 163.09c-11.38 5.69-26.55 7.59-37.93 7.59-30.34 0-45.51-15.17-45.51-49.31v-91.03h83.44z" fill="#fff" />
                                                    </svg>

                                                </button>
                                                <button type="button" name="google-pay">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={80}
                                                        height={39}
                                                        viewBox="0 0 80 39"
                                                        fill="none"
                                                    >
                                                        <g clipPath="url(#clip0_134_34)">
                                                            <path
                                                                d="M37.8 19.7V29H34.8V6H42.6C44.5 6 46.3001 6.7 47.7001 8C49.1001 9.2 49.8 11 49.8 12.9C49.8 14.8 49.1001 16.5 47.7001 17.8C46.3001 19.1 44.6 19.8 42.6 19.8L37.8 19.7ZM37.8 8.8V16.8H42.8C43.9 16.8 45.0001 16.4 45.7001 15.6C47.3001 14.1 47.3 11.6 45.8 10.1L45.7001 10C44.9001 9.2 43.9 8.7 42.8 8.8H37.8Z"
                                                                fill="#5F6368"
                                                            />
                                                            <path
                                                                d="M56.7001 12.8C58.9001 12.8 60.6001 13.4 61.9001 14.6C63.2001 15.8 63.8 17.4 63.8 19.4V29H61V26.8H60.9001C59.7001 28.6 58 29.5 56 29.5C54.3 29.5 52.8 29 51.6 28C50.5 27 49.8 25.6 49.8 24.1C49.8 22.5 50.4 21.2 51.6 20.2C52.8 19.2 54.5 18.8 56.5 18.8C58.3 18.8 59.7 19.1 60.8 19.8V19.1C60.8 18.1 60.4 17.1 59.6 16.5C58.8 15.8 57.8001 15.4 56.7001 15.4C55.0001 15.4 53.7 16.1 52.8 17.5L50.2001 15.9C51.8001 13.8 53.9001 12.8 56.7001 12.8ZM52.9001 24.2C52.9001 25 53.3001 25.7 53.9001 26.1C54.6001 26.6 55.4001 26.9 56.2001 26.9C57.4001 26.9 58.6 26.4 59.5 25.5C60.5 24.6 61 23.5 61 22.3C60.1 21.6 58.8 21.2 57.1 21.2C55.9 21.2 54.9 21.5 54.1 22.1C53.3 22.6 52.9001 23.3 52.9001 24.2Z"
                                                                fill="#5F6368"
                                                            />
                                                            <path
                                                                d="M80 13.3L70.1 36H67.1L70.8 28.1L64.3 13.4H67.5L72.2 24.7H72.3L76.9 13.4H80V13.3Z"
                                                                fill="#5F6368"
                                                            />
                                                            <path
                                                                d="M25.9 17.7C25.9 16.8 25.8 15.9 25.7 15H13.2V20.1H20.3C20 21.7 19.1 23.2 17.7 24.1V27.4H22C24.5 25.1 25.9 21.7 25.9 17.7Z"
                                                                fill="#4285F4"
                                                            />
                                                            <path
                                                                d="M13.1999 30.5999C16.7999 30.5999 19.7999 29.3999 21.9999 27.3999L17.6999 24.0999C16.4999 24.8999 14.9999 25.3999 13.1999 25.3999C9.7999 25.3999 6.7999 23.0999 5.7999 19.8999H1.3999V23.2999C3.6999 27.7999 8.1999 30.5999 13.1999 30.5999Z"
                                                                fill="#34A853"
                                                            />
                                                            <path
                                                                d="M5.8001 19.8999C5.2001 18.2999 5.2001 16.4999 5.8001 14.7999V11.3999H1.4001C-0.499902 15.0999 -0.499902 19.4999 1.4001 23.2999L5.8001 19.8999Z"
                                                                fill="#FBBC04"
                                                            />
                                                            <path
                                                                d="M13.2 9.39996C15.1 9.39996 16.9 10.1 18.3 11.4L22.1 7.59996C19.7 5.39996 16.5 4.09996 13.3 4.19996C8.3 4.19996 3.7 6.99996 1.5 11.5L5.9 14.9C6.8 11.7 9.8 9.39996 13.2 9.39996Z"
                                                                fill="#EA4335"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_134_34">
                                                                <rect width={80} height="38.1" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="right border">
                                        <div className="header">Order Summary</div>
                                        <p>2 items</p>
                                        <div className="row item">
                                            <div className="col-4 align-self-center">
                                                <img
                                                    className="img-fluid"
                                                    src="https://i.imgur.com/79M6pU0.png"
                                                />
                                            </div>
                                            <div className="col-8">
                                                <div className="row">
                                                    <b>$ 26.99</b>
                                                </div>
                                                <div className="row text-muted">
                                                    Be Legandary Lipstick-Nude rose
                                                </div>
                                                <div className="row">Qty:1</div>
                                            </div>
                                        </div>
                                        <div className="row item">
                                            <div className="col-4 align-self-center">
                                                <img
                                                    className="img-fluid"
                                                    src="https://i.imgur.com/Ew8NzKr.jpg"
                                                />
                                            </div>
                                            <div className="col-8">
                                                <div className="row">
                                                    <b>$ 19.99</b>
                                                </div>
                                                <div className="row text-muted">
                                                    Be Legandary Lipstick-Sheer Navy Cream
                                                </div>
                                                <div className="row">Qty:1</div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row lower">
                                            <div className="col text-left">Subtotal</div>
                                            <div className="col text-right">$ 46.98</div>
                                        </div>
                                        <div className="row lower">
                                            <div className="col text-left">Delivery</div>
                                            <div className="col text-right">Free</div>
                                        </div>
                                        <div className="row lower">
                                            <div className="col text-left">
                                                <b>Total to pay</b>
                                            </div>
                                            <div className="col text-right">
                                                <b>$ 46.98</b>
                                            </div>
                                        </div>
                                        <div className="row lower">
                                            <div className="col text-left">
                                                <a href="#">
                                                    <u>Add promo code</u>
                                                </a>
                                            </div>
                                        </div>
                                        <button className="btn-payment">Place order</button>
                                        <p className="text-muted text-center">
                                            Complimentary Shipping &amp; Returns
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>




            </div>





        </div>

    )
}
