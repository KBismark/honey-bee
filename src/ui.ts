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
  /**
   * Set data to url end points when they become available.
   * @param info Data source object
   *
   * @example
   * const { UI, externalData } = HoneyBee;
   * const url = "my_url";
   *
   * const myComponent = UI.CreateComponent('component_name',function({id,name}){
   *
   *   this.onCreation = async function({id}){
   *     this.state = {data:null};
   *     let full_url = `${url}?id=${id}`;
   *     let value = externalData[full_url];
   *     let data;
   *     if(!value){
   *       let response = await fetch(full_url);
   *       data = await response.json();
   *     }else{
   *       data = value.data;
   *     }
   *     UI.setDataSource({url:full_url,data:data});
   *     this.state.data = data;
   *   }
   *
   *   return <view><div><>{this.state.data}</><div></view>
   *
   * })
   */
  setDataSource(info: { url: string; data: any }) {
    B.externalData[info.url] = { data: info.data };
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
