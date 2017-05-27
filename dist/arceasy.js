!function(e){function r(t){if(i[t])return i[t].exports;var o=i[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var i={};r.m=e,r.c=i,r.i=function(e){return e},r.d=function(e,i,t){r.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(i,"a",i),i},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=5)}([function(e,r,i){"use strict";function t(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r.default=e,r}Object.defineProperty(r,"__esModule",{value:!0}),r.start=r.global=r.constructors=void 0;var o=i(6),n=t(o),a=i(1),l=t(a),s=i(2),c={layer:{FeatureLayer:"",TileLayer:""},map:"",container:"",view:"",utils:{watchUtils:"",Search:"",jsonUtils:"",Extent:""},renderer:{UniqueValueRenderer:"",ClassBreaksRenderer:"",ExtrudeSymbol3DLayer:"",PolygonSymbol3D:"",SimpleRenderer:"",SimpleMarkerSymbol:"",PictureMarkerSymbol:"",SimpleLineSymbol:"",SimpleFillSymbol:""}},u={map:"",view:""},d=function(e){n.isLoaded()?(l.log("Waiting ESRI servers..."),y(e)):n.bootstrap(function(r){r&&l.error(r),l.log("Waiting ESRI servers..."),y(e)},{url:"http://localhost/arcgis_js_api/library/4.3/4.3/init.js"})},y=function(e){n.dojoRequire(["esri/config","esri/Map","esri/geometry/Geometry","esri/Camera","esri/geometry/Extent","esri/views/SceneView","esri/layers/FeatureLayer","esri/layers/TileLayer","esri/layers/GraphicsLayer","esri/core/watchUtils","esri/core/Collection","esri/renderers/UniqueValueRenderer","esri/renderers/ClassBreaksRenderer","esri/renderers/SimpleRenderer","esri/symbols/ExtrudeSymbol3DLayer","esri/symbols/PolygonSymbol3D","esri/symbols/SimpleMarkerSymbol","esri/symbols/PictureMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/Graphic","esri/geometry/Point","esri/symbols/PointSymbol3D","esri/symbols/ObjectSymbol3DLayer","esri/widgets/Search","esri/renderers/support/jsonUtils","dojo/on","dojo/domReady!"],function(r,i,t,o,n,a,d,y,p,f,g,v,b,w,S,h,x,L,P,j,_,M,O,E,C,R,q){r.request.corsEnabledServers.push("http://localhost","http://45.33.83.153"),r.request.proxyUrl="http://localhost",c.Map=i,c.SceneView=a,c.layer.FeatureLayer=d,c.layer.TileLayer=y,c.layer.GraphicsLayer=p,c.utils.watchUtils=f,c.utils.Search=C,c.utils.jsonUtils=R,c.utils.Extent=n,c.utils.Camera=o,c.renderer.UniqueValueRenderer=v,c.renderer.ClassBreaksRenderer=b,c.renderer.ExtrudeSymbol3DLayer=S,c.renderer.PolygonSymbol3D=h,c.renderer.SimpleRenderer=w,c.renderer.SimpleMarkerSymbol=x,c.renderer.PictureMarkerSymbol=L,c.renderer.SimpleLineSymbol=P,c.renderer.SimpleFillSymbol=j,c.renderer.Graphic=_,c.renderer.Point=M,c.renderer.PointSymbol3D=O,c.renderer.ObjectSymbol3DLayer=E,c.Map&&c.SceneView?(l.log("All constructorss created!"),u.map=m(c.Map),u.view=(0,s.createView)(u.map,c.SceneView,e)):l.error("Error during creating constructorss... Try again.")})},m=function(e){return l.log("Creating map..."),new e({basemap:"dark-gray",ground:"world-elevation",layers:[]})};r.constructors=c,r.global=u,r.start=d},function(e,r,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.warn=r.error=r.log=void 0;var t=i(4),o=0,n=0,a=0,l=function(e,r){var i=void 0!==r?r:"";return o++,console.log(o+" "+t.prefix+" "+e,i)},s=function(e,r){var i=void 0!==r?r:"";return n++,console.error(n+" "+t.prefix+" "+e,i)},c=function(e,r){var i=void 0!==r?r:"";return a++,console.warn(a+" "+t.prefix+" "+e,i)};r.log=l,r.error=s,r.warn=c},function(e,r,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.changeBasemap=r.newPosition=r.createView=void 0;var t=i(1),o=function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r.default=e,r}(t),n=i(0),a=function(e,r,i){o.log("Creating View...");var t=n.constructors.utils.Search,a=n.constructors.utils.watchUtils,c=new r({container:i.element,map:e,scale:i.scale,center:[i.longitude,i.latitude],viewingMode:"global",starsEnabled:i.stars,atmosphereEnabled:i.atmosphere});return c.then(function(){o.log("View ready!"),s(c,t),l(e,c,a)}),c},l=function(e,r,i){i.whenTrue(r,"stationary",function(){r.extent&&(o.log("View changed! Mapping all layers..."),console.log(r.extent.center.latitude,r.extent.center.longitude,r.scale),e.allLayers.map(function(e,i,t){if((r.scale<e.minScale&&r.scale>e.maxScale||0===e.minScale&&0===e.maxScale)&&void 0!==e.raw&&e.visible){if(0===e.raw.esri.type){var n="!xmin="+r.extent.xmin+"!xmax="+r.extent.xmax+"!ymin="+r.extent.ymin+"!ymax="+r.extent.ymax;o.log("Getting extent to request "+e.title),o.log("Requesting to server: "+e.raw.esri.url+"/where="+n),e.definitionExpression=n}o.log("Drawing layer: "+e.title)}}))})},s=function(e,r){o.log("Changing UI elements..."),e.environment.atmosphere.quality="low";var i=new r({view:e});e.ui.add(i,{position:"top-left",index:2}),e.ui.remove(["zoom","compass","navigation-toggle"])},c=function(e){var r=e.coordinates,i=e.scale,t=e.camera;n.global.view.goTo({center:[r.longitude,r.latitude],scale:i,tilt:t.tilt,heading:t.heading}),o.log("Changing map position...")},u=function(e){n.global.map.basemap=e,o.log("Change basemap...")};r.createView=a,r.newPosition=c,r.changeBasemap=u},function(e,r,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.removePoints=r.hideAll=r.opacity=r.visibility=r.addGraphicLayer=r.addNewLayer=r.createLayer=void 0;var t=i(1),o=function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r.default=e,r}(t),n=i(0),a=function(e){e.map(function(e,r,i){var t=void 0;0===e.esri.type?(o.log("Creating new Feature Layer..."),t=n.constructors.layer.FeatureLayer):1===e.esri.type&&(o.log("Creating new Tile Layer..."),t=n.constructors.layer.TileLayer),o.log("Adding id by index on layer"),e.id=r,l(t,n.constructors.utils.watchUtils,n.constructors.utils.jsonUtils,e)})},l=function(e,r,i,t){o.log("Adding layer on map: "+t.title+" | Initial visibility: "+t.esri.visible),o.log("Loading layer from: "+t.esri.url);var a=new e({id:t.id,url:t.esri.url,definitionExpression:t.esri.definitionExpression,raw:t,visible:t.esri.visible});a.raw.esri.renderer&&(o.log("Applying renderer..."),a.renderer=i.fromJSON(a.raw.esri.renderer)),a.then(function(){o.log("Layer "+a.title+" ready!"),o.log("View waiting changes..."),1===a.raw.esri.type&&(a.minScale=null!==a.raw.esri.minScale?a.raw.esri.minScale:0,a.maxScale=null!==a.raw.esri.maxScale?a.raw.esri.maxScale:0,o.log("minScale: "+a.minScale+" and maxScale: "+a.maxScale+" defined manually"))}),n.global.map.add(a)},s=function(e,r){var i=n.global.map,t=n.constructors.layer.GraphicsLayer,a=n.constructors.renderer.PointSymbol3D,l=n.constructors.renderer.ObjectSymbol3DLayer,s=n.constructors.renderer.Point,c=n.constructors.renderer.Graphic,u=new t({id:"Point"}),d=new a({symbolLayers:[new l({width:e.width,height:e.height,resource:{primitive:e.primitive},material:{color:e.color}})]}),y=new s({x:r.x,y:r.y,z:r.z}),m=new c({geometry:y,symbol:d});i.add(u),u.add(m),o.log("Adding new Graphic Symbol...")},c=function(e,r){n.global.map.allLayers.map(function(i,t,n){void 0!==i.raw&&i.raw.title===e&&(i.visible=r,o.log("Change visibility of layer: "+e+" to: "+r))})},u=function(e,r){n.global.map.allLayers.map(function(i,t,n){void 0!==i.raw&&i.raw.title===e&&(i.opacity=r/100,o.log("Change opacity of layer: "+e+" to: "+r))})},d=function(){n.global.map.allLayers.map(function(e,r,i){void 0!==e.raw&&!0===e.visible&&(e.visible=!1,o.log("Change visibility of layer: "+e.raw.title+" to: "+!1))})},y=function(){n.global.map.allLayers.map(function(e,r,i){"Point"===e.id&&!0===e.visible&&(e.visible=!1,o.log("Remove point..."))})};r.createLayer=a,r.addNewLayer=l,r.addGraphicLayer=s,r.visibility=c,r.opacity=u,r.hideAll=d,r.removePoints=y},function(e,r,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0});r.prefix="[MAPVIS]"},function(e,r,i){"use strict";function t(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r.default=e,r}Object.defineProperty(r,"__esModule",{value:!0}),r.layers=r.view=r.map=void 0;var o=i(0),n=t(o),a=i(2),l=t(a),s=i(3),c=t(s);r.map=n,r.view=l,r.layers=c},function(e,r,i){"use strict";function t(){return document.querySelector("script[data-esri-loader]")}function o(){return void 0!==window.require&&t()}function n(e,r){if(void 0===r&&(r={}),r.url||(r.url="https://js.arcgis.com/4.3/"),t())return void e(new Error("The ArcGIS API for JavaScript is already loaded."));var i=document.createElement("script");i.type="text/javascript",i.src=r.url,i.dataset.esriLoader="loading",i.onload=function(){i.dataset.esriLoader="loaded";var r=window.require;e&&e(null,r)},document.body.appendChild(i)}function a(e,r){if(o())window.require(e,r);else{var i=t();if(!i)throw new Error("The ArcGIS API for JavaScript has not been loaded. You must first call esriLoader.bootstrap()");var n=function(){window.require(e,r),i.removeEventListener("load",n,!1)};i.addEventListener("load",n)}}Object.defineProperty(r,"__esModule",{value:!0}),r.isLoaded=o,r.bootstrap=n,r.dojoRequire=a,r.default={isLoaded:o,bootstrap:n,dojoRequire:a}}]);
//# sourceMappingURL=arceasy.js.map