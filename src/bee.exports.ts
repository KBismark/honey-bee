function clone(_internal_: any) {
  const compClass = CreatedComponents.get(_internal_.fnId);
  if (compClass.isIndependent) {
    _internal_.independent = true;
  }
  if (B.isSelectiveRendering && _internal_.independent) {
    return independent;
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
  _internal_.init_dyn = compClass.dynMethod(node); // kNdN[1];
  const attrDeps = (_internal_.attrDeps = new Map());
  const state = comp.state;
  let key, fn;
  if (state) {
    for (key in dependencies) {
      fn = dependencies[key];
      observeDependency(state, fn.$dep, attrDeps, { node: fn.key, attr: true, id: id, index: key });
    }
  }
  return node;
}
function cloneWithState(comp: any, _internal_: any) {
  const compClass = CreatedComponents.get(_internal_.fnId);
  const node = compClass.getTemplate();
  Object.setPrototypeOf(comp, compClass.proto);
  const args = _internal_.Args;
  const state = comp.state;
  comp.onParentEffect && comp.onParentEffect.call(comp, args, state); // Call this.onParentEffect()
  comp.onMount && MountBucket.set(_internal_.id, comp); // Set onMount to be called later after rendering
  if (comp.public) {
    comp.public = comp.public.call(comp, args, state); // Set public data
  }
  const kNdN = compClass.setAttr.call(comp, _internal_.Args, node, eventHandler, _internal_.id, compClass.deps, false);
  _internal_.keyed = kNdN[0];
  _internal_.init_dyn = compClass.dynMethod(node); // kNdN[1];
  return node;
}
function run(t: any) {
  const _internal_ = t[internal];
  const args = _internal_.Args;
  !_internal_.created && t.onCreation && t.onCreation.call(t, args);
  _internal_.created = true;
  t.initArgs = undefined;
  const state = t.state;
  t.onParentEffect && t.onParentEffect.call(t, args, state); // Call this.onParentEffect()
  t.onMount && MountBucket.set(_internal_.id, t); // Set onMount to be called later after rendering
  if (t.public) {
    t.public = t.public.call(t, args, state); // Set public data
  }
}
