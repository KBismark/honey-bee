/**
 * The exposed HoneyBee object shall be stored in this variable as well.
 * Use this variable to access the object internally.    
 * **This variable is undefined outside a function scope hence, must be accessed only in a function scope**
 */
let B: Bee;
// keeps info relating to the current rendering component
const renderingComponent: { id?: number; dynIndex?: number; chain: any } = {
  // The id of the component rendering or updating
  id: undefined, 
  // The current dynamic node index of the component
  dynIndex: undefined, 
  // Keeps the IDs of child components of the current rendering component.
  // When component is to be unmounted/destroyed, we also destroy itd cghild components
  chain: new Map(), 
};
// Components to be destroyed after an update or render are kept here
const componentsTrashBin = new Set();
// Lists to be destroyed after an update or render are kept here
const ListsTrashBin = new Set();
// Created component-classes are stored here
const CreatedComponents = new Map();
// Keeps component objects. Component objects has the state of the component
const Blocks = new Map();
// We trigger onMount events after inserts into the DOM
// onMount listeners/handlers are kept here but cleared right after trigger
const MountBucket = new Map();
// Components inherit the static part of their respective component class views by cloning already built view
// As a result during a render/update cycle, the static part of the view is created once and 
// subsequent need for creating the view again is discarded
// `templateBucket` stores newly created views.
// it is cleared right after every render/update cycle
const TemplateBucket = new Map();

const standAloneUpdates = new Map();
// In honeybee, components are not entirely re-render on every state change.
// Only affected part of the view of the component is updated. A true fine-grained updates mechanism.
// IDs of components that need update in a render/update cycle are kept here. it sis cleared after every render/update cycle
const dynamicNodeUpdates = new Map();
// Lists are treated diferently in honeybee. 
// When a list needs to be updated, its id is kept here
const listUpdates = new Map();
// When a render/update cycle starts, `updates_initiated` is set to true.
let updates_initiated = false;
// When a render/update cycle starts, `updating` is set to true.
let updating = false;
const internal = Symbol();
const internal_ins = Symbol();
const _external = Symbol();
const ext_state = Symbol();
const independent = Symbol();
// We do selective hydration. How do we select the right components to hydrate.
// We store paths to components in `Namings`. format: <file_src + component_unique_id> : BeeComponentInstance
const Namings: { [k: string]: () => BeeComponentInstanceObject<any> } = {};
// Component classes, lists, and components are ID'ed incrementally
let dinstinctComponents = 0;
let componentsID = 0;
let listCount = 0;
// Stores current view node to cloned
let global_template: any = undefined;
// Component status
// Components can be in four different status
// That is, the life a component can be in only one of these status
const STATUS = {
  /**
   * The component's view/UI is rendered and is currently attched to the DOM
   */
  alive: 1,
  /**
   * - The component is detached from DOM. 
   * - Event listeners are removed. 
   * - Referenced nodes are destroyed.
   * - Component's object is destroyed.
   * - The state object persists (not destroyed)
   */
  hibernatedPartially: 2,
  /**
   * The component's view/UI is detached from DOM but nothing related to the component is destroyed.
   */
  hibernatedFully: 3,
  /**
   * The component is either not rendered or is totally destroyed and its instance object cannot bring it 
   * back to life.
   */
  dead: 4,
};
// Node types used in rendering methods
const NODETYPES = {
  text: 1,
  component: 2,
  list: 3,
};
// Stores page pathnames mapped to their respective component IDs
const PAGES: { [k: string]: number } = {};
// Stores component class IDs of rendered pages
const PAGES_TYPES: { [k: number]: number } = {};
// Keeps info related to the current page and the next page to be rendered in the next render/update cycle
const page_tracking: {
  isFirstRender: boolean;
  // The back and forward buttons of devices will trigger a `popstate` event
  // If true, we render the respective pages
  ispopstate: any;
  newPage: any;
  renderNewPage: any;
  newPageName: string;
  // `true` for client rendered pages. 
  // `false` for SSR page 
  clientRendered: boolean;
  currentPage: null | number;
  currentPageName: string;
  onpageExit: {};
  onNewPage: {};
  visitedPages: {};
} = {
  isFirstRender: false,
  ispopstate: undefined,
  newPage: undefined,
  renderNewPage: undefined,
  newPageName: '',
  clientRendered: false,
  currentPage: null,
  currentPageName: window.location.origin,
  onpageExit: {},
  onNewPage: {},
  visitedPages: {},
};
let pagelock: symbol | {} = internal;
let firstPageCreated = false;
const pageopen = {};
// Listens to the `popstate` events to render respective pages automatically
window.addEventListener(
  'popstate',
  function PagePopState(e) {
    const pathname = window.location.pathname;
    if (PAGES[pathname]) {
      if (page_tracking.currentPageName != pathname) {
        B.UI.renderNewPage(pathname, (undefined as any), internal);
      }
    } else {
      history.replaceState(e.state, '', window.location.origin + page_tracking.currentPageName);
    }
  },
  false,
);

interface BeeElement {
  [k: symbol]: {
    node: HTMLElement | any;
    [k: string]: any;
  };
}
