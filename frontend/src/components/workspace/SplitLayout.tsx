import React from 'react';
import Split from 'react-split';
import './SplitLayout.css'; // We'll need a minimal CSS file to ensure gutters work right

interface SplitLayoutProps {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  sizes?: [number, number];
  minSize?: number;
  direction?: 'horizontal' | 'vertical';
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ 
  leftPane, 
  rightPane, 
  sizes = [50, 50],
  minSize = 300,
  direction = 'horizontal'
}) => {
  return (
    <Split 
      className={`split flex w-full h-full ${direction === 'horizontal' ? 'flex-row' : 'flex-col'}`}
      sizes={sizes}
      minSize={minSize}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction={direction}
      cursor={direction === 'horizontal' ? 'col-resize' : 'row-resize'}
    >
      <div className="split-pane-content h-full relative overflow-hidden flex flex-col">{leftPane}</div>
      <div className="split-pane-content h-full relative overflow-hidden flex flex-col">{rightPane}</div>
    </Split>
  );
};

export default SplitLayout;
