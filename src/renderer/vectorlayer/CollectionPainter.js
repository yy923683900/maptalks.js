/**
 * @classdesc
 * Painter for collection type geometries
 * @class
 * @protected
 * @param {maptalks.GeometryCollection} geometry - geometry to paint
 */
maptalks.CollectionPainter = maptalks.Class.extend(/** @lends maptalks.CollectionPainter.prototype */{
    initialize:function (geometry) {
        this.geometry = geometry;
    },

    _eachPainter:function (fn) {
        var geometries = this.geometry.getGeometries();
        var painter;
        for (var i = 0, len = geometries.length; i < len; i++) {
            painter = geometries[i]._getPainter();
            if (!painter) {
                continue;
            }
            if (painter) {
                if (fn.call(this, painter) === false) {
                    break;
                }
            }
        }
    },

    paint:function () {
        if (!this.geometry) {
            return;
        }
        this._eachPainter(function (painter) {
            painter.paint();
        });
    },

    get2DExtent:function (resources) {
        var  extent = new maptalks.PointExtent();
        this._eachPainter(function (painter) {
            extent = extent.combine(painter.get2DExtent(resources));
        });
        return extent;
    },

    remove:function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.remove.apply(painter, args);
        });
    },

    setZIndex:function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.setZIndex.apply(painter, args);
        });
    },

    show:function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.show.apply(painter, args);
        });
    },

    hide:function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.hide.apply(painter, args);
        });
    },

    onZoomEnd:function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.onZoomEnd.apply(painter, args);
        });
    },

    repaint:function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.repaint.apply(painter, args);
        });
    },

    refreshSymbol:function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.refreshSymbol.apply(painter, args);
        });
    },

    hasPointSymbolizer:function () {
        var result = false;
        this._eachPainter(function (painter) {
            if (painter.hasPointSymbolizer()) {
                result = true;
                return false;
            }
            return true;
        });
        return result;
    },

    removeZoomCache: function () {
        var args = arguments;
        this._eachPainter(function (painter) {
            painter.removeZoomCache.apply(painter, args);
        });
    }
});