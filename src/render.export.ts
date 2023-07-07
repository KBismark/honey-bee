import { Blocks, internal, renderingComponent, B, _external, independent, NODETYPES, CreatedComponents, componentsTrashBin, dynamicNodeUpdates } from "./global";
import { observeDependency } from "./helper-methods.export";
import { insertList, removeList } from "./lists-updates.export";
import { updateList } from "./lists.exports";

export function runDynamicnodes(id: number, classDyn: Array<any>, compDyn: any) {
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
    if ((B as any).selector && !(B as any).selector.ignore) {
      (B as any).selector.ignore = (B as any).isSelectiveRendering = true;
      serverRenderedIndependentNodes = Object.values(
        (B as any).selector.node.getElementsByClassName('bee-' + (B as any).selector.iname) || {},
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
export function updateDynamicnodes(id: number) {
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
export function updateStatefulDynamicnodes(id: number) {
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
