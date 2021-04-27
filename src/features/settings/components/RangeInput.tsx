import { Range, getTrackBackground } from 'react-range';
import styled from 'styled-components';




interface IRangeStrip {
  value: number[];
  min: number;
  max: number;
}

interface IRangeParams extends IRangeStrip {
  step: number;
  onChange: (values: number[]) => void;
  rounds?: boolean;
}


const RangeWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  flex-direction: column-reverse;
  align-items: center;
  margin: .5em;
  @media (max-width: 596px) {
    width: 65%
  }
`;

const RangeStripWrap = styled.div`
  height: 36px;
  display: flex;
  width: 70%;
  @media (max-width: 596px) {
    width: 100%
  }
`;

const RangeStrip = styled(RangeStripWrap)<IRangeStrip>`
  height: 6px;
  width: 100%;
  border-radius: 12px;
  background: ${props => getTrackBackground({ values: props.value, colors: ["#ef5350", "#ccc"], min: props.min, max: props.max })};
  align-self: center;
`;

const StripIndicator = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 6px #aaa;
  &:focus {
    outline: none;
  }
`;

const Output = styled.output`
  color: #f44336;
  margin-top: 10px;
  font-size: 16px;
`;

export const RangeInput = ({ value, min, max, step, onChange, rounds }: IRangeParams) => {

  return (
    <RangeWrapper>
      <Range
        values={value}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <RangeStripWrap onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart}>
            <RangeStrip ref={props.ref} value={value} min={min}max={max}>
              {children}
            </RangeStrip>
          </RangeStripWrap>
        )}
        renderThumb={({ props, isDragged }) => (
          <StripIndicator
            {...props}
            
          ></StripIndicator>
        )}
      />
      <Output id="output">
        {rounds ? value : `${value}:00`}
      </Output>
    </RangeWrapper>
  );
}