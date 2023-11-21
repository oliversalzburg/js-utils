/**
 * Base class to quickly provide parent-child relationships.
 * @typeParam TNode - Your sub-class.
 * @group Data
 */
export abstract class TreeNode<TNode> {
  /**
   * The parent.
   */
  #parent: TNode | undefined;
  /**
   * Our children.
   */
  #children = new Set<TNode>();

  /**
   * The parent.
   * @returns The parent.
   */
  get parent(): TNode | undefined {
    return this.#parent;
  }

  /**
   * The children.
   * @returns The children.
   */
  get children(): Set<TNode> {
    return this.#children;
  }

  /**
   * Construct tree node.
   * @param parent - The parent.
   */
  constructor(parent?: TNode | undefined) {
    this.#parent = parent;
  }

  /**
   * Register a new child on the tree.
   * @param child - A new child.
   * @returns The child.
   */
  child(child: TNode) {
    this.children.add(child);
    return child;
  }
}
