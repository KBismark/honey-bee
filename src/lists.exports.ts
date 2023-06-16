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
