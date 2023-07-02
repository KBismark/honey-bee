//Part of this file from:
    // Type definitions for React 18.0
    // Project: http://facebook.github.io/react/


    declare global {
        namespace JSX {
            type Element = ComponentNode;
            interface IntrinsicElements {
                view: ViewWrapperTag;
                // HTML
                a: HTMLTags|HTMLTagsExtension.AnchorHTMLAttributes;
                abbr: HTMLTags;
                address: HTMLTags;
                area: HTMLTags|HTMLTagsExtension.AreaHTMLAttributes;
                article: HTMLTags;
                aside: HTMLTags;
                audio: HTMLTags|HTMLTagsExtension.AudioHTMLAttributes;
                b: HTMLTags;
                base: HTMLTags|HTMLTagsExtension.BaseHTMLAttributes;
                bdi: HTMLTags;
                bdo: HTMLTags;
                big: HTMLTags;
                blockquote: HTMLTags|HTMLTagsExtension.BlockquoteHTMLAttributes;
                body: HTMLTags;
                br: HTMLTags;
                button: HTMLTags|HTMLTagsExtension.ButtonHTMLAttributes;
                canvas: HTMLTags|HTMLTagsExtension.CanvasHTMLAttributes;
                caption: HTMLTags;
                cite: HTMLTags;
                code: HTMLTags;
                col: HTMLTags|HTMLTagsExtension.ColHTMLAttributes;
                colgroup: HTMLTags|HTMLTagsExtension.ColgroupHTMLAttributes;
                data: HTMLTags|HTMLTagsExtension.DataHTMLAttributes;
                datalist: HTMLTags;
                dd: HTMLTags;
                del: HTMLTags|HTMLTagsExtension.DelHTMLAttributes;
                details: HTMLTags|HTMLTagsExtension.DetailsHTMLAttributes;
                dfn: HTMLTags;
                dialog: HTMLTags|HTMLTagsExtension.DialogHTMLAttributes;
                div: HTMLTags; 
                dl: HTMLTags;
                dt: HTMLTags;
                em: HTMLTags;
                embed: HTMLTags;
                fieldset: HTMLTags|HTMLTagsExtension.FieldsetHTMLAttributes;
                figcaption: HTMLTags;
                figure: HTMLTags;
                footer: HTMLTags;
                form: HTMLTags|HTMLTagsExtension.FormHTMLAttributes;
                h1: HTMLTags;
                h2: HTMLTags;
                h3: HTMLTags;
                h4: HTMLTags;
                h5: HTMLTags;
                h6: HTMLTags;
                head: HTMLTags;
                header: HTMLTags;
                hgroup: HTMLTags;
                hr: HTMLTags;
                html: HTMLTags|HTMLTagsExtension.HtmlHTMLAttributes;
                i: HTMLTags;
                iframe: HTMLTags|HTMLTagsExtension.IframeHTMLAttributes;
                img: HTMLTags|HTMLTagsExtension.ImgHTMLAttributes;
                input: HTMLTags|HTMLTagsExtension.InputHTMLAttributes;
                ins: HTMLTags|HTMLTagsExtension.InsHTMLAttributes;
                kbd: HTMLTags;
                keygen: HTMLTags|HTMLTagsExtension.KeygenHTMLAttributes;
                label: HTMLTags|HTMLTagsExtension.LabelHTMLAttributes;
                legend: HTMLTags;
                li: HTMLTags|HTMLTagsExtension.LiHTMLAttributes;
                link: HTMLTags|HTMLTagsExtension.LinkHTMLAttributes;
                main: HTMLTags;
                map: HTMLTags|HTMLTagsExtension.MapHTMLAttributes;
                mark: HTMLTags;
                menu: HTMLTags|HTMLTagsExtension.MenuHTMLAttributes;
                menuitem: HTMLTags;
                meta: HTMLTags|HTMLTagsExtension.MetaHTMLAttributes;
                meter: HTMLTags|HTMLTagsExtension.MeterHTMLAttributes;
                nav: HTMLTags;
                noindex: HTMLTags;
                noscript: HTMLTags;
                object: HTMLTags|HTMLTagsExtension.ObjectHTMLAttributes;
                ol: HTMLTags|HTMLTagsExtension.OlHTMLAttributes;
                optgroup: HTMLTags|HTMLTagsExtension.OptgroupHTMLAttributes;
                option: HTMLTags|HTMLTagsExtension.OptionHTMLAttributes;
                output: HTMLTags|HTMLTagsExtension.OutputHTMLAttributes;
                p: HTMLTags;
                param: HTMLTags|HTMLTagsExtension.ParamHTMLAttributes;
                picture: HTMLTags;
                pre: HTMLTags;
                progress: HTMLTags|HTMLTagsExtension.ProgressHTMLAttributes;
                q: HTMLTags;
                rp: HTMLTags;
                rt: HTMLTags;
                ruby: HTMLTags;
                s: HTMLTags;
                samp: HTMLTags;
                slot: HTMLTags|HTMLTagsExtension.SlotHTMLAttributes;
                script: HTMLTags|HTMLTagsExtension.ScriptHTMLAttributes;
                section: HTMLTags;
                select: HTMLTags|HTMLTagsExtension.SelectHTMLAttributes;
                small: HTMLTags;
                source: HTMLTags|HTMLTagsExtension.SourceHTMLAttributes;
                span: HTMLTags;
                strong: HTMLTags;
                style: HTMLTags|HTMLTagsExtension.StyleHTMLAttributes;
                sub: HTMLTags;
                summary: HTMLTags;
                sup: HTMLTags;
                table: HTMLTags|HTMLTagsExtension.TableHTMLAttributes;
                template: HTMLTags;
                tbody: HTMLTags;
                td: HTMLTags|HTMLTagsExtension.TdHTMLAttributes;
                textarea: HTMLTags|HTMLTagsExtension.TextareaHTMLAttributes;
                tfoot: HTMLTags;
                th: HTMLTags|HTMLTagsExtension.ThHTMLAttributes;
                thead: HTMLTags;
                time: HTMLTags|HTMLTagsExtension.TimeHTMLAttributes;
                title: HTMLTags;
                tr: HTMLTags;
                track: HTMLTags|HTMLTagsExtension.TrackHTMLAttributes;
                u: HTMLTags;
                ul: HTMLTags;
                "var": HTMLTags;
                video: HTMLTags|HTMLTagsExtension.VideoHTMLAttributes;
                wbr: HTMLTags;
                webview: HTMLTags|HTMLTagsExtension.WebViewHTMLAttributes;
    
                // SVG
                svg: any;
    
                animate: any; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
                animateMotion: any;
                animateTransform: any; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
                circle: Empty<SVGCircleElement>;
                clipPath: Empty<SVGClipPathElement>;
                defs: Empty<SVGDefsElement>;
                desc: Empty<SVGDescElement>;
                ellipse: Empty<SVGEllipseElement>;
                feBlend: Empty<SVGFEBlendElement>;
                feColorMatrix: Empty<SVGFEColorMatrixElement>;
                feComponentTransfer: Empty<SVGFEComponentTransferElement>;
                feComposite: Empty<SVGFECompositeElement>;
                feConvolveMatrix: Empty<SVGFEConvolveMatrixElement>;
                feDiffuseLighting: Empty<SVGFEDiffuseLightingElement>;
                feDisplacementMap: Empty<SVGFEDisplacementMapElement>;
                feDistantLight: Empty<SVGFEDistantLightElement>;
                feDropShadow: Empty<SVGFEDropShadowElement>;
                feFlood: Empty<SVGFEFloodElement>;
                feFuncA: Empty<SVGFEFuncAElement>;
                feFuncB: Empty<SVGFEFuncBElement>;
                feFuncG: Empty<SVGFEFuncGElement>;
                feFuncR: Empty<SVGFEFuncRElement>;
                feGaussianBlur: Empty<SVGFEGaussianBlurElement>;
                feImage: Empty<SVGFEImageElement>;
                feMerge: Empty<SVGFEMergeElement>;
                feMergeNode: Empty<SVGFEMergeNodeElement>;
                feMorphology: Empty<SVGFEMorphologyElement>;
                feOffset: Empty<SVGFEOffsetElement>;
                fePointLight: Empty<SVGFEPointLightElement>;
                feSpecularLighting: Empty<SVGFESpecularLightingElement>;
                feSpotLight: Empty<SVGFESpotLightElement>;
                feTile: Empty<SVGFETileElement>;
                feTurbulence: Empty<SVGFETurbulenceElement>;
                filter: Empty<SVGFilterElement>;
                foreignObject: Empty<SVGForeignObjectElement>;
                g: Empty<SVGGElement>;
                image: Empty<SVGImageElement>;
                line: Empty<SVGLineElement>;
                linearGradient: Empty<SVGLinearGradientElement>;
                marker: Empty<SVGMarkerElement>;
                mask: Empty<SVGMaskElement>;
                metadata: Empty<SVGMetadataElement>;
                mpath: any;
                path: Empty<SVGPathElement>;
                pattern: Empty<SVGPatternElement>;
                polygon: Empty<SVGPolygonElement>;
                polyline: Empty<SVGPolylineElement>;
                radialGradient: Empty<SVGRadialGradientElement>;
                rect: Empty<SVGRectElement>;
                stop: Empty<SVGStopElement>;
                switch: Empty<SVGSwitchElement>;
                symbol: Empty<SVGSymbolElement>;
                text: Empty<SVGTextElement>;
                textPath: Empty<SVGTextPathElement>;
                tspan: Empty<SVGTSpanElement>;
                use: Empty<SVGUseElement>;
                //view: Empty<SVGViewElement>;
            }
        }
       
        
}
    interface Empty<T>{}
    interface SpecialStyleObject {
        style?:CSSStyleDeclaration;
    }
    interface SpecialStyleString {
        style?:string;
    }
    interface SpecialClassName {
        class?:string;
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
    type HTMLTags = BHTMLAttributeSet1|BHTMLAttributeSet2|ARIAMixins|SpecialStyleString|SpecialClassName;
    type DynamicAttributeWithDependencies = { value: any, $dep: string[] };
    interface ComponentNode{}
    
   
    
    
    // Taken from React (18.0) Type definitions 
    // Project: http://facebook.github.io/react/
interface BHTMLAttributeSet2 extends NonDependencyAttributes, HTMLAttribute{ }
interface BHTMLAttributeSet1 extends DependencyAttributes, HTMLAttribute{}
    interface HTMLAttribute{
        key?: string | undefined;
    
        // Standard HTML Attributes
        accesskey?: string | undefined;
        //class?: string | undefined;
        contenteditable?: boolean | "inherit" | undefined;
        contextmenu?: string | undefined;
        dir?: string | undefined;
        draggable?: boolean | undefined;
        hidden?: boolean | undefined;
        id?: string | undefined;
        lang?: string | undefined;
        slot?: string | undefined;
        spellcheck?: boolean | undefined;
        //style?: CSSStyleDeclaration | undefined;
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
        autocomplete?: string | undefined;
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
        $class: DynamicAttributeWithDependencies;
        $style: DynamicAttributeWithDependencies;
        // Standard HTML Attributes
        $accesskey: DynamicAttributeWithDependencies;
        //class: DynamicAttributeWithDependencies;
        $contenteditable: DynamicAttributeWithDependencies;
        $contextmenu: DynamicAttributeWithDependencies;
        $dir: DynamicAttributeWithDependencies;
        $draggable: DynamicAttributeWithDependencies;
        $hidden: DynamicAttributeWithDependencies;
        $id: DynamicAttributeWithDependencies;
        $lang: DynamicAttributeWithDependencies;
        $slot: DynamicAttributeWithDependencies;
        $spellcheck: DynamicAttributeWithDependencies;
        $tabindex: DynamicAttributeWithDependencies;
        $title: DynamicAttributeWithDependencies;
        $translate: DynamicAttributeWithDependencies;
    
        // Other Standard HTML Attributes
        $accept: DynamicAttributeWithDependencies;
        $acceptcharset: DynamicAttributeWithDependencies;
        $action: DynamicAttributeWithDependencies;
        $allowfullscreen: DynamicAttributeWithDependencies;
        $allowtransparency: DynamicAttributeWithDependencies;
        $alt: DynamicAttributeWithDependencies;
        $as: DynamicAttributeWithDependencies;
        $async: DynamicAttributeWithDependencies;
        $autocomplete: DynamicAttributeWithDependencies;
        $autofocus: DynamicAttributeWithDependencies;
        $autoplay: DynamicAttributeWithDependencies;
        $capture: DynamicAttributeWithDependencies;
        $cellpadding: DynamicAttributeWithDependencies;
        $cellspacing: DynamicAttributeWithDependencies;
        $charset: DynamicAttributeWithDependencies;
        $challenge: DynamicAttributeWithDependencies;
        $checked: DynamicAttributeWithDependencies;
        $cite: DynamicAttributeWithDependencies;
        $cols: DynamicAttributeWithDependencies;
        $colspan: DynamicAttributeWithDependencies;
        $content: DynamicAttributeWithDependencies;
        $controls: DynamicAttributeWithDependencies;
        $coords: DynamicAttributeWithDependencies;
        $crossorigin: DynamicAttributeWithDependencies;
        $data: DynamicAttributeWithDependencies;
        $datetime: DynamicAttributeWithDependencies;
        $default: DynamicAttributeWithDependencies;
        $defer: DynamicAttributeWithDependencies;
        $disabled: DynamicAttributeWithDependencies;
        $download: DynamicAttributeWithDependencies;
        $enctype: DynamicAttributeWithDependencies;
        $form: DynamicAttributeWithDependencies;
        $formaction: DynamicAttributeWithDependencies;
        $formencType: DynamicAttributeWithDependencies;
        $formmethod: DynamicAttributeWithDependencies;
        $formnovalidate: DynamicAttributeWithDependencies;
        $formtarget: DynamicAttributeWithDependencies;
        $frameborder: DynamicAttributeWithDependencies;
        $headers: DynamicAttributeWithDependencies;
        $height: DynamicAttributeWithDependencies;
        $high: DynamicAttributeWithDependencies;
        $href: DynamicAttributeWithDependencies;
        $hreflang: DynamicAttributeWithDependencies;
        $for: DynamicAttributeWithDependencies;
        $httpequiv: DynamicAttributeWithDependencies;
        $integrity: DynamicAttributeWithDependencies;
        $keyparams: DynamicAttributeWithDependencies;
        $keytype: DynamicAttributeWithDependencies;
        $kind: DynamicAttributeWithDependencies;
        $label: DynamicAttributeWithDependencies;
        $list: DynamicAttributeWithDependencies;
        $loop: DynamicAttributeWithDependencies;
        $low: DynamicAttributeWithDependencies;
        $manifest: DynamicAttributeWithDependencies;
        $marginheight: DynamicAttributeWithDependencies;
        $marginwidth: DynamicAttributeWithDependencies;
        $max: DynamicAttributeWithDependencies;
        $maxlength: DynamicAttributeWithDependencies;
        $media: DynamicAttributeWithDependencies;
        $mediagroup: DynamicAttributeWithDependencies;
        $method: DynamicAttributeWithDependencies;
        $min: DynamicAttributeWithDependencies;
        $minlength: DynamicAttributeWithDependencies;
        $multiple: DynamicAttributeWithDependencies;
        $muted: DynamicAttributeWithDependencies;
        $name: DynamicAttributeWithDependencies;
        $nonce: DynamicAttributeWithDependencies;
        $novalidate: DynamicAttributeWithDependencies;
        $open: DynamicAttributeWithDependencies;
        $optimum: DynamicAttributeWithDependencies;
        $pattern: DynamicAttributeWithDependencies;
        $placeholder: DynamicAttributeWithDependencies;
        $playsinline: DynamicAttributeWithDependencies;
        $poster: DynamicAttributeWithDependencies;
        $preload: DynamicAttributeWithDependencies;
        $readonly: DynamicAttributeWithDependencies;
        $rel: DynamicAttributeWithDependencies;
        $required: DynamicAttributeWithDependencies;
        $reversed: DynamicAttributeWithDependencies;
        $rows: DynamicAttributeWithDependencies;
        $rowspan: DynamicAttributeWithDependencies;
        $sandbox: DynamicAttributeWithDependencies;
        $scope: DynamicAttributeWithDependencies;
        $scoped: DynamicAttributeWithDependencies;
        $scrolling: DynamicAttributeWithDependencies;
        $seamless: DynamicAttributeWithDependencies;
        $selected: DynamicAttributeWithDependencies;
        $shape: DynamicAttributeWithDependencies;
        $size: DynamicAttributeWithDependencies;
        $sizes: DynamicAttributeWithDependencies;
        $span: DynamicAttributeWithDependencies;
        $src: DynamicAttributeWithDependencies;
        $srcdoc: DynamicAttributeWithDependencies;
        $srclang: DynamicAttributeWithDependencies;
        $srcset: DynamicAttributeWithDependencies;
        $start: DynamicAttributeWithDependencies;
        $step: DynamicAttributeWithDependencies;
        $summary: DynamicAttributeWithDependencies;
        $target: DynamicAttributeWithDependencies;
        $type: DynamicAttributeWithDependencies;
        $value: DynamicAttributeWithDependencies;
        $width: DynamicAttributeWithDependencies;
        $wmode: DynamicAttributeWithDependencies;
        $wrap: DynamicAttributeWithDependencies;
    
        // Unknown
        $radiogroup: DynamicAttributeWithDependencies; // <command>, <menuitem>
    
        // WAI-ARIA
        $role: DynamicAttributeWithDependencies;
    
        // RDFa Attributes
        $about: DynamicAttributeWithDependencies;
        $datatype: DynamicAttributeWithDependencies;
        $inlist: DynamicAttributeWithDependencies;
        $prefix: DynamicAttributeWithDependencies;
        $property: DynamicAttributeWithDependencies;
        $resource: DynamicAttributeWithDependencies;
        $typeof: DynamicAttributeWithDependencies;
        $vocab: DynamicAttributeWithDependencies;
    
        // Non-standard Attributes
        $autocapitalize: DynamicAttributeWithDependencies;
        $autocorrect: DynamicAttributeWithDependencies;
        $autosave: DynamicAttributeWithDependencies;
        $color: DynamicAttributeWithDependencies;
        $results: DynamicAttributeWithDependencies;
        $security: DynamicAttributeWithDependencies;
        $unselectable: DynamicAttributeWithDependencies;
    
        // Living Standard
        /**
         * Hints at the type of data that might be entered by the user while editing the element or its contents
         * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
         */
        $inputmode: DynamicAttributeWithDependencies;
        /**
         * Specify that a standard HTML element should behave like a defined custom built-in element
         * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
         */
        $is: DynamicAttributeWithDependencies;
    }
    interface NonDependencyAttributes {
        Class: any;
    
        // Standard HTML Attributes
        Accesskey: any;
        //class: any;
        Contenteditable: any;
        Contextmenu: any;
        Dir: any;
        Draggable: any;
        Hidden: any;
        Id: any;
        Lang: any;
        Slot: any;
        Spellcheck: any;
        Style: any;
        Tabindex: any;
        Title: any;
        Translate: any;
    
        // Other Standard HTML Attributes
        Accept: any;
        Acceptcharset: any;
        Action: any;
        Allowfullscreen: any;
        Allowtransparency: any;
        Alt: any;
        As: any;
        Async: any;
        Autocomplete: any;
        Autofocus: any;
        Autoplay: any;
        Capture: any;
        Cellpadding: any;
        Cellspacing: any;
        Charset: any;
        Challenge: any;
        Checked: any;
        Cite: any;
        Cols: any;
        Colspan: any;
        Content: any;
        Controls: any;
        Coords: any;
        Crossorigin: any;
        Data: any;
        Datetime: any;
        Default: any;
        Defer: any;
        Disabled: any;
        Download: any;
        Enctype: any;
        Form: any;
        Formaction: any;
        FormencType: any;
        Formmethod: any;
        Formnovalidate: any;
        Formtarget: any;
        Frameborder: any;
        Headers: any;
        Height: any;
        High: any;
        Href: any;
        Hreflang: any;
        For: any;
        Httpequiv: any;
        Integrity: any;
        Keyparams: any;
        Keytype: any;
        Kind: any;
        Label: any;
        List: any;
        Loop: any;
        Low: any;
        Manifest: any;
        Marginheight: any;
        Marginwidth: any;
        Max: any;
        Maxlength: any;
        Media: any;
        Mediagroup: any;
        Method: any;
        Min: any;
        Minlength: any;
        Multiple: any;
        Muted: any;
        Name: any;
        Nonce: any;
        Novalidate: any;
        Open: any;
        Optimum: any;
        Pattern: any;
        Placeholder: any;
        Playsinline: any;
        Poster: any;
        Preload: any;
        Readonly: any;
        Rel: any;
        Required: any;
        Reversed: any;
        Rows: any;
        Rowspan: any;
        Sandbox: any;
        Scope: any;
        Scoped: any;
        Scrolling: any;
        Seamless: any;
        Selected: any;
        Shape: any;
        Size: any;
        Sizes: any;
        Span: any;
        Src: any;
        Srcdoc: any;
        Srclang: any;
        Srcset: any;
        Start: any;
        Step: any;
        Summary: any;
        Target: any;
        Type: any;
        Value: any;
        Width: any;
        Wmode: any;
        Wrap: any;
    
        // Unknown
        Radiogroup: any; // <command>, <menuitem>
    
        // WAI-ARIA
        Role: any;
    
        // RDFa Attributes
        About: any;
        Datatype: any;
        Inlist: any;
        Prefix: any;
        Property: any;
        Resource: any;
        Typeof: any;
        Vocab: any;
    
        // Non-standard Attributes
        Autocapitalize: any;
        Autocorrect: any;
        Autosave: any;
        Color: any;
        Results: any;
        Security: any;
        Unselectable: any;
    
        // Living Standard
        /**
         * Hints at the type of data that might be entered by the user while editing the element or its contents
         * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
         */
        Inputmode: any;
        /**
         * Specify that a standard HTML element should behave like a defined custom built-in element
         * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
         */
        Is: any;
    }
    // Taken from React (18.0) Type definitions 
    // Project: http://facebook.github.io/react/
    // All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
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
        "aria-atomic": string
        "aria-auto-complete": string
        "aria-busy": string
        "aria-checked": string
        "aria-colcount": string
        "aria-colindex": string
        "aria-colspan": string
        "aria-current": string
        "aria-disabled": string
        "aria-expanded": string
        "aria-haspopup": string
        "aria-hidden": string
        "aria-keyshortcuts": string
        "aria-label": string
        "aria-level": string
        "aria-live": string
        "aria-modal": string
        "aria-multiLine": string
        "aria-multi-selectable": string
        "aria-orientation": string
        "aria-placeholder": string
        "aria-posinset": string
        "aria-pressed": string
        "aria-readonly": string
        "aria-required": string
        "aria-roledescription": string
        "aria-rowcount": string
        "aria-rowindex": string
        "aria-rowspan": string
        "aria-selected": string
        "aria-setsize": string
        "aria-sort": string
        "aria-valuemax": string
        "aria-valuemin": string
        "aria-valuenow": string
        "aria-valuetext": string
    }
    
    
    interface AllHTMLAttributes {
        // Standard HTML Attributes
        accept?: string | undefined;
        acceptCharset?: string | undefined;
        action?: string | undefined;
        allowFullScreen?: boolean | undefined;
        allowTransparency?: boolean | undefined;
        alt?: string | undefined;
        as?: string | undefined;
        async?: boolean | undefined;
        autocomplete?: string | undefined;
        autofocus?: boolean | undefined;
        autoplay?: boolean | undefined;
        capture?: boolean | 'user' | 'environment' | undefined;
        cellPadding?: number | string | undefined;
        cellSpacing?: number | string | undefined;
        charSet?: string | undefined;
        challenge?: string | undefined;
        checked?: boolean | undefined;
        cite?: string | undefined;
        classID?: string | undefined;
        cols?: number | undefined;
        colSpan?: number | undefined;
        content?: string | undefined;
        controls?: boolean | undefined;
        coords?: string | undefined;
        crossOrigin?: string | undefined;
        data?: string | undefined;
        dateTime?: string | undefined;
        default?: boolean | undefined;
        defer?: boolean | undefined;
        disabled?: boolean | undefined;
        download?: any;
        encType?: string | undefined;
        form?: string | undefined;
        formAction?: string | undefined;
        formEncType?: string | undefined;
        formMethod?: string | undefined;
        formNoValidate?: boolean | undefined;
        formTarget?: string | undefined;
        frameBorder?: number | string | undefined;
        headers?: string | undefined;
        height?: number | string | undefined;
        high?: number | undefined;
        href?: string | undefined;
        hrefLang?: string | undefined;
        for?: string | undefined;
        httpEquiv?: string | undefined;
        integrity?: string | undefined;
        keyParams?: string | undefined;
        keyType?: string | undefined;
        kind?: string | undefined;
        label?: string | undefined;
        list?: string | undefined;
        loop?: boolean | undefined;
        low?: number | undefined;
        manifest?: string | undefined;
        marginHeight?: number | undefined;
        marginWidth?: number | undefined;
        max?: number | string | undefined;
        maxLength?: number | undefined;
        media?: string | undefined;
        mediaGroup?: string | undefined;
        method?: string | undefined;
        min?: number | string | undefined;
        minLength?: number | undefined;
        multiple?: boolean | undefined;
        muted?: boolean | undefined;
        name?: string | undefined;
        nonce?: string | undefined;
        noValidate?: boolean | undefined;
        open?: boolean | undefined;
        optimum?: number | undefined;
        pattern?: string | undefined;
        placeholder?: string | undefined;
        playsInline?: boolean | undefined;
        poster?: string | undefined;
        preload?: string | undefined;
        readOnly?: boolean | undefined;
        rel?: string | undefined;
        required?: boolean | undefined;
        reversed?: boolean | undefined;
        rows?: number | undefined;
        rowSpan?: number | undefined;
        sandbox?: string | undefined;
        scope?: string | undefined;
        scoped?: boolean | undefined;
        scrolling?: string | undefined;
        seamless?: boolean | undefined;
        selected?: boolean | undefined;
        shape?: string | undefined;
        size?: number | undefined;
        sizes?: string | undefined;
        span?: number | undefined;
        src?: string | undefined;
        srcDoc?: string | undefined;
        srcLang?: string | undefined;
        srcSet?: string | undefined;
        start?: number | undefined;
        step?: number | string | undefined;
        summary?: string | undefined;
        target?: string | undefined;
        type?: string | undefined;
        useMap?: string | undefined;
        value?: string |  undefined;
        width?: number | string | undefined;
        wmode?: string | undefined;
        wrap?: string | undefined;
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
        style?: SpecialStyleString | undefined;
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
    
    type HtmlAttributesTypes =
      | "abbr"
      | "accept-charset"
      | "accept"
      | "accesskey"
      | "action"
      | "align"
      | "alink"
      | "allow"
      | "allowfullscreen"
      | "allowpaymentrequest"
      | "alt"
      | "archive"
      | "async"
      | "autobuffer"
      | "autocapitalize"
      | "autocomplete"
      | "autofocus"
      | "autoplay"
      | "axis"
      | "background"
      | "behavior"
      | "bgcolor"
      | "border"
      | "bottommargin"
      | "buffered"
      | "cellpadding"
      | "cellspacing"
      | "char"
      | "charoff"
      | "charset"
      | "checked"
      | "cite"
      | "class"
      | "classid"
      | "clear"
      | "code"
      | "codebase"
      | "codetype"
      | "color"
      | "cols"
      | "colspan"
      | "command"
      | "compact"
      | "content"
      | "contenteditable"
      | "contextmenu"
      | "controls"
      | "coords"
      | "crossorigin"
      | "data"
      | "datafld"
      | "datasrc"
      | "datetime"
      | "declare"
      | "decoding"
      | "default"
      | "defer"
      | "dir"
      | "direction"
      | "dirname"
      | "disabled"
      | "download"
      | "draggable"
      | "enctype"
      | "enterkeyhint"
      | "exportparts"
      | "face"
      | "for"
      | "form"
      | "formaction"
      | "formenctype"
      | "formmethod"
      | "formnovalidate"
      | "formtarget"
      | "frame"
      | "frameborder"
      | "headers"
      | "height"
      | "hidden"
      | "high"
      | "href"
      | "hreflang"
      | "hspace"
      | "http-equiv"
      | "icon"
      | "id"
      | "imagesizes"
      | "imagesrcset"
      | "inputmode"
      | "integrity"
      | "intrinsicsize"
      | "is"
      | "ismap"
      | "itemid"
      | "itemprop"
      | "itemref"
      | "itemscope"
      | "itemtype"
      | "kind"
      | "label"
      | "lang"
      | "language"
      | "leftmargin"
      | "link"
      | "loading"
      | "longdesc"
      | "loop"
      | "low"
      | "manifest"
      | "marginheight"
      | "marginwidth"
      | "max"
      | "maxlength"
      | "mayscript"
      | "media"
      | "method"
      | "methods"
      | "min"
      | "minlength"
      | "moz-opaque"
      | "mozallowfullscreen"
      | "mozcurrentsampleoffset"
      | "msallowfullscreen"
      | "multiple"
      | "muted"
      | "name"
      | "nohref"
      | "nomodule"
      | "nonce"
      | "noresize"
      | "noshade"
      | "novalidate"
      | "nowrap"
      | "object"
      | "onafterprint"
      | "onbeforeprint"
      | "onbeforeunload"
      | "onblur"
      | "onerror"
      | "onfocus"
      | "onhashchange"
      | "onlanguagechange"
      | "onload"
      | "onmessage"
      | "onoffline"
      | "ononline"
      | "onpopstate"
      | "onredo"
      | "onresize"
      | "onstorage"
      | "onundo"
      | "onunload"
      | "open"
      | "optimum"
      | "part"
      | "ping"
      | "placeholder"
      | "played"
      | "poster"
      | "prefetch"
      | "preload"
      | "profile"
      | "radiogroup"
      | "readonly"
      | "referrerpolicy"
      | "rel"
      | "required"
      | "rev"
      | "reversed"
      | "rightmargin"
      | "rows"
      | "rowspan"
      | "rules"
      | "sandbox-allow-downloads"
      | "sandbox-allow-modals"
      | "sandbox-allow-popups-to-escape-sandbox"
      | "sandbox-allow-popups"
      | "sandbox-allow-presentation"
      | "sandbox-allow-same-origin"
      | "sandbox-allow-storage-access-by-user-activation"
      | "sandbox-allow-top-navigation-by-user-activation"
      | "sandbox"
      | "scope"
      | "scoped"
      | "scrollamount"
      | "scrolldelay"
      | "scrolling"
      | "selected"
      | "shadowroot"
      | "shape"
      | "size"
      | "sizes"
      | "slot"
      | "span"
      | "spellcheck"
      | "src"
      | "srcdoc"
      | "srclang"
      | "srcset"
      | "standby"
      | "start"
      | "style"
      | "summary"
      | "tabindex"
      | "target"
      | "text"
      | "title"
      | "topmargin"
      | "translate"
      | "truespeed"
      | "type"
      | "usemap"
      | "valign"
      | "value"
      | "valuetype"
      | "version"
      | "vlink"
      | "volume"
      | "vspace"
      | "webkitallowfullscreen"
      | "width"
      | "wrap"
      | "xmlns";
    
    type HTMLElementTagNameTypes =
        "a"|
        "abbr"|
        "address"|
        "area"|
        "article"|
        "aside"|
        "audio"|
        "b"|
        "base"|
        "bdi"|
        "bdo"|
        "blockquote"|
        "body"|
        "br"|
        "button"|
        "canvas"|
        "caption"|
        "cite"|
        "code"|
        "col"|
        "colgroup"|
        "data"|
        "datalist"|
        "dd"|
        "del"|
        "details"|
        "dfn"|
        "dialog"|
        "div"|
        "dl"|
        "dt"|
        "em"|
        "embed"|
        "fieldset"|
        "figcaption"|
        "figure"|
        "footer"|
        "form"|
        "h1"|
        "h2"|
        "h3"|
        "h4"|
        "h5"|
        "h6"|
        "head"|
        "header"|
        "hgroup"|
        "hr"|
        "html"|
        "i"|
        "iframe"|
        "img"|
        "input"|
        "ins"|
        "kbd"|
        "label"|
        "legend"|
        "li"|
        "link"|
        "main"|
        "map"|
        "mark"|
        "menu"|
        "meta"|
        "meter"|
        "nav"|
        "noscript"|
        "object"|
        "ol"|
        "optgroup"|
        "option"|
        "output"|
        "p"|
        "picture"|
        "pre"|
        "progress"|
        "q"|
        "rp"|
        "rt"|
        "ruby"|
        "s"|
        "samp"|
        "script"|
        "section"|
        "select"|
        "slot"|
        "small"|
        "source"|
        "span"|
        "strong"|
        "style"|
        "sub"|
        "summary"|
        "sup"|
        "table"|
        "tbody"|
        "td"|
        "template"|
        "textarea"|
        "tfoot"|
        "th"|
        "thead"|
        "time"|
        "title"|
        "tr"|
        "track"|
        "u"|
        "ul"|
        "var"|
        "video"|
        "wbr";
    
    
    type HTMLElementDeprecatedTagNameTypes =
        "acronym"|
        "applet"|
        "basefont"|
        "bgsound"|
        "big"|
        "blink"|
        "center"|
        "dir"|
        "font"|
        "frame"|
        "frameset"|
        "isindex"|
        "keygen"|
        "listing"|
        "marquee"|
        "menuitem"|
        "multicol"|
        "nextid"|
        "nobr"|
        "noembed"|
        "noframes"|
        "param"|
        "plaintext"|
        "rb"|
        "rtc"|
        "spacer"|
        "strike"|
        "tt"|
        "xmp";
    
    
    type SVGElementTagNameTypes =
        "a"|
        "animate"|
        "animateMotion"|
        "animateTransform"|
        "circle"|
        "clipPath"|
        "defs"|
        "desc"|
        "ellipse"|
        "feBlend"|
        "feColorMatrix"|
        "feComponentTransfer"|
        "feComposite"|
        "feConvolveMatrix"|
        "feDiffuseLighting"|
        "feDisplacementMap"|
        "feDistantLight"|
        "feDropShadow"|
        "feFlood"|
        "feFuncA"|
        "feFuncB"|
        "feFuncG"|
        "feFuncR"|
        "feGaussianBlur"|
        "feImage"|
        "feMerge"|
        "feMergeNode"|
        "feMorphology"|
        "feOffset"|
        "fePointLight"|
        "feSpecularLighting"|
        "feSpotLight"|
        "feTile"|
        "feTurbulence"|
        "filter"|
        "foreignObject"|
        "g"|
        "image"|
        "line"|
        "linearGradient"|
        "marker"|
        "mask"|
        "metadata"|
        "mpath"|
        "path"|
        "pattern"|
        "polygon"|
        "polyline"|
        "radialGradient"|
        "rect"|
        "script"|
        "set"|
        "stop"|
        "style"|
        "svg"|
        "switch"|
        "symbol"|
        "text"|
        "textPath"|
        "title"|
        "tspan"|
        "use"|
        "view";
    
        export {};