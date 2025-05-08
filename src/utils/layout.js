export const calculateLayout = (root) => {
    if (!root) return { nodes: [], edges: [] };
  
    const nodes = [];
    const edges = [];
    const nodePositions = {};
  
    // Calculate positions using a modified Reingold-Tilford algorithm
    const calculatePositions = (node, depth = 0, pos = { x: 0, y: 0 }, parentPos = null) => {
      if (!node) return;
  
      const x = pos.x;
      const y = depth * 80 + 50;
  
      nodePositions[node.value] = { x, y };
  
      nodes.push({
        id: node.value,
        x,
        y,
        data: node
      });
  
      if (parentPos) {
        edges.push({
          x1: parentPos.x,
          y1: parentPos.y + 25,
          x2: x,
          y2: y - 25
        });
      }
  
      // Calculate positions for left and right children
      const spacing = Math.pow(2, 6 - depth);
      if (node.left) {
        calculatePositions(node.left, depth + 1, { x: x - spacing, y }, { x, y });
      }
      if (node.right) {
        calculatePositions(node.right, depth + 1, { x: x + spacing, y }, { x, y });
      }
    };
  
    // Start calculation from root
    calculatePositions(root);
  
    // Center the tree
    if (nodes.length > 0) {
      const minX = Math.min(...nodes.map(n => n.x));
      const maxX = Math.max(...nodes.map(n => n.x));
      const centerOffset = (minX + maxX) / 2;
  
      nodes.forEach(node => {
        node.x -= centerOffset;
        node.x += 400; // Center in SVG viewport
      });
  
      edges.forEach(edge => {
        edge.x1 -= centerOffset;
        edge.x1 += 400;
        edge.x2 -= centerOffset;
        edge.x2 += 400;
      });
    }
  
    return { nodes, edges };
  };