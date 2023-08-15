type Booleanish = boolean | 'true' | 'false';

declare namespace HoneyBee {
    type Element = {};
    interface IntrinsicElements<T=any> {
        view: ViewWrapperTag;
        // HTML
        a: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.AnchorHTMLAttributes|{[k:string]:any};
        abbr: HTMLTags|{[k:string]:any};
        address: HTMLTags|{[k:string]:any};
        area: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.AreaHTMLAttributes|{[k:string]:any};
        article: HTMLTags|{[k:string]:any};
        aside: HTMLTags|{[k:string]:any};
        audio: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.AudioHTMLAttributes|{[k:string]:any};
        b: HTMLTags|{[k:string]:any};
        base: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.BaseHTMLAttributes|{[k:string]:any};
        bdi: HTMLTags|{[k:string]:any};
        bdo: HTMLTags|{[k:string]:any};
        big: HTMLTags|{[k:string]:any};
        blockquote: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.BlockquoteHTMLAttributes|{[k:string]:any};
        body: HTMLTags|{[k:string]:any};
        br: HTMLTags|{[k:string]:any};
        button: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ButtonHTMLAttributes|{[k:string]:any};
        canvas: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.CanvasHTMLAttributes|{[k:string]:any};
        caption: HTMLTags|{[k:string]:any};
        cite: HTMLTags|{[k:string]:any};
        code: HTMLTags|{[k:string]:any};
        col: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ColHTMLAttributes|{[k:string]:any};
        colgroup: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ColgroupHTMLAttributes|{[k:string]:any};
        data: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.DataHTMLAttributes|{[k:string]:any};
        datalist: HTMLTags|{[k:string]:any};
        dd: HTMLTags|{[k:string]:any};
        del: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.DelHTMLAttributes|{[k:string]:any};
        details: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.DetailsHTMLAttributes|{[k:string]:any};
        dfn: HTMLTags|{[k:string]:any};
        dialog: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.DialogHTMLAttributes|{[k:string]:any};
        div: HTMLTags|{[k:string]:any}; 
        dl: HTMLTags|{[k:string]:any};
        dt: HTMLTags|{[k:string]:any};
        em: HTMLTags|{[k:string]:any};
        embed: HTMLTags|{[k:string]:any};
        fieldset: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.FieldsetHTMLAttributes|{[k:string]:any};
        figcaption: HTMLTags|{[k:string]:any};
        figure: HTMLTags|{[k:string]:any};
        footer: HTMLTags|{[k:string]:any};
        form: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.FormHTMLAttributes|{[k:string]:any};
        h1: HTMLTags|{[k:string]:any};
        h2: HTMLTags|{[k:string]:any};
        h3: HTMLTags|{[k:string]:any};
        h4: HTMLTags|{[k:string]:any};
        h5: HTMLTags|{[k:string]:any};
        h6: HTMLTags|{[k:string]:any};
        head: HTMLTags|{[k:string]:any};
        header: HTMLTags|{[k:string]:any};
        hgroup: HTMLTags|{[k:string]:any};
        hr: HTMLTags|{[k:string]:any};
        html: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.HtmlHTMLAttributes|{[k:string]:any};
        i: HTMLTags|{[k:string]:any};
        iframe: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.IframeHTMLAttributes|{[k:string]:any};
        img: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ImgHTMLAttributes|{[k:string]:any};
        input: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.InputHTMLAttributes|{[k:string]:any};
        ins: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.InsHTMLAttributes|{[k:string]:any};
        kbd: HTMLTags|{[k:string]:any};
        keygen: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.KeygenHTMLAttributes|{[k:string]:any};
        label: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.LabelHTMLAttributes|{[k:string]:any};
        legend: HTMLTags|{[k:string]:any};
        li: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.LiHTMLAttributes|{[k:string]:any};
        link: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.LinkHTMLAttributes|{[k:string]:any};
        main: HTMLTags|{[k:string]:any};
        map: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.MapHTMLAttributes|{[k:string]:any};
        mark: HTMLTags|{[k:string]:any};
        menu: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.MenuHTMLAttributes|{[k:string]:any};
        menuitem: HTMLTags|{[k:string]:any};
        meta: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.MetaHTMLAttributes|{[k:string]:any};
        meter: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.MeterHTMLAttributes|{[k:string]:any};
        nav: HTMLTags|{[k:string]:any};
        noindex: HTMLTags|{[k:string]:any};
        noscript: HTMLTags|{[k:string]:any};
        object: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ObjectHTMLAttributes|{[k:string]:any};
        ol: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.OlHTMLAttributes|{[k:string]:any};
        optgroup: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.OptgroupHTMLAttributes|{[k:string]:any};
        option: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.OptionHTMLAttributes|{[k:string]:any};
        output: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.OutputHTMLAttributes|{[k:string]:any};
        p: HTMLTags|{[k:string]:any};
        param: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ParamHTMLAttributes|{[k:string]:any};
        picture: HTMLTags|{[k:string]:any};
        pre: HTMLTags|{[k:string]:any};
        progress: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ProgressHTMLAttributes|{[k:string]:any};
        q: HTMLTags|{[k:string]:any};
        rp: HTMLTags|{[k:string]:any};
        rt: HTMLTags|{[k:string]:any};
        ruby: HTMLTags|{[k:string]:any};
        s: HTMLTags|{[k:string]:any};
        samp: HTMLTags|{[k:string]:any};
        slot: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.SlotHTMLAttributes|{[k:string]:any};
        script: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ScriptHTMLAttributes|{[k:string]:any};
        section: HTMLTags|{[k:string]:any};
        select: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.SelectHTMLAttributes|{[k:string]:any};
        small: HTMLTags|{[k:string]:any};
        source: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.SourceHTMLAttributes|{[k:string]:any};
        span: HTMLTags|{[k:string]:any};
        strong: HTMLTags|{[k:string]:any};
        style: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.StyleHTMLAttributes|{[k:string]:any};
        sub: HTMLTags|{[k:string]:any};
        summary: HTMLTags|{[k:string]:any};
        sup: HTMLTags|{[k:string]:any};
        table: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.TableHTMLAttributes|{[k:string]:any};
        template: HTMLTags|{[k:string]:any};
        tbody: HTMLTags|{[k:string]:any};
        td: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.TdHTMLAttributes|{[k:string]:any};
        textarea: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.TextareaHTMLAttributes|{[k:string]:any};
        tfoot: HTMLTags|{[k:string]:any};
        th: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.ThHTMLAttributes|{[k:string]:any};
        thead: HTMLTags|{[k:string]:any};
        time: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.TimeHTMLAttributes|{[k:string]:any};
        title: HTMLTags|{[k:string]:any};
        tr: HTMLTags|{[k:string]:any};
        track: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.TrackHTMLAttributes|{[k:string]:any};
        u: HTMLTags|{[k:string]:any};
        ul: HTMLTags|{[k:string]:any};
        "var": HTMLTags|{[k:string]:any};
        video: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.VideoHTMLAttributes|{[k:string]:any};
        wbr: HTMLTags|{[k:string]:any};
        webview: EventHandlersEventMap<T>|HTMLTags|HTMLTagsExtension.WebViewHTMLAttributes|{[k:string]:any};

        // SVG
        svg: any|{[k:string]:any};

        animate: any|{[k:string]:any}; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
        animateMotion: any|{[k:string]:any};
        animateTransform: any|{[k:string]:any}; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
        circle: Empty<SVGCircleElement>|{[k:string]:any};
        clipPath: Empty<SVGClipPathElement>|{[k:string]:any};
        defs: Empty<SVGDefsElement>|{[k:string]:any};
        desc: Empty<SVGDescElement>|{[k:string]:any};
        ellipse: Empty<SVGEllipseElement>|{[k:string]:any};
        feBlend: Empty<SVGFEBlendElement>|{[k:string]:any};
        feColorMatrix: Empty<SVGFEColorMatrixElement>|{[k:string]:any};
        feComponentTransfer: Empty<SVGFEComponentTransferElement>|{[k:string]:any};
        feComposite: Empty<SVGFECompositeElement>|{[k:string]:any};
        feConvolveMatrix: Empty<SVGFEConvolveMatrixElement>|{[k:string]:any};
        feDiffuseLighting: Empty<SVGFEDiffuseLightingElement>|{[k:string]:any};
        feDisplacementMap: Empty<SVGFEDisplacementMapElement>|{[k:string]:any};
        feDistantLight: Empty<SVGFEDistantLightElement>|{[k:string]:any};
        feDropShadow: Empty<SVGFEDropShadowElement>|{[k:string]:any};
        feFlood: Empty<SVGFEFloodElement>|{[k:string]:any};
        feFuncA: Empty<SVGFEFuncAElement>|{[k:string]:any};
        feFuncB: Empty<SVGFEFuncBElement>|{[k:string]:any};
        feFuncG: Empty<SVGFEFuncGElement>|{[k:string]:any};
        feFuncR: Empty<SVGFEFuncRElement>|{[k:string]:any};
        feGaussianBlur: Empty<SVGFEGaussianBlurElement>|{[k:string]:any};
        feImage: Empty<SVGFEImageElement>|{[k:string]:any};
        feMerge: Empty<SVGFEMergeElement>|{[k:string]:any};
        feMergeNode: Empty<SVGFEMergeNodeElement>|{[k:string]:any};
        feMorphology: Empty<SVGFEMorphologyElement>|{[k:string]:any};
        feOffset: Empty<SVGFEOffsetElement>|{[k:string]:any};
        fePointLight: Empty<SVGFEPointLightElement>|{[k:string]:any};
        feSpecularLighting: Empty<SVGFESpecularLightingElement>|{[k:string]:any};
        feSpotLight: Empty<SVGFESpotLightElement>|{[k:string]:any};
        feTile: Empty<SVGFETileElement>|{[k:string]:any};
        feTurbulence: Empty<SVGFETurbulenceElement>|{[k:string]:any};
        filter: Empty<SVGFilterElement>|{[k:string]:any};
        foreignObject: Empty<SVGForeignObjectElement>|{[k:string]:any};
        g: Empty<SVGGElement>|{[k:string]:any};
        image: Empty<SVGImageElement>|{[k:string]:any};
        line: Empty<SVGLineElement>|{[k:string]:any};
        linearGradient: Empty<SVGLinearGradientElement>|{[k:string]:any};
        marker: Empty<SVGMarkerElement>|{[k:string]:any};
        mask: Empty<SVGMaskElement>|{[k:string]:any};
        metadata: Empty<SVGMetadataElement>|{[k:string]:any};
        mpath: any|{[k:string]:any};
        path: Empty<SVGPathElement>|{[k:string]:any};
        pattern: Empty<SVGPatternElement>|{[k:string]:any};
        polygon: Empty<SVGPolygonElement>|{[k:string]:any};
        polyline: Empty<SVGPolylineElement>|{[k:string]:any};
        radialGradient: Empty<SVGRadialGradientElement>|{[k:string]:any};
        rect: Empty<SVGRectElement>|{[k:string]:any};
        stop: Empty<SVGStopElement>|{[k:string]:any};
        switch: Empty<SVGSwitchElement>|{[k:string]:any};
        symbol: Empty<SVGSymbolElement>|{[k:string]:any};
        text: Empty<SVGTextElement>|{[k:string]:any};
        textPath: Empty<SVGTextPathElement>|{[k:string]:any};
        tspan: Empty<SVGTSpanElement>|{[k:string]:any};
        use: Empty<SVGUseElement>|{[k:string]:any};
        //view: Empty<SVGViewElement>|{[k:string]:any};
        [k:string]:any
    }
}



/** 
 * This tag is only meant for wrapping your HTML code 
 * to ease code detecting and reduce compilation time.
 * 
 * **NOTE:** Aside this tag, your HTML code must be wrapped in 
 * one parent tag. That is to say, every component must have
 * one top-most parent element.
 */
interface ViewWrapperTag{}
type HTMLTags = BHTMLAttributeSet1|BHTMLAttributeSet2|ARIAMixins;
type DynamicAttributeWithDependencies = { value: any, $dep: string[] };
interface Empty<T>{}
type EventHandlersEventMap<T> ={
    onAbort?: ((this: GlobalEventHandlers, ev: UIEvent,This:T) => any) | null;
    onAnimationcancel?: ((this: GlobalEventHandlers, ev: AnimationEvent,This:T) => any) | null;
    onAnimationend?: ((this: GlobalEventHandlers, ev: AnimationEvent,This:T) => any) | null;
    onAnimationiteration?: ((this: GlobalEventHandlers, ev: AnimationEvent,This:T) => any) | null;
    onAnimationstart?: ((this: GlobalEventHandlers, ev: AnimationEvent,This:T) => any) | null;
    onAuxclick?: ((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onBeforeinput?: ((this: GlobalEventHandlers, ev: InputEvent,This:T) => any) | null;
    oBlur?: ((this: GlobalEventHandlers, ev: FocusEvent,This:T) => any) | null;
    onCancel?: ((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onCanplay?: ((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onCanplaythrough?: ((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onChange?: ((this: GlobalEventHandlers, ev: UIEvent,This:T) => any) | null;
    onClick?: ((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onClose?: ((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onCompositionend?: ((this: GlobalEventHandlers, ev: CompositionEvent,This:T) => any) | null;
    onCompositionstart?: ((this: GlobalEventHandlers, ev: CompositionEvent,This:T) => any) | null;
    onCompositionupdate?: ((this: GlobalEventHandlers, ev: CompositionEvent,This:T) => any) | null;
    onContextmenu?: ((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onCopy?: ((this: GlobalEventHandlers, ev: ClipboardEvent,This:T) => any) | null;
    onCuechange?: ((this: GlobalEventHandlers, ev: UIEvent,This:T) => any) | null;
    onCut?: ((this: GlobalEventHandlers, ev: ClipboardEvent,This:T) => any) | null;
    onDblclick?: ((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onDrag?: ((this: GlobalEventHandlers, ev: DragEvent,This:T) => any) | null;
    onDragend?: ((this: GlobalEventHandlers, ev: DragEvent,This:T) => any) | null;
    onDragenter?: ((this: GlobalEventHandlers, ev: DragEvent,This:T) => any) | null;
    onDragleave?:((this: GlobalEventHandlers, ev: DragEvent,This:T) => any) | null;
    onDragover?:((this: GlobalEventHandlers, ev: DragEvent,This:T) => any) | null;
    onDragstart?:((this: GlobalEventHandlers, ev: DragEvent,This:T) => any) | null;
    onDrop?:((this: GlobalEventHandlers, ev: DragEvent,This:T) => any) | null;
    onDurationchange?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onEmptied?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onEnded?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onError?: ((this: GlobalEventHandlers, ev: ErrorEvent,This:T) => any) | null;
    onFocus?:((this: GlobalEventHandlers, ev: FocusEvent,This:T) => any) | null;
    onFocusin?:((this: GlobalEventHandlers, ev: FocusEvent,This:T) => any) | null;
    onFocusout?:((this: GlobalEventHandlers, ev: FocusEvent,This:T) => any) | null;
    onFormdata?:((this: GlobalEventHandlers, ev: FormDataEvent,This:T) => any) | null;
    onGotpointercapture?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onInput?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onInvalid?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onKeydown?:((this: GlobalEventHandlers, ev: KeyboardEvent,This:T) => any) | null;
    onKeypress?:((this: GlobalEventHandlers, ev: KeyboardEvent,This:T) => any) | null;
    onKeyup?:((this: GlobalEventHandlers, ev: KeyboardEvent,This:T) => any) | null;
    onLoad?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onLoadeddata?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onLoadedmetadata?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onLoadstart?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onLostpointercapture?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onMousedown?:((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onMouseenter?:((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onMouseleave?:((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onMousemove?:((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onMouseout?:((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onMouseover?:((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onMouseup?:((this: GlobalEventHandlers, ev: MouseEvent,This:T) => any) | null;
    onPaste?:((this: GlobalEventHandlers, ev: ClipboardEvent,This:T) => any) | null;
    onPause?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onPlay?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onPlaying?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onPointercancel?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onPointerdown?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onPointerenter?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onPointerleave?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onPointermove?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onPointerout?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onPointerover?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onPointerup?:((this: GlobalEventHandlers, ev: PointerEvent,This:T) => any) | null;
    onProgress?:((this: GlobalEventHandlers, ev: ProgressEvent,This:T) => any) | null;
    onRatechange?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onReset?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onResize?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onScroll?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onSecuritypolicyviolation?:((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent,This:T) => any) | null;
    onSeeked?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onSeeking?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onSelect?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onSelectionchange?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onSelectstart?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onSlotchange?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onStalled?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onSubmit?:((this: GlobalEventHandlers, ev: SubmitEvent,This:T) => any) | null;
    onSuspend?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onTimeupdate?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onToggle?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onTouchcancel?:((this: GlobalEventHandlers, ev: TouchEvent,This:T) => any) | null;
    onTouchend?:((this: GlobalEventHandlers, ev: TouchEvent,This:T) => any) | null;
    onTouchmove?:((this: GlobalEventHandlers, ev: TouchEvent,This:T) => any) | null;
    onTouchstart?:((this: GlobalEventHandlers, ev: TouchEvent,This:T) => any) | null;
    onTransitioncancel?:((this: GlobalEventHandlers, ev: TransitionEvent,This:T) => any) | null;
    onTransitionend?:((this: GlobalEventHandlers, ev: TransitionEvent,This:T) => any) | null;
    onTransitionrun?:((this: GlobalEventHandlers, ev: TransitionEvent,This:T) => any) | null;
    onTransitionstart?:((this: GlobalEventHandlers, ev: TransitionEvent,This:T) => any) | null;
    onVolumechange?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onWaiting?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onWebkitanimationend?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onWebkitanimationiteration?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onWebkitanimationstart?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onWebkittransitionend?:((this: GlobalEventHandlers, ev: Event,This:T) => any) | null;
    onWheel?:((this: GlobalEventHandlers, ev: WheelEvent,This:T) => any) | null;
}
    
    
   
interface BHTMLAttributeSet2 extends NonDependencyAttributes, HTMLAttribute{ }
interface BHTMLAttributeSet1 extends DependencyAttributes, HTMLAttribute{}
interface HTMLAttribute{
    key?: string;

    // Standard HTML Attributes
    accesskey?: string | undefined;
    class?: string | undefined;
    contenteditable?: boolean | "inherit" | undefined;
    contextmenu?: string | undefined;
    dir?: string | undefined;
    draggable?: boolean | undefined;
    hidden?: boolean | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    slot?: string | undefined;
    spellcheck?: boolean | undefined;
    style?: string | undefined;
    tabindex?: string | undefined;
    title?: string | undefined;
    translate?: 'yes' | 'no' | undefined;

    // Other Standard HTML Attributes
    accept?: string | undefined;
    acceptcharset?: string | undefined;
    action?: string | undefined;
    allowfullscreen?: boolean | undefined;
    allowtransparency?: boolean | undefined;
    alt?: string | undefined;
    as?: string | undefined;
    async?: boolean | undefined;
    autocomplete?:  boolean | undefined;
    autofocus?: boolean | undefined;
    autoplay?: boolean | undefined;
    capture?: boolean | 'user' | 'environment' | undefined;
    cellpadding?: string | undefined;
    cellspacing?: string | undefined;
    charset?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    cite?: string | undefined;
    cols?: string | undefined;
    colspan?: string | undefined;
    content?: string | undefined;
    controls?: boolean | undefined;
    coords?: string | undefined;
    crossorigin?: string | undefined;
    data?: string | undefined;
    datetime?: string | undefined;
    default?: boolean | undefined;
    defer?: boolean | undefined;
    disabled?: boolean | undefined;
    download?: any;
    enctype?: string | undefined;
    form?: string | undefined;
    formaction?: string | undefined;
    formencType?: string | undefined;
    formmethod?: string | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: string | undefined;
    frameborder?: string | undefined;
    headers?: string | undefined;
    height?: string | undefined;
    high?: string | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    for?: string | undefined;
    httpequiv?: string | undefined;
    integrity?: string | undefined;
    keyparams?: string | undefined;
    keytype?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    list?: string | undefined;
    loop?: boolean | undefined;
    low?: string | undefined;
    manifest?: string | undefined;
    marginheight?: string | undefined;
    marginwidth?: string | undefined;
    max?: string | undefined;
    maxlength?: string | undefined;
    media?: string | undefined;
    mediagroup?: string | undefined;
    method?: string | undefined;
    min?: string | undefined;
    minlength?: string | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    nonce?: string | undefined;
    novalidate?: boolean | undefined;
    open?: boolean | undefined;
    optimum?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    playsinline?: boolean | undefined;
    poster?: string | undefined;
    preload?: string | undefined;
    readonly?: boolean | undefined;
    rel?: string | undefined;
    required?: boolean | undefined;
    reversed?: boolean | undefined;
    rows?: string | undefined;
    rowspan?: string | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    size?: string | undefined;
    sizes?: string | undefined;
    span?: string | undefined;
    src?: string | undefined;
    srcdoc?: string | undefined;
    srclang?: string | undefined;
    srcset?: string | undefined;
    start?: string | undefined;
    step?: string | undefined;
    summary?: string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    value?: string | undefined;
    width?: string | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;

    // Unknown
    radiogroup?: string | undefined; // <command>, <menuitem>

    // WAI-ARIA
    role?: AriaRole;

    // RDFa Attributes
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;

    // Non-standard Attributes
    autocapitalize?: string | undefined;
    autocorrect?: string | undefined;
    autosave?: string | undefined;
    color?: string | undefined;
    results?: string | undefined;
    security?: string | undefined;
    unselectable?: 'on' | 'off' | undefined;

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string | undefined;
}
interface DependencyAttributes {
    $class?: DynamicAttributeWithDependencies;
    $style?: DynamicAttributeWithDependencies;
    // Standard HTML Attributes
    $accesskey?: DynamicAttributeWithDependencies;
    //class?: DynamicAttributeWithDependencies;
    $contenteditable?: DynamicAttributeWithDependencies;
    $contextmenu?: DynamicAttributeWithDependencies;
    $dir?: DynamicAttributeWithDependencies;
    $draggable?: DynamicAttributeWithDependencies;
    $hidden?: DynamicAttributeWithDependencies;
    $id?: DynamicAttributeWithDependencies;
    $lang?: DynamicAttributeWithDependencies;
    $slot?: DynamicAttributeWithDependencies;
    $spellcheck?: DynamicAttributeWithDependencies;
    $tabindex?: DynamicAttributeWithDependencies;
    $title?: DynamicAttributeWithDependencies;
    $translate?: DynamicAttributeWithDependencies;

    // Other Standard HTML Attributes
    $accept?: DynamicAttributeWithDependencies;
    $acceptcharset?: DynamicAttributeWithDependencies;
    $action?: DynamicAttributeWithDependencies;
    $allowfullscreen?: DynamicAttributeWithDependencies;
    $allowtransparency?: DynamicAttributeWithDependencies;
    $alt?: DynamicAttributeWithDependencies;
    $as?: DynamicAttributeWithDependencies;
    $async?: DynamicAttributeWithDependencies;
    $autocomplete?: DynamicAttributeWithDependencies;
    $autofocus?: DynamicAttributeWithDependencies;
    $autoplay?: DynamicAttributeWithDependencies;
    $capture?: DynamicAttributeWithDependencies;
    $cellpadding?: DynamicAttributeWithDependencies;
    $cellspacing?: DynamicAttributeWithDependencies;
    $charset?: DynamicAttributeWithDependencies;
    $challenge?: DynamicAttributeWithDependencies;
    $checked?: DynamicAttributeWithDependencies;
    $cite?: DynamicAttributeWithDependencies;
    $cols?: DynamicAttributeWithDependencies;
    $colspan?: DynamicAttributeWithDependencies;
    $content?: DynamicAttributeWithDependencies;
    $controls?: DynamicAttributeWithDependencies;
    $coords?: DynamicAttributeWithDependencies;
    $crossorigin?: DynamicAttributeWithDependencies;
    $data?: DynamicAttributeWithDependencies;
    $datetime?: DynamicAttributeWithDependencies;
    $default?: DynamicAttributeWithDependencies;
    $defer?: DynamicAttributeWithDependencies;
    $disabled?: DynamicAttributeWithDependencies;
    $download?: DynamicAttributeWithDependencies;
    $enctype?: DynamicAttributeWithDependencies;
    $form?: DynamicAttributeWithDependencies;
    $formaction?: DynamicAttributeWithDependencies;
    $formencType?: DynamicAttributeWithDependencies;
    $formmethod?: DynamicAttributeWithDependencies;
    $formnovalidate?: DynamicAttributeWithDependencies;
    $formtarget?: DynamicAttributeWithDependencies;
    $frameborder?: DynamicAttributeWithDependencies;
    $headers?: DynamicAttributeWithDependencies;
    $height?: DynamicAttributeWithDependencies;
    $high?: DynamicAttributeWithDependencies;
    $href?: DynamicAttributeWithDependencies;
    $hreflang?: DynamicAttributeWithDependencies;
    $for?: DynamicAttributeWithDependencies;
    $httpequiv?: DynamicAttributeWithDependencies;
    $integrity?: DynamicAttributeWithDependencies;
    $keyparams?: DynamicAttributeWithDependencies;
    $keytype?: DynamicAttributeWithDependencies;
    $kind?: DynamicAttributeWithDependencies;
    $label?: DynamicAttributeWithDependencies;
    $list?: DynamicAttributeWithDependencies;
    $loop?: DynamicAttributeWithDependencies;
    $low?: DynamicAttributeWithDependencies;
    $manifest?: DynamicAttributeWithDependencies;
    $marginheight?: DynamicAttributeWithDependencies;
    $marginwidth?: DynamicAttributeWithDependencies;
    $max?: DynamicAttributeWithDependencies;
    $maxlength?: DynamicAttributeWithDependencies;
    $media?: DynamicAttributeWithDependencies;
    $mediagroup?: DynamicAttributeWithDependencies;
    $method?: DynamicAttributeWithDependencies;
    $min?: DynamicAttributeWithDependencies;
    $minlength?: DynamicAttributeWithDependencies;
    $multiple?: DynamicAttributeWithDependencies;
    $muted?: DynamicAttributeWithDependencies;
    $name?: DynamicAttributeWithDependencies;
    $nonce?: DynamicAttributeWithDependencies;
    $novalidate?: DynamicAttributeWithDependencies;
    $open?: DynamicAttributeWithDependencies;
    $optimum?: DynamicAttributeWithDependencies;
    $pattern?: DynamicAttributeWithDependencies;
    $placeholder?: DynamicAttributeWithDependencies;
    $playsinline?: DynamicAttributeWithDependencies;
    $poster?: DynamicAttributeWithDependencies;
    $preload?: DynamicAttributeWithDependencies;
    $readonly?: DynamicAttributeWithDependencies;
    $rel?: DynamicAttributeWithDependencies;
    $required?: DynamicAttributeWithDependencies;
    $reversed?: DynamicAttributeWithDependencies;
    $rows?: DynamicAttributeWithDependencies;
    $rowspan?: DynamicAttributeWithDependencies;
    $sandbox?: DynamicAttributeWithDependencies;
    $scope?: DynamicAttributeWithDependencies;
    $scoped?: DynamicAttributeWithDependencies;
    $scrolling?: DynamicAttributeWithDependencies;
    $seamless?: DynamicAttributeWithDependencies;
    $selected?: DynamicAttributeWithDependencies;
    $shape?: DynamicAttributeWithDependencies;
    $size?: DynamicAttributeWithDependencies;
    $sizes?: DynamicAttributeWithDependencies;
    $span?: DynamicAttributeWithDependencies;
    $src?: DynamicAttributeWithDependencies;
    $srcdoc?: DynamicAttributeWithDependencies;
    $srclang?: DynamicAttributeWithDependencies;
    $srcset?: DynamicAttributeWithDependencies;
    $start?: DynamicAttributeWithDependencies;
    $step?: DynamicAttributeWithDependencies;
    $summary?: DynamicAttributeWithDependencies;
    $target?: DynamicAttributeWithDependencies;
    $type?: DynamicAttributeWithDependencies;
    $value?: DynamicAttributeWithDependencies;
    $width?: DynamicAttributeWithDependencies;
    $wmode?: DynamicAttributeWithDependencies;
    $wrap?: DynamicAttributeWithDependencies;

    // Unknown
    $radiogroup?: DynamicAttributeWithDependencies; // <command>, <menuitem>

    // WAI-ARIA
    $role?: DynamicAttributeWithDependencies;

    // RDFa Attributes
    $about?: DynamicAttributeWithDependencies;
    $datatype?: DynamicAttributeWithDependencies;
    $inlist?: DynamicAttributeWithDependencies;
    $prefix?: DynamicAttributeWithDependencies;
    $property?: DynamicAttributeWithDependencies;
    $resource?: DynamicAttributeWithDependencies;
    $typeof?: DynamicAttributeWithDependencies;
    $vocab?: DynamicAttributeWithDependencies;

    // Non-standard Attributes
    $autocapitalize?: DynamicAttributeWithDependencies;
    $autocorrect?: DynamicAttributeWithDependencies;
    $autosave?: DynamicAttributeWithDependencies;
    $color?: DynamicAttributeWithDependencies;
    $results?: DynamicAttributeWithDependencies;
    $security?: DynamicAttributeWithDependencies;
    $unselectable?: DynamicAttributeWithDependencies;

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    $inputmode?: DynamicAttributeWithDependencies;
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    $is?: DynamicAttributeWithDependencies;
}
interface NonDependencyAttributes {
    Class?: any;

    // Standard HTML Attributes
    Accesskey?: any;
    //class?: any;
    Contenteditable?: any;
    Contextmenu?: any;
    Dir?: any;
    Draggable?: any;
    Hidden?: any;
    Id?: any;
    Lang?: any;
    Slot?: any;
    Spellcheck?: any;
    Style?: any;
    Tabindex?: any;
    Title?: any;
    Translate?: any;

    // Other Standard HTML Attributes
    Accept?: any;
    Acceptcharset?: any;
    Action?: any;
    Allowfullscreen?: any;
    Allowtransparency?: any;
    Alt?: any;
    As?: any;
    Async?: any;
    Autocomplete?: any;
    Autofocus?: any;
    Autoplay?: any;
    Capture?: any;
    Cellpadding?: any;
    Cellspacing?: any;
    Charset?: any;
    Challenge?: any;
    Checked?: any;
    Cite?: any;
    Cols?: any;
    Colspan?: any;
    Content?: any;
    Controls?: any;
    Coords?: any;
    Crossorigin?: any;
    Data?: any;
    Datetime?: any;
    Default?: any;
    Defer?: any;
    Disabled?: any;
    Download?: any;
    Enctype?: any;
    Form?: any;
    Formaction?: any;
    FormencType?: any;
    Formmethod?: any;
    Formnovalidate?: any;
    Formtarget?: any;
    Frameborder?: any;
    Headers?: any;
    Height?: any;
    High?: any;
    Href?: any;
    Hreflang?: any;
    For?: any;
    Httpequiv?: any;
    Integrity?: any;
    Keyparams?: any;
    Keytype?: any;
    Kind?: any;
    Label?: any;
    List?: any;
    Loop?: any;
    Low?: any;
    Manifest?: any;
    Marginheight?: any;
    Marginwidth?: any;
    Max?: any;
    Maxlength?: any;
    Media?: any;
    Mediagroup?: any;
    Method?: any;
    Min?: any;
    Minlength?: any;
    Multiple?: any;
    Muted?: any;
    Name?: any;
    Nonce?: any;
    Novalidate?: any;
    Open?: any;
    Optimum?: any;
    Pattern?: any;
    Placeholder?: any;
    Playsinline?: any;
    Poster?: any;
    Preload?: any;
    Readonly?: any;
    Rel?: any;
    Required?: any;
    Reversed?: any;
    Rows?: any;
    Rowspan?: any;
    Sandbox?: any;
    Scope?: any;
    Scoped?: any;
    Scrolling?: any;
    Seamless?: any;
    Selected?: any;
    Shape?: any;
    Size?: any;
    Sizes?: any;
    Span?: any;
    Src?: any;
    Srcdoc?: any;
    Srclang?: any;
    Srcset?: any;
    Start?: any;
    Step?: any;
    Summary?: any;
    Target?: any;
    Type?: any;
    Value?: any;
    Width?: any;
    Wmode?: any;
    Wrap?: any;

    // Unknown
    Radiogroup?: any; // <command>, <menuitem>

    // WAI-ARIA
    Role?: any;

    // RDFa Attributes
    About?: any;
    Datatype?: any;
    Inlist?: any;
    Prefix?: any;
    Property?: any;
    Resource?: any;
    Typeof?: any;
    Vocab?: any;

    // Non-standard Attributes
    Autocapitalize?: any;
    Autocorrect?: any;
    Autosave?: any;
    Color?: any;
    Results?: any;
    Security?: any;
    Unselectable?: any;

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    Inputmode?: any;
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    Is?: any;
}

    type AriaRole =
        | 'alert'
        | 'alertdialog'
        | 'application'
        | 'article'
        | 'banner'
        | 'button'
        | 'cell'
        | 'checkbox'
        | 'columnheader'
        | 'combobox'
        | 'complementary'
        | 'contentinfo'
        | 'definition'
        | 'dialog'
        | 'directory'
        | 'document'
        | 'feed'
        | 'figure'
        | 'form'
        | 'grid'
        | 'gridcell'
        | 'group'
        | 'heading'
        | 'img'
        | 'link'
        | 'list'
        | 'listbox'
        | 'listitem'
        | 'log'
        | 'main'
        | 'marquee'
        | 'math'
        | 'menu'
        | 'menubar'
        | 'menuitem'
        | 'menuitemcheckbox'
        | 'menuitemradio'
        | 'navigation'
        | 'none'
        | 'note'
        | 'option'
        | 'presentation'
        | 'progressbar'
        | 'radio'
        | 'radiogroup'
        | 'region'
        | 'row'
        | 'rowgroup'
        | 'rowheader'
        | 'scrollbar'
        | 'search'
        | 'searchbox'
        | 'separator'
        | 'slider'
        | 'spinbutton'
        | 'status'
        | 'switch'
        | 'tab'
        | 'table'
        | 'tablist'
        | 'tabpanel'
        | 'term'
        | 'textbox'
        | 'timer'
        | 'toolbar'
        | 'tooltip'
        | 'tree'
        | 'treegrid'
        | 'treeitem';
        
    interface ARIAMixins {
        "aria-atomic"?: string;
        "aria-auto-complete"?: string;
        "aria-busy"?: string;
        "aria-checked"?: string;
        "aria-colcount"?: string;
        "aria-colindex"?: string;
        "aria-colspan"?: string;
        "aria-current"?: string;
        "aria-disabled"?: string;
        "aria-expanded"?: string;
        "aria-haspopup"?: string;
        "aria-hidden"?: string;
        "aria-keyshortcuts"?: string;
        "aria-label"?: string;
        "aria-level"?: string;
        "aria-live"?: string;
        "aria-modal"?: string;
        "aria-multiLine"?: string;
        "aria-multi-selectable"?: string;
        "aria-orientation"?: string;
        "aria-placeholder"?: string;
        "aria-posinset"?: string;
        "aria-pressed"?: string;
        "aria-readonly"?: string;
        "aria-required"?: string;
        "aria-roledescription"?: string;
        "aria-rowcount"?: string;
        "aria-rowindex"?: string;
        "aria-rowspan"?: string;
        "aria-selected"?: string;
        "aria-setsize"?: string;
        "aria-sort"?: string;
        "aria-valuemax"?: string;
        "aria-valuemin"?: string;
        "aria-valuenow"?: string;
        "aria-valuetext"?: string;
    }


    declare namespace HTMLTagsExtension {
    
        type HTMLAttributeReferrerPolicy =
        | ''
        | 'no-referrer'
        | 'no-referrer-when-downgrade'
        | 'origin'
        | 'origin-when-cross-origin'
        | 'same-origin'
        | 'strict-origin'
        | 'strict-origin-when-cross-origin'
        | 'unsafe-url';
    
    type HTMLAttributeAnchorTarget =
        | '_self'
        | '_blank'
        | '_parent'
        | '_top';
    
    interface AnchorHTMLAttributes {
        download?: any;
        href?: string | undefined;
        hrefLang?: string | undefined;
        media?: string | undefined;
        ping?: string | undefined;
        rel?: string | undefined;
        target?: HTMLAttributeAnchorTarget | undefined;
        type?: string | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    }
    
    interface AudioHTMLAttributes {}
    
    interface AreaHTMLAttributes {
        alt?: string | undefined;
        coords?: string | undefined;
        download?: any;
        href?: string | undefined;
        hrefLang?: string | undefined;
        media?: string | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        rel?: string | undefined;
        shape?: string | undefined;
        target?: string | undefined;
    }
    
    interface BaseHTMLAttributes {
        href?: string | undefined;
        target?: string | undefined;
    }
    
    interface BlockquoteHTMLAttributes {
        cite?: string | undefined;
    }
    
    interface ButtonHTMLAttributes {
        autofocus?: boolean | undefined;
        disabled?: boolean | undefined;
        form?: string | undefined;
        formAction?: string | undefined;
        formEncType?: string | undefined;
        formMethod?: string | undefined;
        formNoValidate?: boolean | undefined;
        formTarget?: string | undefined;
        name?: string | undefined;
        type?: 'submit' | 'reset' | 'button' | undefined;
        value?: string |  undefined;
    }
    
    interface CanvasHTMLAttributes {
        height?:  string | undefined;
        width?:  string | undefined;
    }
    
    interface ColHTMLAttributes {
        span?:  undefined;
        width?:  string | undefined;
    }
    
    interface ColgroupHTMLAttributes {
        span?:  undefined;
    }
    
    interface DataHTMLAttributes {
        value?: string | undefined;
    }
    
    interface DetailsHTMLAttributes {
        open?: boolean | undefined;
    }
    
    interface DelHTMLAttributes {
        cite?: string | undefined;
        dateTime?: string | undefined;
    }
    
    interface DialogHTMLAttributes {
        open?: boolean | undefined;
    }
    
    interface EmbedHTMLAttributes {
        height?:  string | undefined;
        src?: string | undefined;
        type?: string | undefined;
        width?:  string | undefined;
    }
    
    interface FieldsetHTMLAttributes {
        disabled?: boolean | undefined;
        form?: string | undefined;
        name?: string | undefined;
    }
    
    interface FormHTMLAttributes {
        acceptCharset?: string | undefined;
        action?: string | undefined;
        autocomplete?: string | undefined;
        encType?: string | undefined;
        method?: string | undefined;
        name?: string | undefined;
        noValidate?: boolean | undefined;
        target?: string | undefined;
    }
    
    interface HtmlHTMLAttributes {
        manifest?: string | undefined;
    }
    
    interface IframeHTMLAttributes {
        allow?: string | undefined;
        allowFullScreen?: boolean | undefined;
        allowTransparency?: boolean | undefined;
        /** @deprecated */
        frameBorder?:  string | undefined;
        height?:  string | undefined;
        loading?: "eager" | "lazy" | undefined;
        /** @deprecated */
        marginHeight?:  undefined;
        /** @deprecated */
        marginWidth?:  undefined;
        name?: string | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        sandbox?: string | undefined;
        /** @deprecated */
        scrolling?: string | undefined;
        seamless?: boolean | undefined;
        src?: string | undefined;
        srcDoc?: string | undefined;
        width?:  string | undefined;
    }
    
    interface ImgHTMLAttributes {
        alt?: string | undefined;
        crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
        decoding?: "async" | "auto" | "sync" | undefined;
        height?:  string | undefined;
        loading?: "eager" | "lazy" | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        sizes?: string | undefined;
        src?: string | undefined;
        srcSet?: string | undefined;
        useMap?: string | undefined;
        width?:  string | undefined;
    }
    
    interface InsHTMLAttributes {
        cite?: string | undefined;
        dateTime?: string | undefined;
    }
    
    type HTMLInputTypeAttribute =
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'reset'
        | 'search'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week';
    
    interface InputHTMLAttributes {
        accept?: string | undefined;
        alt?: string | undefined;
        autocomplete?: string | undefined;
        autofocus?: boolean | undefined;
        capture?: boolean | 'user' | 'environment' | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
        checked?: boolean | undefined;
        crossOrigin?: string | undefined;
        disabled?: boolean | undefined;
        enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
        form?: string | undefined;
        formAction?: string | undefined;
        formEncType?: string | undefined;
        formMethod?: string | undefined;
        formNoValidate?: boolean | undefined;
        formTarget?: string | undefined;
        height?:  string | undefined;
        list?: string | undefined;
        max?:  string | undefined;
        maxLength?:  undefined;
        min?:  string | undefined;
        minLength?:  undefined;
        multiple?: boolean | undefined;
        name?: string | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        readOnly?: boolean | undefined;
        required?: boolean | undefined;
        size?:  undefined;
        src?: string | undefined;
        step?:  string | undefined;
        type?: HTMLInputTypeAttribute | undefined;
        value?: string |  undefined;
        width?:  string | undefined;
    }
    
    interface KeygenHTMLAttributes {
        autofocus?: boolean | undefined;
        challenge?: string | undefined;
        disabled?: boolean | undefined;
        form?: string | undefined;
        keyType?: string | undefined;
        keyParams?: string | undefined;
        name?: string | undefined;
    }
    
    interface LabelHTMLAttributes {
        form?: string | undefined;
        htmlFor?: string | undefined;
    }
    
    interface LiHTMLAttributes {
        value?: string |  undefined;
    }
    
    interface LinkHTMLAttributes {
        as?: string | undefined;
        crossOrigin?: string | undefined;
        href?: string | undefined;
        hrefLang?: string | undefined;
        integrity?: string | undefined;
        media?: string | undefined;
        imageSrcSet?: string | undefined;
        imageSizes?: string | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        rel?: string | undefined;
        sizes?: string | undefined;
        type?: string | undefined;
        charSet?: string | undefined;
    }
    
    interface MapHTMLAttributes {
        name?: string | undefined;
    }
    
    interface MenuHTMLAttributes {
        type?: string | undefined;
    }
    
    interface MediaHTMLAttributes {
        autoplay?: boolean | undefined;
        controls?: boolean | undefined;
        controlsList?: string | undefined;
        crossOrigin?: string | undefined;
        loop?: boolean | undefined;
        mediaGroup?: string | undefined;
        muted?: boolean | undefined;
        playsInline?: boolean | undefined;
        preload?: string | undefined;
        src?: string | undefined;
    }
    
    interface MetaHTMLAttributes {
        charSet?: string | undefined;
        content?: string | undefined;
        httpEquiv?: string | undefined;
        name?: string | undefined;
        media?: string | undefined;
    }
    
    interface MeterHTMLAttributes {
        form?: string | undefined;
        high?:  undefined;
        low?:  undefined;
        max?:  string | undefined;
        min?:  string | undefined;
        optimum?:  undefined;
        value?: string |  undefined;
    }
    
    interface QuoteHTMLAttributes {
        cite?: string | undefined;
    }
    
    interface ObjectHTMLAttributes {
        classID?: string | undefined;
        data?: string | undefined;
        form?: string | undefined;
        height?:  string | undefined;
        name?: string | undefined;
        type?: string | undefined;
        useMap?: string | undefined;
        width?:  string | undefined;
        wmode?: string | undefined;
    }
    
    interface OlHTMLAttributes {
        reversed?: boolean | undefined;
        start?:  undefined;
        type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
    }
    
    interface OptgroupHTMLAttributes {
        disabled?: boolean | undefined;
        label?: string | undefined;
    }
    
    interface OptionHTMLAttributes {
        disabled?: boolean | undefined;
        label?: string | undefined;
        selected?: boolean | undefined;
        value?: string |  undefined;
    }
    
    interface OutputHTMLAttributes {
        form?: string | undefined;
        htmlFor?: string | undefined;
        name?: string | undefined;
    }
    
    interface ParamHTMLAttributes {
        name?: string | undefined;
        value?: string |  undefined;
    }
    
    interface ProgressHTMLAttributes {
        max?:  string | undefined;
        value?: string |  undefined;
    }
    
    interface SlotHTMLAttributes {
        name?: string | undefined;
    }
    
    interface ScriptHTMLAttributes {
        async?: boolean | undefined;
        /** @deprecated */
        charSet?: string | undefined;
        crossOrigin?: string | undefined;
        defer?: boolean | undefined;
        integrity?: string | undefined;
        noModule?: boolean | undefined;
        nonce?: string | undefined;
        referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
        src?: string | undefined;
        type?: string | undefined;
    }
    
    interface SelectHTMLAttributes {
        autocomplete?: string | undefined;
        autofocus?: boolean | undefined;
        disabled?: boolean | undefined;
        form?: string | undefined;
        multiple?: boolean | undefined;
        name?: string | undefined;
        required?: boolean | undefined;
        size?:  undefined;
        value?: string |  undefined;
        onChange?:any// ChangeEventHandler<T> | undefined;
    }
    
    interface SourceHTMLAttributes {
        height?:  string | undefined;
        media?: string | undefined;
        sizes?: string | undefined;
        src?: string | undefined;
        srcSet?: string | undefined;
        type?: string | undefined;
        width?:  string | undefined;
    }
    
    interface StyleHTMLAttributes {
        media?: string | undefined;
        nonce?: string | undefined;
        scoped?: boolean | undefined;
        type?: string | undefined;
    }
    
    interface TableHTMLAttributes {
        cellPadding?:  string | undefined;
        cellSpacing?:  string | undefined;
        summary?: string | undefined;
        width?:  string | undefined;
    }
    
    interface TextareaHTMLAttributes {
        autocomplete?: string | undefined;
        autofocus?: boolean | undefined;
        cols?:  undefined;
        dirName?: string | undefined;
        disabled?: boolean | undefined;
        form?: string | undefined;
        maxLength?:  undefined;
        minLength?:  undefined;
        name?: string | undefined;
        placeholder?: string | undefined;
        readOnly?: boolean | undefined;
        required?: boolean | undefined;
        rows?:  undefined;
        value?: string |  undefined;
        wrap?: string | undefined;
    
        onChange?: any//ChangeEventHandler<T> | undefined;
    }
    
    interface TdHTMLAttributes {
        align?: "left" | "center" | "right" | "justify" | "char" | undefined;
        colSpan?:  undefined;
        headers?: string | undefined;
        rowSpan?:  undefined;
        scope?: string | undefined;
        abbr?: string | undefined;
        height?:  string | undefined;
        width?:  string | undefined;
        valign?: "top" | "middle" | "bottom" | "baseline" | undefined;
    }
    
    interface ThHTMLAttributes {
        align?: "left" | "center" | "right" | "justify" | "char" | undefined;
        colSpan?:  undefined;
        headers?: string | undefined;
        rowSpan?:  undefined;
        scope?: string | undefined;
        abbr?: string | undefined;
    }
    
    interface TimeHTMLAttributes {
        dateTime?: string | undefined;
    }
    
    interface TrackHTMLAttributes {
        default?: boolean | undefined;
        kind?: string | undefined;
        label?: string | undefined;
        src?: string | undefined;
        srcLang?: string | undefined;
    }
    
    interface VideoHTMLAttributes {
        height?:  string | undefined;
        playsInline?: boolean | undefined;
        poster?: string | undefined;
        width?:  string | undefined;
        disablePictureInPicture?: boolean | undefined;
        disableRemotePlayback?: boolean | undefined;
    }
    
    // this list is "complete" in that it contains every SVG attribute
    // that React supports, but the types can be improved.
    // Full list here: https://facebook.github.io/react/docs/dom-elements.html
    //
    // The three broad type categories are (in order of restrictiveness):
    //   - " string"
    //   - "string"
    //   - union of string literals
    interface SVGAttributes {
        // Attributes which also defined in HTMLAttributes
        // See comment in SVGDOMPropertyConfig.js
        class?: string | undefined;
        color?: string | undefined;
        height?:  string | undefined;
        id?: string | undefined;
        lang?: string | undefined;
        max?:  string | undefined;
        media?: string | undefined;
        method?: string | undefined;
        min?:  string | undefined;
        name?: string | undefined;
        style?: string | undefined;
        target?: string | undefined;
        type?: string | undefined;
        width?:  string | undefined;
    
        // Other HTML properties supported by SVG elements in browsers
        role?: AriaRole | undefined;
        tabIndex?:  undefined;
        crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    
        // SVG Specific attributes
        accentHeight?:  string | undefined;
        accumulate?: "none" | "sum" | undefined;
        additive?: "replace" | "sum" | undefined;
        alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
        "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | undefined;
        allowReorder?: "no" | "yes" | undefined;
        alphabetic?:  string | undefined;
        amplitude?:  string | undefined;
        arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined;
        ascent?:  string | undefined;
        attributeName?: string | undefined;
        attributeType?: string | undefined;
        autoReverse?: true|false | undefined;
        azimuth?:  string | undefined;
        baseFrequency?:  string | undefined;
        baselineShift?:  string | undefined;
        baseProfile?:  string | undefined;
        bbox?:  string | undefined;
        begin?:  string | undefined;
        bias?:  string | undefined;
        by?:  string | undefined;
        calcMode?:  string | undefined;
        capHeight?:  string | undefined;
        clip?:  string | undefined;
        clipPath?: string | undefined;
        clipPathUnits?:  string | undefined;
        clipRule?:  string | undefined;
        colorInterpolation?:  string | undefined;
        colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
        colorProfile?:  string | undefined;
        colorRendering?:  string | undefined;
        contentScriptType?:  string | undefined;
        contentStyleType?:  string | undefined;
        cursor?:  string | undefined;
        cx?:  string | undefined;
        cy?:  string | undefined;
        d?: string | undefined;
        decelerate?:  string | undefined;
        descent?:  string | undefined;
        diffuseConstant?:  string | undefined;
        direction?:  string | undefined;
        display?:  string | undefined;
        divisor?:  string | undefined;
        dominantBaseline?:  string | undefined;
        dur?:  string | undefined;
        dx?:  string | undefined;
        dy?:  string | undefined;
        edgeMode?:  string | undefined;
        elevation?:  string | undefined;
        enableBackground?:  string | undefined;
        end?:  string | undefined;
        exponent?:  string | undefined;
        externalResourcesRequired?: true|false | undefined;
        fill?: string | undefined;
        fillOpacity?:  string | undefined;
        fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
        filter?: string | undefined;
        filterRes?:  string | undefined;
        filterUnits?:  string | undefined;
        floodColor?:  string | undefined;
        floodOpacity?:  string | undefined;
        focusable?: true|false | "auto" | undefined;
        fontFamily?: string | undefined;
        fontSize?:  string | undefined;
        fontSizeAdjust?:  string | undefined;
        fontStretch?:  string | undefined;
        fontStyle?:  string | undefined;
        fontVariant?:  string | undefined;
        fontWeight?:  string | undefined;
        format?:  string | undefined;
        fr?:  string | undefined;
        from?:  string | undefined;
        fx?:  string | undefined;
        fy?:  string | undefined;
        g1?:  string | undefined;
        g2?:  string | undefined;
        glyphName?:  string | undefined;
        glyphOrientationHorizontal?:  string | undefined;
        glyphOrientationVertical?:  string | undefined;
        glyphRef?:  string | undefined;
        gradientTransform?: string | undefined;
        gradientUnits?: string | undefined;
        hanging?:  string | undefined;
        horizAdvX?:  string | undefined;
        horizOriginX?:  string | undefined;
        href?: string | undefined;
        ideographic?:  string | undefined;
        imageRendering?:  string | undefined;
        in2?:  string | undefined;
        in?: string | undefined;
        intercept?:  string | undefined;
        k1?:  string | undefined;
        k2?:  string | undefined;
        k3?:  string | undefined;
        k4?:  string | undefined;
        k?:  string | undefined;
        kernelMatrix?:  string | undefined;
        kernelUnitLength?:  string | undefined;
        kerning?:  string | undefined;
        keyPoints?:  string | undefined;
        keySplines?:  string | undefined;
        keyTimes?:  string | undefined;
        lengthAdjust?:  string | undefined;
        letterSpacing?:  string | undefined;
        lightingColor?:  string | undefined;
        limitingConeAngle?:  string | undefined;
        local?:  string | undefined;
        markerEnd?: string | undefined;
        markerHeight?:  string | undefined;
        markerMid?: string | undefined;
        markerStart?: string | undefined;
        markerUnits?:  string | undefined;
        markerWidth?:  string | undefined;
        mask?: string | undefined;
        maskContentUnits?:  string | undefined;
        maskUnits?:  string | undefined;
        mathematical?:  string | undefined;
        mode?:  string | undefined;
        numOctaves?:  string | undefined;
        offset?:  string | undefined;
        opacity?:  string | undefined;
        operator?:  string | undefined;
        order?:  string | undefined;
        orient?:  string | undefined;
        orientation?:  string | undefined;
        origin?:  string | undefined;
        overflow?:  string | undefined;
        overlinePosition?:  string | undefined;
        overlineThickness?:  string | undefined;
        paintOrder?:  string | undefined;
        panose1?:  string | undefined;
        path?: string | undefined;
        pathLength?:  string | undefined;
        patternContentUnits?: string | undefined;
        patternTransform?:  string | undefined;
        patternUnits?: string | undefined;
        pointerEvents?:  string | undefined;
        points?: string | undefined;
        pointsAtX?:  string | undefined;
        pointsAtY?:  string | undefined;
        pointsAtZ?:  string | undefined;
        preserveAlpha?: true|false | undefined;
        preserveAspectRatio?: string | undefined;
        primitiveUnits?:  string | undefined;
        r?:  string | undefined;
        radius?:  string | undefined;
        refX?:  string | undefined;
        refY?:  string | undefined;
        renderingIntent?:  string | undefined;
        repeatCount?:  string | undefined;
        repeatDur?:  string | undefined;
        requiredExtensions?:  string | undefined;
        requiredFeatures?:  string | undefined;
        restart?:  string | undefined;
        result?: string | undefined;
        rotate?:  string | undefined;
        rx?:  string | undefined;
        ry?:  string | undefined;
        scale?:  string | undefined;
        seed?:  string | undefined;
        shapeRendering?:  string | undefined;
        slope?:  string | undefined;
        spacing?:  string | undefined;
        specularConstant?:  string | undefined;
        specularExponent?:  string | undefined;
        speed?:  string | undefined;
        spreadMethod?: string | undefined;
        startOffset?:  string | undefined;
        stdDeviation?:  string | undefined;
        stemh?:  string | undefined;
        stemv?:  string | undefined;
        stitchTiles?:  string | undefined;
        stopColor?: string | undefined;
        stopOpacity?:  string | undefined;
        strikethroughPosition?:  string | undefined;
        strikethroughThickness?:  string | undefined;
        string?:  string | undefined;
        stroke?: string | undefined;
        strokeDasharray?: string |  undefined;
        strokeDashoffset?: string |  undefined;
        strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
        strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
        strokeMiterlimit?:  string | undefined;
        strokeOpacity?:  string | undefined;
        strokeWidth?:  string | undefined;
        surfaceScale?:  string | undefined;
        systemLanguage?:  string | undefined;
        tableValues?:  string | undefined;
        targetX?:  string | undefined;
        targetY?:  string | undefined;
        textAnchor?: string | undefined;
        textDecoration?:  string | undefined;
        textLength?:  string | undefined;
        textRendering?:  string | undefined;
        to?:  string | undefined;
        transform?: string | undefined;
        u1?:  string | undefined;
        u2?:  string | undefined;
        underlinePosition?:  string | undefined;
        underlineThickness?:  string | undefined;
        unicode?:  string | undefined;
        unicodeBidi?:  string | undefined;
        unicodeRange?:  string | undefined;
        unitsPerEm?:  string | undefined;
        vAlphabetic?:  string | undefined;
        values?: string | undefined;
        vectorEffect?:  string | undefined;
        version?: string | undefined;
        vertAdvY?:  string | undefined;
        vertOriginX?:  string | undefined;
        vertOriginY?:  string | undefined;
        vHanging?:  string | undefined;
        vIdeographic?:  string | undefined;
        viewBox?: string | undefined;
        viewTarget?:  string | undefined;
        visibility?:  string | undefined;
        vMathematical?:  string | undefined;
        widths?:  string | undefined;
        wordSpacing?:  string | undefined;
        writingMode?:  string | undefined;
        x1?:  string | undefined;
        x2?:  string | undefined;
        x?:  string | undefined;
        xChannelSelector?: string | undefined;
        xHeight?:  string | undefined;
        xlinkActuate?: string | undefined;
        xlinkArcrole?: string | undefined;
        xlinkHref?: string | undefined;
        xlinkRole?: string | undefined;
        xlinkShow?: string | undefined;
        xlinkTitle?: string | undefined;
        xlinkType?: string | undefined;
        xmlBase?: string | undefined;
        xmlLang?: string | undefined;
        xmlns?: string | undefined;
        xmlnsXlink?: string | undefined;
        xmlSpace?: string | undefined;
        y1?:  string | undefined;
        y2?:  string | undefined;
        y?:  string | undefined;
        yChannelSelector?: string | undefined;
        z?:  string | undefined;
        zoomAndPan?: string | undefined;
    }
    
    interface WebViewHTMLAttributes {
        allowFullScreen?: boolean | undefined;
        allowpopups?: boolean | undefined;
        autofocus?: boolean | undefined;
        autosize?: boolean | undefined;
        blinkfeatures?: string | undefined;
        disableblinkfeatures?: string | undefined;
        disableguestresize?: boolean | undefined;
        disablewebsecurity?: boolean | undefined;
        guestinstance?: string | undefined;
        httpreferrer?: string | undefined;
        nodeintegration?: boolean | undefined;
        partition?: string | undefined;
        plugins?: boolean | undefined;
        preload?: string | undefined;
        src?: string | undefined;
        useragent?: string | undefined;
        webpreferences?: string | undefined;
    }
    }



