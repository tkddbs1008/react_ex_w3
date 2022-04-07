import React from "react";
import styled from 'styled-components'

const Img = (props) => {
    const {shape, src, size} = props;
    const styles = {
        src: src,
        size: size,
    };

    if(shape === "circle"){
        return (
            <ImgCircle {...styles}></ImgCircle>
        )
    }

    if(shape === "rectangle"){
        return(
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }
}

Img.defaultProps = {
    shape: "circle",
    src: "https://www.clym.io/wp-content/uploads/2020/10/website-cookie.jpeg",
    size: 48,
}

const AspectOutter = styled.div`
    margin: 10px auto;
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;

`;
const ImgCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;
`;

export default Img;