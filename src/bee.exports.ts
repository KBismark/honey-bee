// Clone component  
// When a component's class has its first component instance created,
// it becomes fully set up. Hence, subsequent need to create a new component from the 
// class needs not set the class up again. We just clone.
function clone(_internal_: any) {
  // Get component's class
  const compClass = CreatedComponents.get(_internal_.fnId);
  // Set `independent` value if  component's class was defined as independent
  // Indedpendent components are components that are not affected by their parent components
  // They remain the same even if the state of their parent component changes
  // They render with their parent once only if they are not rendered already.
  if (compClass.isIndependent) {
    _internal_.independent = true;
  }
  if ((B as any).isSelectiveRendering && _internal_.independent) {// Is hydrating
    // Independent component prevents further rendering
    return independent; 
  }
  // Get a clone of the component's static nodes
  const node = compClass.getTemplate();
  // Create the component's object and make it inherit all methods and properties
  // of its component class
  const comp = Object.create(compClass.proto);
  // Set the internal object on the new object created
  comp[internal] = _internal_;
  // Initial arguments are ways to set some map some data with a component instance
  // even before it is rendered.
  // If `initArgs` was set, set on component's object.
  comp.initArgs = _internal_.InitArgs || comp.initArgs;
  _internal_.InitArgs = undefined;
  // Every created component instance has a unique id
  // This allows us to re-render the same component with its state
  // even after it was destroyed and detached from the DOM
  const id = _internal_.id;
 // We keep track of all component objects.
  // `Blocks` map all rendered components to their component's object
  Blocks.set(id, comp);
  // Run certain events like onCreation, onMount, onParentEffect, etc
  run(comp);
  // Get Attribute dependencies
  const dependencies = compClass.deps;
  // Set all dynamic attributes of the component's view/UI
  const kNdN = compClass.setAttr.call(comp, _internal_.Args, node, eventHandler, id, dependencies, false);
  // Keep a reference of nodes that may require attribute updates in the future
  _internal_.keyed = kNdN[0];
  // Get all dynamic methods 
  // Calling these methods would return dynamic nodes to be inserted in our
  // view/UI to form the complete view/UI of the component
  _internal_.init_dyn = compClass.dynMethod(node); 
 // Attribuites can only be update if their dependencies were set
  // Setting attribute dependencies help to only update affected parts of the view/UI
  // without any diffing algorithm
  // Info on attribuites that would need updates in the UI/view for any render cycle is kept here 
  const attrDeps = (_internal_.attrDeps = new Map());
  // Get the state object if exists
  const state = comp.state;
  let key, fn;
  if (state) {
    //  Observe state object's properties for changes
    // This observes for only the attributes that would need updates in the future (Those that had dependencies set)
    for (key in dependencies) {
      fn = dependencies[key];
      // Make state object reactive
      observeDependency(state, fn.$dep, attrDeps, { node: fn.key, attr: true, id: id, index: key });
    }
  }
  return node;
}

// Partially hibernated components have their states not destroyed even after being detached
// and getting it's component object destroyed.
// We clone with preserved state object. This is literrally, the only way to have state persist
// between two rendering phases of one particular component. 
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
