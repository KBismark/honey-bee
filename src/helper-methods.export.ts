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
  let renderedNewPage = false;
  let newPage = page_tracking.renderNewPage;
  if (!newPage) return renderedNewPage;
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
      // If it is the first time rendering this page,
      // show the top of the screen.
      window.scrollTo({ top: 0 });
    }
    if (page_tracking.clientRendered) {
      const newpage_block = Blocks.get(newPage);
      let newPageInstance: BeeComponentInstanceObject;
      if (!newpage_block) {
        // The new page's instance object was totally destroyed.
        // Create a new instance of the component used in rendering this page earlier on.
        const fnId = PAGES_TYPES[newPage];
        const compClass = CreatedComponents.get(fnId);
        newPageInstance = Namings[compClass.Name]();
        newPage = PAGES[newPageName] = newPageInstance[internal_ins].id;
        PAGES_TYPES[newPage] = fnId;
      } else {
        newPageInstance = newpage_block[internal].ins;
      }
      const block = Blocks.get(currentPage);
      const node:HTMLElement = block[internal].outerValue[internal].node;
      const parentNode = node.parentNode;
      const nextSibling:ChildNode|null = node.nextSibling;
      const replacer:HTMLElement = B.UI.render(newPageInstance)[internal].node;
      // Component was not re-used anywhere in new page
      if (node.parentNode === parentNode) {
        node.replaceWith(replacer);
      }
      // Component re-used somewhere in new page
      else {
        (parentNode as ParentNode).insertBefore(replacer, nextSibling);
      }
      componentsTrashBin.add(currentPage);
      page_tracking.currentPageName = newPageName;
      page_tracking.currentPage = newPage;
    } else {
      page_tracking.clientRendered = true;
      const newPageInstance = Blocks.get(newPage)[internal].ins;
      const block = Blocks.get(currentPage);
      let node = block[internal].outerValue[internal].node;
      if (!node) {
        node = block[internal].outerValue[internal].node = document.getElementById('page');
      }
      const parentNode:ParentNode|null = node.parentNode;
      const nextSibling:ChildNode|null = node.nextSibling;
      const replacer:HTMLElement = B.UI.render(newPageInstance)[internal].node;
      // Component was not re-used anywhere in new page
      if (node.parentNode === parentNode) {
        node.replaceWith(replacer);
      }
      // Component re-used somewhere in new page
      else {
        (parentNode as ParentNode).insertBefore(replacer, nextSibling);
      }
      componentsTrashBin.add(newPage);
      page_tracking.currentPageName = newPageName;
      page_tracking.currentPage = newPage;
    }
    history.pushState(null, '', window.location.origin + newPageName);
    renderedNewPage = true;
  }
  page_tracking.newPageName = '';
  page_tracking.isFirstRender = false;
  page_tracking.ispopstate = page_tracking.ispopstate = page_tracking.renderNewPage = undefined;
  return renderedNewPage;
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
  // `keepEverythingIfDestroyed()` was called.
  // `this.onDestroyed` is not executed since component will not 
  // be distroyed. Component is rather hibernated.
  if (_internal_.keepAll) {
    children = children || _internal_.childComponents;
    let tmp = _internal_.outerValue[internal];
    tmp.node.remove();
    triggerHibernateEvents(children, id);
  }
  // `keepEverythingIfDestroyed()` was not called
  // We keep state object if `keepStateIfDestroyed()` was called. Else,
  // we destoy everything related to the component
  else {
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
      keyedvalue.evc = keyedvalue.$events = keyedvalue.node = null;
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
