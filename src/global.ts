/**
 * The exposed HoneyBee object shall be stored in this variable as well.
 * Use this variable to access the object internally.    
 * **This variable is undefined outside a function scope hence, must be accessed only in a function scope**
 */
let B: Bee;
const renderingComponent: { id?: number; dynIndex?: number; chain: any } = {
  id: undefined,
  dynIndex: undefined,
  chain: new Map(),
};
const componentsTrashBin = new Set();
const ListsTrashBin = new Set();
const CreatedComponents = new Map();
const Blocks = new Map();
const MountBucket = new Map();
const TemplateBucket = new Map();
const standAloneUpdates = new Map();
const dynamicNodeUpdates = new Map();
const listUpdates = new Map();
let updates_initiated = false;
let updating = false;
const internal = Symbol();
const internal_ins = Symbol();
const _external = Symbol();
const ext_state = Symbol();
const independent = Symbol();
const Namings: { [k: string]: () => BeeComponentInstanceObject } = {};
let dinstinctComponents = 0;
let componentsID = 0;
let listCount = 0;
let global_template: any = undefined;
const STATUS = {
  alive: 1,
  hibernatedPartially: 2,
  hibernatedFully: 3,
  dead: 4,
};
const NODETYPES = {
  text: 1,
  component: 2,
  list: 3,
};
const PAGES: { [k: string]: number } = {};
const PAGES_TYPES: { [k: number]: number } = {};
const page_tracking: {
  isFirstRender: boolean;
  ispopstate: any;
  newPage: any;
  renderNewPage: any;
  newPageName: string;
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

type BeeComponentInstanceObject = {
  [k: symbol]: { fnId: number; id: number; out?: BeeElement };
  readonly isComponent: true;
};
interface BeeElement {
  [k: symbol]: {
    node: HTMLElement | any;
    [k: string]: any;
  };
}
