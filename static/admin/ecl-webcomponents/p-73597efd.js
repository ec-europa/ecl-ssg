const t = "ecl-webcomponents";

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
 *
 * Modified for Stencil's renderer and slot projection
 */ let e;

let n;

let s;

let o = false;

let l = false;

let c = false;

let i = false;

let f = false;

const getAssetPath = t => {
  const e = new URL(t, M._$$resourcesUrl$$_);
  return e.origin !== j.location.origin ? e.href : e.pathname;
};

const createTime = (t, e = "") => {
  {
    return () => {};
  }
};

const uniqueTime = (t, e) => {
  {
    return () => {};
  }
};

const r = "{visibility:hidden}.hydrated{visibility:inherit}";

const u = "http://www.w3.org/1999/xlink";

/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */ const a = {};

/**
 * Namespaces
 */ const d = "http://www.w3.org/2000/svg";

const p = "http://www.w3.org/1999/xhtml";

const isDef = t => t != null
/**
 * Check whether a value is a 'complex type', defined here as an object or a
 * function.
 *
 * @param o the value to check
 * @returns whether it's a complex type or not
 */;

const isComplexType = t => {
  // https://jsperf.com/typeof-fn-object/5
  t = typeof t;
  return t === "object" || t === "function";
};

/**
 * Helper method for querying a `meta` tag that contains a nonce value
 * out of a DOM's head.
 *
 * @param doc The DOM containing the `head` to query against
 * @returns The content of the meta tag representing the nonce value, or `undefined` if no tag
 * exists or the tag has no content.
 */ function queryNonceMetaTagContent(t) {
  var e, n, s;
  return (s = (n = (e = t.head) === null || e === void 0 ? void 0 : e.querySelector('meta[name="csp-nonce"]')) === null || n === void 0 ? void 0 : n.getAttribute("content")) !== null && s !== void 0 ? s : undefined;
}

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (t, e, ...n) => {
  let s = null;
  let o = null;
  let l = null;
  let c = false;
  let i = false;
  const f = [];
  const walk = e => {
    for (let n = 0; n < e.length; n++) {
      s = e[n];
      if (Array.isArray(s)) {
        walk(s);
      } else if (s != null && typeof s !== "boolean") {
        if (c = typeof t !== "function" && !isComplexType(s)) {
          s = String(s);
        }
        if (c && i) {
          // If the previous child was simple (string), we merge both
          f[f.length - 1]._$$text$$_ += s;
        } else {
          // Append a new vNode, if it's text, we create a text vNode
          f.push(c ? newVNode(null, s) : s);
        }
        i = c;
      }
    }
  };
  walk(n);
  if (e) {
    // normalize class / classname attributes
    if (e.key) {
      o = e.key;
    }
    if (e.name) {
      l = e.name;
    }
    {
      const t = e.className || e.class;
      if (t) {
        e.class = typeof t !== "object" ? t : Object.keys(t).filter((e => t[e])).join(" ");
      }
    }
  }
  if (typeof t === "function") {
    // nodeName is a functional component
    return t(e === null ? {} : e, f, $);
  }
  const r = newVNode(t, null);
  r._$$attrs$$_ = e;
  if (f.length > 0) {
    r._$$children$$_ = f;
  }
  {
    r._$$key$$_ = o;
  }
  {
    r._$$name$$_ = l;
  }
  return r;
};

/**
 * A utility function for creating a virtual DOM node from a tag and some
 * possible text content.
 *
 * @param tag the tag for this element
 * @param text possible text content for the node
 * @returns a newly-minted virtual DOM node
 */ const newVNode = (t, e) => {
  const n = {
    _$$flags$$_: 0,
    _$$tag$$_: t,
    _$$text$$_: e,
    _$$elm$$_: null,
    _$$children$$_: null
  };
  {
    n._$$attrs$$_ = null;
  }
  {
    n._$$key$$_ = null;
  }
  {
    n._$$name$$_ = null;
  }
  return n;
};

const m = {};

/**
 * Check whether a given node is a Host node or not
 *
 * @param node the virtual DOM node to check
 * @returns whether it's a Host node or not
 */ const isHost = t => t && t._$$tag$$_ === m
/**
 * Implementation of {@link d.FunctionalUtilities} for Stencil's VDom.
 *
 * Note that these functions convert from {@link d.VNode} to
 * {@link d.ChildNode} to give functional component developers a friendly
 * interface.
 */;

const $ = {
  forEach: (t, e) => t.map(convertToPublic).forEach(e),
  map: (t, e) => t.map(convertToPublic).map(e).map(convertToPrivate)
};

/**
 * Convert a {@link d.VNode} to a {@link d.ChildNode} in order to present a
 * friendlier public interface (hence, 'convertToPublic').
 *
 * @param node the virtual DOM node to convert
 * @returns a converted child node
 */ const convertToPublic = t => ({
  vattrs: t._$$attrs$$_,
  vchildren: t._$$children$$_,
  vkey: t._$$key$$_,
  vname: t._$$name$$_,
  vtag: t._$$tag$$_,
  vtext: t._$$text$$_
})
/**
 * Convert a {@link d.ChildNode} back to an equivalent {@link d.VNode} in
 * order to use the resulting object in the virtual DOM. The initial object was
 * likely created as part of presenting a public API, so converting it back
 * involved making it 'private' again (hence, `convertToPrivate`).
 *
 * @param node the child node to convert
 * @returns a converted virtual DOM node
 */;

const convertToPrivate = t => {
  if (typeof t.vtag === "function") {
    const e = Object.assign({}, t.vattrs);
    if (t.vkey) {
      e.key = t.vkey;
    }
    if (t.vname) {
      e.name = t.vname;
    }
    return h(t.vtag, e, ...t.vchildren || []);
  }
  const e = newVNode(t.vtag, t.vtext);
  e._$$attrs$$_ = t.vattrs;
  e._$$children$$_ = t.vchildren;
  e._$$key$$_ = t.vkey;
  e._$$name$$_ = t.vname;
  return e;
};

// Private
const computeMode = t => k.map((e => e(t))).find((t => !!t))
// Public
;

const setMode = t => k.push(t)
/**
 * Parse a new property value for a given property type.
 *
 * While the prop value can reasonably be expected to be of `any` type as far as TypeScript's type checker is concerned,
 * it is not safe to assume that the string returned by evaluating `typeof propValue` matches:
 *   1. `any`, the type given to `propValue` in the function signature
 *   2. the type stored from `propType`.
 *
 * This function provides the capability to parse/coerce a property's value to potentially any other JavaScript type.
 *
 * Property values represented in TSX preserve their type information. In the example below, the number 0 is passed to
 * a component. This `propValue` will preserve its type information (`typeof propValue === 'number'`). Note that is
 * based on the type of the value being passed in, not the type declared of the class member decorated with `@Prop`.
 * ```tsx
 * <my-cmp prop-val={0}></my-cmp>
 * ```
 *
 * HTML prop values on the other hand, will always a string
 *
 * @param propValue the new value to coerce to some type
 * @param propType the type of the prop, expressed as a binary number
 * @returns the parsed/coerced value
 */;

const parsePropertyValue = (t, e) => {
  // ensure this value is of the correct prop type
  if (t != null && !isComplexType(t)) {
    if (e & 4 /* MEMBER_FLAGS.Boolean */) {
      // per the HTML spec, any string value means it is a boolean true value
      // but we'll cheat here and say that the string "false" is the boolean false
      return t === "false" ? false : t === "" || !!t;
    }
    if (e & 2 /* MEMBER_FLAGS.Number */) {
      // force it to be a number
      return parseFloat(t);
    }
    if (e & 1 /* MEMBER_FLAGS.String */) {
      // could have been passed as a number or boolean
      // but we still want it as a string
      return String(t);
    }
    // redundant return here for better minification
        return t;
  }
  // not sure exactly what type we want
  // so no need to change to a different type
    return t;
};

const getElement = t => getHostRef(t)._$$hostElement$$_;

const createEvent = (t, e, n) => {
  const s = getElement(t);
  return {
    emit: t => emitEvent(s, e, {
      bubbles: !!(n & 4 /* EVENT_FLAGS.Bubbles */),
      composed: !!(n & 2 /* EVENT_FLAGS.Composed */),
      cancelable: !!(n & 1 /* EVENT_FLAGS.Cancellable */),
      detail: t
    })
  };
};

/**
 * Helper function to create & dispatch a custom Event on a provided target
 * @param elm the target of the Event
 * @param name the name to give the custom Event
 * @param opts options for configuring a custom Event
 * @returns the custom Event
 */ const emitEvent = (t, e, n) => {
  const s = M.ce(e, n);
  t.dispatchEvent(s);
  return s;
};

const y =  new WeakMap;

const registerStyle = (t, e, n) => {
  let s = S.get(t);
  if (O && n) {
    s = s || new CSSStyleSheet;
    if (typeof s === "string") {
      s = e;
    } else {
      s.replaceSync(e);
    }
  } else {
    s = e;
  }
  S.set(t, s);
};

const addStyle = (t, e, n, s) => {
  var o;
  let l = getScopeId(e, n);
  const c = S.get(l);
  // if an element is NOT connected then getRootNode() will return the wrong root node
  // so the fallback is to always use the document for the root node in those cases
    t = t.nodeType === 11 /* NODE_TYPE.DocumentFragment */ ? t : C;
  if (c) {
    if (typeof c === "string") {
      t = t.head || t;
      let e = y.get(t);
      let n;
      if (!e) {
        y.set(t, e = new Set);
      }
      if (!e.has(l)) {
        {
          // TODO(STENCIL-659): Remove code implementing the CSS variable shim
          {
            n = C.createElement("style");
            n.innerHTML = c;
          }
          // Apply CSP nonce to the style tag if it exists
                    const e = (o = M._$$nonce$$_) !== null && o !== void 0 ? o : queryNonceMetaTagContent(C);
          if (e != null) {
            n.setAttribute("nonce", e);
          }
          t.insertBefore(n, t.querySelector("link"));
        }
        if (e) {
          e.add(l);
        }
      }
    } else if (!t.adoptedStyleSheets.includes(c)) {
      t.adoptedStyleSheets = [ ...t.adoptedStyleSheets, c ];
    }
  }
  return l;
};

const attachStyles = t => {
  const e = t._$$cmpMeta$$_;
  const n = t._$$hostElement$$_;
  const s = e._$$flags$$_;
  const o = createTime("attachStyles", e._$$tagName$$_);
  const l = addStyle(n.getRootNode(), e, t._$$modeName$$_);
  // TODO(STENCIL-662): Remove code related to deprecated shadowDomShim field
    if (s & 10 /* CMP_FLAGS.needsScopedEncapsulation */) {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    // DOM WRITE!!
    n["s-sc"] = l;
    n.classList.add(l + "-h");
    if (s & 2 /* CMP_FLAGS.scopedCssEncapsulation */) {
      n.classList.add(l + "-s");
    }
  }
  o();
};

const getScopeId = (t, e) => "sc-" + (e && t._$$flags$$_ & 32 /* CMP_FLAGS.hasMode */ ? t._$$tagName$$_ + "-" + e : t._$$tagName$$_)
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */;

const setAccessor = (t, e, n, s, o, l) => {
  if (n !== s) {
    let c = isMemberInElement(t, e);
    let i = e.toLowerCase();
    if (e === "class") {
      const e = t.classList;
      const o = parseClassList(n);
      const l = parseClassList(s);
      e.remove(...o.filter((t => t && !l.includes(t))));
      e.add(...l.filter((t => t && !o.includes(t))));
    } else if (e === "style") {
      // update style attribute, css properties and values
      {
        for (const e in n) {
          if (!s || s[e] == null) {
            if (e.includes("-")) {
              t.style.removeProperty(e);
            } else {
              t.style[e] = "";
            }
          }
        }
      }
      for (const e in s) {
        if (!n || s[e] !== n[e]) {
          if (e.includes("-")) {
            t.style.setProperty(e, s[e]);
          } else {
            t.style[e] = s[e];
          }
        }
      }
    } else if (e === "key") ; else if (e === "ref") {
      // minifier will clean this up
      if (s) {
        s(t);
      }
    } else if (!c && e[0] === "o" && e[1] === "n") {
      // Event Handlers
      // so if the member name starts with "on" and the 3rd characters is
      // a capital letter, and it's not already a member on the element,
      // then we're assuming it's an event listener
      if (e[2] === "-") {
        // on- prefixed events
        // allows to be explicit about the dom event to listen without any magic
        // under the hood:
        // <my-cmp on-click> // listens for "click"
        // <my-cmp on-Click> // listens for "Click"
        // <my-cmp on-ionChange> // listens for "ionChange"
        // <my-cmp on-EVENTS> // listens for "EVENTS"
        e = e.slice(3);
      } else if (isMemberInElement(j, i)) {
        // standard event
        // the JSX attribute could have been "onMouseOver" and the
        // member name "onmouseover" is on the window's prototype
        // so let's add the listener "mouseover", which is all lowercased
        e = i.slice(2);
      } else {
        // custom event
        // the JSX attribute could have been "onMyCustomEvent"
        // so let's trim off the "on" prefix and lowercase the first character
        // and add the listener "myCustomEvent"
        // except for the first character, we keep the event name case
        e = i[2] + e.slice(3);
      }
      if (n) {
        M.rel(t, e, n, false);
      }
      if (s) {
        M.ael(t, e, s, false);
      }
    } else {
      // Set property if it exists and it's not a SVG
      const f = isComplexType(s);
      if ((c || f && s !== null) && !o) {
        try {
          if (!t.tagName.includes("-")) {
            const o = s == null ? "" : s;
            // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                        if (e === "list") {
              c = false;
            } else if (n == null || t[e] != o) {
              t[e] = o;
            }
          } else {
            t[e] = s;
          }
        } catch (t) {}
      }
      /**
             * Need to manually update attribute if:
             * - memberName is not an attribute
             * - if we are rendering the host element in order to reflect attribute
             * - if it's a SVG, since properties might not work in <svg>
             * - if the newValue is null/undefined or 'false'.
             */      let r = false;
      {
        if (i !== (i = i.replace(/^xlink\:?/, ""))) {
          e = i;
          r = true;
        }
      }
      if (s == null || s === false) {
        if (s !== false || t.getAttribute(e) === "") {
          if (r) {
            t.removeAttributeNS(u, e);
          } else {
            t.removeAttribute(e);
          }
        }
      } else if ((!c || l & 4 /* VNODE_FLAGS.isHost */ || o) && !f) {
        s = s === true ? "" : s;
        if (r) {
          t.setAttributeNS(u, e, s);
        } else {
          t.setAttribute(e, s);
        }
      }
    }
  }
};

const w = /\s/;

const parseClassList = t => !t ? [] : t.split(w);

const updateElement = (t, e, n, s) => {
  // if the element passed in is a shadow root, which is a document fragment
  // then we want to be adding attrs/props to the shadow root's "host" element
  // if it's not a shadow root, then we add attrs/props to the same element
  const o = e._$$elm$$_.nodeType === 11 /* NODE_TYPE.DocumentFragment */ && e._$$elm$$_.host ? e._$$elm$$_.host : e._$$elm$$_;
  const l = t && t._$$attrs$$_ || a;
  const c = e._$$attrs$$_ || a;
  {
    // remove attributes no longer present on the vnode by setting them to undefined
    for (s in l) {
      if (!(s in c)) {
        setAccessor(o, s, l[s], undefined, n, e._$$flags$$_);
      }
    }
  }
  // add new & update changed attributes
    for (s in c) {
    setAccessor(o, s, l[s], c[s], n, e._$$flags$$_);
  }
};

/**
 * Create a DOM Node corresponding to one of the children of a given VNode.
 *
 * @param oldParentVNode the parent VNode from the previous render
 * @param newParentVNode the parent VNode from the current render
 * @param childIndex the index of the VNode, in the _new_ parent node's
 * children, for which we will create a new DOM node
 * @param parentElm the parent DOM node which our new node will be a child of
 * @returns the newly created node
 */ const createElm = (t, l, f, r) => {
  // tslint:disable-next-line: prefer-const
  const u = l._$$children$$_[f];
  let a = 0;
  let m;
  let $;
  let y;
  if (!o) {
    // remember for later we need to check to relocate nodes
    c = true;
    if (u._$$tag$$_ === "slot") {
      if (e) {
        // scoped css needs to add its scoped id to the parent element
        r.classList.add(e + "-s");
      }
      u._$$flags$$_ |= u._$$children$$_ ? // slot element has fallback content
      2 /* VNODE_FLAGS.isSlotFallback */ : // slot element does not have fallback content
      1 /* VNODE_FLAGS.isSlotReference */;
    }
  }
  if (u._$$text$$_ !== null) {
    // create text node
    m = u._$$elm$$_ = C.createTextNode(u._$$text$$_);
  } else if (u._$$flags$$_ & 1 /* VNODE_FLAGS.isSlotReference */) {
    // create a slot reference node
    m = u._$$elm$$_ = slotReferenceDebugNode(u);
  } else {
    if (!i) {
      i = u._$$tag$$_ === "svg";
    }
    // create element
        m = u._$$elm$$_ = C.createElementNS(i ? d : p, u._$$flags$$_ & 2 /* VNODE_FLAGS.isSlotFallback */ ? "slot-fb" : u._$$tag$$_);
    if (i && u._$$tag$$_ === "foreignObject") {
      i = false;
    }
    // add css classes, attrs, props, listeners, etc.
        {
      updateElement(null, u, i);
    }
    if (isDef(e) && m["s-si"] !== e) {
      // if there is a scopeId and this is the initial render
      // then let's add the scopeId as a css class
      m.classList.add(m["s-si"] = e);
    }
    if (u._$$children$$_) {
      for (a = 0; a < u._$$children$$_.length; ++a) {
        // create the node
        $ = createElm(t, u, a, m);
        // return node could have been null
                if ($) {
          // append our new node
          m.appendChild($);
        }
      }
    }
    {
      if (u._$$tag$$_ === "svg") {
        // Only reset the SVG context when we're exiting <svg> element
        i = false;
      } else if (m.tagName === "foreignObject") {
        // Reenter SVG context when we're exiting <foreignObject> element
        i = true;
      }
    }
  }
  {
    m["s-hn"] = s;
    if (u._$$flags$$_ & (2 /* VNODE_FLAGS.isSlotFallback */ | 1 /* VNODE_FLAGS.isSlotReference */)) {
      // remember the content reference comment
      m["s-sr"] = true;
      // remember the content reference comment
            m["s-cr"] = n;
      // remember the slot name, or empty string for default slot
            m["s-sn"] = u._$$name$$_ || "";
      // check if we've got an old vnode for this slot
            y = t && t._$$children$$_ && t._$$children$$_[f];
      if (y && y._$$tag$$_ === u._$$tag$$_ && t._$$elm$$_) {
        // we've got an old slot vnode and the wrapper is being replaced
        // so let's move the old slot content back to it's original location
        putBackInOriginalLocation(t._$$elm$$_, false);
      }
    }
  }
  return m;
};

const putBackInOriginalLocation = (t, e) => {
  M._$$flags$$_ |= 1 /* PLATFORM_FLAGS.isTmpDisconnected */;
  const n = t.childNodes;
  for (let t = n.length - 1; t >= 0; t--) {
    const o = n[t];
    if (o["s-hn"] !== s && o["s-ol"]) {
      // // this child node in the old element is from another component
      // // remove this node from the old slot's parent
      // childNode.remove();
      // and relocate it back to it's original location
      parentReferenceNode(o).insertBefore(o, referenceNode(o));
      // remove the old original location comment entirely
      // later on the patch function will know what to do
      // and move this to the correct spot in need be
            o["s-ol"].remove();
      o["s-ol"] = undefined;
      c = true;
    }
    if (e) {
      putBackInOriginalLocation(o, e);
    }
  }
  M._$$flags$$_ &= ~1 /* PLATFORM_FLAGS.isTmpDisconnected */;
};

/**
 * Create DOM nodes corresponding to a list of {@link d.Vnode} objects and
 * add them to the DOM in the appropriate place.
 *
 * @param parentElm the DOM node which should be used as a parent for the new
 * DOM nodes
 * @param before a child of the `parentElm` which the new children should be
 * inserted before (optional)
 * @param parentVNode the parent virtual DOM node
 * @param vnodes the new child virtual DOM nodes to produce DOM nodes for
 * @param startIdx the index in the child virtual DOM nodes at which to start
 * creating DOM nodes (inclusive)
 * @param endIdx the index in the child virtual DOM nodes at which to stop
 * creating DOM nodes (inclusive)
 */ const addVnodes = (t, e, n, s, o, l) => {
  let c = t["s-cr"] && t["s-cr"].parentNode || t;
  let i;
  for (;o <= l; ++o) {
    if (s[o]) {
      i = createElm(null, n, o, t);
      if (i) {
        s[o]._$$elm$$_ = i;
        c.insertBefore(i, referenceNode(e));
      }
    }
  }
};

/**
 * Remove the DOM elements corresponding to a list of {@link d.VNode} objects.
 * This can be used to, for instance, clean up after a list of children which
 * should no longer be shown.
 *
 * This function also handles some of Stencil's slot relocation logic.
 *
 * @param vnodes a list of virtual DOM nodes to remove
 * @param startIdx the index at which to start removing nodes (inclusive)
 * @param endIdx the index at which to stop removing nodes (inclusive)
 */ const removeVnodes = (t, e, n) => {
  for (let s = e; s <= n; ++s) {
    const e = t[s];
    if (e) {
      const t = e._$$elm$$_;
      nullifyVNodeRefs(e);
      if (t) {
        {
          // we're removing this element
          // so it's possible we need to show slot fallback content now
          l = true;
          if (t["s-ol"]) {
            // remove the original location comment
            t["s-ol"].remove();
          } else {
            // it's possible that child nodes of the node
            // that's being removed are slot nodes
            putBackInOriginalLocation(t, true);
          }
        }
        // remove the vnode's element from the dom
                t.remove();
      }
    }
  }
};

/**
 * Reconcile the children of a new VNode with the children of an old VNode by
 * traversing the two collections of children, identifying nodes that are
 * conserved or changed, calling out to `patch` to make any necessary
 * updates to the DOM, and rearranging DOM nodes as needed.
 *
 * The algorithm for reconciling children works by analyzing two 'windows' onto
 * the two arrays of children (`oldCh` and `newCh`). We keep track of the
 * 'windows' by storing start and end indices and references to the
 * corresponding array entries. Initially the two 'windows' are basically equal
 * to the entire array, but we progressively narrow the windows until there are
 * no children left to update by doing the following:
 *
 * 1. Skip any `null` entries at the beginning or end of the two arrays, so
 *    that if we have an initial array like the following we'll end up dealing
 *    only with a window bounded by the highlighted elements:
 *
 *    [null, null, VNode1 , ... , VNode2, null, null]
 *                 ^^^^^^         ^^^^^^
 *
 * 2. Check to see if the elements at the head and tail positions are equal
 *    across the windows. This will basically detect elements which haven't
 *    been added, removed, or changed position, i.e. if you had the following
 *    VNode elements (represented as HTML):
 *
 *    oldVNode: `<div><p><span>HEY</span></p></div>`
 *    newVNode: `<div><p><span>THERE</span></p></div>`
 *
 *    Then when comparing the children of the `<div>` tag we check the equality
 *    of the VNodes corresponding to the `<p>` tags and, since they are the
 *    same tag in the same position, we'd be able to avoid completely
 *    re-rendering the subtree under them with a new DOM element and would just
 *    call out to `patch` to handle reconciling their children and so on.
 *
 * 3. Check, for both windows, to see if the element at the beginning of the
 *    window corresponds to the element at the end of the other window. This is
 *    a heuristic which will let us identify _some_ situations in which
 *    elements have changed position, for instance it _should_ detect that the
 *    children nodes themselves have not changed but merely moved in the
 *    following example:
 *
 *    oldVNode: `<div><element-one /><element-two /></div>`
 *    newVNode: `<div><element-two /><element-one /></div>`
 *
 *    If we find cases like this then we also need to move the concrete DOM
 *    elements corresponding to the moved children to write the re-order to the
 *    DOM.
 *
 * 4. Finally, if VNodes have the `key` attribute set on them we check for any
 *    nodes in the old children which have the same key as the first element in
 *    our window on the new children. If we find such a node we handle calling
 *    out to `patch`, moving relevant DOM nodes, and so on, in accordance with
 *    what we find.
 *
 * Finally, once we've narrowed our 'windows' to the point that either of them
 * collapse (i.e. they have length 0) we then handle any remaining VNode
 * insertion or deletion that needs to happen to get a DOM state that correctly
 * reflects the new child VNodes. If, for instance, after our window on the old
 * children has collapsed we still have more nodes on the new children that
 * we haven't dealt with yet then we need to add them, or if the new children
 * collapse but we still have unhandled _old_ children then we need to make
 * sure the corresponding DOM nodes are removed.
 *
 * @param parentElm the node into which the parent VNode is rendered
 * @param oldCh the old children of the parent node
 * @param newVNode the new VNode which will replace the parent
 * @param newCh the new children of the parent node
 */ const updateChildren = (t, e, n, s) => {
  let o = 0;
  let l = 0;
  let c = 0;
  let i = 0;
  let f = e.length - 1;
  let r = e[0];
  let u = e[f];
  let a = s.length - 1;
  let d = s[0];
  let p = s[a];
  let m;
  let $;
  while (o <= f && l <= a) {
    if (r == null) {
      // VNode might have been moved left
      r = e[++o];
    } else if (u == null) {
      u = e[--f];
    } else if (d == null) {
      d = s[++l];
    } else if (p == null) {
      p = s[--a];
    } else if (isSameVnode(r, d)) {
      // if the start nodes are the same then we should patch the new VNode
      // onto the old one, and increment our `newStartIdx` and `oldStartIdx`
      // indices to reflect that. We don't need to move any DOM Nodes around
      // since things are matched up in order.
      patch(r, d);
      r = e[++o];
      d = s[++l];
    } else if (isSameVnode(u, p)) {
      // likewise, if the end nodes are the same we patch new onto old and
      // decrement our end indices, and also likewise in this case we don't
      // need to move any DOM Nodes.
      patch(u, p);
      u = e[--f];
      p = s[--a];
    } else if (isSameVnode(r, p)) {
      // case: "Vnode moved right"
      // We've found that the last node in our window on the new children is
      // the same VNode as the _first_ node in our window on the old children
      // we're dealing with now. Visually, this is the layout of these two
      // nodes:
      // newCh: [..., newStartVnode , ... , newEndVnode , ...]
      //                                    ^^^^^^^^^^^
      // oldCh: [..., oldStartVnode , ... , oldEndVnode , ...]
      //              ^^^^^^^^^^^^^
      // In this situation we need to patch `newEndVnode` onto `oldStartVnode`
      // and move the DOM element for `oldStartVnode`.
      if (r._$$tag$$_ === "slot" || p._$$tag$$_ === "slot") {
        putBackInOriginalLocation(r._$$elm$$_.parentNode, false);
      }
      patch(r, p);
      // We need to move the element for `oldStartVnode` into a position which
      // will be appropriate for `newEndVnode`. For this we can use
      // `.insertBefore` and `oldEndVnode.$elm$.nextSibling`. If there is a
      // sibling for `oldEndVnode.$elm$` then we want to move the DOM node for
      // `oldStartVnode` between `oldEndVnode` and it's sibling, like so:
      
      // <old-start-node />
      // <some-intervening-node />
      // <old-end-node />
      // <!-- ->              <-- `oldStartVnode.$elm$` should be inserted here
      // <next-sibling />
      
      // If instead `oldEndVnode.$elm$` has no sibling then we just want to put
      // the node for `oldStartVnode` at the end of the children of
      // `parentElm`. Luckily, `Node.nextSibling` will return `null` if there
      // aren't any siblings, and passing `null` to `Node.insertBefore` will
      // append it to the children of the parent element.
            t.insertBefore(r._$$elm$$_, u._$$elm$$_.nextSibling);
      r = e[++o];
      p = s[--a];
    } else if (isSameVnode(u, d)) {
      // case: "Vnode moved left"
      // We've found that the first node in our window on the new children is
      // the same VNode as the _last_ node in our window on the old children.
      // Visually, this is the layout of these two nodes:
      // newCh: [..., newStartVnode , ... , newEndVnode , ...]
      //              ^^^^^^^^^^^^^
      // oldCh: [..., oldStartVnode , ... , oldEndVnode , ...]
      //                                    ^^^^^^^^^^^
      // In this situation we need to patch `newStartVnode` onto `oldEndVnode`
      // (which will handle updating any changed attributes, reconciling their
      // children etc) but we also need to move the DOM node to which
      // `oldEndVnode` corresponds.
      if (r._$$tag$$_ === "slot" || p._$$tag$$_ === "slot") {
        putBackInOriginalLocation(u._$$elm$$_.parentNode, false);
      }
      patch(u, d);
      // We've already checked above if `oldStartVnode` and `newStartVnode` are
      // the same node, so since we're here we know that they are not. Thus we
      // can move the element for `oldEndVnode` _before_ the element for
      // `oldStartVnode`, leaving `oldStartVnode` to be reconciled in the
      // future.
            t.insertBefore(u._$$elm$$_, r._$$elm$$_);
      u = e[--f];
      d = s[++l];
    } else {
      // Here we do some checks to match up old and new nodes based on the
      // `$key$` attribute, which is set by putting a `key="my-key"` attribute
      // in the JSX for a DOM element in the implementation of a Stencil
      // component.
      // First we check to see if there are any nodes in the array of old
      // children which have the same key as the first node in the new
      // children.
      c = -1;
      {
        for (i = o; i <= f; ++i) {
          if (e[i] && e[i]._$$key$$_ !== null && e[i]._$$key$$_ === d._$$key$$_) {
            c = i;
            break;
          }
        }
      }
      if (c >= 0) {
        // We found a node in the old children which matches up with the first
        // node in the new children! So let's deal with that
        $ = e[c];
        if ($._$$tag$$_ !== d._$$tag$$_) {
          // the tag doesn't match so we'll need a new DOM element
          m = createElm(e && e[l], n, c, t);
        } else {
          patch($, d);
          // invalidate the matching old node so that we won't try to update it
          // again later on
                    e[c] = undefined;
          m = $._$$elm$$_;
        }
        d = s[++l];
      } else {
        // We either didn't find an element in the old children that matches
        // the key of the first new child OR the build is not using `key`
        // attributes at all. In either case we need to create a new element
        // for the new node.
        m = createElm(e && e[l], n, l, t);
        d = s[++l];
      }
      if (m) {
        // if we created a new node then handle inserting it to the DOM
        {
          parentReferenceNode(r._$$elm$$_).insertBefore(m, referenceNode(r._$$elm$$_));
        }
      }
    }
  }
  if (o > f) {
    // we have some more new nodes to add which don't match up with old nodes
    addVnodes(t, s[a + 1] == null ? null : s[a + 1]._$$elm$$_, n, s, l, a);
  } else if (l > a) {
    // there are nodes in the `oldCh` array which no longer correspond to nodes
    // in the new array, so lets remove them (which entails cleaning up the
    // relevant DOM nodes)
    removeVnodes(e, o, f);
  }
};

/**
 * Compare two VNodes to determine if they are the same
 *
 * **NB**: This function is an equality _heuristic_ based on the available
 * information set on the two VNodes and can be misleading under certain
 * circumstances. In particular, if the two nodes do not have `key` attrs
 * (available under `$key$` on VNodes) then the function falls back on merely
 * checking that they have the same tag.
 *
 * So, in other words, if `key` attrs are not set on VNodes which may be
 * changing order within a `children` array or something along those lines then
 * we could obtain a false negative and then have to do needless re-rendering
 * (i.e. we'd say two VNodes aren't equal when in fact they should be).
 *
 * @param leftVNode the first VNode to check
 * @param rightVNode the second VNode to check
 * @returns whether they're equal or not
 */ const isSameVnode = (t, e) => {
  // compare if two vnode to see if they're "technically" the same
  // need to have the same element tag, and same key to be the same
  if (t._$$tag$$_ === e._$$tag$$_) {
    if (t._$$tag$$_ === "slot") {
      return t._$$name$$_ === e._$$name$$_;
    }
    // this will be set if components in the build have `key` attrs set on them
        {
      return t._$$key$$_ === e._$$key$$_;
    }
  }
  return false;
};

const referenceNode = t => t && t["s-ol"] || t;

const parentReferenceNode = t => (t["s-ol"] ? t["s-ol"] : t).parentNode
/**
 * Handle reconciling an outdated VNode with a new one which corresponds to
 * it. This function handles flushing updates to the DOM and reconciling the
 * children of the two nodes (if any).
 *
 * @param oldVNode an old VNode whose DOM element and children we want to update
 * @param newVNode a new VNode representing an updated version of the old one
 */;

const patch = (t, e) => {
  const n = e._$$elm$$_ = t._$$elm$$_;
  const s = t._$$children$$_;
  const o = e._$$children$$_;
  const l = e._$$tag$$_;
  const c = e._$$text$$_;
  let f;
  if (c === null) {
    {
      // test if we're rendering an svg element, or still rendering nodes inside of one
      // only add this to the when the compiler sees we're using an svg somewhere
      i = l === "svg" ? true : l === "foreignObject" ? false : i;
    }
    {
      if (l === "slot") ; else {
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(t, e, i);
      }
    }
    if (s !== null && o !== null) {
      // looks like there's child vnodes for both the old and new vnodes
      // so we need to call `updateChildren` to reconcile them
      updateChildren(n, s, e, o);
    } else if (o !== null) {
      // no old child vnodes, but there are new child vnodes to add
      if (t._$$text$$_ !== null) {
        // the old vnode was text, so be sure to clear it out
        n.textContent = "";
      }
      // add the new vnode children
            addVnodes(n, null, e, o, 0, o.length - 1);
    } else if (s !== null) {
      // no new child vnodes, but there are old child vnodes to remove
      removeVnodes(s, 0, s.length - 1);
    }
    if (i && l === "svg") {
      i = false;
    }
  } else if (f = n["s-cr"]) {
    // this element has slotted content
    f.parentNode.textContent = c;
  } else if (t._$$text$$_ !== c) {
    // update the text content for the text only vnode
    // and also only if the text is different than before
    n.data = c;
  }
};

const updateFallbackSlotVisibility = t => {
  // tslint:disable-next-line: prefer-const
  const e = t.childNodes;
  let n;
  let s;
  let o;
  let l;
  let c;
  let i;
  for (s = 0, o = e.length; s < o; s++) {
    n = e[s];
    if (n.nodeType === 1 /* NODE_TYPE.ElementNode */) {
      if (n["s-sr"]) {
        // this is a slot fallback node
        // get the slot name for this slot reference node
        c = n["s-sn"];
        // by default always show a fallback slot node
        // then hide it if there are other slots in the light dom
                n.hidden = false;
        for (l = 0; l < o; l++) {
          i = e[l].nodeType;
          if (e[l]["s-hn"] !== n["s-hn"] || c !== "") {
            // this sibling node is from a different component OR is a named fallback slot node
            if (i === 1 /* NODE_TYPE.ElementNode */ && c === e[l].getAttribute("slot")) {
              n.hidden = true;
              break;
            }
          } else {
            // this is a default fallback slot node
            // any element or text node (with content)
            // should hide the default fallback slot node
            if (i === 1 /* NODE_TYPE.ElementNode */ || i === 3 /* NODE_TYPE.TextNode */ && e[l].textContent.trim() !== "") {
              n.hidden = true;
              break;
            }
          }
        }
      }
      // keep drilling down
            updateFallbackSlotVisibility(n);
    }
  }
};

const b = [];

const relocateSlotContent = t => {
  // tslint:disable-next-line: prefer-const
  let e;
  let n;
  let s;
  let o;
  let c;
  let i;
  let f = 0;
  const r = t.childNodes;
  const u = r.length;
  for (;f < u; f++) {
    e = r[f];
    if (e["s-sr"] && (n = e["s-cr"]) && n.parentNode) {
      // first got the content reference comment node
      // then we got it's parent, which is where all the host content is in now
      s = n.parentNode.childNodes;
      o = e["s-sn"];
      for (i = s.length - 1; i >= 0; i--) {
        n = s[i];
        if (!n["s-cn"] && !n["s-nr"] && n["s-hn"] !== e["s-hn"]) {
          // let's do some relocating to its new home
          // but never relocate a content reference node
          // that is suppose to always represent the original content location
          if (isNodeLocatedInSlot(n, o)) {
            // it's possible we've already decided to relocate this node
            c = b.find((t => t._$$nodeToRelocate$$_ === n));
            // made some changes to slots
            // let's make sure we also double check
            // fallbacks are correctly hidden or shown
                        l = true;
            n["s-sn"] = n["s-sn"] || o;
            if (c) {
              // previously we never found a slot home for this node
              // but turns out we did, so let's remember it now
              c._$$slotRefNode$$_ = e;
            } else {
              // add to our list of nodes to relocate
              b.push({
                _$$slotRefNode$$_: e,
                _$$nodeToRelocate$$_: n
              });
            }
            if (n["s-sr"]) {
              b.map((t => {
                if (isNodeLocatedInSlot(t._$$nodeToRelocate$$_, n["s-sn"])) {
                  c = b.find((t => t._$$nodeToRelocate$$_ === n));
                  if (c && !t._$$slotRefNode$$_) {
                    t._$$slotRefNode$$_ = c._$$slotRefNode$$_;
                  }
                }
              }));
            }
          } else if (!b.some((t => t._$$nodeToRelocate$$_ === n))) {
            // so far this element does not have a slot home, not setting slotRefNode on purpose
            // if we never find a home for this element then we'll need to hide it
            b.push({
              _$$nodeToRelocate$$_: n
            });
          }
        }
      }
    }
    if (e.nodeType === 1 /* NODE_TYPE.ElementNode */) {
      relocateSlotContent(e);
    }
  }
};

const isNodeLocatedInSlot = (t, e) => {
  if (t.nodeType === 1 /* NODE_TYPE.ElementNode */) {
    if (t.getAttribute("slot") === null && e === "") {
      return true;
    }
    if (t.getAttribute("slot") === e) {
      return true;
    }
    return false;
  }
  if (t["s-sn"] === e) {
    return true;
  }
  return e === "";
};

/**
 * 'Nullify' any VDom `ref` callbacks on a VDom node or its children by
 * calling them with `null`. This signals that the DOM element corresponding to
 * the VDom node has been removed from the DOM.
 *
 * @param vNode a virtual DOM node
 */ const nullifyVNodeRefs = t => {
  {
    t._$$attrs$$_ && t._$$attrs$$_.ref && t._$$attrs$$_.ref(null);
    t._$$children$$_ && t._$$children$$_.map(nullifyVNodeRefs);
  }
};

/**
 * The main entry point for Stencil's virtual DOM-based rendering engine
 *
 * Given a {@link d.HostRef} container and some virtual DOM nodes, this
 * function will handle creating a virtual DOM tree with a single root, patching
 * the current virtual DOM tree onto an old one (if any), dealing with slot
 * relocation, and reflecting attributes.
 *
 * @param hostRef data needed to root and render the virtual DOM tree, such as
 * the DOM node into which it should be rendered.
 * @param renderFnResults the virtual DOM nodes to be rendered
 */ const renderVdom = (t, i) => {
  const f = t._$$hostElement$$_;
  const r = t._$$cmpMeta$$_;
  const u = t._$$vnode$$_ || newVNode(null, null);
  const a = isHost(i) ? i : h(null, null, i);
  s = f.tagName;
  if (r._$$attrsToReflect$$_) {
    a._$$attrs$$_ = a._$$attrs$$_ || {};
    r._$$attrsToReflect$$_.map((([t, e]) => a._$$attrs$$_[e] = f[t]));
  }
  a._$$tag$$_ = null;
  a._$$flags$$_ |= 4 /* VNODE_FLAGS.isHost */;
  t._$$vnode$$_ = a;
  a._$$elm$$_ = u._$$elm$$_ = f;
  {
    e = f["s-sc"];
  }
  {
    n = f["s-cr"];
    o = (r._$$flags$$_ & 1 /* CMP_FLAGS.shadowDomEncapsulation */) !== 0;
    // always reset
        l = false;
  }
  // synchronous patch
    patch(u, a);
  {
    // while we're moving nodes around existing nodes, temporarily disable
    // the disconnectCallback from working
    M._$$flags$$_ |= 1 /* PLATFORM_FLAGS.isTmpDisconnected */;
    if (c) {
      relocateSlotContent(a._$$elm$$_);
      let t;
      let e;
      let n;
      let s;
      let o;
      let l;
      let c = 0;
      for (;c < b.length; c++) {
        t = b[c];
        e = t._$$nodeToRelocate$$_;
        if (!e["s-ol"]) {
          // add a reference node marking this node's original location
          // keep a reference to this node for later lookups
          n = originalLocationDebugNode(e);
          n["s-nr"] = e;
          e.parentNode.insertBefore(e["s-ol"] = n, e);
        }
      }
      for (c = 0; c < b.length; c++) {
        t = b[c];
        e = t._$$nodeToRelocate$$_;
        if (t._$$slotRefNode$$_) {
          // by default we're just going to insert it directly
          // after the slot reference node
          s = t._$$slotRefNode$$_.parentNode;
          o = t._$$slotRefNode$$_.nextSibling;
          n = e["s-ol"];
          while (n = n.previousSibling) {
            l = n["s-nr"];
            if (l && l["s-sn"] === e["s-sn"] && s === l.parentNode) {
              l = l.nextSibling;
              if (!l || !l["s-nr"]) {
                o = l;
                break;
              }
            }
          }
          if (!o && s !== e.parentNode || e.nextSibling !== o) {
            // we've checked that it's worth while to relocate
            // since that the node to relocate
            // has a different next sibling or parent relocated
            if (e !== o) {
              if (!e["s-hn"] && e["s-ol"]) {
                // probably a component in the index.html that doesn't have it's hostname set
                e["s-hn"] = e["s-ol"].parentNode.nodeName;
              }
              // add it back to the dom but in its new home
                            s.insertBefore(e, o);
            }
          }
        } else {
          // this node doesn't have a slot home to go to, so let's hide it
          if (e.nodeType === 1 /* NODE_TYPE.ElementNode */) {
            e.hidden = true;
          }
        }
      }
    }
    if (l) {
      updateFallbackSlotVisibility(a._$$elm$$_);
    }
    // done moving nodes around
    // allow the disconnect callback to work again
        M._$$flags$$_ &= ~1 /* PLATFORM_FLAGS.isTmpDisconnected */;
    // always reset
        b.length = 0;
  }
};

// slot comment debug nodes only created with the `--debug` flag
// otherwise these nodes are text nodes w/out content
const slotReferenceDebugNode = t => C.createComment(`<slot${t._$$name$$_ ? ' name="' + t._$$name$$_ + '"' : ""}> (host=${s.toLowerCase()})`);

const originalLocationDebugNode = t => C.createComment(`org-location for ` + (t.localName ? `<${t.localName}> (host=${t["s-hn"]})` : `[${t.textContent}]`));

const attachToAncestor = (t, e) => {
  if (e && !t._$$onRenderResolve$$_ && e["s-p"]) {
    e["s-p"].push(new Promise((e => t._$$onRenderResolve$$_ = e)));
  }
};

const scheduleUpdate = (t, e) => {
  {
    t._$$flags$$_ |= 16 /* HOST_FLAGS.isQueuedForUpdate */;
  }
  if (t._$$flags$$_ & 4 /* HOST_FLAGS.isWaitingForChildren */) {
    t._$$flags$$_ |= 512 /* HOST_FLAGS.needsRerender */;
    return;
  }
  attachToAncestor(t, t._$$ancestorComponent$$_);
  // there is no ancestor component or the ancestor component
  // has already fired off its lifecycle update then
  // fire off the initial update
    const dispatch = () => dispatchHooks(t, e);
  return x(dispatch);
};

/**
 * Dispatch initial-render and update lifecycle hooks, enqueuing calls to
 * component lifecycle methods like `componentWillLoad` as well as
 * {@link updateComponent}, which will kick off the virtual DOM re-render.
 *
 * @param hostRef a reference to a host DOM node
 * @param isInitialLoad whether we're on the initial load or not
 * @returns an empty Promise which is used to enqueue a series of operations for
 * the component
 */ const dispatchHooks = (t, e) => {
  const n = t._$$hostElement$$_;
  const s = createTime("scheduleUpdate", t._$$cmpMeta$$_._$$tagName$$_);
  const o = t._$$lazyInstance$$_;
  // We're going to use this variable together with `enqueue` to implement a
  // little promise-based queue. We start out with it `undefined`. When we add
  // the first function to the queue we'll set this variable to be that
  // function's return value. When we attempt to add subsequent values to the
  // queue we'll check that value and, if it was a `Promise`, we'll then chain
  // the new function off of that `Promise` using `.then()`. This will give our
  // queue two nice properties:
  
  // 1. If all functions added to the queue are synchronous they'll be called
  //    synchronously right away.
  // 2. If all functions added to the queue are asynchronous they'll all be
  //    called in order after `dispatchHooks` exits.
    let l;
  if (e) {
    emitLifecycleEvent(n, "componentWillLoad");
    {
      // If `componentWillLoad` returns a `Promise` then we want to wait on
      // whatever's going on in that `Promise` before we launch into
      // rendering the component, doing other lifecycle stuff, etc. So
      // in that case we assign the returned promise to the variable we
      // declared above to hold a possible 'queueing' Promise
      l = safeCall(o, "componentWillLoad");
    }
  } else {
    emitLifecycleEvent(n, "componentWillUpdate");
  }
  emitLifecycleEvent(n, "componentWillRender");
  {
    l = enqueue(l, (() => safeCall(o, "componentWillRender")));
  }
  s();
  return enqueue(l, (() => updateComponent(t, o, e)));
};

/**
 * This function uses a Promise to implement a simple first-in, first-out queue
 * of functions to be called.
 *
 * The queue is ordered on the basis of the first argument. If it's
 * `undefined`, then nothing is on the queue yet, so the provided function can
 * be called synchronously (although note that this function may return a
 * `Promise`). The idea is that then the return value of that enqueueing
 * operation is kept around, so that if it was a `Promise` then subsequent
 * functions can be enqueued by calling this function again with that `Promise`
 * as the first argument.
 *
 * @param maybePromise either a `Promise` which should resolve before the next function is called or an 'empty' sentinel
 * @param fn a function to enqueue
 * @returns either a `Promise` or the return value of the provided function
 */ const enqueue = (t, e) => t instanceof Promise ? t.then(e) : e();

const updateComponent = async (t, e, n) => {
  const s = t._$$hostElement$$_;
  const o = createTime("update", t._$$cmpMeta$$_._$$tagName$$_);
  const l = s["s-rc"];
  if (n) {
    // DOM WRITE!
    attachStyles(t);
  }
  const c = createTime("render", t._$$cmpMeta$$_._$$tagName$$_);
  {
    callRender(t, e);
  }
  if (l) {
    // ok, so turns out there are some child host elements
    // waiting on this parent element to load
    // let's fire off all update callbacks waiting
    l.map((t => t()));
    s["s-rc"] = undefined;
  }
  c();
  o();
  {
    const e = s["s-p"];
    const postUpdate = () => postUpdateComponent(t);
    if (e.length === 0) {
      postUpdate();
    } else {
      Promise.all(e).then(postUpdate);
      t._$$flags$$_ |= 4 /* HOST_FLAGS.isWaitingForChildren */;
      e.length = 0;
    }
  }
};

const callRender = (t, e, n) => {
  try {
    e = e.render();
    {
      t._$$flags$$_ &= ~16 /* HOST_FLAGS.isQueuedForUpdate */;
    }
    {
      t._$$flags$$_ |= 2 /* HOST_FLAGS.hasRendered */;
    }
    {
      {
        // looks like we've got child nodes to render into this host element
        // or we need to update the css class/attrs on the host element
        // DOM WRITE!
        {
          renderVdom(t, e);
        }
      }
    }
  } catch (e) {
    consoleError(e, t._$$hostElement$$_);
  }
  return null;
};

const postUpdateComponent = t => {
  const e = t._$$cmpMeta$$_._$$tagName$$_;
  const n = t._$$hostElement$$_;
  const s = createTime("postUpdate", e);
  const o = t._$$lazyInstance$$_;
  const l = t._$$ancestorComponent$$_;
  {
    safeCall(o, "componentDidRender");
  }
  emitLifecycleEvent(n, "componentDidRender");
  if (!(t._$$flags$$_ & 64 /* HOST_FLAGS.hasLoadedComponent */)) {
    t._$$flags$$_ |= 64 /* HOST_FLAGS.hasLoadedComponent */;
    {
      // DOM WRITE!
      addHydratedFlag(n);
    }
    {
      safeCall(o, "componentDidLoad");
    }
    emitLifecycleEvent(n, "componentDidLoad");
    s();
    {
      t._$$onReadyResolve$$_(n);
      if (!l) {
        appDidLoad();
      }
    }
  } else {
    emitLifecycleEvent(n, "componentDidUpdate");
    s();
  }
  // load events fire from bottom to top
  // the deepest elements load first then bubbles up
    {
    if (t._$$onRenderResolve$$_) {
      t._$$onRenderResolve$$_();
      t._$$onRenderResolve$$_ = undefined;
    }
    if (t._$$flags$$_ & 512 /* HOST_FLAGS.needsRerender */) {
      nextTick((() => scheduleUpdate(t, false)));
    }
    t._$$flags$$_ &= ~(4 /* HOST_FLAGS.isWaitingForChildren */ | 512 /* HOST_FLAGS.needsRerender */);
  }
  // ( •_•)
  // ( •_•)>⌐■-■
  // (⌐■_■)
};

const appDidLoad = e => {
  // on appload
  // we have finish the first big initial render
  {
    addHydratedFlag(C.documentElement);
  }
  nextTick((() => emitEvent(j, "appload", {
    detail: {
      namespace: t
    }
  })));
};

const safeCall = (t, e, n) => {
  if (t && t[e]) {
    try {
      return t[e](n);
    } catch (t) {
      consoleError(t);
    }
  }
  return undefined;
};

const emitLifecycleEvent = (e, n) => {
  {
    emitEvent(e, "stencil_" + n, {
      bubbles: true,
      composed: true,
      detail: {
        namespace: t
      }
    });
  }
};

const addHydratedFlag = t => t.classList.add("hydrated");

const getValue = (t, e) => getHostRef(t)._$$instanceValues$$_.get(e);

const setValue = (t, e, n, s) => {
  // check our new property value against our internal value
  const o = getHostRef(t);
  const l = o._$$instanceValues$$_.get(e);
  const c = o._$$flags$$_;
  const i = o._$$lazyInstance$$_;
  n = parsePropertyValue(n, s._$$members$$_[e][0]);
  // explicitly check for NaN on both sides, as `NaN === NaN` is always false
    const f = Number.isNaN(l) && Number.isNaN(n);
  const r = n !== l && !f;
  if ((!(c & 8 /* HOST_FLAGS.isConstructingInstance */) || l === undefined) && r) {
    // gadzooks! the property's value has changed!!
    // set our new value!
    o._$$instanceValues$$_.set(e, n);
    if (i) {
      if ((c & (2 /* HOST_FLAGS.hasRendered */ | 16 /* HOST_FLAGS.isQueuedForUpdate */)) === 2 /* HOST_FLAGS.hasRendered */) {
        // looks like this value actually changed, so we've got work to do!
        // but only if we've already rendered, otherwise just chill out
        // queue that we need to do an update, but don't worry about queuing
        // up millions cuz this function ensures it only runs once
        scheduleUpdate(o, false);
      }
    }
  }
};

/**
 * Attach a series of runtime constructs to a compiled Stencil component
 * constructor, including getters and setters for the `@Prop` and `@State`
 * decorators, callbacks for when attributes change, and so on.
 *
 * @param Cstr the constructor for a component that we need to process
 * @param cmpMeta metadata collected previously about the component
 * @param flags a number used to store a series of bit flags
 * @returns a reference to the same constructor passed in (but now mutated)
 */ const proxyComponent = (t, e, n) => {
  if (e._$$members$$_) {
    // It's better to have a const than two Object.entries()
    const s = Object.entries(e._$$members$$_);
    const o = t.prototype;
    s.map((([t, [s]]) => {
      if (s & 31 /* MEMBER_FLAGS.Prop */ || n & 2 /* PROXY_FLAGS.proxyState */ && s & 32 /* MEMBER_FLAGS.State */) {
        // proxyComponent - prop
        Object.defineProperty(o, t, {
          get() {
            // proxyComponent, get value
            return getValue(this, t);
          },
          set(n) {
            // proxyComponent, set value
            setValue(this, t, n, e);
          },
          configurable: true,
          enumerable: true
        });
      }
    }));
    if (n & 1 /* PROXY_FLAGS.isElementConstructor */) {
      const n = new Map;
      o.attributeChangedCallback = function(t, e, s) {
        M.jmp((() => {
          const e = n.get(t);
          //  In a web component lifecycle the attributeChangedCallback runs prior to connectedCallback
          //  in the case where an attribute was set inline.
          //  ```html
          //    <my-component some-attribute="some-value"></my-component>
          //  ```
          
          //  There is an edge case where a developer sets the attribute inline on a custom element and then
          //  programmatically changes it before it has been upgraded as shown below:
          
          //  ```html
          //    <!-- this component has _not_ been upgraded yet -->
          //    <my-component id="test" some-attribute="some-value"></my-component>
          //    <script>
          //      // grab non-upgraded component
          //      el = document.querySelector("#test");
          //      el.someAttribute = "another-value";
          //      // upgrade component
          //      customElements.define('my-component', MyComponent);
          //    <\/script>
          //  ```
          //  In this case if we do not unshadow here and use the value of the shadowing property, attributeChangedCallback
          //  will be called with `newValue = "some-value"` and will set the shadowed property (this.someAttribute = "another-value")
          //  to the value that was set inline i.e. "some-value" from above example. When
          //  the connectedCallback attempts to unshadow it will use "some-value" as the initial value rather than "another-value"
          
          //  The case where the attribute was NOT set inline but was not set programmatically shall be handled/unshadowed
          //  by connectedCallback as this attributeChangedCallback will not fire.
          
          //  https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
          
          //  TODO(STENCIL-16) we should think about whether or not we actually want to be reflecting the attributes to
          //  properties here given that this goes against best practices outlined here
          //  https://developers.google.com/web/fundamentals/web-components/best-practices#avoid-reentrancy
                    if (this.hasOwnProperty(e)) {
            s = this[e];
            delete this[e];
          } else if (o.hasOwnProperty(e) && typeof this[e] === "number" && this[e] == s) {
            // if the propName exists on the prototype of `Cstr`, this update may be a result of Stencil using native
            // APIs to reflect props as attributes. Calls to `setAttribute(someElement, propName)` will result in
            // `propName` to be converted to a `DOMString`, which may not be what we want for other primitive props.
            return;
          }
          this[e] = s === null && typeof this[e] === "boolean" ? false : s;
        }));
      };
      // create an array of attributes to observe
      // and also create a map of html attribute name to js property name
            t.observedAttributes = s.filter((([t, e]) => e[0] & 15 /* MEMBER_FLAGS.HasAttribute */ // filter to only keep props that should match attributes
      )).map((([t, s]) => {
        const o = s[1] || t;
        n.set(o, t);
        if (s[0] & 512 /* MEMBER_FLAGS.ReflectAttr */) {
          e._$$attrsToReflect$$_.push([ t, o ]);
        }
        return o;
      }));
    }
  }
  return t;
};

const initializeComponent = async (t, e, n, s, o) => {
  // initializeComponent
  if ((e._$$flags$$_ & 32 /* HOST_FLAGS.hasInitializedComponent */) === 0) {
    // Let the runtime know that the component has been initialized
    e._$$flags$$_ |= 32 /* HOST_FLAGS.hasInitializedComponent */;
    {
      // lazy loaded components
      // request the component's implementation to be
      // wired up with the host element
      o = loadModule(n);
      if (o.then) {
        // Await creates a micro-task avoid if possible
        const t = uniqueTime();
        o = await o;
        t();
      }
      if (!o) {
        throw new Error(`Constructor for "${n._$$tagName$$_}#${e._$$modeName$$_}" was not found`);
      }
      if (!o.isProxied) {
        proxyComponent(o, n, 2 /* PROXY_FLAGS.proxyState */);
        o.isProxied = true;
      }
      const t = createTime("createInstance", n._$$tagName$$_);
      // ok, time to construct the instance
      // but let's keep track of when we start and stop
      // so that the getters/setters don't incorrectly step on data
            {
        e._$$flags$$_ |= 8 /* HOST_FLAGS.isConstructingInstance */;
      }
      // construct the lazy-loaded component implementation
      // passing the hostRef is very important during
      // construction in order to directly wire together the
      // host element and the lazy-loaded instance
            try {
        new o(e);
      } catch (t) {
        consoleError(t);
      }
      {
        e._$$flags$$_ &= ~8 /* HOST_FLAGS.isConstructingInstance */;
      }
      t();
    }
    if (o.style) {
      // this component has styles but we haven't registered them yet
      let s = o.style;
      if (typeof s !== "string") {
        s = s[e._$$modeName$$_ = computeMode(t)];
      }
      const l = getScopeId(n, e._$$modeName$$_);
      if (!S.has(l)) {
        const t = createTime("registerStyles", n._$$tagName$$_);
        registerStyle(l, s, !!(n._$$flags$$_ & 1 /* CMP_FLAGS.shadowDomEncapsulation */));
        t();
      }
    }
  }
  // we've successfully created a lazy instance
    const l = e._$$ancestorComponent$$_;
  const schedule = () => scheduleUpdate(e, true);
  if (l && l["s-rc"]) {
    // this is the initial load and this component it has an ancestor component
    // but the ancestor component has NOT fired its will update lifecycle yet
    // so let's just cool our jets and wait for the ancestor to continue first
    // this will get fired off when the ancestor component
    // finally gets around to rendering its lazy self
    // fire off the initial update
    l["s-rc"].push(schedule);
  } else {
    schedule();
  }
};

const connectedCallback = t => {
  if ((M._$$flags$$_ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
    const e = getHostRef(t);
    const n = e._$$cmpMeta$$_;
    const s = createTime("connectedCallback", n._$$tagName$$_);
    if (!(e._$$flags$$_ & 1 /* HOST_FLAGS.hasConnected */)) {
      // first time this component has connected
      e._$$flags$$_ |= 1 /* HOST_FLAGS.hasConnected */;
      {
        // initUpdate
        // if the slot polyfill is required we'll need to put some nodes
        // in here to act as original content anchors as we move nodes around
        // host element has been connected to the DOM
        if (// TODO(STENCIL-662): Remove code related to deprecated shadowDomShim field
        n._$$flags$$_ & (4 /* CMP_FLAGS.hasSlotRelocation */ | 8 /* CMP_FLAGS.needsShadowDomShim */)) {
          setContentReference(t);
        }
      }
      {
        // find the first ancestor component (if there is one) and register
        // this component as one of the actively loading child components for its ancestor
        let n = t;
        while (n = n.parentNode || n.host) {
          // climb up the ancestors looking for the first
          // component that hasn't finished its lifecycle update yet
          if (n["s-p"]) {
            // we found this components first ancestor component
            // keep a reference to this component's ancestor component
            attachToAncestor(e, e._$$ancestorComponent$$_ = n);
            break;
          }
        }
      }
      // Lazy properties
      // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if (n._$$members$$_) {
        Object.entries(n._$$members$$_).map((([e, [n]]) => {
          if (n & 31 /* MEMBER_FLAGS.Prop */ && t.hasOwnProperty(e)) {
            const n = t[e];
            delete t[e];
            t[e] = n;
          }
        }));
      }
      {
        initializeComponent(t, e, n);
      }
    }
    s();
  }
};

const setContentReference = t => {
  // only required when we're NOT using native shadow dom (slot)
  // or this browser doesn't support native shadow dom
  // and this host element was NOT created with SSR
  // let's pick out the inner content for slot projection
  // create a node to represent where the original
  // content was first placed, which is useful later on
  const e = t["s-cr"] = C.createComment(`content-ref (host=${t.localName})`);
  e["s-cn"] = true;
  t.insertBefore(e, t.firstChild);
};

const disconnectedCallback = t => {
  if ((M._$$flags$$_ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
    getHostRef(t);
  }
};

const bootstrapLazy = (t, e = {}) => {
  var n;
  const s = createTime();
  const o = [];
  const l = e.exclude || [];
  const c = j.customElements;
  const i = C.head;
  const f =  i.querySelector("meta[charset]");
  const u =  C.createElement("style");
  const a = [];
  let d;
  let p = true;
  Object.assign(M, e);
  M._$$resourcesUrl$$_ = new URL(e.resourcesUrl || "./", C.baseURI).href;
  t.map((t => {
    t[1].map((e => {
      const n = {
        _$$flags$$_: e[0],
        _$$tagName$$_: e[1],
        _$$members$$_: e[2],
        _$$listeners$$_: e[3]
      };
      {
        n._$$members$$_ = e[2];
      }
      {
        n._$$attrsToReflect$$_ = [];
      }
      const s = n._$$tagName$$_;
      const i = class extends HTMLElement {
        // StencilLazyHost
        constructor(t) {
          // @ts-ignore
          super(t);
          t = this;
          registerHost(t, n);
        }
        connectedCallback() {
          if (d) {
            clearTimeout(d);
            d = null;
          }
          if (p) {
            // connectedCallback will be processed once all components have been registered
            a.push(this);
          } else {
            M.jmp((() => connectedCallback(this)));
          }
        }
        disconnectedCallback() {
          M.jmp((() => disconnectedCallback(this)));
        }
        componentOnReady() {
          return getHostRef(this)._$$onReadyPromise$$_;
        }
      };
      n._$$lazyBundleId$$_ = t[0];
      if (!l.includes(s) && !c.get(s)) {
        o.push(s);
        c.define(s, proxyComponent(i, n, 1 /* PROXY_FLAGS.isElementConstructor */));
      }
    }));
  }));
  {
    u.innerHTML = o + r;
    u.setAttribute("data-styles", "");
    // Apply CSP nonce to the style tag if it exists
        const t = (n = M._$$nonce$$_) !== null && n !== void 0 ? n : queryNonceMetaTagContent(C);
    if (t != null) {
      u.setAttribute("nonce", t);
    }
    i.insertBefore(u, f ? f.nextSibling : i.firstChild);
  }
  // Process deferred connectedCallbacks now all components have been registered
    p = false;
  if (a.length) {
    a.map((t => t.connectedCallback()));
  } else {
    {
      M.jmp((() => d = setTimeout(appDidLoad, 30)));
    }
  }
  // Fallback appLoad event
    s();
};

/**
 * Assigns the given value to the nonce property on the runtime platform object.
 * During runtime, this value is used to set the nonce attribute on all dynamically created script and style tags.
 * @param nonce The value to be assigned to the platform nonce property.
 * @returns void
 */ const setNonce = t => M._$$nonce$$_ = t;

const g =  new WeakMap;

const getHostRef = t => g.get(t);

const registerInstance = (t, e) => g.set(e._$$lazyInstance$$_ = t, e);

const registerHost = (t, e) => {
  const n = {
    _$$flags$$_: 0,
    _$$hostElement$$_: t,
    _$$cmpMeta$$_: e,
    _$$instanceValues$$_: new Map
  };
  {
    n._$$onReadyPromise$$_ = new Promise((t => n._$$onReadyResolve$$_ = t));
    t["s-p"] = [];
    t["s-rc"] = [];
  }
  return g.set(t, n);
};

const isMemberInElement = (t, e) => e in t;

const consoleError = (t, e) => (0, console.error)(t, e);

const v =  new Map;

const loadModule = (t, e, n) => {
  // loadModuleImport
  const s = t._$$tagName$$_.replace(/-/g, "_");
  const o = t._$$lazyBundleId$$_;
  const l = v.get(o);
  if (l) {
    return l[s];
  }
  /*!__STENCIL_STATIC_IMPORT_SWITCH__*/  return import(
  /* @vite-ignore */
  /* webpackInclude: /\.entry\.js$/ */
  /* webpackExclude: /\.system\.entry\.js$/ */
  /* webpackMode: "lazy" */
  `./${o}.entry.js${""}`).then((t => {
    {
      v.set(o, t);
    }
    return t[s];
  }), consoleError);
};

const S =  new Map;

const k = [];

const j = typeof window !== "undefined" ? window : {};

const C = j.document || {
  head: {}
};

const M = {
  _$$flags$$_: 0,
  _$$resourcesUrl$$_: "",
  jmp: t => t(),
  raf: t => requestAnimationFrame(t),
  ael: (t, e, n, s) => t.addEventListener(e, n, s),
  rel: (t, e, n, s) => t.removeEventListener(e, n, s),
  ce: (t, e) => new CustomEvent(t, e)
};

const promiseResolve = t => Promise.resolve(t);

const O =  (() => {
  try {
    new CSSStyleSheet;
    return typeof (new CSSStyleSheet).replaceSync === "function";
  } catch (t) {}
  return false;
})();

const R = [];

const T = [];

const queueTask = (t, e) => n => {
  t.push(n);
  if (!f) {
    f = true;
    if (e && M._$$flags$$_ & 4 /* PLATFORM_FLAGS.queueSync */) {
      nextTick(flush);
    } else {
      M.raf(flush);
    }
  }
};

const consume = t => {
  for (let e = 0; e < t.length; e++) {
    try {
      t[e](performance.now());
    } catch (t) {
      consoleError(t);
    }
  }
  t.length = 0;
};

const flush = () => {
  // always force a bunch of medium callbacks to run, but still have
  // a throttle on how many can run in a certain time
  // DOM READS!!!
  consume(R);
  // DOM WRITES!!!
    {
    consume(T);
    if (f = R.length > 0) {
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      M.raf(flush);
    }
  }
};

const nextTick =  t => promiseResolve().then(t);

const x =  queueTask(T, true);

export { setMode as a, bootstrapLazy as b, getElement as c, createEvent as d, getAssetPath as g, h, promiseResolve as p, registerInstance as r, setNonce as s };
//# sourceMappingURL=p-73597efd.js.map