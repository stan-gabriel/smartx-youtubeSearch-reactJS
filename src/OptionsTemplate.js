/* eslint-disable */

import React from 'react';

export default function setOptionTemplate (className) {
  return ({data: {suggestion}, selected}) => {
    let styles = !selected ? {} : {backgroundColor: 'rgba(0, 0, 0, .1)'};

    return (
      <div style={styles} className={className}>
        {suggestion}
      </div>
    );
  };
}
