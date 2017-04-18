maptalks.symbolizer.DebugSymbolizer = maptalks.symbolizer.PointSymbolizer.extend({

    styles:{
        'lineColor':'#000',
        'lineOpacity' : 1,
        'lineWidth' : 1
    },

    initialize:function (symbol, geometry, painter) {
        this.symbol = symbol;
        this.geometry = geometry;
        this.painter = painter;
    },

    getPlacement:function () {
        return 'point';
    },

    getDxDy:function () {
        return new maptalks.Point(0, 0);
    },

    symbolize:function (ctx) {
        var geometry = this.geometry,
            layer = geometry.getLayer();
        if (!geometry.options['debug'] && (layer && !layer.options['debug'])) {
            return;
        }
        var map = this.getMap();
        if (!map || map._zooming) {
            return;
        }
        maptalks.Canvas.prepareCanvas(ctx, this.styles);
        var op = this.styles['lineOpacity'];

        //outline
        var pixelExtent = this.getPainter().getContainerExtent();
        var nw = pixelExtent.getMin(),
            size = pixelExtent.getSize();
        maptalks.Canvas.rectangle(ctx, nw, size, op, 0);

        //center cross and id if have any.
        var points = this._getRenderContainerPoints();

        var id = this.geometry.getId();
        var cross = maptalks.symbolizer.VectorMarkerSymbolizer._getVectorPoints('cross', 10, 10);
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            if (!maptalks.Util.isNil(id)) {
                maptalks.Canvas.fillText(ctx, id, p.add(8, -4), 'rgba(0,0,0,1)');
            }
            var c = [];
            for (var ii = 0; ii < cross.length; ii++) {
                c.push(cross[ii].add(p));
            }
            maptalks.Canvas.path(ctx, c.slice(0, 2), op);
            maptalks.Canvas.path(ctx, c.slice(2, 4), op);
        }
    }

});