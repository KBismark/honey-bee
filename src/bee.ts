class Bee {
  UI: UI;
  isSelectiveRendering: boolean;
  selector: any;
  externalData: { [k: string]: { data: any } };
  _imex: any;
  constructor() {
    this.UI = new UI();
    this.isSelectiveRendering = false;
    this.selector = null;
    this.externalData = {};
  }
  /**
   * Used for selecting independent components that needs to be hydrated after SSR.
   * **----Internal method----**
   */
  select(node: any, eventName: any) {
    const independentNode = getIndependentNode(node);
    const path = independentNode.getAttribute('bee-path'),
      compName = independentNode.getAttribute('bee-N');
    this.selector = {
      node: independentNode,
      iname: independentNode.getAttribute('bee-I'),
    };
    const clientRenderdNode = this.UI.render(Namings[path + compName](/**No Initial Args */) /**No Args */);
    independentNode.replaceWith(clientRenderdNode[internal].node);
    this.isSelectiveRendering = false;
    this.selector = null;
  }
  /** */
  create(
    htmlMethod: () => string,
    Setter: Function,
    dynamicNodes: any,
    dependencies: any,
    dynMethod: Function,
    comp: any,
  ) {
    const _internal_ = comp[internal];
    comp[internal] = null;
    const compClass = CreatedComponents.get(_internal_.fnId);
    compClass.setup(htmlMethod, Setter, dynamicNodes, dependencies, dynMethod, comp);
    if (compClass.isIndependent) {
      _internal_.independent = true;
    }
    if ((B as Bee).isSelectiveRendering && _internal_.independent) {
      return independent;
    }
    const node = compClass.getTemplate();
    comp = Object.create(comp);
    comp[internal] = _internal_;
    comp.initArgs = _internal_.InitArgs || comp.initArgs;
    _internal_.InitArgs = undefined;
    const id = _internal_.id;
    Blocks.set(id, comp);
    run(comp);
    const kNdN = Setter.call(comp, _internal_.Args, node, eventHandler, id, dependencies, true);
    _internal_.keyed = kNdN[0];
    _internal_.init_dyn = dynMethod(node); // kNdN[1];
    const attrDeps = (_internal_.attrDeps = new Map());
    const state = comp.state;
    let key, fn;
    if (state) {
      for (key in dependencies) {
        fn = dependencies[key];
        observeDependency(state, fn.$dep, attrDeps, { node: fn.key, attr: true, id: id, index: key });
      }
    }
    return node;
  }
}
/**
 * If IMEX is not included, set a shim
 */
if (typeof (window as any).IMEX != 'undefined') {
  Bee.prototype._imex = (window as any).IMEX;
} else {
    (window as any).IMEX = Bee.prototype._imex = {
    pathname: '',
    getPath() {
      return this.pathname;
    },
    // This value indicates the global IMEX objext is not original.
      isShimmed: true
  };
}

/**
 * Traverses from a child node to the nearest parent node which is marked as independent head node
 * on the server.
 * Identified with a `bee-I` attribute
 * @param node A SSR-built html element/node
 * @returns
 */
function getIndependentNode(node: any): any {
  return node.getAttribute('bee-I') ? node : getIndependentNode(node.parentNode);
}
