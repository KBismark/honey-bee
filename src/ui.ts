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
  CreateComponent<args,InitArgs>(this:UI, name: string, fn: BeeComponentMethod<args>): BeeComponentClass<args,InitArgs>{
    const cm = new ComponentClass(fn,'function');
    CreatedComponents.set(cm.id, cm);
    const f: any = ComponentMethod.bind({ fnId: cm.id });
    f.instance = getComponentInstance.bind({ fnId: cm.id });
    name = cm.Name = (B as any)._imex.getPath() + name;
    Namings[name] = f.instance;
    return f;
  }
   /**
   *
   * @param name A unique string to identify the component. The value must be unique throughout the current file
   * where `UI.CreateComponent` is called.
   *
   * @param fn Provide the actual component, a function with only one argument as props to the component.
   *
   */
   CreateComponentFromClass<args,InitArgs>(this:UI, name: string, cls: any): BeeComponentClass<args,InitArgs>{
    const cm = new ComponentClass(cls,'class');
    CreatedComponents.set(cm.id, cm);
    const f: any = ComponentMethod.bind({ fnId: cm.id });
    f.instance = getComponentInstance.bind({ fnId: cm.id });
    name = cm.Name = (B as any)._imex.getPath() + name;
    Namings[name] = f.instance;
    return f;
   }
   /**
   *
   * @param name A unique string to identify the component. The value must be unique throughout the current file
   * where `UI.CreateComponent` is called.
   *
   * @param fn Provide the actual component, a function with only one argument as props to the component.
   *
   */
   CreateComponentFromObject<args,InitArgs>(this:UI, name: string,obj:BeeComponentObjects<args>): BeeComponentClass<args,InitArgs>{
     const cm = new ComponentClass(obj,'object');
    CreatedComponents.set(cm.id, cm);
    const f: any = ComponentMethod.bind({ fnId: cm.id });
    f.instance = getComponentInstance.bind({ fnId: cm.id });
    name = cm.Name = (B as any)._imex.getPath() + name;
    Namings[name] = f.instance;
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
    this:UI, 
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
  CreateList(this:UI, list: (BeeComponentInstanceObject<any> | string | boolean | number)[]): List {
    return new List(list);
  }
  /**
   * Creates the first page.
   * @param pagePath A pathname for the page.   
   * 
   * @param ins A component instance or a component to render as page. If a component instance is provided, 
   * it must be hibernated by calling either `this.keepStateIfDestroyed()` or `this.keepEverythingIfDestroyed()`
   * 
   *
   */
  CreatePage(this:UI, pagePath: string, ins: BeeComponentInstanceObject<any>|BeeComponentClass<any,any>) {
    if (!firstPageCreated && pagelock == pageopen) {
      if (typeof ins == 'function') {
        ins = ins.instance();
      }
      const id = ins[internal_ins].id;
      page_tracking.currentPage = id;
      page_tracking.currentPageName = pagePath;
      PAGES[pagePath] = id;
      PAGES_TYPES[id] = ins[internal_ins].fnId;
      firstPageCreated = true;
      if ((B as any).isSSR) {
        (B as any).isSSR = false;
        // ins[internal_ins].out[internal].node = 8
        return;
      }
      page_tracking.clientRendered = true;
      const app = (B as any).UI.render(ins);
      (document.getElementById('page') as HTMLElement).replaceWith(app[internal].node);
      AfterInserts();
      return;
    }
    if ((B as any).isSSR) {
      (B as any).isSSR = false;
      return;
    }
  }
  /**
   * Locks page creation.
   * @param obj An object to serve as the key to unlock page creation later. Call to
   * `lockPageCreation` is ignored if page creation is already locked.
   */
  lockPageCreation(this:UI, obj: {}) {
    if (pagelock == internal) {
      pagelock = obj;
    }
  }
  /**
   * Unlocks page creation.
   * @param obj An object to unlock page creation. Page creation will not be unlocked if
   * `obj` is not same as provided to `lockPageCreation` when locking page creation.
   */
  unlockPageCreation(this:UI, obj: {}) {
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
  render<T extends BeeComponentInstanceObject<any>>(this:UI,ins:T,args?:T['ArgumentType']):BeeElement{
    if ((B as any).isSSR) {
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
  renderNewPage(this:UI, pagePath: string, ins: BeeComponentInstanceObject<any>|BeeComponentClass<any,any>, popstate?: unknown) {
    if (!PAGES[pagePath]) {
      if (typeof ins == 'function') {
        ins = ins.instance();
      }
      const id = ins[internal_ins].id;
      PAGES[pagePath] = id;
      PAGES_TYPES[id] = ins[internal_ins].fnId;
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
  getParentInstance<U>(this:UI, This: ComponentObject<U>): BeeComponentInstanceObject<any> {
    const parent = (This as any)[internal].outerValue[internal].parent;
    if (!parent) return null as any;
    return Blocks.get(parent)[internal].ins;
  }
  /**
   * Gets the instance object of the component object: `this` passed as argument.
   * @param This Provide the component's object: `this`
   *
   */
  getInstance<U>(this:UI, This: ComponentObject<U>): BeeComponentInstanceObject<any> {
    return (This as any)[internal].ins;
  }
  /**
   * Get the shared data from other components.
   * @param ins A component instance object
   *
   */
  getPublicData(this:UI, ins: BeeComponentInstanceObject<any>): PossibleValues {
    return Blocks.get(ins[internal_ins].id).public || {};
  }
   /**
   * Get data from data source.
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
  getSourceData(this:UI, url: string) {
    const data = (B as any).externalData.data[url];
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
  setSourceData(this:UI, info: { url: string; data: any }) {
    (B as any).externalData.data[info.url] = { data: info.data };
  }
}
function ComponentMethod(this: { fnId: number }, args: any) {
  if ((B as any).isSSR) {
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
  // if ((B as any).isSSR) { return}
  let _b: any;
  const _internal_ = new ComponentInstance({ methodId: this.fnId, args: undefined, initArgs: initArgs });
  Blocks.set(_internal_.id, ((_b = {}), (_b[internal] = _internal_), _b));
  return _internal_.ins;
}

type BeeComponentInstance<T,I> = {
  /**
   *
   * @param initArgs  Provide an initial argument to the component instance.
   * The value can be accessed with `this.initArgs` in the `onCreation` method.
   *
   */
  instance: (initArgs?: I) => BeeComponentInstanceObject<T>;
    //BeeComponentInstanceObject;
};
interface  BeeComponentInstanceObject<T>{
  ArgumentType?: T;
  [k: symbol]: { fnId: number; id: number; out?: BeeElement };
  readonly isComponent: true;
}

type PossibleValues = { [k: string | symbol | number]: any };

type BeeComponentClass<T,InitArgs> = ((args: T) => any) & BeeComponentInstance<T,InitArgs>;

type BeeComponentMethod<T> = (this: ComponentObject<T>, args: T) => void;
/**
 * These are only accessible inside the component object methods.
 */
type Insiders = {
  /**
   * Components can be **partially** hibernated when not needed for a time. Instead of destroying everything related to a component including 
   * states, we can keep the state of the destroyed component in memory and reuse the state in our next render of the component. This is basically 
   * the only way to have state persist between renders.
   * 
   */
  keepStateIfDestroyed: typeof keepStateIfDestroyed;
  /**
   * Components can be **fully** hibernated when not needed for a time. Instead of destroying everything related to a component including 
   * states, we can keep the detached component node in memory along with all data related to the component. This feature considers speed 
   * over memory and hence must be used only in cases when you are sure of reusing the component in no time.    
   * 
   */
  keepEverythingIfDestroyed: typeof keepEverythingIfDestroyed;
}
class ComponentObject<args>{
  declare state?: { [k: string | number]: any };
  declare isIndependent?: boolean;

  /**
   * `this.onCreation` is the first method to be called when a component is first created. Set `this.state` to an object with
   * all fields set to their initial values. All setups must be done here.    
   * 
   * **This method is called once in the component's lifetime**
   */
  declare onCreation?:(this: this&Insiders, ...args: [args])=> void;
  /**
   * `this.onParentEffect` is only called when a component must update or render because it is nested in a different component (parent component)
   * which is either updating or rendering.
   * Hence, a state change does not trigger the `onParentEffect` event. 
   */
  declare onParentEffect?:(this:this&Insiders,...args: [args,this['state']])=> void;
  /**
   * Set onMount event. This method is called when the head node of the component is inserted into the DOM.
   */
  declare onMount?:(this: this&Insiders,...args: [this['state']])=> void;
  /**
   * This method is called before a component is destroyed.
   */
  declare willDestroy?:(this: this&Insiders,...args: [this['state']])=> void;
  /**
   * This method is called after a component is destroyed.
   */
  declare onDestroyed?:()=> void;
  /**
   * In HoneyBee, a component may either hibernate or destroyed. A hibernated component has its DOM node detached but may not destroyed.    
   * 
   * A **full** hibernation: `this.keepEverythingIfDestroyed` causes the node along with the component object untouched.    
   *  
   * A **partial** hibernation: `this.keepStateIfDestroyed` causes the node along with the component object destroyed without destroying the state object.    
   *  
   * This method is called before a component is hibernated.
   */
  declare willHibernate?:(this: this&Insiders,...args: [this['state']])=> void;
  /**
   * In HoneyBee, a component may either hibernate or destroyed. A hibernated component has its DOM node detached but may not destroyed.    
   * 
   * A **full** hibernation: `this.keepEverythingIfDestroyed` causes the node along with the component object untouched.    
   *  
   * A **partial** hibernation: `this.keepStateIfDestroyed` causes the node along with the component object destroyed without destroying the state object.    
   *  
   * This method is called after a component is hibernated.
   * 
   */
  declare onHibernated?:(this: this&Insiders,...args: [this['state']])=> void;
  /**
   * `this.public` is the public space through which components can access and communicate to other components.
   * It must return the value to be shared with others.
   * 
   */
  declare public?:(this: this&Insiders, ...args: [args,this['state']])=> PossibleValues;
}

/**
 * Extends the component object for classes and objects passed to `UI.CreateComponent`
 */
class BeeComponentObjects<args> extends ComponentObject<args>{
  declare view:(this: this, args: args)=> any;
}