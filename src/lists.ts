import { internal_ins, internal, listCount, NODETYPES, listUpdates } from "./global";
import { startUpdates } from "./helper-methods.export";
import { ListInternal, getList } from "./lists.exports";
import { BeeComponentInstanceObject } from "./ui";

function getListItem(item: any) {
  return item && item[internal_ins] ? item : item == null ? '' : ''.concat(item);
}

export class List {
  constructor(list: any[]) {
    const a = this[internal];
    a.curData = list.map(getListItem);
    a.id = ++(listCount as any);
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
  map<L=any,K=any, T=any>(data: T, fn?: (this:K,listItem: any, index: number, data: T, This: L) => void, thisArg?: K): this {
    if (fn) {
      const _internal_ = this[internal];
      _internal_.runner.fn = fn.bind(thisArg as any);
      _internal_.runner.data = data;
    }
    return this;
  }
  clear() {
    this.remove(0);
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
  insertBefore<L=any,T=any,K=any, U = string | number | boolean | BeeComponentInstanceObject<any>>(
    index: number,
    list: U | Array<U>,
    controller?: { data: T; handler: (this:K, listItem: U, index: number, data: T, This: L) => void },
    thisArg?: K,
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
      controller.handler = controller.handler.bind(thisArg as any);
    }
    _internal_.stack.push({ type: 'insert', value: value, before: bf, args: controller });
    listUpdates.set(_internal_.id, _internal_);
    startUpdates();
  }
  size() {
    return this[internal].length;
  }
}
