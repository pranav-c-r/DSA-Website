import React from 'react';

const TreeNode = ({ node, x, y, isHighlighted }) => {
  const nodeRadius = 25;
  
  return (
    <g className={`tree-node ${isHighlighted ? 'highlighted' : ''}`}>
      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={nodeRadius}
        fill="#6B46C1"
        stroke="#9F7AEA"
        strokeWidth="2"
      />
      
      {/* Node value */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="#E9D8FD"
        fontSize="14"
        fontWeight="bold"
      >
        {node.value}
      </text>
      
      {/* Balance factor */}
      <text
        x={x}
        y={y - nodeRadius - 5}
        textAnchor="middle"
        fill="#38B2AC"
        fontSize="12"
      >
        {node.balanceFactor}
      </text>
    </g>
  );
};

export default TreeNode;