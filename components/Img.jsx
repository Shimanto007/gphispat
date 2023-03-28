import DefaultBanner from '../public/images/static/blur.jpg'
import styled from "styled-components";

export const Img = ({src, position, objectFit, height, width, banner, alt, left, margin, right, top, bottom}) => {
    return (
        <StyledImg className='global-image' objectFit={objectFit} margin={margin} position={position} left={left}
                   right={right} top={top}
                   bottom={bottom} height={height} width={width}>
            <img src={src ? src : DefaultBanner} alt={alt || ''}/>
        </StyledImg>

    );
};

const StyledImg = styled.div`
  position: ${props => props.position || 'absolute'};
  height: ${props => props.height || '100%'};
  width: ${props => props.width || '100%'};
  top: ${props => props.top || 0};
  left: ${props => props.left || 0};
  bottom: ${props => props.bottom || 0};
  right: ${props => props.right || 0};
  margin: ${props => props.margin || 0};

  img {
    width: 100%;
    height: 100%;
    object-fit: ${props => props.objectFit || 'cover'};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;