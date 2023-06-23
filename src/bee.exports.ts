// Clone component view and setup component
function clone(_internal_: any) {
  const compClass = CreatedComponents.get(_internal_.fnId);
  if (compClass.isIndependent) {
    _internal_.independent = true;
  }
  if (B.isSelectiveRendering && _internal_.independent) {// Is hydrating
    return independent; // Independent component prevents further rendering
  }
  const node = compClass.getTemplate();
  const comp = Object.create(compClass.proto);
  comp[internal] = _internal_;
  comp.initArgs = _internal_.InitArgs || comp.initArgs;
  _internal_.InitArgs = undefined;
  const id = _internal_.id;
  Blocks.set(id, comp);
  run(comp);
  const dependencies = compClass.deps;
  const kNdN = compClass.setAttr.call(comp, _internal_.Args, node, eventHandler, id, dependencies, false);
  _internal_.keyed = kNdN[0];
  _internal_.init_dyn = compClass.dynMethod(node); 
  const attrDeps = (_internal_.attrDeps = new Map());
  const state = comp.state;
  let key, fn;
  if (state) {
    for (key in dependencies) {
      fn = dependencies[key];
      // Make state object reactive
      observeDependency(state, fn.$dep, attrDeps, { node: fn.key, attr: true, id: id, index: key });
    }
  }
  return node;
}

// Clone component view and setup component with previous state 
function cloneWithState(comp: any, _internal_: any) {
  const compClass = CreatedComponents.get(_internal_.fnId);
  const node = compClass.getTemplate();
  Object.setPrototypeOf(comp, compClass.proto);
  const args = _internal_.Args;
  const state = comp.state;
  // Call this.onParentEffect()
  comp.onParentEffect && comp.onParentEffect.call(comp, args, state); 
  // Set onMount to be called later after rendering
  comp.onMount && MountBucket.set(_internal_.id, comp); 
  if (comp.public) {
    // Set public data
    comp.public = comp.public.call(comp, args, state); 
  }
  const kNdN = compClass.setAttr.call(comp, _internal_.Args, node, eventHandler, _internal_.id, compClass.deps, false);
  _internal_.keyed = kNdN[0];
  _internal_.init_dyn = compClass.dynMethod(node); 
  return node;
}

// 
function run(comp: any) {
  const _internal_ = comp[internal];
  const args = _internal_.Args;
  // If component is not ever created, run `onCreation()`
  !_internal_.created && comp.onCreation && comp.onCreation.call(comp, args);
  _internal_.created = true;
  comp.initArgs = undefined;
  const state = comp.state;
  // Call this.onParentEffect()
  comp.onParentEffect && comp.onParentEffect.call(comp, args, state); 
  // Set onMount to be called later after rendering
  comp.onMount && MountBucket.set(_internal_.id, comp); 
  if (comp.public) {
    // Set public data
    comp.public = comp.public.call(comp, args, state); 
  }
}
