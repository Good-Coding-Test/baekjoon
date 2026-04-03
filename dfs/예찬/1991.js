const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const nodes = input.slice(1).map((item) => item.split(" "));

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  getL() {
    return this.left;
  }

  getR() {
    return this.right;
  }

  getValue() {
    return this.value;
  }

  insertL(node) {
    this.left = node;
  }

  insertR(node) {
    this.right = node;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  insert(node, l, r) {
    let newNode = null;
    if (this.root === null) {
      newNode = new Node(node);
      this.root = newNode;
    } else newNode = this.find(node);

    newNode.insertL(new Node(l === "." ? null : l));
    newNode.insertR(new Node(r === "." ? null : r));
  }

  find(value) {
    let needVisit = [this.root];

    while (needVisit.length) {
      const node = needVisit.shift();

      if (node.getValue() === value) return node;
      if (node.getL()) needVisit.push(node.getL());
      if (node.getR()) needVisit.push(node.getR());
    }
    return null;
  }

  front() {
    let result = [];

    function dfs(node) {
      result.push(node.getValue());
      if (node.getL()) dfs(node.getL());
      if (node.getR()) dfs(node.getR());
    }

    // while (needVisit.length) {
    //   const node = needVisit.pop();
    //   result.push(node.getValue());
    //   if (node.getL()) needVisit.push(node.getL());
    //   if (node.getR()) needVisit.push(node.getR());
    // }
    dfs(this.root);
    return result;
  }

  middle() {
    let result = [];

    function dfs(node) {
      if (node.getL()) dfs(node.getL());
      result.push(node.getValue());
      if (node.getR()) dfs(node.getR());
    }

    // while (needVisit.length) {
    //   const node = needVisit.pop();
    //   result.push(node.getValue());
    //   if (node.getL()) needVisit.push(node.getL());
    //   if (node.getR()) needVisit.push(node.getR());
    // }
    dfs(this.root);
    return result;
  }

  behind() {
    let result = [];

    function dfs(node) {
      if (node.getL()) dfs(node.getL());
      if (node.getR()) dfs(node.getR());
      result.push(node.getValue());
    }

    // while (needVisit.length) {
    //   const node = needVisit.pop();
    //   result.push(node.getValue());
    //   if (node.getL()) needVisit.push(node.getL());
    //   if (node.getR()) needVisit.push(node.getR());
    // }
    dfs(this.root);
    return result;
  }
}

const tree = new Tree();

for (let [n, l, r] of nodes) {
  tree.insert(n, l, r);
}

console.log(tree.front().join(""));
console.log(tree.middle().join(""));
console.log(tree.behind().join(""));
