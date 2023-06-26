var markupPattern =
    /<!--[\s\S]*?-->|<(\/|\s?)\s*([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/g,//(\s*(\/>|>))  (?!(\=>|>\=))
  attributePattern =
   // /((\$[a-zA-Z0-9-_:()[\]#]+)|([a-zA-Z()[\]#][a-zA-Z0-9-_:()[\]#]*))(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|(?:{[^]*?})(?=(\s*\/>))|((\s*>)(?!\=))|(?=(\s+\S+\s*=))|\S+))?/gi,
   /((\$[a-zA-Z0-9-_:()[\]#]+)|([a-zA-Z()[\]#][a-zA-Z0-9-_:()[\]#]*))(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|(?:{[^]*?})(?=((\s+\S+\s*=)|(\s*(\/>|>))))|\S+))?/gi,
    templatePattern =
    /<>\s*{(\S|\s)*?(?!(?:'[^']*')|(?:"[^"]*")|(?:`[^`]*`))\s*}\s*<\/>/g,
  festPattern = /<view>(\S|\s)*?<\/view>/g,
  themePattern = /\/\/<theme>(.*?)\/\/<\/theme>/gs;
/**
 *
 * @param {string} text
 */
function excapeRegexChars(text) {
  return text.replace(/[\\[.*+(?{^$|})]/g, "\\$&");
}
/**
 *
 * @param {string} html
 */
function removeWhiteSpace(html) {
  return html.replace(/\s(.*?)\s*(?=[^\s])/g, " ");
}
/**
 *
 * @param {string} html
 */
function getHtml(html) {
  return html.match(markupPattern);
}
/**
 *
 * @param {string} html
 */
function getTemplateLiterals(html) {
  return html.match(templatePattern);
}
const stringRand = `STRING__${Math.random()}__`
const stringsPattern = /('[^']*')|("[^"]*")|(`[^`]*`)/gs;
/**
 *
 * @param {string} html
 */
function getAttributes(html) {
  let str = html.match(stringsPattern);
  if (str) {
    for (var i = 0; i < str.length; i++){
      html = html.replace(str[i], `${stringRand}${i}${stringRand}`);
    }
    let attris = html.match(attributePattern),match,j,idx;
    if (attris) {
      let regex = RegExp(`${stringRand}[0-9]${stringRand}`, "gs");
      let regexSingle = RegExp(`${stringRand}[0-9]${stringRand}`);
      for (var i = 0; i < attris.length; i++){
        match = attris[i].match(regex);
        if (match) {
          for (j = 0; j < match.length; j++){
            idx = match[j].replace(stringRand, '').replace(stringRand, '');
            attris[i] = attris[i].replace(regexSingle, str[idx]);
          }
        }
      }
    }
    return attris;
  }
  
  return html.match(attributePattern);
}
/**
 *
 * @param {string} html
 */
function getFestComponents(html) {
  return html.match(festPattern);
}
/**
 *
 * @param {string} html
 */
function getThemes(html) {
  return html.match(themePattern);
}
/**
 *
 * @param {string} html
 */
function parse(html) {
  var HTMLTags,
    NODES = [],
    JScripts = getTemplateLiterals(html),
    i,
    JS_ID,
    TEXTS,
    RESULT_STRING = "return (\n";
  //Assign IDs to all JavaScript templates
  if (JScripts) {
    for (i = 0; i < JScripts.length; i++) {
      JS_ID = `${REPLACERS._templateStart}${i}${Math.random()}${
        REPLACERS._templateEnd
      }`;
      html = html.replace(JScripts[i], JS_ID);
      JScripts[i] = { id: JS_ID, value: JScripts[i] };
    }
  } else {
    JScripts = [];
  }
  html = removeWhiteSpace(html);
  HTMLTags = getHtml(html);
  NODES.push(getAttributes(HTMLTags[0]));
  for (i = 0; i < HTMLTags.length - 1; i++) {
    TEXTS = html.match(
      RegExp(
        `${excapeRegexChars(HTMLTags[i])}(.*?)${excapeRegexChars(
          HTMLTags[i + 1]
        )}`
      )
    )[1];
    html = html.replace(HTMLTags[i], "");
    if (TEXTS.length > 0 && /[^ ]/.test(TEXTS)) {
      NODES.push(TEXTS);
    }
    NODES.push(getAttributes(HTMLTags[i + 1]));
  }
  var currentNode = createNode(NODES[0]),
    currentOpenedNodes = [currentNode.object],
    nextNode,
    j = 0,
    k = 0,
    l;
  for (i = 1; i < NODES.length - 1; i++) {
    if (typeof NODES[i] !== "string") {
      j++;
      HTMLTags[j] = HTMLTags[j].trim();
      if (HTMLTags[j].startsWith("</")) {
        //Closing tag
        if (
          currentOpenedNodes[currentOpenedNodes.length - 1].tag == NODES[i][0]
        ) {
          currentOpenedNodes.pop();
        } else {
          //The html is malformed... Can throw some errors here
        }
      } else if (HTMLTags[j].endsWith("/>")) {
        //Self closing
        currentOpenedNodes[currentOpenedNodes.length - 1].children.push(
          createNode(NODES[i]).object
        );
      } else {
        //Openning tag
        nextNode = createNode(NODES[i]).object;
        currentOpenedNodes[currentOpenedNodes.length - 1].children.push(
          nextNode
        );
        if (!selfClosingElements[NODES[i][0]]) {
          currentOpenedNodes.push(nextNode);
        }
      }
    } else {
      //Text nodes
      while (k < JScripts.length && NODES[i].indexOf(JScripts[k].id) >= 0) {
        NODES[i] = NODES[i].split(JScripts[k].id);

        if (NODES[i].length == 1) {
          currentOpenedNodes[currentOpenedNodes.length - 1].children.push({
            JS: true,
            value: `function(args,state)${JScripts[k].value
              .replace(/<>\s*{/, "{return (")
              .replace(/(}\s*<\/>)$/, ")}")}`,
          });
        } else {
          if (NODES[i][0].length > 0) {
            if (/[^ ]/.test(NODES[i][0])) {
              l =
                currentOpenedNodes[currentOpenedNodes.length - 1].children
                  .length;
              if (
                typeof currentOpenedNodes[currentOpenedNodes.length - 1]
                  .children[l - 1] === "string"
              ) {
                currentOpenedNodes[currentOpenedNodes.length - 1].children[
                  l - 1
                ] += NODES[i][0];
              } else {
                currentOpenedNodes[currentOpenedNodes.length - 1].children.push(
                  NODES[i][0]
                );
              }
            }
            currentOpenedNodes[currentOpenedNodes.length - 1].children.push({
              JS: true,
              value: `function(args,state)${JScripts[k].value
                .replace(/<>\s*{/, "{return (")
                .replace(/(}\s*<\/>)$/, ")}")}`,
            });
          } else {
            currentOpenedNodes[currentOpenedNodes.length - 1].children.push({
              JS: true,
              value: `function(args,state)${JScripts[k].value
                .replace(/<>\s*{/, "{return (")
                .replace(/(}\s*<\/>)$/, ")}")}`,
            });
          }
        }
        NODES[i].shift();
        NODES[i] = NODES[i].join("");
        k++;
      }
      if (NODES[i].length > 0) {
        if (/[^ ]/.test(NODES[i])) {
          l = currentOpenedNodes[currentOpenedNodes.length - 1].children.length;
          if (
            typeof currentOpenedNodes[currentOpenedNodes.length - 1].children[
              l - 1
            ] === "string"
          ) {
            currentOpenedNodes[currentOpenedNodes.length - 1].children[l - 1] +=
              NODES[i];
          } else {
            currentOpenedNodes[currentOpenedNodes.length - 1].children.push(
              NODES[i]
            );
          }
        }
      }
    }
  }
  return currentOpenedNodes.pop();
}
var attr_Rep = `ATTR__${Math.random()}__ATTR`,
  child_Rep = `CHILD__${Math.random()}__CHILD`;
/**
 *
 *
 * @param {string[]} nodeInfo
 */
function createNode(nodeInfo) {
  var node = {
      tag: nodeInfo[0],
      attr: {},
      children: [],
    },
    i;
  if (nodeInfo.length > 1) {
    at = true;
    for (i = 1; i < nodeInfo.length; i++) {
      nodeInfo[i] = nodeInfo[i].split("=");
      if (nodeInfo[i].length == 1) {
        node.attr[nodeInfo[i][0]] = true
      } else {
        node.attr[nodeInfo[i][0]] = (nodeInfo[i].shift(),nodeInfo[i].join("="))
      }
      
     //console.log(node);
      // nodeInfo[i].length == 1
      //   ? (node.attr[nodeInfo[i][0]] = true)
      //   // : nodeInfo[i].length == 2
      //   // ? (node.attr[nodeInfo[i][0]] = /^(\s*{)(.*?)(\s*})$/.test(
      //   //     nodeInfo[i][1]
      //   //   )
      //   //     ? nodeInfo[i][1] //nodeInfo[i][1].replace(/^(\s*{)/, '$&"').replace(/(\s*})$/, '$&"')
      //   //     : nodeInfo[i][1])
      //   : null;
    }
  }
  return { string: "", object: node };
}

function toDistinctObject(array) {
  const keyHolder = {};
  var i = 0;
  while (i < array.length) {
    keyHolder[array[i]] = 1;
    i++;
  }
  return keyHolder;
}

/**
 *
 * @param {{tag:string,attr:{},children:[]}} node
 * @param {{value:string}} valueObj
 * @param { ExtendedBases} eBase
 */
function buildString(node, isSVGNamespaceElement, depth, kNdN, eBase, attrSetter) {
  var s1 = "",
    s2 = "";
  if (node.head) {
    s1 = "HoneyBee.create(()=>`";
    //s2 = "',this)";
    depth = [];
    kNdN = {
      KN: "{",
      DN: "[",
    };
    eBase = new ExtendedBases();
    attrSetter = { attr: "", keys: "{", dynNodes:"{",dynamic:"{",dynCount:0,nonKeyed:1,depAttr:"{"};
  }
  if (typeof node.attr.key == "string") {
    var keyname = node.attr.key.split('"')[1]//.replace('"', "").trim();
    var isKeyed = !!keyname.length && /^[^0-9]/.test(keyname);
  }

  isSVGNamespaceElement =
    isSVGNamespaceElement || node.tag.toLocaleLowerCase() == "svg";
  //node.tag = node.tag=="image"?"img":node.tag;
  var atrris = Object.keys(node.attr);
  var nodeString = `<${node.tag}${atrris.length ? `${attr_Rep}` : ""}${
      selfClosingElements[node.tag] ? "/>" : `>${child_Rep}</${node.tag}>`
    }`,
   
    //${isKeyed ? JSON.stringify(depth) : ""})
    ch = false,
    at = false,
    i;
  var stylesObject = {};
  var classObject = {};
  var htmlAttris = "{";
  var itemIndex;
  if (atrris.length > 0) {
    at = true;
    //Find style and class attributes and push them at the end of the attributes array
    itemIndex = atrris.indexOf("style");
    if (itemIndex > -1) {
      const isDynamic = node.attr.style.startsWith("{") && node.attr.style.endsWith("}");
      if (!isDynamic) {
        node.attr.style = node.attr.style
        .replace(/.$/, "")
        .replace('"', "")
        .trim();
        var styleString = node.attr.style;
     
        node.attr.style = `${styleString}`;
      } else {
        node.attr.Style = node.attr.style;
        node.attr.style = '';
        delete node.attr.style;
        atrris[itemIndex] = 'Style';
      }
      
    }

    let length;
    if (typeof node.attr.class == "string" && (length = node.attr.class.length) > 3) {
      
      const isDynamic = node.attr.class.startsWith("{")&&node.attr.class.endsWith("}")
      if (!isDynamic) {
        node.attr.class = node.attr.class.slice(1).split('"')[0].trim()
        var classString = Array.from(new Set(node.attr.class.split(" "))).join(" ");
          node.attr.class = `${classString}`;
      } else {
        node.attr.Class = node.attr.class;
        node.attr.class = '';
        delete node.attr.class;
        itemIndex = atrris.indexOf("class");
        atrris[itemIndex] = 'Class';
      }
    } else {
      node.attr.class = isKeyed ? { value: null } : "";
      delete node.attr.class;
    }
    
    let ev = "$events:{", evc = "evc:{",nkf=false,m;
    
    keyname = JSON.stringify(isKeyed ? keyname : ++attrSetter.nonKeyed);
    let k, v, kf = false;
    // attrSetter.attr = `${attrSetter.attr}\n${m}=${getNode(depth)};`;
    for (i = 0; i < atrris.length; i++) {
      k = atrris[i];
      
      if (typeof node.attr[k] == "string") {
        v = node.attr[k] = node.attr[k].replace(/(">)$/,'"');
        if (v.startsWith("{") && v.endsWith("}")) {
          if (!kf) {
            kf = true;
            m = `_${eBase.getUniqueVar()}`
            attrSetter.attr = `${attrSetter.attr}\nlet ${m}=${getNode(depth)},$${m};`;
          }
          v = v.replace("{", "").replace(/}$/, "");
          if (/^(on)[A-Z]\S+/.test(k)) {//Events
            if (!nkf) {
              nkf = true;
              attrSetter.keys = `${attrSetter.keys}${keyname}:{node:${m},`
            }
            k = k.replace(/on/, "").toLowerCase();
            evc = `${evc}${k}:$${m},`
            ev = `${ev}${k}:${v},`
            attrSetter.attr =
              `${attrSetter.attr}\n$${m}=_$ev.bind({key:${keyname},ev:'${k}',id:_$id})
            ${m}.addEventListener('${k}',$${m},false)`;
            //attrSetter.nonKeyed++;
          } else {
            if (k.startsWith("$")) {//Has dependencies
              k = k.replace(/^./, "");
              if (!nkf) {
                nkf = true;
                attrSetter.keys = `${attrSetter.keys}${keyname}:{node:${m},`
              }
              if (/^(on)[A-Z]\S+/.test(k)) {//Events
                k = k.replace(/on/, "").toLowerCase();
                evc = `${evc}${k}:$${m},`
                ev = `${ev}${k}:function(e,t){let state=t.state;let a=${v};(a=a.value)&&a.apply(this,[e,t])},`
                attrSetter.attr =
                  `${attrSetter.attr}\n$${m}=_$ev.bind({key:${keyname},ev:'${k}',id:_$id})
                ${m}.addEventListener('${k}',$${m},false);`;

                //attrSetter.attr = `${attrSetter.attr}\n_$fn=_$dp['${attrSetter.nonKeyed}${i}'];_$fn.apply(this,[${m},this.state,_$set,_$fn])`;
                // attrSetter.depAttr = `${attrSetter.depAttr}'${attrSetter.nonKeyed}${i}':` +
                //   `function(el,state,$in,set,fn){let a=${v};this[$in].keyed['${attrSetter.nonKeyed}']['${k}'] = a.value;` +
                //   `if(set){fn.set(a.$dep||[])}},`
                //attrSetter.nonKeyed++;
              } else {
                let settableK = k = k.charAt(0).toLowerCase() + k.slice(1);
                settableK = settableK.replace(/[A-Z]/g, '-\\$&').toLowerCase();
                let sep = { class: " ", style: ';' }
                let key = keyname;//.split('"');
                // key = key.slice(1, key.length - 1).join('"');
                attrSetter.attr = `${attrSetter.attr}\n_$fn=_$dp['${key}${i}'];_$fn.apply(this,[${m},state,_$set,_$fn,${keyname}])`;
                attrSetter.depAttr = `${attrSetter.depAttr}'${key}${i}':` +
                  `function(el,state,set,fn,nme){let a=${v};el.setAttribute('${settableK}',\`${node.attr[k] ? node.attr[k] + `${sep[k] || ''}` : ''}\${a.value}\`);` +
                  `if(set){fn.key=nme;fn.$dep=a.$dep||[]}},`
                if (["style", "class"].includes(k)) {
                  node.attr[k] = undefined;
                  delete node.attr[k];
                }
              }
            } else {
              let settableK = k = k.charAt(0).toLowerCase() + k.slice(1);
              settableK = settableK.replace(/[A-Z]/g, '-\\$&').toLowerCase();
              const isCS = ["style", "class"].includes(k);
              let sep = { class: " ", style: ';' }
              let key = keyname;//.split('"');
              // key = key.slice(1, key.length - 1).join('"');
              attrSetter.attr = `${attrSetter.attr}\n_$fn=_$dp['${key}${i}'];_$fn.apply(this,[${m},state,_$set,_$fn,${keyname}])`;
              attrSetter.depAttr = `${attrSetter.depAttr}'${key}${i}':` +
                `function(el,state,set,fn,nme){let a=${v};el.setAttribute('${settableK}',\`${isCS&&node.attr[k] ? node.attr[k] + `${sep[k] || ''}` : ''}\${a}\`);` +
                `if(set){fn.key=nme;fn.$dep=[]}},`
              if (isCS) {
                node.attr[k] = undefined;
                delete node.attr[k];
              }
            }
            
          }
        } else {
          if (!["style", "class"].includes(k)) {
            let atrrkey = atrris[i];
            let settableKey = atrrkey.charAt(0).toLowerCase() + atrrkey.slice(1);
            settableKey = settableKey.replace(/[A-Z]/g, '-\\$&').toLowerCase();
            nodeString = nodeString.replace(
              `${attr_Rep}`,
              ` ${settableKey}=${node.attr[atrrkey]}${attr_Rep}`
            );
          }
        }
        
      } else {
        let atrrkey = atrris[i];
        let settableKey = atrrkey.charAt(0).toLowerCase() + atrrkey.slice(1);
        settableKey = settableKey.replace(/[A-Z]/g, '-\\$&').toLowerCase();
        nodeString = nodeString.replace(
          `${attr_Rep}`,
          ` ${settableKey}${attr_Rep}`
        );
      }
    }
    if (node.attr.style) {
      nodeString = nodeString.replace(
        `${attr_Rep}`,
        ` style="${node.attr.style}"${attr_Rep}`
      );
    }
    if (node.attr.class) {
      nodeString = nodeString.replace(
        `${attr_Rep}`,
        ` class="${node.attr.class}"${attr_Rep}`
      );
    }
    
    if (nkf) {
      attrSetter.keys = `${attrSetter.keys}${ev}},${evc}}},`;
      //attrSetter.nonKeyed++;
    }
  }
  htmlAttris += "}";
  nodeString = nodeString.replace(`${attr_Rep}`, "");

  if (node.children.length > 0) {
    ch = true;
    let ch_l = node.children.length ,m;
    for (i = 0; i < ch_l; i++) {
      if (typeof node.children[i] === "string") {
        //Text nodes
        nodeString = nodeString.replace(
          child_Rep,
          `${node.children[i]}${child_Rep}`
        );
      } else {
        //dynamic node
        if (node.children[i].JS) {
          nodeString = nodeString.replace(
            child_Rep,
            `${getDN_Replacer(node.tag)}${child_Rep}`
          );
          attrSetter.dynNodes = `${attrSetter.dynNodes}'${attrSetter.dynCount}':${getNode([...depth, i],ch_l)},`
          attrSetter.dynamic = `${attrSetter.dynamic}'${attrSetter.dynCount}':${node.children[i].value},`
          attrSetter.dynCount++;
        } else {
          //A static element
          nodeString = nodeString.replace(
            child_Rep,
            `${buildString(
              node.children[i],
              isSVGNamespaceElement,
              [...depth, i],
              kNdN,eBase,attrSetter
            )}${child_Rep}`
          );
        }
      }
    }
  }
  if (node.head) {
    s2 = `\`,\nfunction(args,_$,_$ev,_$id,_$dp,_$set){\nlet state = this.state,_$fn;${attrSetter.attr}\n`
      + `return [${attrSetter.keys}}]},`
      + `${attrSetter.dynamic}length:${attrSetter.dynCount}},\n${attrSetter.depAttr}},function(_$){return ${attrSetter.dynNodes}}}, this)`;
   // s2+=`,\n${attrSetter.dynamic}length:${attrSetter.dynCount}},this)`
  }
  return s1 + nodeString.replace(`${child_Rep}`, "") + s2;
}

let Ebase = undefined;
/**
 *
 * @param {{tag:string,attr:{},children:[]}} node
 * @param {{value:string}} valueObj
 * @param { ExtendedBases} eBase
 */
function buildServerString(node,tilt) {
   var s1 = "",
    s2 = "";
  var independentId;
   if (node.head) {
     s1 = "function(args,state,Component,Node){return [`";
     tilt = {
       opened:true
     }
     if (!Ebase) {
       Ebase = new ExtendedBases()
     }
     independentId = Ebase.getUniqueVar()
   }
   if (typeof node.attr.key == "string") {
     var keyname = node.attr.key.split('"')[1]
     var isKeyed = !!keyname.length && /^[^0-9]/.test(keyname);
   }
   var atrris = Object.keys(node.attr);
   var nodeString = `<${node.tag}${node.head?` \${Component.isIndependent?\`bee-I="\${Node.id='${independentId}'}" bee-path=\${JSON.stringify(Component.pathname)} bee-N=\${JSON.stringify(Component.name)}\`:''}`:''}${atrris.length ? `${attr_Rep}` : ""}`,
     ch = false,
     at = false,
     i;
 
   var stylesObject = {};
   var classObject = {};
   var htmlAttris = "{";
   var itemIndex;
   if (atrris.length > 0) {
     at = true;
     //Find style and class attributes and push them at the end of the attributes array
     itemIndex = atrris.indexOf("style");
     if (itemIndex > -1) {
       //atrris.splice(itemIndex, 1);
       node.attr.style = node.attr.style
         .replace(/.$/, "")
         .replace('"', "")
         .trim();
       var styleString = node.attr.style;
       node.attr.style = `${styleString}`;
     }
     let length;
     if (typeof node.attr.class == "string" && (length = node.attr.class.length) > 3) {
       var classString='';
       const isDynamic = node.attr.class.startsWith("{") && node.attr.class.endsWith("}");
       if (!isDynamic) {
        if (node.attr.class.startsWith('"')) {
          node.attr.class = node.attr.class.slice(1).split('"')[0].trim();
        } else {
          node.attr.class = node.attr.class.trim();
        }
        classString = Array.from(new Set(node.attr.class.split(" "))).join(" ");
       } else {
         node.attr.Class = node.attr.class;
       }
       
       node.attr.class = `${classString}${node.head?`\${Component.isIndependent?\` bee-\${Component.parentId}\`:''}`:''}`;
     } else {
       if (!node.head) {
        node.attr.class =  "";
        delete node.attr.class;
       } else {
         node.attr.class = `\${Component.isIndependent?\`bee-\${Component.parentId}\`:''}`;
       }
       
     }
     
     if (node.attr.Class) {
      node.attr.Class = node.attr.Class.replace("{", "").replace(/}$/, "");
       node.attr.class = (node.attr.class || "") + " ${" + node.attr.Class + "}"
       delete node.attr.Class;
     }
     if (node.attr.Style) {
      node.attr.Style = node.attr.Style.replace("{", "").replace(/}$/, "");
       node.attr.style = (node.attr.style || "") + ";${" + node.attr.Style + "}"
       delete node.attr.Style;
     }
     if (node.attr.$class) {
      node.attr.$class = node.attr.$class.replace("{", "").replace(/}$/, "");
       node.attr.class = (node.attr.class || "") + " ${" + node.attr.$class + ".value}"
       delete node.attr.$class;
     }
     if (node.attr.$style) {
      node.attr.$style = node.attr.$style.replace("{", "").replace(/}$/, "");
       node.attr.style = (node.attr.style || "") + ";${" + node.attr.$style + ".value}"
       delete node.attr.$style;
     }
     atrris = Object.keys(node.attr);
     for (i = 0; i < atrris.length; i++) {
       let k, v, kf = false;
       k = atrris[i];
       v = node.attr[k];
       if (typeof v == "string") {
         if (v.startsWith("{") && v.endsWith("}")) {
           v = v.replace("{", "").replace(/}$/, "");
           if (/on[A-Z]\S+/.test(k)) {
             k = k.replace(/on/, "");
             k = k.toLowerCase();
             //k = k.charAt(0).toLowerCase() + k.replace(/^./, "");
             if (k == "load") {
               
             } else {
              nodeString = nodeString.replace(
                `${attr_Rep}`,
                ` on${k}="HoneyBee.select(this,'${k}')"${attr_Rep}`
              );
             }
           } else {
             if (k.startsWith("$")) {
               k = k.replace("$", "");
               v = v+".value"
             }
             k = k.charAt(0).toLowerCase() + k.slice(1);
             k = k.replace(/[A-Z]/g, '-\\$&').toLowerCase();
             nodeString = nodeString.replace(
               `${attr_Rep}`,
               ` ${k}="\${${v}}"${attr_Rep}`
             );
             
           }
         } else {
          k = k.charAt(0).toLowerCase() + k.slice(1);
          k = k.replace(/[A-Z]/g, '-\\$&').toLowerCase();
          nodeString = nodeString.replace(
            `${attr_Rep}`,
            ` ${k}=${["class","style"].includes(k)?`"${v}"`:v}${attr_Rep}`
          );
        }
       } else {
         k = atrris[i];
        k = k.charAt(0).toLowerCase() + k.slice(1);
        k = k.replace(/[A-Z]/g, '-\\$&').toLowerCase();
        nodeString = nodeString.replace(
          `${attr_Rep}`,
          ` ${k}${attr_Rep}`
        );
      }
     }

   }
 
  nodeString = nodeString.replace(`${attr_Rep}`, "");
  nodeString += `${selfClosingElements[node.tag] ? "/>" : ">"}`;
  if (!selfClosingElements[node.tag]) {
    if (node.children.length > 0&&!selfClosingElements[node.tag]) {
      nodeString += `${child_Rep}`
      ch = true;
      let ch_l = node.children.length;
      let tilter;
      for (i = 0; i < ch_l; i++) {
        tilter = "";
        if (typeof node.children[i] === "string") {
          if (!tilt.opened) {
            tilter = ",`";
            tilt.opened = true;
          }
          //Text nodes
          nodeString = nodeString.replace(
            child_Rep,
            `${tilter}${node.children[i]}${child_Rep}`
          );
        } else {
          
          //dynamic node
          if (node.children[i].JS) {
            if (tilt.opened) {
              tilter = "`,";
              tilt.opened = false;
            } else {
              tilter = ","
            }
            nodeString = nodeString.replace(
              child_Rep,
              `${tilter}${node.children[i].value}${child_Rep}`
            );
          } else {
            if (!tilt.opened) {
              tilter = ",`";
              tilt.opened = true;
            }
            //A static element
            nodeString = nodeString.replace(
              child_Rep,
              `${tilter}${buildServerString(
                node.children[i],tilt
              )}${child_Rep}`
            );
          }
        }
      }
      if (tilt.opened) {
        nodeString += `</${node.tag}>`;
      } else {
        nodeString += `,\`</${node.tag}>`
        tilt.opened = true;
      }
    } else {
      nodeString += `</${node.tag}>`
    }
  }
  
  
   if (node.head) {
     s2 = `${tilt.opened?"`":""}]}`;
   }
  return s1 + nodeString.replace(`${child_Rep}`, "") + s2;
 }




function getNode(pos,total) {
  var s = "_$", l = pos.length, last = total ? total - 1 : NaN;
  for (var i = 0; i < l; i++){
    switch (pos[i]) {
      case 0:
        s+=".firstChild"
        break;
      case last:
        s += ".lastChild"
        break;
      default:
        s+=`.childNodes[${pos[i]}]`
        break;
    }
  }
  return s;
}

function getDN_Replacer(el) {
  switch (el.toLowerCase()) {
    case "table":
      return "<tbody></tbody>";
    case "tbody":
    case "thead":
    case "tfoot":
      return "<tr></tr>";
    case "colgroup":
      return "<col></col>";
    case "tr":
      return "<td></td>";
    case "select":
      return "<option></option>";
    case "style":
      return '.x--x{}'
    default:
      return "<brk></brk>";
  }
}

function escape(str) {
  return (str + "")
    .replace(/&/gs, "&amp;")
    .replace(/</gs, "&lt;")
    .replace(/>/gs, "&gt;")
    .replace(/"/gs, "&quot;")
    .replace(/'/gs, "&#39;")
    .replace(/`/gs, "&#96;");
}
class ExtendedBases {
  CSSVARCHARS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  CSSCURSOR1;
  CSSCURSOR2;
  CSSCURSOR3;
  CSSCURSOR4;
  CSSCURSOR5;
  VARLENGTH;
  TOTAL;
  constructor() {
    this.CSSCURSOR1 = -1;
    this.CSSCURSOR2 = 0;
    this.CSSCURSOR3 = -1;
    this.CSSCURSOR4 = -1;
    this.CSSCURSOR5 = -1;
    this.VARLENGTH = 0;
    this.TOTAL = 0;
  }
  getUniqueVar() {
    switch (this.VARLENGTH) {
      case 0:
        if (this.CSSCURSOR1 == 61) {
          this.VARLENGTH++;
        }
        return this.CSSCURSOR1++, `${this.CSSVARCHARS[this.CSSCURSOR1]}`;
      case 1:
        if (this.CSSCURSOR2 == 61 && this.CSSCURSOR3 == 61) {
          this.VARLENGTH++;
          this.CSSCURSOR2 = 0;
          this.CSSCURSOR3 = 0;
          this.CSSCURSOR4 = -1;
        } else if (this.CSSCURSOR3 == 61) {
          this.CSSCURSOR2++;
          this.CSSCURSOR3 = -1;
        }
        break;
      case 2:
        if (
          this.CSSCURSOR2 == 61 &&
          this.CSSCURSOR3 == 61 &&
          this.CSSCURSOR4 == 61
        ) {
          this.VARLENGTH++;
          this.CSSCURSOR2 = 0;
          this.CSSCURSOR3 = 0;
          this.CSSCURSOR4 = 0;
          this.CSSCURSOR5 = -1;
        } else if (this.CSSCURSOR3 == 61 && this.CSSCURSOR4 == 61) {
          this.CSSCURSOR2++;
          this.CSSCURSOR3 = 0;
          this.CSSCURSOR4 = -1;
        } else if (this.CSSCURSOR4 == 61) {
          this.CSSCURSOR3++;
          this.CSSCURSOR4 = -1;
        }
        break;
      case 3:
        if (
          this.CSSCURSOR2 == 61 &&
          this.CSSCURSOR3 == 61 &&
          this.CSSCURSOR4 == 61 &&
          this.CSSCURSOR5 == 61
        ) {
          this.VARLENGTH++;
          this.CSSCURSOR2 = -1;
          this.CSSCURSOR3 = -1;
          this.CSSCURSOR4 = -1;
          this.CSSCURSOR5 = -1; //add sixth variable
        } else if (
          this.CSSCURSOR3 == 61 &&
          this.CSSCURSOR4 == 61 &&
          this.CSSCURSOR5 == 61
        ) {
          this.CSSCURSOR2++;
          this.CSSCURSOR3 = 0;
          this.CSSCURSOR4 = 0;
          this.CSSCURSOR5 = -1;
        } else if (this.CSSCURSOR4 == 61 && this.CSSCURSOR5 == 61) {
          this.CSSCURSOR3++;
          this.CSSCURSOR4 = 0;
          this.CSSCURSOR5 = -1;
        } else if (this.CSSCURSOR5 == 61) {
          this.CSSCURSOR4++;
          this.CSSCURSOR5 = -1;
        }
        break;
      default:
        break;
    }
    switch (this.VARLENGTH) {
      case 1: //return two chars. Total Length: (3906-62)
        return (
          this.CSSCURSOR3++,
          `${this.CSSVARCHARS[this.CSSCURSOR2]}${
            this.CSSVARCHARS[this.CSSCURSOR3]
          }`
        );
      case 2: //return three chars. Total Length: (242234-3906)
        return (
          this.CSSCURSOR4++,
          `${this.CSSVARCHARS[this.CSSCURSOR2]}${
            this.CSSVARCHARS[this.CSSCURSOR3]
          }${this.CSSVARCHARS[CSSCURSOR4]}`
        );
      case 3: //return four chars. Total Length: (Over 13 million)
        return (
          this.CSSCURSOR5++,
          `${this.CSSVARCHARS[this.CSSCURSOR2]}${
            this.CSSVARCHARS[this.CSSCURSOR3]
          }${this.CSSVARCHARS[CSSCURSOR4]}${this.CSSVARCHARS[CSSCURSOR5]}`
        );
      default:
        //We wouldn't need up to this point.
        //Crash if only we are here--> That's too much geek;
        throw new Error(
          "You have more than 14 million distinct css rules." +
            "Try to break your css file into two or more by parsing some of your HTML files separately."
        );
    }
    this.TOTAL++;
  }
}

var CSSOBJECT = {},
  STYLETRACE = {},
  STYLESHEET = "";
/**
 *
 * @param {string} styles
 */
function cssBuilder(styles) {
  styles = styles.replace('"', "").replace(/.$/, "").split(";");
  var i,
    traceValue,
    classNames = [];
  for (i = 0; i < styles.length; i++) {
    styles[i] = styles[i].split(":"); //Must be in form: [style-atribute:value]
    if (styles[i].length == 2) {
      //well formed style value
      traceValue = `${styles[i][0]}:${styles[i][1]}`.replace(/\s+/g, " ");
      if (!STYLETRACE[traceValue]) {
        STYLETRACE[traceValue] = {
          cssVariable: getCssVar(),
        };
        CSSOBJECT[
          STYLETRACE[traceValue].cssVariable
        ] = `.${STYLETRACE[traceValue].cssVariable}{${traceValue}}`;
        STYLESHEET += `.${STYLETRACE[traceValue].cssVariable}{${traceValue}}`;
      }
      if (classNames.indexOf(STYLETRACE[traceValue].cssVariable) < 0) {
        //ignore duplicate class names
        classNames.push(STYLETRACE[traceValue].cssVariable);
      }
    }
  }
  return classNames;
}

var CSSCONSTANT = "rs-",
  eBase = new ExtendedBases();
function getCssVar() {
  return `${CSSCONSTANT}${eBase.getUniqueVar()}`;
}
function prefix(p) {
  CSSCONSTANT = typeof p == "string" ? p : CSSCONSTANT;
  CSSCONSTANT += "-";
}

const REPLACERS = {
    _templateStart: "JS__",
    _templateEnd: "__JS",
  },
  selfClosingElements = {
    area: true,
    AREA: true,
    base: true,
    BASE: true,
    br: true,
    BR: true,
    col: true,
    COL: true,
    hr: true,
    HR: true,
    img: true,
    IMG: true,
    input: true,
    INPUT: true,
    link: true,
    LINK: true,
    meta: true,
    META: true,
    source: true,
    SOURCE: true,
    embed: true,
    EMBED: true,
    param: true,
    PARAM: true,
    track: true,
    TRACK: true,
    wbr: true,
    WBR: true,
    image: true,
    IMAGE: true,
  };
function getCSSObject() {
  return CSSOBJECT;
}
function getStyleSheet() {
  return STYLESHEET;
}
/**
 * @param {string} html
 */
function translateThemes(html) {
  var themes = getThemes(html),
    parsedTheme = "",
    head;
  if (themes) {
    for (var i = 0; i < themes.length; i++) {
      parsedTheme = parseTheme(themes[i]);
      head = ("\n" + themes[i]).match(/\n(.*?)createTheme\s*\(\s*\S+\s*,/gs)[0];
      head = head.replace(/\/\/<theme>(.*?)\n/gs, "");
      html = html.replace(themes[i], head + parsedTheme + ");");
    }
  }
  return html;
}
/**
 *
 * @param {string} theme
 */
function parseTheme(theme) {
  theme = "\n" + theme + "\n";
  theme = theme.replace(/\n(.*?)createTheme\s*\(\s*\S+\s*,/gs, "");
  theme = theme.replace(/(\/\/<\/theme>(.*?)\s*\n)$/, "");
  theme = (theme + "\n").replace(/(\)(.*?)\s*\n)$/, "");
  return convertTheme(theme);
}
function convertTheme(theme) {
  var themeObj;
  try {
    themeObj = new Function("return (" + theme + ")");
    themeObj = themeObj();
    if (typeof themeObj != "object" || null == themeObj) {
      throw new Error("");
    }
  } catch (error) {
    //Error message here
    throw error;
  }
  var classNames = Object.keys(themeObj);
  var style = "",
    classname;
  var styleRules, rulesKey, key;
  for (var i = 0; i < classNames.length; i++) {
    classname = classNames[i];
    style = `${style}.${classname}{`;
    styleRules = themeObj[classname];
    rulesKey = Object.keys(styleRules);
    for (j = 0; j < rulesKey.length; j++) {
      key = rulesKey[j];
      style = `${style}${key
        .replace(/[A-Z]/g, "-$&")
        .toLowerCase()}:\${${JSON.stringify(styleRules[key])}[t]};`;
    }
    style += "}";
  }
  var styleSheet = `function(t){return \`${style}\`}`;
  return styleSheet;
}
/**
 * @param {string} html
 */
function translate(html) {
  html = translateThemes(html);
  var fests = getFestComponents(html),
    i;
  var compiledFests = null;
  if (fests) {
    if (1||ssrMode) {
      var ssrHtml = html;
      for (i = 0; i < fests.length; i++) {
        compiledFests = parse(fests[i]);
        if (compiledFests.children.length == 1) {
          if (typeof compiledFests.children[0] !== "string") {
            if (!compiledFests.children[0].JS) {
              compiledFests.children[0].head = true;
              html = html
                .replace(fests[i], buildString(compiledFests.children[0]));
                //.replace(/\/\/==INTERNAL\s(.*?)\/\/INTERNAL\s/gs, "//");
              ssrHtml = ssrHtml
                .replace(fests[i], buildServerString(compiledFests.children[0]));
                //.replace(/\/\/==EXTERNAL\s(.*?)\/\/EXTERNAL\s/gs, "//");
            }
          }
        } else {
          //Throw some error here -- component must have one top-most parent apart from the '<view>...</view>'
        }
      }
    } else {
      for (i = 0; i < fests.length; i++) {
        compiledFests = parse(fests[i]);
        if (compiledFests.children.length == 1) {
          if (typeof compiledFests.children[0] !== "string") {
            if (!compiledFests.children[0].JS) {
              html = html
                .replace(fests[i], buildString(compiledFests.children[0]))
                .replace(/\/\/==INTERNAL\s(.*?)\/\/INTERNAL\s/gs, "//");
            }
          }
        } else {
          //Throw some error here -- component must have one top-most parent apart from the '<view>...</view>'
        }
      }
    }
  } else {
    var ssrHtml = html;
    // html = html.replace(/\/\/==INTERNAL\s(.*?)\/\/INTERNAL\s/gs, "//");
    // ssrHtml = ssrHtml.replace(/\/\/==EXTERNAL\s(.*?)\/\/EXTERNAL\s/gs, "//");
  }
  return ssrMode ? { ssrCode: ssrHtml, code: html } : { ssrCode: "", code: html } ;
}
var ssrMode = !false;
function ssr(b) {
  return;
  if (typeof b == "boolean") {
    ssrMode = b;
    return;
  }
  ssrMode = false;
}
/**
 *
 * @param {string} html
 */
function parseSSRHtml(html) {
  html = html.replace(/\/\/<.*?\/\/>/gs, "");
  var templates = html.match(/{{.*?}}/gs);
  var JSTemplates = [],
    i,
    count = 0;
  if (templates) {
    var jsValue = {
      value: "",
      replace: "",
    };
    for (i = 0; i < templates.length; i++) {
      jsValue.replace = `${REPLACERS._templateStart}${Math.random()}${
        REPLACERS._templateEnd
      }${i}`;
      jsValue.value = templates[i]
        .replace("{{", "${HTMLEscape(")
        .replace(/(}})$/, ")}");
      html = html.replace(templates[i], jsValue.replace);
      JSTemplates.push(jsValue);
      jsValue = {};
    }
    html = html.replace(/\s\s/gs, " ");

    for (i = 0; i < JSTemplates.length; i++) {
      html = html.replace(JSTemplates[i].replace, JSTemplates[i].value);
    }
  } else {
    html = html.replace(/\s\s/gs, " ");
  }
  return `module.exports = function(JSERVE,HTMLEscape,PAGEDATA,INSERTABLE){\nreturn \`${html
    .replace(/[ ][ ]/g, " ")
    .replace(/[ ][ ][ ]/g, " ")
    .replace(/[ ][ ]/g, " ")}\`;\n}`;
}
var oneSrcImages = "";
function imageSrc(v) {
  if (typeof v == "string" && v.length) {
    oneSrcImages = escape(v);
  }
}

module.exports = {
  translate,
  getCSSObject,
  getStyleSheet,
  prefix,
  ssr,
  parseSSRHtml,
  imageSrc,
};
