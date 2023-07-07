import { BeeElement, Bee } from "./bee";
import { clone, cloneWithState } from "./bee.exports";
import { CreatedComponents, B, Namings, _external, firstPageCreated, pagelock, pageopen, internal_ins, page_tracking, PAGES, PAGES_TYPES, internal, Blocks, STATUS, independent, renderingComponent, NODETYPES } from "./global";
import { ComponentClass, ComponentInstance, keepEverythingIfDestroyed, keepStateIfDestroyed } from "./helper-classes";
import { AfterInserts, startUpdates } from "./helper-methods.export";
import { List } from "./lists";
import "./jsx-elements";
import { runDynamicnodes, updateDynamicnodes } from "./render.export";

/**
 * A class containing all methods and properties of the HoneyBee UI
 */
export class UI {
 /**
  * Creates a new component class and registers it with the UI, allowing
  * it to be used in the application.
  * @param {UI}  - - `UI` is the context of the function, indicating that it is a method of the
  * `UI` class.
  * @param {string} name - A unique string to identify the component. The value must be unique throughout the current file
   * where `UI.CreateComponent` is called.
  * @param fn - The `fn` parameter is a function that defines the behavior and rendering of the
  * component. It takes only one argument as `args` to the component.
  * @returns The function returns a `BeeComponentClass`.
  */
  CreateComponent<args, state, InitArgs,ComponentMethodsAndProps = PossibleValues>(this: UI, name: string, fn: BeeComponentMethod<args, state, ComponentMethodsAndProps>): BeeComponentClass<args, InitArgs> {
   // set up component class if it's the first time a component from this class is rendering.
    const cm = new ComponentClass(fn, 'function');
    CreatedComponents.set(cm.id, cm);
    // For creating a new component instance by calling the returned class directly
    const f: any = ComponentMethod.bind({ fnId: cm.id });
    // For creating a new component instance via the returned class' instance() method
    f.instance = getComponentInstance.bind({ fnId: cm.id });
    // Set the name for the component class: <filename><unique_name>
    name = cm.Name = (B as any)._imex.getPath() + name;
    // Map the instance method to the class' name
    // This is neccessary for the on-demand or selective hydration process
    Namings[name] = f.instance;
    return f;
  }

 
  /**
  * Creates a new component class and registers it with the UI, allowing
  * it to be used in the application.
  * @param name A unique string to identify the component. The value must be unique throughout the current file
  * where `UI.CreateComponent` is called.
  *
  * @param obj The `obj` parameter is an object that defines the behavior and rendering of the
  * component.
  *
  */
  CreateComponentFromObject<args, state, InitArgs, ComponentMethodsAndProps = PossibleValues, K extends ComponentObjectObjects<args, state, ComponentMethodsAndProps> = ComponentObjectObjects<args, state, ComponentMethodsAndProps>>
    (
      this: UI, name: string,
      obj: ComponentObjectValue<ComponentMethodsAndProps, K>["state"] extends PossibleValues ? ComponentObjectValue<ComponentMethodsAndProps, K> : ComponentObjectValue<ComponentMethodsAndProps, K> & { state: undefined }
  ): BeeComponentClass<args, InitArgs> {
    // set up component class if it's the first time a component from this class is rendering.
    const cm = new ComponentClass(obj, 'object');
    CreatedComponents.set(cm.id, cm);
    // For creating a new component instance by calling the returned class directly
    const f: any = ComponentMethod.bind({ fnId: cm.id });
    // For creating a new component instance via the returned class' instance() method
    f.instance = getComponentInstance.bind({ fnId: cm.id });
    // Set the name for the component class: <filename><unique_name>
    name = cm.Name = (B as any)._imex.getPath() + name;
    // Map the instance method to the class' name
    // This is neccessary for the on-demand or selective hydration process
    Namings[name] = f.instance;
    return f;
  }
  /**
   *
   * @param fn A function that returns a value to be inserted into the DOM.
   * @param stateDependencyKeys AAn array of keys that represent the dependencies of the state object.
   * These keys are used to track changes in the state object and trigger updates when any of the
   * dependencies change. An empty array prevents this node from being updated after first render.
   *
   */
  CreateDynamicNode<state = PossibleValues>(
    this: UI,
    fn: <U>(this: U extends ComponentObjectValue<PossibleValues,ComponentObjectObjects<any, state, any>>?U: PossibleValues & { state: state }, state: state) => any,
    stateDependencyKeys: Array<keyof state>,
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
  CreateList(this: UI, list: (BeeComponentInstanceObject<any> | string | boolean | number)[]): List {
    return new List(list);
  }
  /**
   * Creates the first page.
   * @param pagePath A pathname for the page.   
   * 
   * @param ins A component instance or a component's class to render as page. If a component instance is provided, 
   * it must be hibernated by calling either `this.keepStateIfDestroyed()` or `this.keepEverythingIfDestroyed()`
   * 
   *
   */
 /**
  * `CreatePage` is responsible for creating a new page in the application, based
  * on the provided page path and component instance or class.
  * @param {string} pagePath - The `pagePath` parameter is a string that represents the path or URL of
  * the page being created. It is used as a key to store the page ID in the `PAGES` object.
  * @param {BeeComponentInstanceObject<any> | BeeComponentClass<any, any>} ins - The `ins` parameter is
  * either an instance of a BeeComponentObject or a BeeComponentClass.
  */
  CreatePage(this: UI, pagePath: string, ins: BeeComponentInstanceObject<any> | BeeComponentClass<any, any>) {
    if (!firstPageCreated && pagelock == pageopen) {
      if (typeof ins == 'function') {
        ins = ins.instance();
      }
      const id = ins[internal_ins].id;
      page_tracking.currentPage = id;
      page_tracking.currentPageName = pagePath;
      PAGES[pagePath] = id;
      PAGES_TYPES[id] = ins[internal_ins].fnId;
      (firstPageCreated as any) = true;
      if ((B as any).isSSR) {
        (B as any).isSSR = false;
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
  * Create a style sheet from your css files. Scope styles to your component using JavaScript
  */
  declare CreateStyleSheet: <T = { [k: string]: string[] }>(this: UI, styleObject: T) => StyleObject<T>

  /**
   * Locks page creation.
   * @param obj An object to serve as the key to unlock page creation later. Call to
   * `lockPageCreation` is ignored if page creation is already locked.
   */
  lockPageCreation(this: UI, obj: {}) {
    if (pagelock == internal) {
      (pagelock as any) = obj;
    }
  }
  /**
   * Unlocks page creation.
   * @param obj An object to unlock page creation. Page creation will not be unlocked if
   * `obj` is not same as provided to `lockPageCreation` when locking page creation.
   */
  unlockPageCreation(this: UI, obj: {}) {
    if (pagelock == obj) {
      (pagelock as any) = pageopen;
    }
  }
  /**
   * Renders an instance of a component.
   * @param ins A component instance to render
   * @param args Argument to pass to the component method.
   *
   */
  render<T extends BeeComponentInstanceObject<any>>(this: UI, ins: T, args?: T['ArgumentType']): BeeElement {
    if ((B as any).isSSR) {
      return undefined as any;
    }
    // grt id of the component to be rendered/updated
    const id = ins[internal_ins].id;
    // Get the state object of the component to be rendered/updated
    const comp = Blocks.get(id);
    const _internal_ = comp[internal];
    // Get the actual component class of the component to be rendered/updated
    const compClass = CreatedComponents.get(_internal_.fnId);
    let node = undefined; // listTrack;
    let out, el;
    _internal_.Args = args;
    switch (_internal_.status) {
      // Component needs a full mount since it's status is `dead`
      case STATUS.dead: // Full Mount
        // If the component class' is not set up, do so
        if (!compClass.proto) {
          node = compClass.fn.call(comp, args);
        }
        // if component class' is set up, we just clone a copy of the data
        else {
          node = clone(_internal_);
        }
        // Set status to `alive`
        _internal_.status = (_internal_ as any).ins.status = STATUS.alive;
        // if `node` is equal to `independent`, do not continue further execution.
        // Component must not be affected with its parent render
        if (node == independent) {
          _internal_.init_dyn = null;
          return independent as any;
        }
        out = _internal_.outerValue;
        // keep a refernce to the component object
        out[internal].node = node;
        // Insert dynamic nodes into static nodes
        runDynamicnodes(_internal_.id, compClass.dn, _internal_.init_dyn);
        _internal_.init_dyn = null;
        return out;
      // component only needs to be updated
      case STATUS.alive: // Update
         // Component must not be affected with its parent render
        if (_internal_.independent) {
          return independent as any;
        }
        removeFromListIfAny(el = _internal_.outerValue);
        // Trigger on parentEffect event of the component
        comp.parentEffect && comp.parentEffect.call(comp, args, comp.state);
        // Update affected nodes
        updateDynamicnodes(_internal_.id);
        return el;
      // Component is partially hibernated
      case STATUS.hibernatedPartially:
        // Clone the node and returned the preseverd state object
        node = cloneWithState(comp, _internal_);
        out = _internal_.outerValue;
        out[internal].node = node;
        // Set component status
        _internal_.status = (_internal_ as any).ins.status = STATUS.alive;
        // Insert dynamic nodes into static nodes
        runDynamicnodes(_internal_.id, compClass.dn, _internal_.init_dyn);
        _internal_.init_dyn = null;
        return out;
         // Component is fully hibernated
      case STATUS.hibernatedFully:
        if (_internal_.independent) {
          _internal_.status = (_internal_ as any).ins.status = STATUS.alive;
          return independent as any;
        }
        // Trigger on parentEffect event of the component
        comp.parentEffect && comp.parentEffect.call(comp, args, comp.state);
         // Set component status
        _internal_.status = (_internal_ as any).ins.status = STATUS.alive;
        // Update affected nodes
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
  renderNewPage(this: UI, pagePath: string, ins: BeeComponentInstanceObject<any> | BeeComponentClass<any, any>, popstate?: unknown) {
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
  getParentInstance<U>(this: UI, This: ComponentObject<U, any>): Bee['ComponentInstanceObject'] {
    const parent = (This as any)[internal].outerValue[internal].parent;
    if (!parent) return null as any;
    return Blocks.get(parent)[internal].ins;
  }
  /**
   * Gets the instance object of the component object: `this` passed as argument.
   * @param This Provide the component's object: `this`
   *
   */
  getInstance<U>(this: UI, This: ComponentObject<U, any>): Bee['ComponentInstanceObject'] {
    return (This as any)[internal].ins;
  }
  /**
   * Get the shared data from other components.
   * @param ins A component instance object
   *
   */
  getPublicData(this: UI, ins: BeeComponentInstanceObject<any>): PossibleValues {
    return Blocks.get(ins[internal_ins].id).publicData || {};
  }
  /**
   * Get a keyed node. This method would return the DOM node of the element with the keyed name `key`
   * @param ins The component's instance object
   * @param key The key value of the node to retrieve
   */
  getNode(this: UI, ins: BeeComponentInstanceObject<any>, key: string): HTMLElement | Node | null {
    const id = ins[internal_ins].id;
    const block = Blocks.get(id);
    if (!block) return null;
    const obj_node = block[internal].keyed[key];
    return obj_node ? obj_node.node : null;
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
  getSourceData(this: UI, url: string) {
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
  setSourceData(this: UI, info: { url: string; data: any }) {
    (B as any).externalData.data[info.url] = { data: info.data };
  }
}
/**
 * The function removes an element from a list if it exists.
 * @param {any} el - The parameter `el` represents an element object.
 */
function removeFromListIfAny(el:any) {
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
}
/**
 * The function represents a component method 
 * @param  - - `this`: The context object for the method, which should have a property `fnId` of type
 * `number`.
 * @param {any} args - The `args` parameter is of type `any`. It
 * is used as an argument to pass to the component method being called.
 */
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
  _internal_.status = (_internal_ as any).ins.status = STATUS.alive;
  _internal_.pure = true;
  runDynamicnodes(_internal_.id, compClass.dn, _internal_.init_dyn);
  _internal_.init_dyn = null;
  return out;
}
/**
 * The `getComponentInstance` returns a component instance based on the provided
 * initialization arguments.
 * @param  - - `this` is an object that has the component class' id as a property `fnId`.
 * @param {any} initArgs - The `initArgs` parameter is an object that contains the initial arguments
 * for the component instance. These arguments will be made accessible in the component's `onCreation` method
 *  when it is instantiated.
 */
function getComponentInstance(this: { fnId: number }, initArgs: any) {
  // if ((B as any).isSSR) { return}
  let _b: any;
  const _internal_ = new ComponentInstance({ methodId: this.fnId, args: undefined, initArgs: initArgs });
  Blocks.set(_internal_.id, ((_b = {}), (_b[internal] = _internal_), _b));
  return _internal_.ins;
}

type BeeComponentInstance<T, I> = {
  /**
   *
   * @param initArgs  Provide an initial argument to the component instance.
   * The value can be accessed with `this.initArgs` in the `onCreation` method.
   *
   */
  instance: (initArgs?: I) => {
    ArgumentType?: T;
    [k: symbol]: {
      fnId: number; id: number; out?: {
        [k: symbol]: {
          node: HTMLElement | any;
          [k: string]: any;
        };
      }
    };
    readonly isComponent: true;
    /**
     * `1` Alive : The component's view/UI is rendered and is currently attched to the DOM  
     *   
     * `2` HibernatedPartially :
     * - The component is detached from DOM. 
     * - Event listeners are removed. 
     * - Referenced nodes are destroyed.
     * - Component's object is destroyed.
     * - The state object persists (not destroyed)    
     * 
     * `3` HibernatedFully :
     * The component's view/UI is detached from DOM but nothing related to the component is destroyed.    
     * 
     * `4` Dead :
     * The component is either not rendered or is totally destroyed and its instance object cannot bring it 
     * back to life.    
     * 
     */
    readonly status: 1 | 2 | 3 | 4;
  };
};
export class BeeComponentInstanceObject<T>{
  declare ArgumentType?: T;
  [k: symbol]: {
    fnId: number; id: number; out?: {
      [k: symbol]: {
        node: HTMLElement | any;
        [k: string]: any;
      };
    }
  };
  declare readonly isComponent: true;
  /**
  * `1` Alive : The component's view/UI is rendered and is currently attched to the DOM  
  *   
  * `2` HibernatedPartially :
  * - The component is detached from DOM. 
  * - Event listeners are removed. 
  * - Referenced nodes are destroyed.
  * - Component's object is destroyed.
  * - The state object persists (not destroyed)    
  * 
  * `3` HibernatedFully :
  * The component's view/UI is detached from DOM but nothing related to the component is destroyed.    
  * 
  * `4` Dead :
  * The component is either not rendered or is totally destroyed and its instance object cannot bring it 
  * back to life.    
  * 
  */
  declare readonly status: 1 | 2 | 3 | 4;
}

type PossibleValues = { [k: string | symbol | number]: any };

type BeeComponentClass<args, InitArgs> = ((args: args) => any) & BeeComponentInstance<args, InitArgs>;
// ComponentObjectValue<ComponentMethodsAndProps, K>["state"] extends PossibleValues ? ComponentObjectValue<ComponentMethodsAndProps, K> : ComponentObjectValue<ComponentMethodsAndProps, K> & { state: undefined }
type BeeComponentMethod<args, state, ComponentMethodsAndProps = PossibleValues, K extends ComponentObjectObjects<args, state, ComponentMethodsAndProps> = ComponentObjectObjects<args, state, ComponentMethodsAndProps>> =
  (this: ComponentObjectValue<ComponentMethodsAndProps, K>["state"] extends PossibleValues ? ComponentObjectValue<ComponentMethodsAndProps, K> : ComponentObjectValue<ComponentMethodsAndProps, K> & { state: undefined }, args: args) => JSX.Element;
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
interface ComponentObject<args, state, T = PossibleValues> {
  /**
   * This is the state object of the components you create. All properties/fields of the object
   * set in the `onCreation` method would be reactive and would trigger an update if any of the values changes.
   */
  state: state; //extends Object ? state : undefined;
  /**
   * Set to `true` to make components you create from this component class an independent component.
   * Independent components are ways to isolate child components from parent components. They are 
   * not affected by any update of parent component. They are generally used as the data fetching points
   * in your applications. Fetch data from external sources in independent components and distribute data 
   * accros its child and nested components via `arguments`
   */
  isIndependent?: boolean;

  /**
   * `this.onCreation` is the first method to be called when a component is first created. Set `this.state` to an object with
   * all fields set to their initial values. All setups must be done here.    
   * 
   * **This method is called once in the component's lifetime**
   */
  onCreation?(this: this & T & Insiders, ...args: [args]): void;
  /**
   * `this.onParentEffect` is only called when a component must update or render because it is nested in a different component (parent component)
   * which is either updating or rendering.
   * Hence, a state change does not trigger the `onParentEffect` event. 
   */
  onParentEffect?(this: this & T & Insiders, ...args: [args, state]): void;
  /**
   * Set onMount event. This method is called when the head node of the component is inserted into the DOM.
   */
  onMount?(this: this & T & Insiders, ...args: [state]): void;
  /**
   * This method is called before a component is destroyed.
   */
  willDestroy?(this: this & T & Insiders, ...args: [state]): void;
  /**
   * This method is called after a component is destroyed.
   */
  onDestroyed?(): void;
  /**
   * In HoneyBee, a component may either hibernate or destroyed. A hibernated component has its DOM node detached but may not destroyed.    
   * 
   * A **full** hibernation: `this.keepEverythingIfDestroyed` causes the node along with the component object untouched.    
   *  
   * A **partial** hibernation: `this.keepStateIfDestroyed` causes the node along with the component object destroyed without destroying the state object.    
   *  
   * This method is called before a component is hibernated.
   */
  willHibernate?(this: this & T & Insiders, ...args: [state]): void;
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
  onHibernated?(this: this & T & Insiders, ...args: [state]): void;
  /**
   * `this.publicData` is the public space through which components can access and communicate to other components.
   * It must return the value to be shared with others.
   * 
   */
  publicData?(this: this & T & Insiders, ...args: [args, state]): PossibleValues;
}

/**
 * Extends the component object for classes and objects passed to `UI.CreateComponent`
 */
interface ComponentObjectObjects<args, state, T = PossibleValues> extends ComponentObject<args, state, T> {
  view(this: this & T, args: args, state: state): JSX.Element;
}




type StyleObject<T> = {
  [P in keyof T]: {
    /**
     * The class names for this selection
     */
    class: string,
    /**
    * The css style for this selection
    */
    style: T[P]
  }
}
type ObjectValue<T> = { [P in keyof T]: T[P] extends (this: any, ...args: infer U) => infer N ? (this: T, ...args: U) => N : T[P] };
type ObjectNextedValues<T, U> = { [P in keyof T as U extends (string | symbol | number) ? U : any]: T[P] };
type GetObjectValue<O, P extends keyof O> = O[P];


type ComponentObjectValue<T, K> = K & {
  [P in keyof T]: T[P] extends (this: any, ...args: infer U) => infer N ? (this: T & K, ...args: U) => N : T[P]
};


