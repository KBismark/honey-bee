/**
 * The exposed HoneyBee object shall be stored in this variable as well.
 * Use this variable to access the object internally.    
 * **This variable is undefined outside a function scope hence, must be accessed only in a function scope**
 */
let B: Bee;
const renderingComponent: { id?: number; dynIndex?: number; chain: any } = {
  id: undefined,
  dynIndex: undefined,
  chain: new Map(),
};
const componentsTrashBin = new Set();
const ListsTrashBin = new Set();
const CreatedComponents = new Map();
const Blocks = new Map();
const MountBucket = new Map();
const TemplateBucket = new Map();
const standAloneUpdates = new Map();
const dynamicNodeUpdates = new Map();
const listUpdates = new Map();
let updates_initiated = false;
let updating = false;
const internal = Symbol();
const internal_ins = Symbol();
const _external = Symbol();
const ext_state = Symbol();
const independent = Symbol();
const Namings: { [k: string]: () => BeeComponentInstanceObject } = {};
let dinstinctComponents = 0;
let componentsID = 0;
let listCount = 0;
let global_template: any = undefined;
const STATUS = {
  alive: 1,
  hibernatedPartially: 2,
  hibernatedFully: 3,
  dead: 4,
};
const NODETYPES = {
  text: 1,
  component: 2,
  list: 3,
};
const PAGES: { [k: string]: number } = {};
const page_tracking: {
  isFirstRender: boolean;
  ispopstate: any;
  newPage: any;
  renderNewPage: any;
  newPageName: string;
  clientRendered: boolean;
  currentPage: null | number;
  currentPageName: string;
  onpageExit: {};
  onNewPage: {};
  visitedPages: {};
} = {
  isFirstRender: false,
  ispopstate: undefined,
  newPage: undefined,
  renderNewPage: undefined,
  newPageName: '',
  clientRendered: false,
  currentPage: null,
  currentPageName: window.location.origin,
  onpageExit: {},
  onNewPage: {},
  visitedPages: {},
};
let pagelock: symbol | {} = internal;
const pageopen = {};
window.addEventListener(
  'popstate',
  function PagePopState(e) {
    const pathname = window.location.pathname;
    if (PAGES[pathname]) {
      if (page_tracking.currentPageName != pathname) {
        B.UI.renderNewPage(pathname, (undefined as any), internal);
      }
    } else {
      history.replaceState(e.state, '', window.location.origin + page_tracking.currentPageName);
    }
  },
  false,
);

type BeeComponentInstanceObject = {
  [k: symbol]: { fnId: number; id: number; out?: BeeElement };
  readonly isComponent: true;
};
interface BeeElement {
  [k: symbol]: {
    node: HTMLElement | any;
    [k: string]: any;
  };
  // instance(initArgs: any): BeeComponentInstanceObject
}

function clone(_internal_: any) {
  const compClass = CreatedComponents.get(_internal_.fnId);
  if (compClass.isIndependent) {
    _internal_.independent = true;
  }
  if (B.isSelectiveRendering && _internal_.independent) {
    return independent;
  }
  const node = compClass.getTemplate();
  const comp = Object.create(compClass.proto);
  comp[internal] = _internal_;
  comp.initArgs = _internal_.InitArgs || comp.initArgs;
  _internal_.InitArgs = undefined;
  const id = _internal_.id;
  Blocks.set(id, comp);
  run(comp);
  const dependencies = compClass.deps;
  const kNdN = compClass.setAttr.call(comp, _internal_.Args, node, eventHandler, id, dependencies, false);
  _internal_.keyed = kNdN[0];
  _internal_.init_dyn = compClass.dynMethod(node); // kNdN[1];
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
function cloneWithState(comp: any, _internal_: any) {
  const compClass = CreatedComponents.get(_internal_.fnId);
  const node = compClass.getTemplate();
  Object.setPrototypeOf(comp, compClass.proto);
  const args = _internal_.Args;
  const state = comp.state;
  comp.onParentEffect && comp.onParentEffect.call(comp, args, state); // Call this.onParentEffect()
  comp.onMount && MountBucket.set(_internal_.id, comp); // Set onMount to be called later after rendering
  if (comp.public) {
    comp.public = comp.public.call(comp, args, state); // Set public data
  }
  const kNdN = compClass.setAttr.call(comp, _internal_.Args, node, eventHandler, _internal_.id, compClass.deps, false);
  _internal_.keyed = kNdN[0];
  _internal_.init_dyn = compClass.dynMethod(node); // kNdN[1];
  return node;
}
function run(t: any) {
  const _internal_ = t[internal];
  const args = _internal_.Args;
  !_internal_.created && t.onCreation && t.onCreation.call(t, args);
  _internal_.created = true;
  t.initArgs = undefined;
  const state = t.state;
  t.onParentEffect && t.onParentEffect.call(t, args, state); // Call this.onParentEffect()
  t.onMount && MountBucket.set(_internal_.id, t); // Set onMount to be called later after rendering
  if (t.public) {
    t.public = t.public.call(t, args, state); // Set public data
  }
}

class Bee {
  UI: UI;
  isSelectiveRendering: boolean;
  selector: any;
  externalData: { data: { [k: string]: { data: any } } };
  _imex: any;
  constructor() {
    this.UI = new UI();
    this.isSelectiveRendering = false;
    this.selector = null;
    let _ext = {data:{}};
    if ((window as any).HoneyBee) {
      _ext = (window as any).HoneyBee.externalData;
    }
    this.externalData = _ext;
  }
  isSSR: boolean = (window as any).HoneyBee ? (window as any).HoneyBee.isSSR : false;
  /**
   * Used for selecting independent components that needs to be hydrated after SSR.    
   * **----Internal method----**
   */
  select(node: any, eventName: any) {
    const independentNode = getIndependentNode(node);
    const path = independentNode.getAttribute('bee-path'),
      compName = independentNode.getAttribute('bee-N');
    B.selector = {
      node: independentNode,
      iname: independentNode.getAttribute('bee-I'),
    };
    const clientRenderdNode = B.UI.render(Namings[path + compName](/**No Initial Args */) /**No Args */);
    independentNode.replaceWith(clientRenderdNode[internal].node);
    B.isSelectiveRendering = false;
    B.selector = null;
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
    if (B.isSelectiveRendering && _internal_.independent) {
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
if ((window as any).HoneyBee) {
  (window as any).HoneyBee.select = Bee.prototype.select;
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

function keepStateIfDestroyed(this: { [k: symbol | number | string]: any }, bool: boolean) {
  const _internal_ = this[internal];
  if (_internal_.pure) {
    return;
  }
  _internal_.keepState = !!bool;
}
function keepEverythingIfDestroyed(this: { [k: symbol | number | string]: any }, bool: boolean) {
  const _internal_ = this[internal];
  if (_internal_.pure) {
    return;
  }
  _internal_.keepAll = !!bool;
}
function isIndependent(this: { [k: symbol | number | string]: any }) {
  const _internal_ = this[internal];
  if (_internal_.pure) {
    return;
  }
  _internal_.independent = true;
}
class ComponentClass {
  constructor(fn: Function) {
    this.fn = fn;
    dinstinctComponents++;
    this.id = dinstinctComponents;
  }
  template: any = undefined;
  dn: any = undefined;
  fn?: Function = undefined;
  id: number = 0;
  proto: any = undefined;
  html: any = undefined;
  setAttr: any = undefined;
  deps: any = undefined;
  isIndependent: boolean = false;
  dynMethod: any = undefined;

  setup(htmlMethod: () => string, setter: any, dn: any, dependencies: any, dynMethod: Function, proto: any) {
    this.dn = dn;
    this.deps = dependencies;
    this.proto = proto;
    this.html = htmlMethod;
    this.setAttr = setter;
    this.dynMethod = dynMethod;
    this.isIndependent = !!proto.isIndependent;
    proto.keepStateIfDestroyed = keepStateIfDestroyed;
    proto.keepEverythingIfDestroyed = keepEverythingIfDestroyed;
    proto.isIndependent = isIndependent;
  }
  getTemplate() {
    if (!this.template) {
      if (!global_template) {
        global_template = document.createElement('template');
      }
      global_template.innerHTML = this.html();
      this.template = global_template.content.firstElementChild;
      TemplateBucket.set(this.id, this);
    }
    return this.template.cloneNode(true);
  }
}

class ComponentInstance {
  constructor({ methodId, args, initArgs }: { methodId: number; args: any; initArgs?: any }) {
    this.id = ++componentsID;
    const b = this.outerValue[internal];
    b.id = componentsID;
    this.fnId = methodId;
    this.Args = args;
    this.InitArgs = initArgs;
    const a = this.ins[internal_ins];
    a.fnId = methodId;
    a.id = componentsID;
    a.out = b;
  }
  outerValue: BeeElement = {
    [internal]: {
      type: NODETYPES.component,
      parent: 0,
      dynIndex: 0,
      listItem: false,
      listIndex: 0,
      getList: undefined,
      node: undefined,
      id: 0,
    },
  };
  ins: BeeComponentInstanceObject = { [internal_ins]: { fnId: 0, id: 0, out: undefined }, isComponent: true };
  created? = false;
  pure: boolean = false;
  status = STATUS.dead;
  parent = 0;
  id = 0;
  fnId = 0;
  Args: any = undefined;
  InitArgs: any = undefined;
  init_dyn: any = undefined;
  keyed: { [k: string]: { $events: any; eventcallers: any; style: any; class: any; attributes: any } } | null = null;
}

function AfterInserts() {
  MountBucket.forEach(function (comp) {
    comp.onMount.apply(comp);
  });
  MountBucket.clear();
  TemplateBucket.forEach(function (compClass) {
    compClass.template = undefined;
  });
  TemplateBucket.clear();
  global_template = undefined;
}
/**
 * Schedule a batch update
 */
function startUpdates() {
  if (!updates_initiated) {
    updates_initiated = true;
    setTimeout(update, 1);
  }
}
/**
 * Cause an update
 */
function update() {
  updating = true;
  const newpage = _newpageRendered();
  if (!newpage) {
    dynamicNodeUpdates.forEach(updateStatefulDynamicnodes);
    dynamicNodeUpdates.clear();
    listUpdates.forEach(_listupdater);
    listUpdates.clear();
  } else {
    dynamicNodeUpdates.clear();
    listUpdates.clear();
  }
  // Perform after insert tasks like `onMount()`
  AfterInserts();
  /*
   * Schedule for clean-up right after updates
   * Clean-ups does not cause DOM changes hence
   * performed after the DOM updates.
   * Clean-ups with updates may extend update time and also cause frame drops.
   */
  setTimeout(cleanUp, 1);
  // cleanUp();
  updating = updates_initiated = false;
}
/**
 * Add reactivity to a state property
 * @param key A state property key
 * @returns {{[k:symbol|string]:any}}
 */
function keySetter(key: any): { [k: symbol | string]: any } {
  return {
    /**
     *  Set a state property value
     * @returns {void}
     */
    set: function (v: any) {
      const _internal_state = this[ext_state];
      const actualValue = _internal_state[key];
      let attrDeps = _internal_state[internal];
      const nodeDeps = attrDeps.nodeContainer;
      attrDeps = attrDeps.attrContainer;
      if (actualValue.value == v) {
        /*
         * Allow setting of same object to trigger update
         * This is to reduce the chance of creating new objects
         * when just the value of few properties or a nested properties
         * is changed.
         * Example: Doing `this.state.user = this.state.user` after `this.state.user.name = "new_value"`
         * should trigger update.
         */
        if (typeof v == 'object' && v) {
          const deps = actualValue.dependents,
            l = deps.length;
          let i, dep;
          if (!updating) {
            for (i = 0; i < l; i++) {
              dep = deps[i];
              if (dep.attr) {
                attrDeps.set(dep.index, dep.node);
              } else {
                nodeDeps.set(dep.dynIdex, dep.dynIdex);
              }
            }
            dynamicNodeUpdates.set(dep.id, dep.id);
            startUpdates();
          } else {
            for (i = 0; i < l; i++) {
              dep = deps[i];
              dep.update = true;
            }
          }
        }
        return;
      }
      actualValue.value = v;
      const deps = actualValue.dependents,
        l = deps.length;
      let i, dep;
      if (!updating) {
        // Currently not updating...
        for (i = 0; i < l; i++) {
          dep = deps[i];
          if (dep.attr) {
            // Set for attributes update
            attrDeps.set(dep.index, dep.node);
          } else {
            // Set for node update
            nodeDeps.set(dep.dynIdex, dep.dynIdex);
          }
        }
        // Register for updates in next cycle
        dynamicNodeUpdates.set(dep.id, dep.id);
        // Schedule for new update cycle
        startUpdates();
      } else {
        for (i = 0; i < l; i++) {
          dep = deps[i];
          dep.update = true;
        }
      }
    },
    /**
     * Get a state property value
     * @returns {any}
     */
    get: function () {
      return this[ext_state][key].value;
    },
  };
}
/**
 * Add reactivity to state properties
 */
const observeDependency = function observeDependency(
  obj: any,
  keys: any,
  upsContainer: any,
  dynIndexInfo: { attr: any; [k: string]: any },
) {
  let _internal_;
  if (!(_internal_ = obj[ext_state])) {
    _internal_ = obj[ext_state] = { [internal]: { attrContainer: undefined, nodeContainer: undefined } };
  }
  if (dynIndexInfo.attr) {
    _internal_[internal].attrContainer = upsContainer;
  } else {
    _internal_[internal].nodeContainer = upsContainer;
  }
  const l = keys.length;
  let value, key;
  for (let i = 0; i < l; i++) {
    value = obj[(key = keys[i])];
    if (!_internal_[key]) {
      _internal_[key] = {
        value: value,
        dependents: [dynIndexInfo],
      };
      Object.defineProperty(obj, key, keySetter(key));
    } else {
      _internal_[key].dependents.push(dynIndexInfo);
    }
  }
};
function _newpageRendered() {
  const newPage = page_tracking.renderNewPage;
  if (!newPage) return false;
  const currentPage = page_tracking.currentPage;
  const currentPageName = page_tracking.currentPageName;
  const newPageName = page_tracking.newPageName;
  if (newPage == currentPage) {
    if (newPageName != currentPageName) {
      page_tracking.currentPageName = newPageName;
      if (page_tracking.ispopstate == internal) {
        history.pushState(null, '', window.location.origin + newPageName);
      }
    }
  } else {
    if (page_tracking.isFirstRender) {
      window.scrollTo({ top: 0 });
    }
    if (page_tracking.clientRendered) {
      const newPageInstance = Blocks.get(newPage)[internal].ins;
      const block = Blocks.get(currentPage);
      const node = block[internal].outerValue[internal].node;
      const replacer = document.createTextNode('');
      node.replaceWith(replacer);
      replacer.replaceWith(B.UI.render(newPageInstance)[internal].node);
      componentsTrashBin.add(currentPage);
      page_tracking.currentPageName = newPageName;
      page_tracking.currentPage = newPage;
    } else {
      const newPageInstance = Blocks.get(newPage)[internal].ins;
      const block = Blocks.get(currentPage);
      let node = block[internal].outerValue[internal].node;
      if (!node) {
        node = block[internal].outerValue[internal].node = document.getElementById('page');
      }
      const replacer = document.createTextNode('');
      node.replaceWith(replacer);
      replacer.replaceWith(B.UI.render(newPageInstance)[internal].node);
      componentsTrashBin.add(newPage);
      page_tracking.currentPageName = newPageName;
      page_tracking.currentPage = newPage;
    }
    return true;
  }
  if (page_tracking.isFirstRender) {
    window.scrollTo({ top: 0 });
  }
  page_tracking.newPageName = '';
  page_tracking.isFirstRender = false;
  page_tracking.ispopstate = page_tracking.ispopstate = page_tracking.renderNewPage = undefined;
  return false;
}

function _listupdater(value: any) {
  const parentData = { id: value.pos.parent, i: value.pos.dynIndex };
  updateList(value, parentData, undefined);
}
function _clean(id: any) {
  clearComponents(undefined, id);
}
function cleanUp() {
  componentsTrashBin.forEach(_clean);
  componentsTrashBin.clear();
  // console.log(Blocks);
}
/**
 * Destroy components. However, not all components are
 * entirely destroyed.
 */
function clearComponents(children: any, id: any) {
  let comp = Blocks.get(id);
  const _internal_ = comp[internal];
  if (_internal_.keepAll) {
    children = children || _internal_.childComponents;
    let tmp = _internal_.outerValue[internal];
    tmp.node.remove();
    triggerHibernateEvents(children, id);
  } else {
    const onDestroyed = comp.onDestroyed;
    comp.willDestroy && comp.willDestroy.call(comp, comp.state);
    children = children || _internal_.childComponents;
    let tmp = _internal_.outerValue[internal];
    tmp.node = tmp.listItem = tmp.getList = undefined;
    tmp = _internal_.ins[internal_ins];
    if (_internal_.keepState) {
      comp = { state: comp.state };
      comp[internal] = _internal_;
      Blocks.set(id, comp);
      _internal_.status = STATUS.hibernatedPartially;
    } else {
      Blocks.delete(id);
      _internal_.status = STATUS.dead;
    }

    const keyed = _internal_.keyed;
    let key, keyedvalue;
    for (key in keyed) {
      removeEvents((keyedvalue = keyed[key]).node, keyedvalue.evc);
    }
    _internal_.keyed = _internal_.dyn = undefined;
    children.forEach(clearComponents);
    children.clear();
    onDestroyed && onDestroyed();
  }
}
function triggerHibernateEvents(children: any, id: any) {
  const comp = Blocks.get(id);
  const onHibernated = comp.onHibernated;
  const state = comp.state;
  comp.willHibernate && comp.willHibernate.call(comp, state);
  children.forEach(triggerHibernateEvents);
  onHibernated && onHibernated.call(comp, state);
  comp[internal].status = STATUS.hibernatedFully;
}
function runElementEvent(data: { event?: Event | null; key: string; id: number; ev: any }) {
  const comp = Blocks.get(data.id);
  const keyed_Data = comp[internal].keyed[data.key];
  // Run event
  keyed_Data.$events[data.ev].apply((data.event as Event).target, [data.event, comp]);
  data.event = null;
}
function eventHandler(this: { event?: Event | null; key: string; id: number; ev: any }, e: Event) {
  const data = this;
  data.event = e;
  runElementEvent(data);
}
// Remove event handlers
function removeEvents(element: any, eventCallers: { [k: string]: Function }) {
  for (let i in eventCallers) {
    element.removeEventListener(i, eventCallers[i], false);
  }
}

function insertList(list: ListInternal, parentData: { id: number; i: number }, node?: any) {
  updateListData(list);
  const lc: any = list.curData;
  let value,docF: any = undefined,ar,e,j,ee: any,pid = parentData.id,pidx = parentData.i;
  let getList = list.getList;
  if ((value = lc.length)) {
    docF = document.createDocumentFragment();
    ar = new Array(value);
    loop: for (j = 0; j < value; j++) {
      ee = lc[j];
      if ((ee = ee[internal_ins])) {
        e = ee.out;
        ar[j] = e.node;
        e.parent = pid;
        e.dynIndex = pidx;
        e.listItem = true;
        e.getList = getList;
        continue loop;
      }
      ar[j] = lc[j];
      lc[j] = list_text_replacer;
    }
    docF.append.apply(docF, ar);
    value = list.pos;
    value.head = docF.firstChild;
    value.tail = docF.lastChild;
  } else {
    value = list.pos;
    value.head = value.tail = document.createTextNode('');
  }
  value.dynIndex = pidx;
  value.parent = pid;
  return docF || value.head;
}
function removeList(list: ListInternal, head: any) {
  let lc = list.curData,
    value = list.pos,
    r,
    e,
    j,
    ee: any,
    l;

  if ((l = lc.length)) {
    let chain = renderingComponent.chain;
    if (!head) {
      Blocks.get(value.parent)[internal].dyn[value.dynIndex as number] = {
        /*value: "",*/ type: NODETYPES.text,
        node: (head = document.createTextNode('')),
      };
    }
    r = head;
    let curHead = value.head;
    let parent_1 = curHead.parentNode;
    if (parent_1.firstChild == curHead && parent_1.lastChild == value.tail) {
      parent_1.textContent = '';
      parent_1.appendChild(head);
      for (j = 0; j < l; j++) {
        ee = lc[j];
        if ((ee = ee[internal_ins])) {
          e = ee.out;
          e.parent = 0;
          e.dynIndex = 0;
          e.listItem = false;
          e.getList = undefined;
          chain.delete(e.id);
          componentsTrashBin.add(e.id);
        }
      }
    } else {
      curHead.replaceWith(head);
      for (j = 1; j < l; j++) {
        ee = lc[j];
        head.nextSibling.remove();
        if ((ee = ee[internal_ins])) {
          e = ee.out;
          e.parent = 0;
          e.dynIndex = 0;
          e.listItem = false;
          e.getList = undefined;
          chain.delete(e.id);
          componentsTrashBin.add(e.id);
        }
      }
      if ((ee = (lc[0] as any)[internal_ins])) {
        e = ee.out;
        e.parent = 0;
        e.dynIndex = 0;
        e.listItem = false;
        e.getList = undefined;
        chain.delete(e.id);
        componentsTrashBin.add(e.id);
      }
    }

    value.head = undefined;
    value.tail = undefined;
  } else {
    if (!head) {
      Blocks.get(value.parent)[internal].dyn[value.dynIndex as number] = {
        /* value: "",*/ type: NODETYPES.text,
        node: (r = value.head),
      };
    } else {
      value.head.replaceWith(head);
      r = head;
    }
    value.head = value.tail = undefined;
  }
  value.dynIndex = 0;
  value.parent = 0;
  return r;
}
function updateListData(list: ListInternal) {
  let stack = list.stack;
  let data = list.curData,
    i;
  let l = stack.length;
  let item, d, a, t, b;
  if (stack.length) {
    list.stack = [];

    for (i = 0; i < l; i++) {
      item = stack[i];
      d = data.length;
      /**Top*/
      t = item.from;
      b /*Bottom*/ = item.to;
      switch (item.type) {
        case 'remove':
          data = [...data.slice(0, t), ...data.slice(b + 1)];
          break;
        case 'insert':
          a = item.before;
          if (a >= d) {
            data = [...data, ...item.value];
          } else {
            data = [...data.slice(0, a), ...item.value, ...data.slice(a)];
          }
          break;
        default:
          break;
      }
    }
    list.curData = data;
  }
  d = list.runner;
  t = d.fn;
  if (t && (b = list.curData) && (l = b.length)) {
    data = d.data;
    for (i = 0; i < l; i++) {
      t(b[i], i, data);
    }
  }
  d.fn = d.data = undefined;
}

function updateList(list: any, parentData: any, node: any) {
  let stack = list.stack;
  let data, d, t, b, l, i;
  if (stack.length) {
    list.stack = [];
    data = list.curData;
    l = stack.length;
    d = data.length;
    let head = list.pos.head;
    let tail = list.pos.tail;
    let j, a, tmp, parent_1, item: any, el: any;
    let pid = parentData.id,
      pidx = parentData.i;
    let args,
      argsData,
      handler,
      getList_1 = list.getList;
    let chain = renderingComponent.chain;
    for (i = 0; i < l; i++) {
      item = stack[i];
      d = data.length;
      switch (item.type) {
        case 'remove':
          a = item.total;
          t = item.from;
          b = item.to;
          if (d == a) {
            head = list.pos.head;
            tail = list.pos.tail;
            parent_1 = head.parentNode;
            if (parent_1.firstChild == head && parent_1.lastChild == tail) {
              parent_1.textContent = '';
              list.pos.tail = list.pos.head = parent_1.appendChild(document.createTextNode(''));
              for (j = 0; j < a; j++) {
                if ((el = data[j][internal_ins])) {
                  el = el.out;
                  el.parent = 0;
                  el.dynIndex = 0;
                  el.listItem = false;
                  el.getList = undefined;
                  chain.delete(el.id);
                  componentsTrashBin.add(el.id);
                }
              }
            } else {
              for (j = 1; j < a; j++) {
                head.nextSibling.remove();
                if ((el = data[j][internal_ins])) {
                  el = el.out;
                  el.parent = 0;
                  el.dynIndex = 0;
                  el.listItem = false;
                  el.getList = undefined;
                  chain.delete(el.id);
                  componentsTrashBin.add(el.id);
                }
              }
              list.pos.tail = list.pos.head = head;
              if ((el = data[0][internal_ins])) {
                el = el.out;
                el.parent = 0;
                el.dynIndex = 0;
                el.listItem = false;
                el.getList = undefined;
                chain.delete(el.id);
                componentsTrashBin.add(el.id);
              }
            }
          } else {
            head = list.pos.head;
            parent_1 = head.parentNode;
            if (parent_1.firstChild == head) {
              head = parent_1.childNodes[t];
              //  for (j = 0; j < t; j++) {
              //      head = head.nextSibling;
              //  }
              // If the current tail node must be removed,
              // then the next tail node is the previousSibling
              // of the `from` node
              if (d - 1 == b) {
                list.pos.tail = head.previousSibling;
              }
              for (j = t; j <= b; j++) {
                tmp = head.nextSibling;
                head.remove();
                head = tmp;
                if ((el = data[j][internal_ins])) {
                  el = el.out;
                  el.parent = 0;
                  el.dynIndex = 0;
                  el.listItem = false;
                  el.getList = undefined;
                  chain.delete(el.id);
                  componentsTrashBin.add(el.id);
                }
              }
              // If the current head node must be removed,
              // then the next head node is the nextSibling of
              //  the `to` node
              if (t == 0) {
                list.pos.head = head;
              }
            } else if (t - 0 < d - b) {
              for (j = 0; j < t; j++) {
                head = head.nextSibling;
              }
              // If the current tail node must be removed,
              // then the next tail node is the previousSibling
              // of the `from` node
              if (d - 1 == b) {
                list.pos.tail = head.previousSibling;
              }
              for (; j <= b; j++) {
                tmp = head.nextSibling;
                head.remove();
                head = tmp;
                if ((el = data[j][internal_ins])) {
                  el = el.out;
                  el.parent = 0;
                  el.dynIndex = 0;
                  el.listItem = false;
                  el.getList = undefined;
                  chain.delete(el.id);
                  componentsTrashBin.add(el.id);
                }
              }
              // If the current head node must be removed,
              // then the next head node is the nextSibling of
              //  the `to` node
              if (t == 0) {
                list.pos.head = head;
              }
            } else {
              for (j = d - 1; j > b; j--) {
                tail = tail.previousSibling;
              }
              // If the current head node must be removed,
              // then the next head node is the nextSibling of
              //  the `to` node
              if (t == 0) {
                list.pos.tail = tail.nextSibling;
              }
              for (; j >= t; j--) {
                tmp = tail.previousSibling;
                tail.remove();
                tail = tmp;
                if ((el = data[j][internal_ins])) {
                  el = el.out;
                  el.parent = 0;
                  el.dynIndex = 0;
                  el.listItem = false;
                  el.getList = undefined;
                  chain.delete(el.id);
                  componentsTrashBin.add(el.id);
                }
              }
              // If the current tail node must be removed,
              // then the next tail node is the previousSibling
              // of the `from` node
              if (d - 1 == b) {
                list.pos.tail = tail;
              }
            }
          }
          data = [...data.slice(0, t), ...data.slice(b + 1)];
          break;
        case 'insert':
          a = item.before;
          if (a >= d) {
            data = [...data, ...item.value];
          } else {
            data = [...data.slice(0, a), ...item.value, ...data.slice(a)];
          }

          b = item.value;
          if ((args = item.args)) {
            t = b.length;
            argsData = args.data;
            handler = args.handler;
            for (j = 0; j < t; j++) {
              handler(b[j], j, argsData);
            }
          }
          tmp = buildListNodes(b, pid, pidx, getList_1);
          head = list.pos.head;
          if (!d) {
            list.pos.head = tmp.firstChild;
            list.pos.tail = tmp.lastChild;
            head.replaceWith(tmp);
          } else {
            head = list.pos.head;
            parent_1 = head.parentNode;
            if (parent_1.firstChild == head) {
              head = parent_1.childNodes[a];
              parent_1.insertBefore(tmp, head);
            } else if (a - 0 <= d - a) {
              if (a == 0) {
                list.pos.head = tmp.firstChild;
              }
              for (j = 0; j < a; j++) {
                head = head.nextSibling;
              }
              parent_1.insertBefore(tmp, head);
            } else {
              // parent_1 = list.pos.tail.parentNode;
              if (a >= d) {
                tail = list.pos.tail.nextSibling;
                list.pos.tail = tmp.lastChild;
              } else {
                tail = list.pos.tail;
              }
              for (j = d - 1; j > a; j--) {
                tail = tail.previousSibling;
              }
              parent_1.insertBefore(tmp, tail);
            }
          }
          break;
        default:
          break;
      }
    }
    list.curData = data;
    d = list.runner;
    t = d.fn;
    if (t && (b = list.curData) && (l = b.length)) {
      data = d.data;
      for (i = 0; i < l; i++) {
        t(b[i], i, data);
      }
    }
    d.fn = d.data = undefined;
    if (!list.curData.length) {
      list.pos.head.replaceWith((list.pos.tail = document.createTextNode('')));
      list.pos.head = list.pos.tail;
    }
  } else {
    d = list.runner;
    t = d.fn;
    if (t && (b = list.curData) && (l = b.length)) {
      data = d.data;
      for (i = 0; i < l; i++) {
        t(b[i], i, data);
      }
    }
    d.fn = d.data = undefined;
  }
}
let list_text_replacer = {};
/**
 *
 * @param listData
 * @param parent
 * @param dynIndex
 * @param listGetter
 * @returns
 */
function buildListNodes(listData: any, parent: number, dynIndex: number, listGetter: typeof getList) {
  let l = listData.length,
    ar,
    j,
    e;
  let docF = document.createDocumentFragment();
  ar = new Array(l);
  loop: for (j = 0; j < l; j++) {
    e = listData[j];
    if ((e = e[internal_ins])) {
      e = e.out;
      ar[j] = e.node;
      e.parent = parent;
      e.dynIndex = dynIndex;
      e.listItem = true;
      e.getList = listGetter;
      componentsTrashBin.delete(e.id);
      continue loop;
    }
    ar[j] = listData[j];
    listData[j] = list_text_replacer;
  }
  docF.append.apply(docF, ar);
  return docF;
}
const getList = function getList(this: any): ListInternal {
  return this[internal];
};
type ListInternal = {
  id: number;
  type: number;
  stack: any[];
  length: number;
  curData: (string | BeeComponentInstanceObject)[];
  getList(): ListInternal;

  pos: { head?: any; tail?: any; dynIndex?: number; parent?: number };
  runner: any;
};

function getListItem(item: any) {
  return item && item[internal_ins] ? item : item == null ? '' : ''.concat(item);
}

class List {
  constructor(list: any[]) {
    const a = this[internal];
    a.curData = list.map(getListItem);
    a.id = ++listCount;
  }

  [internal]: ListInternal = {
    getList: getList.bind(this),
    id: 0,
    curData: [],
    length: 0,
    stack: [],
    type: NODETYPES.list,
    pos: {
      head: undefined,
      tail: undefined,
      dynIndex: undefined,
      parent: undefined,
    },
    runner: { fn: undefined, data: undefined },
  };
  map<T>(data: T, fn?: (listItem: any, index: number, data: T, args: any, This: any) => any, thisArg?: any): this {
    if (fn) {
      const _internal_ = this[internal];
      _internal_.runner.fn = fn.bind(thisArg || null);
      _internal_.runner.data = data;
    }
    return this;
  }
  clear() {
    const _internal_ = this[internal];
    //  _internal_.nextData = [];
  }
  get() {
    return this[internal].curData.slice(0);
  }
  remove(from: number, to?: number) {
    let l;
    const _internal_ = this[internal];
    l = _internal_.length;
    if (typeof to != 'number' || to > l) {
      to = l - 1;
    }
    if (to < from || from >= l) return;
    const t = to - from + 1;
    _internal_.length = l - t;
    _internal_.stack.push({ type: 'remove', from: from, to: to, total: t });
    listUpdates.set(_internal_.id, _internal_);
    startUpdates();
  }
  insertBefore<T, U = string | number | boolean | BeeComponentInstanceObject>(
    index: number,
    list: U | Array<U>,
    controller?: { data: T; handler: (listItem: U, index: number, data: T, args: any, This: any) => void },
    thisArg?: any,
  ) {
    const _internal_ = this[internal];
    let l = _internal_.length,
      i,
      t = 1;
    const bf = index < 0 ? l : index >= l ? l : index;
    let value;
    if (Array.isArray(list)) {
      t = list.length;
      value = new Array(t);
      for (i = 0; i < t; i++) {
        value[i] = getListItem(list[i]);
      }
    } else {
      value = [getListItem(list)];
    }
    _internal_.length = l + t;
    if (controller) {
      controller.handler = controller.handler.bind(thisArg || null);
    }
    _internal_.stack.push({ type: 'insert', value: value, before: bf, args: controller });
    listUpdates.set(_internal_.id, _internal_);
    startUpdates();
  }
  size() {
    return this[internal].length;
  }
}

function runDynamicnodes(id: number, classDyn: Array<any>, compDyn: any) {
  const l = classDyn.length;
  const comp = Blocks.get(id);
  const _internal_ = comp[internal];
  renderingComponent.chain.set(id, (_internal_.childComponents = _internal_.childComponents || new Map()));
  if (l) {
    const state = comp.state;
    const dyn = (_internal_.dyn = new Array(l));
    const nodeDeps = (_internal_.nodeDeps = new Map());
    const dn = classDyn;
    let method;
    const Args = _internal_.Args;
    let value, el, i;
    let statekeys, valueType;
    const parentChain = renderingComponent.chain;
    const parentId = renderingComponent.id;
    renderingComponent.chain = _internal_.childComponents;
    renderingComponent.id = id;
    let serverRenderedIndependentNodes: Array<any> | undefined = undefined;
    if (B.selector && !B.selector.ignore) {
      B.selector.ignore = B.isSelectiveRendering = true;
      serverRenderedIndependentNodes = Object.values(
        B.selector.node.getElementsByClassName('bee-' + B.selector.iname) || {},
      );
    }

    for (i = 0; i < l; i++) {
      method = dn[i];
      renderingComponent.dynIndex = i;
      if ((statekeys = method[_external])) {
        observeDependency(comp.state, statekeys, nodeDeps, { attr: false, id: id, dynIdex: i });
        value = method.call(comp, state);
        valueType = typeof value;
      } else {
        value = method.call(comp, Args, state);
        valueType = typeof value;
        if (valueType == 'function' && (statekeys = value[_external])) {
          // Dynamic Component
          observeDependency(comp.state, statekeys, nodeDeps, { attr: false, id: id, dynIdex: i });
          dn[i] = value;
          value = value.call(comp, state);
          valueType = typeof value;
        }
      }
      if (value == independent) {
        dyn[i] = {
          node: (serverRenderedIndependentNodes as Array<any>).shift(),
          type: NODETYPES.text /*value: value*/,
        };
        compDyn[i].replaceWith(dyn[i].node);
        continue;
      }
      switch (valueType) {
        case 'object':
          if (value) {
            if ((el = value[internal])) {
              if (el.type == NODETYPES.list) {
                compDyn[i].replaceWith(insertList(el, { i: i, id: id }, undefined));
              } else {
                compDyn[i].replaceWith(el.node);
                el.parent = id;
                el.dynIndex = i;
              }
              dyn[i] = el;
              break;
            }
          } else {
            value = '';
          }
        default:
          value = ''.concat(value);
          el = document.createTextNode(value);
          compDyn[i].replaceWith(el);
          dyn[i] = { node: el, type: NODETYPES.text /*value: value*/ };
          break;
      }
    }
    renderingComponent.id = parentId;
    renderingComponent.chain = parentChain;
    renderingComponent.dynIndex = undefined;
  }
  _internal_.Args = undefined;
}
function updateDynamicnodes(id: number) {
  const comp = Blocks.get(id);
  const _internal_ = comp[internal];
  const compClass = CreatedComponents.get(_internal_.fnId);
  const deps = compClass.deps;
  const attrDeps = _internal_.attrDeps;
  const keyed = _internal_.keyed;
  const state = comp.state;
  attrDeps.forEach(function (nodekey: string, fn_key: string) {
    deps[fn_key].call(comp, keyed[nodekey].node, state, false);
  });
  attrDeps.clear();
  const l = compClass.dn.length;
  if (l) {
    const nodeDeps = _internal_.nodeDeps;
    const dyn = _internal_.dyn;
    const dn = compClass.dn;
    const Args = _internal_.Args;
    let value, el, e, i, tmp, tmp2, bn;
    let method;
    const currentChain = renderingComponent.chain;
    const currentId = renderingComponent.id;
    const chain = (renderingComponent.chain = _internal_.childComponents);
    renderingComponent.id = id;
    for (i = 0; i < l; i++) {
      renderingComponent.dynIndex = i;
      method = dn[i];
      if (method[_external]) {
        if (!nodeDeps.has(i)) {
          continue;
        } else {
          value = method.call(comp, state);
        }
      } else {
        value = method.call(comp, Args, state);
      }
      if (value == independent) {
        continue;
      }
      switch (typeof value) {
        case 'object':
          if (value) {
            if ((el = value[internal])) {
              if (el.type == NODETYPES.list) {
                switch ((tmp = dyn[i]).type) {
                  case NODETYPES.text:
                    if (el.pos.head) {
                      removeList(el, undefined);
                    }
                    tmp.node.replaceWith(insertList(el, { i: i, id: id }, undefined));
                    dyn[i] = el;
                    break;
                  case NODETYPES.component:
                    if (el.pos.head) {
                      removeList(el, undefined);
                    }
                    tmp.parent = 0;
                    tmp.dynIndex = 0;
                    componentsTrashBin.add(tmp);
                    bn = bn || document.createTextNode('');
                    (tmp2 = tmp.node).replaceWith(bn);
                    bn.replaceWith(insertList(el, { i: i, id: id }, undefined));
                    dyn[i] = el;
                    if (!tmp2.parentNode || tmp.parent != id) {
                      // Component is either not reused or is reused in a different parent component
                      chain.delete(tmp.id);
                      componentsTrashBin.add(tmp.id);
                    }
                    break;
                  default: // Lists
                    if (tmp != el) {
                      if (el.pos.head) {
                        removeList(el, undefined);
                      }
                      e = removeList(tmp, undefined);
                      e.replaceWith(insertList(el, { i: i, id: id }, undefined));
                      // ListsTrashBin.add(tmp);
                      dyn[i] = el;
                    } else {
                      updateList(el, { i: i, id: id }, undefined);
                    }
                    break;
                }
              } else {
                // New node is component

                switch (
                  (tmp = dyn[i]).type // Match against type of current node
                ) {
                  case NODETYPES.text:
                    tmp.node.replaceWith(el.node);
                    el.parent = id;
                    el.dynIndex = i;
                    dyn[i] = el;
                    break;
                  case NODETYPES.component:
                    if (el.id != tmp.id) {
                      tmp.node.replaceWith(el.node);
                      el.parent = id;
                      el.dynIndex = i;
                      tmp.parent = 0;
                      tmp.dynIndex = 0;
                      dyn[i] = el;
                      chain.delete(tmp.id);
                      componentsTrashBin.add(tmp.id);
                    }
                    break;
                  default: // Lists
                    e = removeList(tmp, undefined);
                    e.replaceWith(el.node);
                    el.parent = id;
                    el.dynIndex = i;
                    dyn[i] = el;
                    // ListsTrashBin.add(tmp);
                    break;
                }
                // Delete component from trash bin if exists since it's being used
                componentsTrashBin.delete(el.id);
              }
              break;
            }
          } else {
            value = '';
          }
        default:
          value = ''.concat(value);
          switch ((tmp = dyn[i]).type) {
            case NODETYPES.text:
              tmp2 = tmp.node;
              if (tmp2.textContent != value) {
                //  tmp.node.textContent = value;
                // tmp.value = value;
                tmp2.textContent = value;
              }
              break;
            case NODETYPES.component:
              el = document.createTextNode(value);
              tmp.parent = 0;
              tmp.dynIndex = 0;
              tmp.node.replaceWith(el);
              componentsTrashBin.add(tmp.id);
              dyn[i] = { node: el, type: NODETYPES.text /*value: value*/ };
              break;
            default: // Lists
              el = removeList(tmp, document.createTextNode(value));
              // ListsTrashBin.add(tmp);
              dyn[i] = { node: el, type: NODETYPES.text /*value: value*/ };
              break;
          }
          break;
      }
    }
    nodeDeps.clear();
    dynamicNodeUpdates.delete(id);
    renderingComponent.id = currentId;
    renderingComponent.chain = currentChain;
    renderingComponent.dynIndex = undefined;
  }
  _internal_.Args = undefined;
}
function updateStatefulDynamicnodes(id: number) {
  const comp = Blocks.get(id);
  const _internal_ = comp[internal];
  const compClass = CreatedComponents.get(_internal_.fnId);
  const deps = compClass.deps;
  const attrDeps = _internal_.attrDeps;
  const keyed = _internal_.keyed;
  const state = comp.state;
  attrDeps.forEach(function (nodekey: string, fn_key: string) {
    deps[fn_key].call(comp, keyed[nodekey].node, state, false);
  });
  attrDeps.clear();
  const l = compClass.dn.length;
  if (l) {
    const nodeDeps = _internal_.nodeDeps;
    const dyn = _internal_.dyn;
    const dn = compClass.dn;
    let value, el, bn: any, e, tmp, tmp2;
    const currentChain = renderingComponent.chain;
    const currentId = renderingComponent.id;
    const chain = (renderingComponent.chain = _internal_.childComponents);
    renderingComponent.id = id;
    nodeDeps.forEach(function (i: number) {
      renderingComponent.dynIndex = i;
      value = dn[i].call(comp, comp.state);
      if (value == independent) {
        return;
      }
      switch (typeof value) {
        case 'object':
          if (value) {
            if ((el = value[internal])) {
              if (el.type == NODETYPES.list) {
                switch ((tmp = dyn[i]).type) {
                  case NODETYPES.text:
                    if (el.pos.head) {
                      removeList(el, undefined);
                    }
                    tmp.node.replaceWith(insertList(el, { i: i, id: id }, undefined));
                    dyn[i] = el;
                    break;
                  case NODETYPES.component:
                    if (el.pos.head) {
                      removeList(el, undefined);
                    }
                    tmp.parent = 0;
                    tmp.dynIndex = 0;
                    componentsTrashBin.add(tmp);
                    bn = bn || document.createTextNode('');
                    (tmp2 = tmp.node).replaceWith(bn);
                    bn.replaceWith(insertList(el, { i: i, id: id }, undefined));
                    dyn[i] = el;
                    if (!tmp2.parentNode || tmp.parent != id) {
                      // Component is either not reused or is reused in a different parent component
                      chain.delete(tmp.id);
                      componentsTrashBin.add(tmp.id);
                    }
                    break;
                  default: // Lists
                    if (tmp != el) {
                      if (el.pos.head) {
                        removeList(el, undefined);
                      }
                      e = removeList(tmp, undefined);
                      e.replaceWith(insertList(el, { i: i, id: id }, undefined));
                      // ListsTrashBin.add(tmp);
                      dyn[i] = el;
                    } else {
                      updateList(el, { i: i, id: id }, undefined);
                    }
                    break;
                }
              } else {
                // New node is component

                switch (
                  (tmp = dyn[i]).type // Match against type of current node
                ) {
                  case NODETYPES.text:
                    tmp.node.replaceWith(el.node);
                    el.parent = id;
                    el.dynIndex = i;
                    dyn[i] = el;
                    break;
                  case NODETYPES.component:
                    if (el.id != tmp.id) {
                      tmp.node.replaceWith(el.node);
                      el.parent = id;
                      el.dynIndex = i;
                      tmp.parent = 0;
                      tmp.dynIndex = 0;
                      dyn[i] = el;
                      chain.delete(tmp.id);
                      componentsTrashBin.add(tmp.id);
                    }
                    break;
                  default: // Lists
                    e = removeList(tmp, undefined);
                    e.replaceWith(el.node);
                    el.parent = id;
                    el.dynIndex = i;
                    dyn[i] = el;
                    // ListsTrashBin.add(tmp);
                    break;
                }
                // Delete component from trash bin if exists since it's being used
                componentsTrashBin.delete(el.id);
              }
              break;
            }
          } else {
            value = '';
          }
        default:
          value = ''.concat(value);
          switch ((tmp = dyn[i]).type) {
            case NODETYPES.text:
              tmp2 = tmp.node;
              if (tmp2.textContent != value) {
                tmp2.textContent = value;
                // tmp.value = value;
              }
              break;
            case NODETYPES.component:
              el = document.createTextNode(value);
              tmp.parent = 0;
              tmp.dynIndex = 0;
              tmp.node.replaceWith(el);
              componentsTrashBin.add(tmp.id);
              dyn[i] = { node: el, type: NODETYPES.text /*value: value*/ };
              break;
            default: // Lists
              el = removeList(tmp, document.createTextNode(value));
              // ListsTrashBin.add(tmp);
              dyn[i] = { node: el, type: NODETYPES.text /*value: value*/ };
              break;
          }
          break;
      }
    });
    nodeDeps.clear();
    dynamicNodeUpdates.delete(id);
    renderingComponent.id = currentId;
    renderingComponent.chain = currentChain;
    renderingComponent.dynIndex = undefined;
  }
}

/**
 * A class containing all methods and properties of the HoneyBee UI
 */
class UI {
  constructor() {}
  /**
   *
   * @param name A unique string to identify the component. The value must be unique throughout the current file
   * where `UI.CreateComponent` is called.
   *
   * @param fn Provide the actual component, a function with only one argument as props to the component.
   *
   */
  CreateComponent<T>(name: string, fn: T & Function): T & BeeComponentInstance {
    const cm = new ComponentClass(fn);
    CreatedComponents.set(cm.id, cm);
    const f: any = ComponentMethod.bind({ fnId: cm.id });
    f.instance = getComponentInstance.bind({ fnId: cm.id });
    Namings[B._imex.getPath() + name] = f.instance;
    return f;
  }
  /**
   *
   * @param fn A function that returns a value to be inserted into the DOM.
   * @param stateDependencyKeys An array of state keys as a dependency to update dynamic node. An empty array
   * prevents this node from being updated after first render.
   *
   */
  CreateDynamicNode(
    fn: (this: PossibleValues & { state: PossibleValues }, state: PossibleValues) => any,
    stateDependencyKeys: (keyof PossibleValues)[],
  ) {
    if (typeof fn == 'function') {
      (fn as any)[_external] = stateDependencyKeys.slice(0);
    }
    return fn;
  }
  /**
   * Creates a list.
   * @param list
   * @returns {List}
   */
  CreateList(list: (BeeComponentInstanceObject | string | boolean | number)[]) {
    return new List(list);
  }
  /**
   * Creates the first page.
   * @param pagePath A pathname for the page.
   * @param ins A component instance to render as page
   *
   */
  CreatePage(pagePath: string, ins: BeeComponentInstanceObject) {
    if (pagelock == pageopen) {
      const id = ins[internal_ins].id;
      page_tracking.currentPage = id;
      page_tracking.currentPageName = pagePath;
      PAGES[pagePath] = id;
      if (B.isSSR) {
        B.isSSR = false;
        // ins[internal_ins].out[internal].node = 8
        return;
      }
      page_tracking.clientRendered = true;
      const app = B.UI.render(ins);
      (document.getElementById('page') as HTMLElement).replaceWith(app[internal].node);
      AfterInserts();
      return;
    }
    if (B.isSSR) {
      B.isSSR = false;
      return;
    }
  }
  /**
   * Locks page creation.
   * @param obj An object to serve as the key to unlock page creation later. Call to
   * `lockPageCreation` is ignored if page creation is already locked.
   */
  lockPageCreation(obj: {}) {
    if (pagelock == internal) {
      pagelock = obj;
    }
  }
  /**
   * Unlocks page creation.
   * @param obj An object to unlock page creation. Page creation will not be unlocked if
   * `obj` is not same as provided to `lockPageCreation` when locking page creation.
   */
  unlockPageCreation(obj: {}) {
    if (pagelock == obj) {
      pagelock = pageopen;
    }
  }
  /**
   * Renders an instance of a component.
   * @param ins A component instance to render
   * @param args Argument to pass to the component method.
   *
   */
  render(ins: BeeComponentInstanceObject, args?: any): BeeElement {
    if (B.isSSR) {
      return undefined as any;
    }
    const id = ins[internal_ins].id;
    const comp = Blocks.get(id);
    const _internal_ = comp[internal];
    const compClass = CreatedComponents.get(_internal_.fnId);
    let node = undefined; // listTrack;
    let out, el;
    _internal_.Args = args;
    switch (_internal_.status) {
      case STATUS.dead: // Full Mount
        if (!compClass.proto) {
          node = compClass.fn.call(comp, args);
        } else {
          node = clone(_internal_);
        }

        out = _internal_.outerValue;
        out[internal].node = node;
        _internal_.status = STATUS.alive;
        if (node == independent) {
          _internal_.init_dyn = null;
          return independent as any;
        }
        runDynamicnodes(_internal_.id, compClass.dn, _internal_.init_dyn);
        _internal_.init_dyn = null;
        return out;
      case STATUS.alive: // Update
        if (_internal_.independent) {
          return independent as any;
        }
        el = _internal_.outerValue;
        if (el.parent && (renderingComponent.id != el.parent || renderingComponent.dynIndex != el.dynIndex)) {
          let tmp2 = Blocks.get(el.parent)[internal].dyn,
            e,
            j;
          if (el.listItem) {
            e = el.getList();
            j = e.curData.indexOf(el);
            e.curData[j] = '';
            if (j == 0) {
              el.node.replaceWith((e.pos.head = document.createTextNode('')));
            } else if (j == e.curData.length - 1) {
              el.node.replaceWith((e.pos.tail = document.createTextNode('')));
            } else {
              el.node.replaceWith(document.createTextNode(''));
            }
            el.listItem = false;
            el.getList = undefined;
          } else {
            tmp2[(j = el.dynIndex)].node.replaceWith((e = document.createTextNode('')));
            tmp2[j] = { node: e, type: NODETYPES.text, value: '' };
          }
          el.parent = 0;
          el.dynIndex = 0;
        }
        comp.parentEffect && comp.parentEffect.call(comp, args, comp.state);
        updateDynamicnodes(_internal_.id);
        return el;
      case STATUS.hibernatedPartially:
        node = cloneWithState(comp, _internal_);
        out = _internal_.outerValue;
        out[internal].node = node;
        _internal_.status = STATUS.alive;
        runDynamicnodes(_internal_.id, compClass.dn, _internal_.init_dyn);
        _internal_.init_dyn = null;
        return out;
      case STATUS.hibernatedFully:
        if (_internal_.independent) {
          _internal_.status = STATUS.alive;
          return independent as any;
        }
        comp.parentEffect && comp.parentEffect.call(comp, args, comp.state);
        _internal_.status = STATUS.alive;
        updateDynamicnodes(_internal_.id);
        return _internal_.outerValue;
    }
    return undefined as any;
  }
  /**
   * Renders a new page.
   * @param pagePath A pathname for the new page.
   * @param ins A component instance to render
   * @param popstate `popstate` argument is not to be provided. Leave as undefined. It is provided internally
   *  when a popstate event is triggered.
   *
   */
  renderNewPage(pagePath: string, ins: BeeComponentInstanceObject, popstate?: unknown) {
    if (!PAGES[pagePath]) {
      PAGES[pagePath] = ins[internal_ins].id;
      page_tracking.isFirstRender = true;
    } else {
      page_tracking.isFirstRender = false;
    }
    page_tracking.renderNewPage = PAGES[pagePath];
    page_tracking.newPageName = pagePath;
    page_tracking.ispopstate = popstate;
    startUpdates();
  }
  /**
   * Gets the instance object of a parent component.
   * @param This Provide the component's object: `this`
   *
   */
  getParentInstance(This: PossibleValues): BeeComponentInstanceObject {
    const parent = This[internal].outerValue[internal].parent;
    if (!parent) return null as any;
    return Blocks.get(parent)[internal].ins;
  }
  /**
   * Gets the instance object of the component object: `this` passed as argument.
   * @param This Provide the component's object: `this`
   *
   */
  getInstance(This: any): BeeComponentInstanceObject {
    return This[internal].ins;
  }
  /**
   * Get the shared data from other components.
   * @param ins A component instance object
   *
   */
  getPublicData(ins: BeeComponentInstanceObject): PossibleValues {
    return Blocks.get(ins[internal_ins].id).public || {};
  }
  getSourceData(url: string) {
    const data = B.externalData.data[url];
    if (!data) return undefined;
    return data.data;
  }
  /**
   * Set data to url end points when they become available.
   * @param info Data source object
   *
   * @example
   * const { UI } = HoneyBee;
   * const url = "my_url";
   *
   * const myComponent = UI.CreateComponent('component_name',function({id,name}){
   *
   *   this.onCreation = async function({id}){
   *     this.state = {data:null};
   *     let full_url = `${url}?id=${id}`;
   *     let value = UI.getSourceData(full_url);
   *     let data;
   *     if(!value){
   *       let response = await fetch(full_url);
   *       data = await response.json();
   *     }else{
   *       data = value.data;
   *     }
   *     UI.setSourceData({url:full_url,data:data});
   *     this.state.data = data;
   *   }
   *
   *   return <view><div><>{this.state.data}</><div></view>
   *
   * })
   */
  setSourceData(info: { url: string; data: any }) {
    B.externalData.data[info.url] = { data: info.data };
  }
}
function ComponentMethod(this: { fnId: number }, args: any) {
  if (B.isSSR) {
    return;
  }
  let _b: any;
  const _internal_ = new ComponentInstance({ methodId: this.fnId, args: args });
  const compClass = CreatedComponents.get(this.fnId);
  let node;
  if (!compClass.proto) {
    node = compClass.fn.call(((_b = {}), (_b[internal] = _internal_), _b), args);
  } else {
    node = clone(_internal_);
  }
  const out = _internal_.outerValue;
  out[internal].node = node;
  _internal_.status = STATUS.alive;
  _internal_.pure = true;
  runDynamicnodes(_internal_.id, compClass.dn, _internal_.init_dyn);
  _internal_.init_dyn = null;
  return out;
}
function getComponentInstance(this: { fnId: number }, initArgs: any) {
  // if (B.isSSR) { return}
  let _b: any;
  const _internal_ = new ComponentInstance({ methodId: this.fnId, args: undefined, initArgs: initArgs });
  Blocks.set(_internal_.id, ((_b = {}), (_b[internal] = _internal_), _b));
  return _internal_.ins;
}

type BeeComponentInstance = {
  /**
   *
   * @param initArgs  Provide an initial argument to the component instance.
   * The value can be accessed with `this.initArgs` in the `onCreation` method.
   *
   */
  instance: (initArgs?: any) => BeeComponentInstanceObject;
};
type PossibleValues = { [k: string | symbol | number]: any };

const HoneyBee = B = new Bee();
// declare global {
//   interface Window {
//     IMEX: { [k: string]: Function | string|boolean };
//     HoneyBee: Bee;
//   }
//   const HoneyBee: Bee;
// }
// export {};
export default HoneyBee;