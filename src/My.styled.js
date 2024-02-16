import styled from "styled-components";

export const EditableDiv = styled.div`
@media only screen and (max-width: 1100px) and (min-width: 700px){
font-size: 1.4rem;
line-height: 1.15em;}
@media only screen and (max-width: 700px) {
  font-size: 1.2rem;
  font-weight: 600;
}

padding-left: 10px; 
padding-block: 6px;
float: left;
text-align: left;
width: 100%; 
color: black;
cursor: pointer;
${({ edit }) => edit && `
    color: #757575;
    cursor: text;
  `}
:empty::before {
  content:attr(placeholder);
}
:nth-child(2) a {
  overflow: hidden;
}
 ::after {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}

:hover::after,
:focus::after{
  transform: translate3d(0, 0, 0);
}
.title-cont {
  display:flex;
  justify-content: space-between;
  width: 100%;
  
  // padding-bottom: 5px;
  padding-right: 10px;
} 
`
export const SubtractButton = styled.button`
${({enableDelete}) => enableDelete ? 'opacity: 1;' : 'opacity: 0;'}
transition: opacity .2s linear;
background-color: transparent;
border: none;
font-size: 2rem;
line-height: 0em;
padding: 0;
margin: auto;
height: 0px;
color: red;
transform: scale(2, 1);
align-self: self-start;
cursor: pointer;
`

export const Heart = styled.button`
cursor: pointer;
z-index: 8;
opacity: 0%;
position: absolute;
bottom: -1px;
right: -1px;
font-family: 'Sawarabi Mincho', serif;
/* font-size: small; */
font-size: 13.5px;
background-color: transparent;
border-width: 0px;
// color: ${favorited => favorited ? `#aaa` : `red`};
${({favorited}) => !!favorited 
? `color: red; text-shadow: none;`
: `color: transparent;
text-shadow: 0px 0px 0.35px hwb(16deg 33% 17% / 85%), 0px -0.75px 0.35px hwb(16deg 25% 43%), 0px 0.65px 0px hsl(16deg 100% 86% / 43%);`}`;


/* text-shadow: 0px 0px 0.35px rgb(229 123 84 / 80%), 0.25px 0.25px 0.5px rgb(249 183 160 / 50%), -0.85px -0.65px 0.35px rgb(194 98 64); 
0px 0px 0.35px hwb(16deg 33% 15% / 90%), -0.85px -0.65px 0.35px hwb(16deg 25% 43%), 0.3px 0.3px 0px hsl(16deg 100% 86% / 43%)
*/

/* 
display: inline-block;
margin: 2px;
aspect-ratio: 1; */
export const AddButton = styled.button`
  opacity: ${({edit}) => edit ? '1' : '0'};
  transition: opacity .2s linear;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  line-height: 6px;
  // color: green;
  padding-bottom: 5px;
  cursor: pointer;
`