import React, { useState, useRef } from 'react';
import TreeNode from './TreeNode';
import Controls from './Controls';
import Legend from './Legend';
import AVLTree from '../avl/AVLTree';
import { calculateLayout } from '../utils/layout';
import '../styles/app.css';

const TreeVisualizer = () => {
  const [tree, setTree] = useState(new AVLTree());
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const svgRef = useRef(null);

  const updateTreeVisualization = () => {
    if (!tree.root) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: layoutNodes, edges: layoutEdges } = calculateLayout(tree.root);
    setNodes(layoutNodes);
    setEdges(layoutEdges);
  };

  const handleInsert = (value) => {
    tree.insert(parseInt(value));
    setHighlightedNode(parseInt(value));
    updateTreeVisualization();
    setTimeout(() => setHighlightedNode(null), 1000);
  };

  const handleDelete = (value) => {
    tree.delete(parseInt(value));
    updateTreeVisualization();
  };

  const handleClear = () => {
    setTree(new AVLTree());
    updateTreeVisualization();
  };

  const handleRandom = () => {
    const newTree = new AVLTree();
    const count = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < count; i++) {
      newTree.insert(Math.floor(Math.random() * 100));
    }
    setTree(newTree);
    updateTreeVisualization();
  };

  return (
    <div className="visualizer-container">
      <h1 className="app-title">AVL Tree Visualizer</h1>
      
      <Controls 
        onInsert={handleInsert}
        onDelete={handleDelete}
        onClear={handleClear}
        onRandom={handleRandom}
      />
      
      <div className="tree-container">
        <svg 
          ref={svgRef} 
          width="100%" 
          height="500" 
          viewBox="0 0 800 500" 
          className="tree-svg"
        >
          {/* Edges first so they appear behind nodes */}
          {edges.map((edge, index) => (
            <line
              key={index}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="#9F7AEA"
              strokeWidth="2"
            />
          ))}
          
          {/* Nodes */}
          {nodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node.data}
              x={node.x}
              y={node.y}
              isHighlighted={highlightedNode === node.data.value}
            />
          ))}
        </svg>
      </div>
      
      <Legend />
    </div>
  );
};

export default TreeVisualizer;