import React from 'react';

export const Preview = (props) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.value}} />
  );
}
