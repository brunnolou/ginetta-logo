import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
function cycle(t) {
  return (Math.sin(Math.PI * 2 * t) + 1) / 2;
}

class App extends Component {
  params = {
    baseFrequencyX: 0.03,
    baseFrequencyY: 0.02,
    scale: 30
  };
  componentDidMount() {
    this.turb.setAttribute(
      "baseFrequency",
      this.params.baseFrequencyX + " " + this.params.baseFrequencyY
    );
    this.dm.setAttribute("scale", this.params.scale);

    this.animate();
  }

  animate = timestamp => {
    if (!this.start) this.start = timestamp;
    if (!this.start1) this.start1 = timestamp;
    if (!this.start2) this.start2 = timestamp;
    let p = cycle((timestamp - this.start) / 10000);
    let yP = cycle((timestamp - this.start) / 15000);
    let xP = cycle((timestamp - this.start) / 20000);
    if (p > 1) this.start1 = 0;
    if (yP > 1) this.start2 = 0;
    if (xP > 1) this.start3 = 0;

    this.dm.setAttribute("scale", 10 + p * 20);

    this.turb.setAttribute(
      "baseFrequency",
      this.params.baseFrequencyX * xP + " " + this.params.baseFrequencyY * yP
    );
    requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <div className="App">
        <svg class="svg" width="100%" viewBox="0 0 100 150">
          <defs>
            <filter id="distortion">
              <feTurbulence
                ref={node => (this.turb = node)}
                type="fractalNoise"
                baseFrequency="0.000001"
                numOctaves="1"
                result="warp"
              />
              <feDisplacementMap
                ref={node => (this.dm = node)}
                xChannelSelector="R"
                yChannelSelector="G"
                scale="60"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>

            <filter id="tint">
              <feFlood
                result="floodFill"
                x="0"
                y="0"
                width="100%"
                height="100%"
                flood-color="#888899"
                flood-opacity=".8"
              />
              <feBlend in="SourceGraphic" in2="floodFill" mode="multiply" />
            </filter>

            <filter id="blend">
              <feFlood
                result="floodFill"
                x="0"
                y="0"
                width="100%"
                height="100%"
                flood-color="#888888"
                flood-opacity=".9"
              />
              <feBlend in="SourceGraphic" in2="floodFill" mode="overlay" />
            </filter>

            <clipPath id="logo-mask">
              <path
                transform="translate(25,115) scale(.5,-.5)"
                // transform="translate(25,32.5) scale(.5,.5)"
                d="M50 136c-19.876 0-36-16.225-36-36h72c0 19.775-16.023 36-36 36zm0-50c-19.882 0-36-16.118-36-36s16.118-36 36-36 36 16.118 36 36-16.118 36-36 36z"
              />
            </clipPath>
          </defs>
          <g>
            <g>
              <image
                className="bg-img"
                preserveAspectRatio="xMinYMin slice"
                style={{ filter: "url(#tint)" }}
                height="100%"
                width="100%"
                xlinkHref="./mountains.jpg"
              />
            </g>
            <g
              transform="translate(0,150) scale(1,-1)"
              className="icon-container"
              clip-path="url(#logo-mask)"
            >
              <image
                class="icon"
                preserveAspectRatio="xMinYMin slice"
                style={{ filter: "url(#distortion)" }}
                height="100%"
                width="100%"
                xlinkHref="./mountains.jpg"
              />
            </g>
          </g>
        </svg>

        <svg height="100%" width="100%">
          <defs>
            <clipPath id="svgPath" clipPathUnits="userSpaceOnUse">
              <path d="M50 136c-19.876 0-36-16.225-36-36h72c0 19.775-16.023 36-36 36zm0-50c-19.882 0-36-16.118-36-36s16.118-36 36-36 36 16.118 36 36-16.118 36-36 36z" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
}

export default App;
