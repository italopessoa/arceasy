import * as esriLoader from 'esri-loader'
import * as logger from './logger'
import { createView } from './view'
import { global, constructors } from './config'

/**
 * Simple function to set globaly options about the map
 * To start using ArcEasy you need invocate this function first
 * @param  {Object} options - Group of informations about your
 *                            app and how map will be
 * @param  {String} options.cdn - ESRI CDN Server
 * @param  {String} options.element - DOM element that map will be created
 * @param  {Number} options.scale - Initial map scale
 * @param  {Number} options.center.longitude - Center map Longitude
 * @param  {Number} options.center.latitude - Center map Latitude
 * @param  {String} options.basemap - Initial basemap
 * @param  {Boolean} options.stars - If stars is enabled
 * @param  {Boolean} options.atmosphere.enable - If atmosphere is enabled
 * @param  {String} options.atmosphere.quality - Atmosphere quality
 * @param  {Boolean} options.search.enable - If search is enabled
 * @param  {String} options.search.position - Search position
 * @param  {Number} options.search.index - Search index
 * @param  {Array} options.cors - A group of URLs that you need enable CORS
 * @param  {String} options.proxy - Single URL that will proxy your requests
 */
export const options = options => {
    if (options) {
        options.cdn ||
            logger.warn(`You not set any ESRI CDN. Usign default: ${global.options.cdn}`)

        options.element ||
            logger.fatal(`You need pass an valid DOM element`)

        options.scale ||
            logger.warn(`You not set scale. Usign default scale: ${global.options.scale}`)

        if (options.center) {
            options.center.longitude ||
                logger.warn(`You not set intial longitude. Usign default: ${global.options.center.longitude}`)

            options.center.latitude ||
                logger.warn(`You not set intial latitude. Usign default: ${global.options.center.latitude}`)
        } else {
            logger.warn(`You not set the map center. Usign defaults | longitude: ${global.options.center.longitude}, latitude: ${global.options.center.latitude}`)
        }

        options.basemap ||
            logger.warn(`You not set initial basemap. Usign default: ${global.options.basemap}`)

        options.stars === true ||
        options.stars === false ||
            logger.warn(`You not set if map usign stars. Usign default: ${global.options.stars}`)

        if (options.atmosphere) {
            options.atmosphere.enable === true ||
            options.atmosphere.enable === false ||
                logger.warn(`You not set if map usign atmosphere efect. Usign default: ${global.options.atmosphere.enable}`)

            options.atmosphere.quality ||
                logger.warn(`You not set atmosphere quality. Usign default: ${global.options.atmosphere.quality}`)
        } else {
            logger.warn(`You not set the atmosphere options. Usign defaults | enable: ${global.options.atmosphere.enable}, quality: ${global.options.atmosphere.quality}`)
        }

        if (options.search) {
            options.search.enable === true ||
            options.search.enable === false ||
                logger.warn(`You not set Search. Usign default: ${global.options.search.enable}`)

            options.search.position ||
                logger.warn(`You not set Search position. Usign default: ${global.options.search.position}`)

            options.search.index ||
                logger.warn(`You not set Search index. Usign default: ${global.options.search.index}`)
        } else {
            logger.warn(`You not set the search options. Usign defaults | enable: ${global.options.search.enable}, position: ${global.options.search.position}, index: ${global.options.search.index}`)
        }

        options.cors &&
        options.cors.length > 0 ||
            logger.warn(`You not set any URL to enable CORS requests`)

        options.proxy ||
            logger.warn(`You not set any URL to proxy your requests`)

        global.options = {
            cdn: options.cdn || global.options.cdn,
            element: options.element,
            scale: options.scale || global.options.scale,
            center: {
                longitude: options.center && options.center.longitude || global.options.center.longitude,
                latitude: options.center && options.center.latitude || global.options.center.latitude
            },
            basemap: options.basemap || global.options.basemap,
            stars: options.stars || global.options.stars,
            atmosphere: {
                enable: options.atmosphere && options.atmosphere.enable || global.options.atmosphere.enable,
                quality: options.atmosphere && options.atmosphere.quality || global.options.atmosphere.quality
            },
            search: {
                enable: options.search && options.search.enable || global.options.search.enable,
                position: options.search && options.search.position || global.options.search.position,
                index: options.search && options.search.index || global.options.search.index
            },
            cors: options.cors || '',
            proxy: options.proxy || ''
        }

        global.loaded = true
        logger.log(`Ready to start!`)
    } else {
        logger.fatal(`You need pass some informations to describe your map`)
    }
}

/**
 * The BigBang function
 * To create your map you need invocate this function
 */
export const start = () => {
    return new Promise((resolve, reject) => {
        const cdn = global.options.cdn

        if (cdn !== undefined && global.loaded) {
            // Has the ArcGIS API been added to the page?
            if (!esriLoader.isLoaded()) {
                // No, lazy load it the ArcGIS API before using its classes
                esriLoader.bootstrap(err => {
                    if (err) {
                        logger.error(err)
                    }
                    // Once it's loaded, create the map
                    logger.log(`Waiting ESRI server...`)
                    dojoLoader(resolve, reject)
                }, {
                    // Use a specific version instead of latest 4.x
                    url: cdn
                })
            } else {
                // ArcGIS API is already loaded, just create the map
                logger.log(`Waiting ESRI server...`)
                dojoLoader(resolve, reject)
            }
        } else {
            logger.fatal(`Fatal error! You must provider an CDN.`)
            reject()
        }
    })
}

/**
 * Require all packages from ESRI CDN,
 * create necessary constructors,
 * create map,
 * create view,
 * and put in page
 */
const dojoLoader = (resolve, reject) => {
    if (global.loaded) {
        esriLoader.dojoRequire([
            'esri/config',
            'esri/Map',
            'esri/Graphic',
            'esri/Camera',

            'esri/views/SceneView',

            'esri/layers/FeatureLayer',
            'esri/layers/TileLayer',
            'esri/layers/GraphicsLayer',

            'esri/core/watchUtils',
            'esri/core/Collection',

            'esri/renderers/UniqueValueRenderer',
            'esri/renderers/ClassBreaksRenderer',
            'esri/renderers/SimpleRenderer',
            'esri/renderers/support/jsonUtils',

            'esri/symbols/ExtrudeSymbol3DLayer',
            'esri/symbols/PolygonSymbol3D',
            'esri/symbols/SimpleMarkerSymbol',
            'esri/symbols/PictureMarkerSymbol',
            'esri/symbols/SimpleLineSymbol',
            'esri/symbols/SimpleFillSymbol',
            'esri/symbols/PointSymbol3D',
            'esri/symbols/ObjectSymbol3DLayer',

            'esri/geometry/Geometry',
            'esri/geometry/Point',
            'esri/geometry/Extent',

            'esri/widgets/Search',

            'dojo/on',
            'dojo/domReady!'
        ], (
            esriConfig,
            Map,
            Graphic,
            Camera,
            SceneView,
            FeatureLayer,
            TileLayer,
            GraphicsLayer,
            watchUtils,
            Collection,
            UniqueValueRenderer,
            ClassBreaksRenderer,
            SimpleRenderer,
            jsonUtils,
            ExtrudeSymbol3DLayer,
            PolygonSymbol3D,
            SimpleMarkerSymbol,
            PictureMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            PointSymbol3D,
            ObjectSymbol3DLayer,
            Geometry,
            Point,
            Extent,
            Search,
            on
        ) => {
            global.options.cors.forEach(elm => {
                esriConfig.request.corsEnabledServers.push(elm)
            })

            esriConfig.request.proxyUrl = global.options.proxy || ''

            constructors.Map = Map
            constructors.SceneView = SceneView

            constructors.layer.FeatureLayer = FeatureLayer
            constructors.layer.TileLayer = TileLayer
            constructors.layer.GraphicsLayer = GraphicsLayer

            constructors.utils.watchUtils = watchUtils
            constructors.utils.Search = Search
            constructors.utils.jsonUtils = jsonUtils
            constructors.utils.Extent = Extent
            constructors.utils.Camera = Camera

            constructors.renderer.UniqueValueRenderer = UniqueValueRenderer
            constructors.renderer.ClassBreaksRenderer = ClassBreaksRenderer
            constructors.renderer.ExtrudeSymbol3DLayer = ExtrudeSymbol3DLayer
            constructors.renderer.PolygonSymbol3D = PolygonSymbol3D
            constructors.renderer.SimpleRenderer = SimpleRenderer
            constructors.renderer.SimpleMarkerSymbol = SimpleMarkerSymbol
            constructors.renderer.PictureMarkerSymbol = PictureMarkerSymbol
            constructors.renderer.SimpleLineSymbol = SimpleLineSymbol
            constructors.renderer.SimpleFillSymbol = SimpleFillSymbol
            constructors.renderer.Graphic = Graphic
            constructors.renderer.Point = Point
            constructors.renderer.PointSymbol3D = PointSymbol3D
            constructors.renderer.ObjectSymbol3DLayer = ObjectSymbol3DLayer

            if (constructors.Map && constructors.SceneView) {
                logger.log(`All constructorss created!`)

                global.map = createMap(
                    constructors.Map,
                    global.options.basemap
                )

                global.view = createView(
                    global.map,
                    constructors.SceneView,
                    global.options
                )

                resolve()
            } else {
                logger.error(`Error during creating the necessary constructors... Try again.`)
                reject()
            }
        })
    } else {
        logger.fatal(`Fatal error! You need set some map options.`)
        reject()
    }
}

/**
 * Create map using ESRI Map constructor
 * @param  {Function} Map - ESRI Map constructor
 * @param  {String} basemap - The initial basemap
 * @return {Object} Global map object descriptor
 */
const createMap = (Map, basemap) => {
    logger.log(`Creating map...`)

    const map = new Map({
        basemap: basemap,
        ground: 'world-elevation',
        layers: []
    })

    return map
}
