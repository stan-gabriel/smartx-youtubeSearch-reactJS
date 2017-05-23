import React from 'react';
import {number, func} from 'prop-types';

import './Filters.scss';

Filters.propTypes = {
  minSliderValue: number,
  sliderValue: number,
  maxSliderValue: number,
  handleSliderValue: func
};

export default function Filters ({
  minSliderValue,
  sliderValue,
  maxSliderValue,
  handleSliderValue
}) {
  return (
    <div className="filters">
      Filters:
      <div className="slider">
        <span>{minSliderValue}</span>
        <div className='slider-container'>
          <span>{sliderValue}</span>
          <input
            type='range'
            min={minSliderValue}
            max={maxSliderValue}
            onChange={handleSliderValue}
            value={sliderValue}
          />
        </div>
        <span>{maxSliderValue}</span>
      </div>
    </div>
  );
}