import { BeeElement } from "./bee";
import { internal, dinstinctComponents, global_template, TemplateBucket, componentsID, internal_ins, NODETYPES, STATUS } from "./global";
import { BeeComponentInstanceObject } from "./ui";

/**
 * Components can be **partially** hibernated when not needed for a time. Instead of destroying everything related to a component including 
 * states, we can keep the state of the destroyed component in memory and reuse the state in our next render of the component. This is basically 
 * the only way to have state persist between renders.
 * 
 */
export function keepStateIfDestroyed(this: any, bool: boolean) {
  const _internal_ = (this as any)[internal];
  if (_internal_.pure) {
    return;
  }
  _internal_.keepState = !!bool;
}
/**
 * Components can be **fully** hibernated when not needed for a time. Instead of destroying everything related to a component including 
 * states, we can keep the detached component node in memory along with all data related to the component. This feature considers speed 
 * over memory and hence must be used only in cases when you are sure of reusing the component in no time.    
 * 
 */
export function keepEverythingIfDestroyed(this: any, bool: boolean) {
  const _internal_ = (this as any)[internal];
  if (_internal_.pure) {
    return;
  }
  _internal_.keepAll = !!bool;
}
function isIndependent(this: any) {
  const _internal_ = (this as any)[internal];
  if (_internal_.pure) {
    return;
  }
  _internal_.independent = true;
}

/**
 * The base of all component classes
 */
export class ComponentClass {
  constructor(fn: any, type: 'object' | 'function') {
    switch (type) {
      // A component class may be created from a function
      case 'function':
        this.fn = fn;
        break;
      // A component class may be created from an object
      case 'object':
        this.tempProto = fn;
        this.isIndependent = !!fn.isIndependent;
        // Set predefined methods on class' object
        fn.keepStateIfDestroyed = keepStateIfDestroyed;
        fn.keepEverythingIfDestroyed = keepEverythingIfDestroyed;
        fn.isIndependent = isIndependent;
        this.fn = fn.view;
        fn.view = undefined;
        break;
    }

    this.id = ++(dinstinctComponents as any);
  }
  template: any;
  dn: any;
  fn?: Function;
  id: number = 0;
  proto: any;
  tempProto: any;
  html: any;
  setAttr: any;
  deps: any;
  isIndependent: boolean = false;
  dynMethod: any;
  Name?: string;

  setup(htmlMethod: () => string, setter: any, dn: { length: number, [k: string]: Function | number }, attrDependencies: { [k: string]: Function }, dynMethod: Function, proto: any) {
    // Set the dynamic nodes of the component class
    this.dn = dn;
    // Set static nodes attribute dependencies
    this.deps = attrDependencies;

    // Set the html method. It returns the static part of the view
    this.html = htmlMethod;
    this.setAttr = setter;
    this.dynMethod = dynMethod;
    if (!this.tempProto) {
      // Set the prototype object that is inherited by all instances of the component class
      this.proto = proto;
      this.isIndependent = !!proto.isIndependent;
      proto.keepStateIfDestroyed = keepStateIfDestroyed;
      proto.keepEverythingIfDestroyed = keepEverythingIfDestroyed;
      proto.isIndependent = isIndependent;
    } else {
      this.proto = this.tempProto;
      this.tempProto = undefined;
    }

  }
  /**
   * Returns a clone of the static view of th ecomponent's class
   */
  getTemplate() {
    if (!this.template) {
      if (!global_template) {
        (global_template as any) = document.createElement('template');
      }
      global_template.innerHTML = this.html();
      this.template = global_template.content.firstElementChild;
      // This is temporarily kept during every render cycle and cleared right after
      TemplateBucket.set(this.id, this);
    }
    return this.template.cloneNode(true);
  }
}
/**
 * The base of the internal object set on all component objects.
 * It contains information on the component not accessible outside
 */
export class ComponentInstance {
  constructor({ methodId, args, initArgs }: { methodId: number; args: any; initArgs?: any }) {
    this.id = ++(componentsID as any);
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
      // Indicates that it is a component
      type: NODETYPES.component,
      // Holds a reference to the parent component's ID
      // It is `0` if the component has no parent component
      parent: 0,
      // Holds a reference to the specific dynamic node index/position in its parent component
      dynIndex: 0,
      // `true` means it's an item in a list
      listItem: false,
      listIndex: 0,
      getList: undefined,
      // Holds a reference to the component DOM node
      node: undefined,
      // Holds a reference to the component ID
      id: 0,
    },
  };
  // holds the `BeeComponentInstanceObject` of the component
  ins: BeeComponentInstanceObject<any> = { [internal_ins]: { fnId: 0, id: 0, out: undefined }, isComponent: true, status: (STATUS as any).dead };
  // All components are initially not created until it first renders
  created?= false;
  // Pure components cannot be hibernated
  // They are created when needed and destroyed when detached/destroyed/unmounted
  pure: boolean = false;
  // All components are initially in a dead status
  status = STATUS.dead;
  // Holds a reference to the parent component's ID
  // It is `0` if the component has no parent component
  parent = 0;
  // Holds a reference to the component ID
  id = 0;
  // Holds a reference to the component class' ID of the component
  fnId = 0;
  Args: any = undefined;
  // Initial arguments passed to `component.instance(initialArgs:any)`
  InitArgs: any = undefined;
  init_dyn: any = undefined;
  keyed: { [k: string]: { $events: any; eventcallers: any; style: any; class: any; attributes: any } } | null = null;
}
