import React from 'react';

export interface PropTypes {
  children: React.ReactNode
}

export function Page(props: PropTypes) {
  return (
    <div>
      <div>Header</div>
      <div>{props.children}</div>
      <div>Footer</div>
    </div>
  );
}
