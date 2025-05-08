import TreeNode from './TreeNode';

class AVLTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    if (!node) return new TreeNode(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      return node; // Duplicates not allowed
    }

    // Update height and balance factor
    this._update(node);

    // Balance the node if needed
    return this._balance(node);
  }

  delete(value) {
    this.root = this._delete(this.root, value);
  }

  _delete(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._delete(node.left, value);
    } else if (value > node.value) {
      node.right = this._delete(node.right, value);
    } else {
      if (!node.left || !node.right) {
        return node.left || node.right;
      } else {
        const minNode = this._findMin(node.right);
        node.value = minNode.value;
        node.right = this._delete(node.right, minNode.value);
      }
    }

    if (!node) return null;

    // Update height and balance factor
    this._update(node);

    // Balance the node if needed
    return this._balance(node);
  }

  _findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  _update(node) {
    const leftHeight = node.left ? node.left.height : -1;
    const rightHeight = node.right ? node.right.height : -1;

    node.height = 1 + Math.max(leftHeight, rightHeight);
    node.balanceFactor = rightHeight - leftHeight;
  }

  _balance(node) {
    // Left heavy
    if (node.balanceFactor === -2) {
      if (node.left.balanceFactor <= 0) {
        return this._rightRotate(node);
      } else {
        node.left = this._leftRotate(node.left);
        return this._rightRotate(node);
      }
    }
    // Right heavy
    else if (node.balanceFactor === 2) {
      if (node.right.balanceFactor >= 0) {
        return this._leftRotate(node);
      } else {
        node.right = this._rightRotate(node.right);
        return this._leftRotate(node);
      }
    }

    return node;
  }

  _leftRotate(node) {
    const newParent = node.right;
    node.right = newParent.left;
    newParent.left = node;

    this._update(node);
    this._update(newParent);

    return newParent;
  }

  _rightRotate(node) {
    const newParent = node.left;
    node.left = newParent.right;
    newParent.right = node;

    this._update(node);
    this._update(newParent);

    return newParent;
  }
}

export default AVLTree;