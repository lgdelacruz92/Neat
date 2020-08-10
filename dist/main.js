var neatty=function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),n.d(e,"Neat",(function(){return h})),n.d(e,"Node",(function(){return r})),n.d(e,"Connection",(function(){return i}));class o{constructor(t,e,n){if(void 0===t)throw Error("Value required: innovationNumber.");this.in=t,this.weight=e||0,this.expressed=n||!1,this.inNode=null,this.outNode=null}activate(){if(!this.inNode)throw Error("Value not defined: this.inNode.");if(!this.outNode)throw Error("Value not defined: this.outNode.");this.expressed&&(this.outNode.value+=this.inNode.value*this.weight)}copy(){const t=new o(this.in,this.weight,this.expressed);return t.inNode=this.inNode.copy(),t.outNode=this.outNode.copy(),t}}var i=o;class s{constructor(t){if(void 0===t)throw Error("Value required: identificationNumber.");this.id=t,this.value=0}copy(){return new s(this.id)}}var r=s;const u=(t,e)=>Math.random()*e+t;class d{constructor(t,e){if(!t)throw Error("Value required: inputNumber.");if(!e)throw Error("Value required: outputNumber.");this.inputNumber=t,this.outputNumber=e,this.inputNodeIds={},this.outputNodeIds={},this.nodeCurrentNumber=0,this.connectionCurrentNumber=0,this._initNodes(),this._initConnections()}copy(){const t=new d(this.inputNumber,this.outputNumber);return t.inputNodeIds=JSON.parse(JSON.stringify(this.inputNodeIds)),t.outputNodeIds=JSON.parse(JSON.stringify(this.outputNodeIds)),t.connections=this.connections.map(t=>t.copy()),this._fillNodesFromConnections(t),t}_fillNodesFromConnections(t){t.nodes=[];const e={};t.connections.forEach(n=>{e[n.inNode.id]||(t.nodes.push(n.inNode),e[n.inNode.id]=!0),e[n.outNode.id]||(t.nodes.push(n.outNode),e[n.outNode.id]=!0)}),t.nodes.sort((t,e)=>t.id-e.id)}_initConnections(){this.connections=[];for(let t=0;t<this.inputNumber;t++)for(let e=this.inputNumber;e<this.inputNumber+this.outputNumber;e++){const n=this.nodes[e],o=this.nodes[t],s=this.connectionCurrentNumber,r=new i(s,u(-2,2),!0);r.inNode=o,r.outNode=n,this.connections.push(r),this.connectionCurrentNumber+=1}}_initNodes(){this.nodes=[];for(let t=0;t<this.inputNumber;t++){const t=this.nodeCurrentNumber;this.inputNodeIds[t]=!0,this.nodes.push(new r(t)),this.nodeCurrentNumber+=1}const t=this.inputNumber+this.outputNumber;for(let e=this.inputNumber;e<t;e++){const t=this.nodeCurrentNumber;this.outputNodeIds[t]=!0,this.nodes.push(new r(t)),this.nodeCurrentNumber+=1}}mutate(t,e){t?this._mutateAddNode():e&&this._mutateAddConnection()}_mutateAddConnection(){let t=parseInt(u(0,this.nodes.length)),e=parseInt(u(0,this.nodes.length)),n=this.nodes[Math.min(t,e)],o=this.nodes[Math.max(t,e)];for(;this.inputNodeIds[n.id]&&this.inputNodeIds[o.id]||n.id===o.id||this.outputNodeIds[n.id]&&this.outputNodeIds[o.id];)t=parseInt(u(0,this.nodes.length)),e=parseInt(u(0,this.nodes.length)),n=this.nodes[Math.min(t,e)],o=this.nodes[Math.max(t,e)];const s=new i(this.connectionCurrentNumber,u(-2,2),!0);this._isHiddenLayerNode(o)&&this.outputNodeIds[n.id]?(s.inNode=o,s.outNode=n):(s.inNode=n,s.outNode=o),this.connections.push(s),this.connectionCurrentNumber+=1}_isHiddenLayerNode(t){return!this.inputNodeIds[t.id]&&!this.outputNodeIds[t.id]}_mutateAddNode(){const t=parseInt(u(0,this.connections.length)),e=this.connections[t],n=e.inNode,o=e.outNode,s=new r(this.nodeCurrentNumber),d=new i(this.connectionCurrentNumber,u(-2,2),!0),h=new i(this.connectionCurrentNumber+1,u(-2,2),!0);d.inNode=n,d.outNode=s,h.inNode=s,h.outNode=o,this.nodes.push(s),this.connections.splice(t,1),this.connections.push(d),this.connections.push(h),this.nodeCurrentNumber+=1,this.connectionCurrentNumber+=2}activate(t){if(this.nodes.map(t=>{t.value=0}),!Array.isArray(t))throw Error("Invalid type: inputs must be an array.");if(t.length!==this.inputNumber)throw Error(`Invalid number of inputs: this network requires ${this.inputNumber} inputs.`);for(let e=0;e<this.inputNumber;e++)this.nodes[e].value=t[e];const e=[];for(let t=0;t<this.connections.length;t++)void 0===this.outputNodeIds[this.connections[t].outNode.id]?this.connections[t].activate():e.push(this.connections[t]);for(let t=0;t<e.length;t++)e[t].activate();const n=[];for(let t=this.inputNumber;t<this.inputNumber+this.outputNumber;t++)n.push(this.nodes[t].value);return n}crossOver(t){const e=this._getConnectionPairs(t),n=Object.keys(e),o=new d(this.inputNumber,this.outputNumber);return o.connections=[],this._produceChildConnections(o,n,e),this._fillNodesFromConnections(o),o}_getConnectionPairs(t){const e={};return this.connections.forEach(t=>{this._fillConnectionPairs(t,e)}),t.connections.forEach(t=>{this._fillConnectionPairs(t,e)}),e}_produceChildConnections(t,e,n){e.forEach(e=>{const o=n[e];if(1===o.length)t.connections.push(o[0].copy());else{if(2!==o.length)throw Error("This should never happen.  Something went wrong. function: crossOver "+o);{const e=Math.random();t.connections.push(o[e>.5?1:0].copy())}}})}_fillConnectionPairs(t,e){e[t.in]?e[t.in].push(t):e[t.in]=[t]}}var h=d}]);