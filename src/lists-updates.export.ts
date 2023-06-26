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
    let comp = Blocks.get(list.pos.parent);
    for (i = 0; i < l; i++) {
      t(b[i], i, data,comp);
    }
  }
  d.fn = d.data = undefined;
}
