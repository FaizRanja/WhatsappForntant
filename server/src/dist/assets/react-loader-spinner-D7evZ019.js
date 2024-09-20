import{j as t}from"./react-_5NTnwEc.js";import{d as e,m as i}from"./styled-components-DIVN2k1e.js";const p={"aria-busy":!0,role:"progressbar"};e.div`
  display: ${r=>r.$visible?"flex":"none"};
`;const l="http://www.w3.org/2000/svg",a=242.776657104492,f=1.6,$=i`
12.5% {
  stroke-dasharray: ${a*.14}px, ${a}px;
  stroke-dashoffset: -${a*.11}px;
}
43.75% {
  stroke-dasharray: ${a*.35}px, ${a}px;
  stroke-dashoffset: -${a*.35}px;
}
100% {
  stroke-dasharray: ${a*.01}px, ${a}px;
  stroke-dashoffset: -${a*.99}px;
}
`;e.path`
  stroke-dasharray: ${a*.01}px, ${a};
  stroke-dashoffset: 0;
  animation: ${$} ${f}s linear infinite;
`;const x=i`
to {
   transform: rotate(360deg);
 }
`;e.svg`
  animation: ${x} 0.75s steps(12, end) infinite;
  animation-duration: 0.75s;
`;e.polyline`
  stroke-width: ${r=>r.width}px;
  stroke-linecap: round;

  &:nth-child(12n + 0) {
    stroke-opacity: 0.08;
  }

  &:nth-child(12n + 1) {
    stroke-opacity: 0.17;
  }

  &:nth-child(12n + 2) {
    stroke-opacity: 0.25;
  }

  &:nth-child(12n + 3) {
    stroke-opacity: 0.33;
  }

  &:nth-child(12n + 4) {
    stroke-opacity: 0.42;
  }

  &:nth-child(12n + 5) {
    stroke-opacity: 0.5;
  }

  &:nth-child(12n + 6) {
    stroke-opacity: 0.58;
  }

  &:nth-child(12n + 7) {
    stroke-opacity: 0.66;
  }

  &:nth-child(12n + 8) {
    stroke-opacity: 0.75;
  }

  &:nth-child(12n + 9) {
    stroke-opacity: 0.83;
  }

  &:nth-child(12n + 11) {
    stroke-opacity: 0.92;
  }
`;const m=i`
to {
   stroke-dashoffset: 136;
 }
`;e.polygon`
  stroke-dasharray: 17;
  animation: ${m} 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
`;e.svg`
  transform-origin: 50% 65%;
`;const b=({visible:r=!0,height:n="80",width:o="80",ariaLabel:c="vortex-loading",wrapperStyle:d,wrapperClass:h,colors:s=["#1B5299","#EF8354","#DB5461","#1B5299","#EF8354","#DB5461"]})=>r?t.jsx("svg",{height:n,width:o,xmlns:l,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid","data-testid":"vortex-svg","aria-label":c,style:d,className:h,...p,children:t.jsx("g",{transform:"translate(50,50)",children:t.jsx("g",{transform:"scale(0.7)",children:t.jsx("g",{transform:"translate(-50,-50)",children:t.jsxs("g",{transform:"rotate(137.831 50 50)",children:[t.jsx("animateTransform",{attributeName:"transform",type:"rotate",repeatCount:"indefinite",values:"360 50 50;0 50 50",keyTimes:"0;1",dur:"1",keySplines:"0.5 0.5 0.5 0.5",calcMode:"spline"}),t.jsx("path",{fill:s[0],d:"M30.4,9.7c-7.4,10.9-11.8,23.8-12.3,37.9c0.2,1,0.5,1.9,0.7,2.8c1.4-5.2,3.4-10.3,6.2-15.1 c2.6-4.4,5.6-8.4,9-12c0.7-0.7,1.4-1.4,2.1-2.1c7.4-7,16.4-12,26-14.6C51.5,3.6,40.2,4.9,30.4,9.7z"}),t.jsx("path",{fill:s[1],d:"M24.8,64.2c-2.6-4.4-4.5-9.1-5.9-13.8c-0.3-0.9-0.5-1.9-0.7-2.8c-2.4-9.9-2.2-20.2,0.4-29.8 C10.6,25.5,6,36,5.3,46.8C11,58.6,20,68.9,31.9,76.3c0.9,0.3,1.9,0.5,2.8,0.8C31,73.3,27.6,69,24.8,64.2z"}),t.jsx("path",{fill:s[2],d:"M49.6,78.9c-5.1,0-10.1-0.6-14.9-1.8c-1-0.2-1.9-0.5-2.8-0.8c-9.8-2.9-18.5-8.2-25.6-15.2 c2.8,10.8,9.5,20,18.5,26c13.1,0.9,26.6-1.7,38.9-8.3c0.7-0.7,1.4-1.4,2.1-2.1C60.7,78.2,55.3,78.9,49.6,78.9z"}),t.jsx("path",{fill:s[3],d:"M81.1,49.6c-1.4,5.2-3.4,10.3-6.2,15.1c-2.6,4.4-5.6,8.4-9,12c-0.7,0.7-1.4,1.4-2.1,2.1 c-7.4,7-16.4,12-26,14.6c10.7,3,22.1,1.7,31.8-3.1c7.4-10.9,11.8-23.8,12.3-37.9C81.6,51.5,81.4,50.6,81.1,49.6z"}),t.jsx("path",{fill:s[4],d:"M75.2,12.9c-13.1-0.9-26.6,1.7-38.9,8.3c-0.7,0.7-1.4,1.4-2.1,2.1c5.2-1.4,10.6-2.2,16.2-2.2 c5.1,0,10.1,0.6,14.9,1.8c1,0.2,1.9,0.5,2.8,0.8c9.8,2.9,18.5,8.2,25.6,15.2C90.9,28.1,84.2,18.9,75.2,12.9z"}),t.jsx("path",{fill:s[5],d:"M94.7,53.2C89,41.4,80,31.1,68.1,23.7c-0.9-0.3-1.9-0.5-2.8-0.8c3.8,3.8,7.2,8.1,10,13 c2.6,4.4,4.5,9.1,5.9,13.8c0.3,0.9,0.5,1.9,0.7,2.8c2.4,9.9,2.2,20.2-0.4,29.8C89.4,74.5,94,64,94.7,53.2z"})]})})})})}):null;export{b as $};
