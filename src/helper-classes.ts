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
