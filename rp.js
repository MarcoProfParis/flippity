function Winwheel(a, b) {
    defaultOptions = {
        canvasId: "canvas",
        centerX: null,
        centerY: null,
        outerRadius: null,
        innerRadius: 0,
        numSegments: 1,
        drawMode: "code",
        rotationAngle: 0,
        textFontFamily: "Arial, Helvetica, sans-serif",
        textFontSize: 20,
        textFontWeight: "bold",
        textOrientation: "horizontal",
        textAlignment: "outer",
        textDirection: "reversed",
        textMargin: null,
        textFillStyle: "#fff",
        textStrokeStyle: null,
        textLineWidth: 1,
        fillStyle: "silver",
        strokeStyle: "#000",
        lineWidth: 0,
        clearTheCanvas: !0,
        imageOverlay: !1,
        drawText: !0,
        pointerAngle: 0,
        wheelImage: null,
        imageDirection: "N"
    };
    for (var c in defaultOptions)
        null != a && "undefined" != typeof a[c] ? this[c] = a[c] : this[c] = defaultOptions[c];
    if (null != a)
        for (var c in a)
            "undefined" == typeof this[c] && (this[c] = a[c]);
    for (this.canvasId ? (this.canvas = document.getElementById(this.canvasId),
    this.canvas ? (null == this.centerX && (this.centerX = this.canvas.width / 2),
    null == this.centerY && (this.centerY = this.canvas.height / 2),
    null == this.outerRadius && (this.canvas.width < this.canvas.height ? this.outerRadius = this.canvas.width / 2 - this.lineWidth : this.outerRadius = this.canvas.height / 2 - this.lineWidth),
    this.ctx = this.canvas.getContext("2d")) : (this.canvas = null,
    this.ctx = null)) : (this.cavnas = null,
    this.ctx = null),
    this.segments = new Array(null),
    x = 1; x <= this.numSegments; x++)
        null != a && a.segments && "undefined" != typeof a.segments[x - 1] ? this.segments[x] = new Segment(a.segments[x - 1]) : this.segments[x] = new Segment;
    if (this.updateSegmentSizes(),
    null === this.textMargin && (this.textMargin = this.textFontSize / 1.7),
    null != a && a.animation && "undefined" != typeof a.animation ? this.animation = new Animation(a.animation) : this.animation = new Animation,
    null != a && a.pins && "undefined" != typeof a.pins && (this.pins = new Pin(a.pins)),
    "image" == this.drawMode || "segmentImage" == this.drawMode ? ("undefined" == typeof a.fillStyle && (this.fillStyle = null),
    "undefined" == typeof a.strokeStyle && (this.strokeStyle = "red"),
    "undefined" == typeof a.drawText && (this.drawText = !1),
    "undefined" == typeof a.lineWidth && (this.lineWidth = 1),
    "undefined" == typeof b && (b = !1)) : "undefined" == typeof b && (b = !0),
    null != a && a.pointerGuide && "undefined" != typeof a.pointerGuide ? this.pointerGuide = new PointerGuide(a.pointerGuide) : this.pointerGuide = new PointerGuide,
    1 == b)
        this.draw(this.clearTheCanvas);
    else if ("segmentImage" == this.drawMode)
        for (winwheelToDrawDuringAnimation = this,
        winhweelAlreadyDrawn = !1,
        y = 1; y <= this.numSegments; y++)
            null !== this.segments[y].image && (this.segments[y].imgData = new Image,
            this.segments[y].imgData.onload = winwheelLoadedImage,
            this.segments[y].imgData.src = this.segments[y].image)
}
function Pin(a) {
    defaultOptions = {
        visible: !0,
        number: 36,
        outerRadius: 3,
        fillStyle: "grey",
        strokeStyle: "black",
        lineWidth: 1,
        margin: 3
    };
    for (var b in defaultOptions)
        null != a && "undefined" != typeof a[b] ? this[b] = a[b] : this[b] = defaultOptions[b];
    if (null != a)
        for (var b in a)
            "undefined" == typeof this[b] && (this[b] = a[b])
}
function Animation(a) {
    defaultOptions = {
        type: "spinOngoing",
        direction: "clockwise",
        propertyName: null,
        propertyValue: null,
        duration: 10,
        yoyo: !1,
        repeat: 0,
        easing: "power3.easeOut",
        stopAngle: null,
        spins: null,
        clearTheCanvas: null,
        callbackFinished: null,
        callbackBefore: null,
        callbackAfter: null
    };
    for (var b in defaultOptions)
        null != a && "undefined" != typeof a[b] ? this[b] = a[b] : this[b] = defaultOptions[b];
    if (null != a)
        for (var b in a)
            "undefined" == typeof this[b] && (this[b] = a[b])
}
function Segment(a) {
    defaultOptions = {
        size: null,
        text: "",
        fillStyle: null,
        strokeStyle: null,
        lineWidth: null,
        textFontFamily: null,
        textFontSize: null,
        textFontWeight: null,
        textOrientation: null,
        textAlignment: null,
        textDirection: null,
        textMargin: null,
        textFillStyle: null,
        textStrokeStyle: null,
        textLineWidth: null,
        image: null,
        imageDirection: null,
        imgData: null
    };
    for (var b in defaultOptions)
        null != a && "undefined" != typeof a[b] ? this[b] = a[b] : this[b] = defaultOptions[b];
    if (null != a)
        for (var b in a)
            "undefined" == typeof this[b] && (this[b] = a[b]);
    this.startAngle = 0,
    this.endAngle = 0
}
function PointerGuide(a) {
    defaultOptions = {
        display: !1,
        strokeStyle: "red",
        lineWidth: 3
    };
    for (var b in defaultOptions)
        null != a && "undefined" != typeof a[b] ? this[b] = a[b] : this[b] = defaultOptions[b]
}
function winwheelPercentToDegrees(a) {
    var b = 0;
    if (a > 0 && a <= 100) {
        var c = a / 100;
        b = 360 * c
    }
    return b
}
function winwheelAnimationLoop() {
    winwheelToDrawDuringAnimation && (0 != winwheelToDrawDuringAnimation.animation.clearTheCanvas && winwheelToDrawDuringAnimation.ctx.clearRect(0, 0, winwheelToDrawDuringAnimation.canvas.width, winwheelToDrawDuringAnimation.canvas.height),
    null != winwheelToDrawDuringAnimation.animation.callbackBefore && eval(winwheelToDrawDuringAnimation.animation.callbackBefore),
    winwheelToDrawDuringAnimation.draw(!1),
    null != winwheelToDrawDuringAnimation.animation.callbackAfter && eval(winwheelToDrawDuringAnimation.animation.callbackAfter))
}
function winwheelStopAnimation(canCallback) {
    0 != canCallback && null != winwheelToDrawDuringAnimation.animation.callbackFinished && eval(winwheelToDrawDuringAnimation.animation.callbackFinished)
}
function winwheelLoadedImage() {
    if (0 == winhweelAlreadyDrawn) {
        var a = 0;
        for (i = 1; i <= winwheelToDrawDuringAnimation.numSegments; i++)
            null != winwheelToDrawDuringAnimation.segments[i].imgData && winwheelToDrawDuringAnimation.segments[i].imgData.height && a++;
        a == winwheelToDrawDuringAnimation.numSegments && (winhweelAlreadyDrawn = !0,
        winwheelToDrawDuringAnimation.draw())
    }
}
Winwheel.prototype.updateSegmentSizes = function() {
    if (this.segments) {
        var a = 0
          , b = 0;
        for (x = 1; x <= this.numSegments; x++)
            null !== this.segments[x].size && (a += this.segments[x].size,
            b++);
        var c = 360 - a
          , d = 0;
        c > 0 && (d = c / (this.numSegments - b));
        var e = 0;
        for (x = 1; x <= this.numSegments; x++)
            this.segments[x].startAngle = e,
            e += this.segments[x].size ? this.segments[x].size : d,
            this.segments[x].endAngle = e
    }
}
,
Winwheel.prototype.clearCanvas = function() {
    this.ctx && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}
,
Winwheel.prototype.draw = function(a) {
    this.ctx && ("undefined" != typeof a ? 1 == a && this.clearCanvas() : this.clearCanvas(),
    "image" == this.drawMode ? (this.drawWheelImage(),
    1 == this.drawText && this.drawSegmentText(),
    1 == this.imageOverlay && this.drawSegments()) : "segmentImage" == this.drawMode ? (this.drawSegmentImages(),
    1 == this.drawText && this.drawSegmentText(),
    1 == this.imageOverlay && this.drawSegments()) : (this.drawSegments(),
    1 == this.drawText && this.drawSegmentText()),
    "undefined" != typeof this.pins && 1 == this.pins.visible && this.drawPins(),
    1 == this.pointerGuide.display && this.drawPointerGuide())
}
,
Winwheel.prototype.drawPins = function() {
    if (this.pins && this.pins.number) {
        var a = 360 / this.pins.number;
        for (i = 1; i <= this.pins.number; i++)
            this.ctx.save(),
            this.ctx.strokeStyle = this.pins.strokeStyle,
            this.ctx.lineWidth = this.pins.lineWidth,
            this.ctx.fillStyle = this.pins.fillStyle,
            this.ctx.translate(this.centerX, this.centerY),
            this.ctx.rotate(this.degToRad(i * a + this.rotationAngle)),
            this.ctx.translate(-this.centerX, -this.centerY),
            this.ctx.beginPath(),
            this.ctx.arc(this.centerX, this.centerY - this.outerRadius + this.pins.outerRadius + this.pins.margin, this.pins.outerRadius, 0, 2 * Math.PI),
            this.pins.fillStyle && this.ctx.fill(),
            this.pins.strokeStyle && this.ctx.stroke(),
            this.ctx.restore()
    }
}
,
Winwheel.prototype.drawPointerGuide = function() {
    this.ctx && (this.ctx.save(),
    this.ctx.translate(this.centerX, this.centerY),
    this.ctx.rotate(this.degToRad(this.pointerAngle)),
    this.ctx.translate(-this.centerX, -this.centerY),
    this.ctx.strokeStyle = this.pointerGuide.strokeStyle,
    this.ctx.lineWidth = this.pointerGuide.lineWidth,
    this.ctx.beginPath(),
    this.ctx.moveTo(this.centerX, this.centerY),
    this.ctx.lineTo(this.centerX, -(this.outerRadius / 4)),
    this.ctx.stroke(),
    this.ctx.restore())
}
,
Winwheel.prototype.drawWheelImage = function() {
    if (null != this.wheelImage) {
        var a = this.centerX - this.wheelImage.height / 2
          , b = this.centerY - this.wheelImage.width / 2;
        this.ctx.save(),
        this.ctx.translate(this.centerX, this.centerY),
        this.ctx.rotate(this.degToRad(this.rotationAngle)),
        this.ctx.translate(-this.centerX, -this.centerY),
        this.ctx.drawImage(this.wheelImage, a, b),
        this.ctx.restore()
    }
}
,
Winwheel.prototype.drawSegmentImages = function() {
    if (this.ctx && this.segments)
        for (x = 1; x <= this.numSegments; x++)
            if (seg = this.segments[x],
            seg.imgData.height) {
                var a = 0
                  , b = 0
                  , c = 0
                  , d = "";
                d = null !== seg.imageDirection ? seg.imageDirection : this.imageDirection,
                "S" == d ? (a = this.centerX - seg.imgData.width / 2,
                b = this.centerY,
                c = seg.startAngle + 180 + (seg.endAngle - seg.startAngle) / 2) : "E" == d ? (a = this.centerX,
                b = this.centerY - seg.imgData.height / 2,
                c = seg.startAngle + 270 + (seg.endAngle - seg.startAngle) / 2) : "W" == d ? (a = this.centerX - seg.imgData.width,
                b = this.centerY - seg.imgData.height / 2,
                c = seg.startAngle + 90 + (seg.endAngle - seg.startAngle) / 2) : (a = this.centerX - seg.imgData.width / 2,
                b = this.centerY - seg.imgData.height,
                c = seg.startAngle + (seg.endAngle - seg.startAngle) / 2),
                this.ctx.save(),
                this.ctx.translate(this.centerX, this.centerY),
                this.ctx.rotate(this.degToRad(this.rotationAngle + c)),
                this.ctx.translate(-this.centerX, -this.centerY),
                this.ctx.drawImage(seg.imgData, a, b),
                this.ctx.restore()
            } else
                console.log("Segment " + x + " imgData is not loaded")
}
,
Winwheel.prototype.drawSegments = function() {
    if (this.ctx && this.segments)
        for (x = 1; x <= this.numSegments; x++) {
            seg = this.segments[x];
            var a, b, c;
            a = null !== seg.fillStyle ? seg.fillStyle : this.fillStyle,
            this.ctx.fillStyle = a,
            b = null !== seg.lineWidth ? seg.lineWidth : this.lineWidth,
            this.ctx.lineWidth = b,
            c = null !== seg.strokeStyle ? seg.strokeStyle : this.strokeStyle,
            this.ctx.strokeStyle = c,
            (c || a) && (this.ctx.beginPath(),
            this.innerRadius || this.ctx.moveTo(this.centerX, this.centerY),
            this.ctx.arc(this.centerX, this.centerY, this.outerRadius, this.degToRad(seg.startAngle + this.rotationAngle - 90), this.degToRad(seg.endAngle + this.rotationAngle - 90), !1),
            this.innerRadius ? this.ctx.arc(this.centerX, this.centerY, this.innerRadius, this.degToRad(seg.endAngle + this.rotationAngle - 90), this.degToRad(seg.startAngle + this.rotationAngle - 90), !0) : this.ctx.lineTo(this.centerX, this.centerY),
            a && this.ctx.fill(),
            c && this.ctx.stroke())
        }
}
,
Winwheel.prototype.drawSegmentText = function() {
    if (this.ctx) {
        var a, b, c, d, e, f, g, h, j, k, l;
        for (x = 1; x <= this.numSegments; x++) {
            if (this.ctx.save(),
            seg = this.segments[x],
            seg.text) {
                a = null !== seg.textFontFamily ? seg.textFontFamily : this.textFontFamily,
                b = null !== seg.textFontSize ? seg.textFontSize : this.textFontSize,
                c = null !== seg.textFontWeight ? seg.textFontWeight : this.textFontWeight,
                d = null !== seg.textOrientation ? seg.textOrientation : this.textOrientation,
                e = null !== seg.textAlignment ? seg.textAlignment : this.textAlignment,
                f = null !== seg.textDirection ? seg.textDirection : this.textDirection,
                g = null !== seg.textMargin ? seg.textMargin : this.textMargin,
                h = null !== seg.textFillStyle ? seg.textFillStyle : this.textFillStyle,
                j = null !== seg.textStrokeStyle ? seg.textStrokeStyle : this.textStrokeStyle,
                k = null !== seg.textLineWidth ? seg.textLineWidth : this.textLineWidth,
                l = "",
                null != c && (l += c + " "),
                null != b && (l += b + "px "),
                null != a && (l += a),
                this.ctx.font = l,
                this.ctx.fillStyle = h,
                this.ctx.strokeStyle = j,
                this.ctx.lineWidth = k;
                var m = seg.text.split("\n")
                  , n = 0 - b * (m.length / 2) + b / 2;
                for ("curved" != d || "inner" != e && "outer" != e || (n = 0),
                i = 0; i < m.length; i++) {
                    if ("reversed" == f) {
                        if ("horizontal" == d) {
                            "inner" == e ? this.ctx.textAlign = "right" : "outer" == e ? this.ctx.textAlign = "left" : this.ctx.textAlign = "center",
                            this.ctx.textBaseline = "middle";
                            var o = this.degToRad(seg.endAngle - (seg.endAngle - seg.startAngle) / 2 + this.rotationAngle - 90 - 180);
                            this.ctx.save(),
                            this.ctx.translate(this.centerX, this.centerY),
                            this.ctx.rotate(o),
                            this.ctx.translate(-this.centerX, -this.centerY),
                            "inner" == e ? (h && this.ctx.fillText(m[i], this.centerX - this.innerRadius - g, this.centerY + n),
                            j && this.ctx.strokeText(m[i], this.centerX - this.innerRadius - g, this.centerY + n)) : "outer" == e ? (h && this.ctx.fillText(m[i], this.centerX - this.outerRadius + g, this.centerY + n),
                            j && this.ctx.strokeText(m[i], this.centerX - this.outerRadius + g, this.centerY + n)) : (h && this.ctx.fillText(m[i], this.centerX - this.innerRadius - (this.outerRadius - this.innerRadius) / 2 - g, this.centerY + n),
                            j && this.ctx.strokeText(m[i], this.centerX - this.innerRadius - (this.outerRadius - this.innerRadius) / 2 - g, this.centerY + n)),
                            this.ctx.restore()
                        } else if ("vertical" == d) {
                            this.ctx.textAlign = "center",
                            "inner" == e ? this.ctx.textBaseline = "top" : "outer" == e ? this.ctx.textBaseline = "bottom" : this.ctx.textBaseline = "middle";
                            var o = seg.endAngle - (seg.endAngle - seg.startAngle) / 2 - 180;
                            if (o += this.rotationAngle,
                            this.ctx.save(),
                            this.ctx.translate(this.centerX, this.centerY),
                            this.ctx.rotate(this.degToRad(o)),
                            this.ctx.translate(-this.centerX, -this.centerY),
                            "outer" == e)
                                var p = this.centerY + this.outerRadius - g;
                            else if ("inner" == e)
                                var p = this.centerY + this.innerRadius + g;
                            var q = b - b / 9;
                            if ("outer" == e)
                                for (var r = m[i].length - 1; r >= 0; r--)
                                    character = m[i].charAt(r),
                                    h && this.ctx.fillText(character, this.centerX + n, p),
                                    j && this.ctx.strokeText(character, this.centerX + n, p),
                                    p -= q;
                            else if ("inner" == e)
                                for (var r = 0; r < m[i].length; r++)
                                    character = m[i].charAt(r),
                                    h && this.ctx.fillText(character, this.centerX + n, p),
                                    j && this.ctx.strokeText(character, this.centerX + n, p),
                                    p += q;
                            else if ("center" == e) {
                                var s = 0;
                                m[i].length > 1 && (s = q * (m[i].length - 1) / 2);
                                for (var p = this.centerY + this.innerRadius + (this.outerRadius - this.innerRadius) / 2 + s + g, r = m[i].length - 1; r >= 0; r--)
                                    character = m[i].charAt(r),
                                    h && this.ctx.fillText(character, this.centerX + n, p),
                                    j && this.ctx.strokeText(character, this.centerX + n, p),
                                    p -= q
                            }
                            this.ctx.restore()
                        } else if ("curved" == d) {
                            var t = 0;
                            "inner" == e ? (t = this.innerRadius + g,
                            this.ctx.textBaseline = "top") : "outer" == e ? (t = this.outerRadius - g,
                            this.ctx.textBaseline = "bottom",
                            t -= b * (m.length - 1)) : "center" == e && (t = this.innerRadius + g + (this.outerRadius - this.innerRadius) / 2,
                            this.ctx.textBaseline = "middle");
                            var u = 0
                              , v = 0;
                            for (m[i].length > 1 ? (this.ctx.textAlign = "left",
                            u = 4 * (b / 10),
                            radiusPercent = 100 / t,
                            u *= radiusPercent,
                            totalArc = u * m[i].length,
                            v = seg.startAngle + ((seg.endAngle - seg.startAngle) / 2 - totalArc / 2)) : (v = seg.startAngle + (seg.endAngle - seg.startAngle) / 2,
                            this.ctx.textAlign = "center"),
                            v += this.rotationAngle,
                            v -= 180,
                            r = m[i].length; r >= 0; r--)
                                this.ctx.save(),
                                character = m[i].charAt(r),
                                this.ctx.translate(this.centerX, this.centerY),
                                this.ctx.rotate(this.degToRad(v)),
                                this.ctx.translate(-this.centerX, -this.centerY),
                                j && this.ctx.strokeText(character, this.centerX, this.centerY + t + n),
                                h && this.ctx.fillText(character, this.centerX, this.centerY + t + n),
                                v += u,
                                this.ctx.restore()
                        }
                    } else if ("horizontal" == d) {
                        "inner" == e ? this.ctx.textAlign = "left" : "outer" == e ? this.ctx.textAlign = "right" : this.ctx.textAlign = "center",
                        this.ctx.textBaseline = "middle";
                        var o = this.degToRad(seg.endAngle - (seg.endAngle - seg.startAngle) / 2 + this.rotationAngle - 90);
                        this.ctx.save(),
                        this.ctx.translate(this.centerX, this.centerY),
                        this.ctx.rotate(o),
                        this.ctx.translate(-this.centerX, -this.centerY),
                        "inner" == e ? (h && this.ctx.fillText(m[i], this.centerX + this.innerRadius + g, this.centerY + n),
                        j && this.ctx.strokeText(m[i], this.centerX + this.innerRadius + g, this.centerY + n)) : "outer" == e ? (h && this.ctx.fillText(m[i], this.centerX + this.outerRadius - g, this.centerY + n),
                        j && this.ctx.strokeText(m[i], this.centerX + this.outerRadius - g, this.centerY + n)) : (h && this.ctx.fillText(m[i], this.centerX + this.innerRadius + (this.outerRadius - this.innerRadius) / 2 + g, this.centerY + n),
                        j && this.ctx.strokeText(m[i], this.centerX + this.innerRadius + (this.outerRadius - this.innerRadius) / 2 + g, this.centerY + n)),
                        this.ctx.restore()
                    } else if ("vertical" == d) {
                        this.ctx.textAlign = "center",
                        "inner" == e ? this.ctx.textBaseline = "bottom" : "outer" == e ? this.ctx.textBaseline = "top" : this.ctx.textBaseline = "middle";
                        var o = seg.endAngle - (seg.endAngle - seg.startAngle) / 2;
                        if (o += this.rotationAngle,
                        this.ctx.save(),
                        this.ctx.translate(this.centerX, this.centerY),
                        this.ctx.rotate(this.degToRad(o)),
                        this.ctx.translate(-this.centerX, -this.centerY),
                        "outer" == e)
                            var p = this.centerY - this.outerRadius + g;
                        else if ("inner" == e)
                            var p = this.centerY - this.innerRadius - g;
                        var q = b - b / 9;
                        if ("outer" == e)
                            for (var r = 0; r < m[i].length; r++)
                                character = m[i].charAt(r),
                                h && this.ctx.fillText(character, this.centerX + n, p),
                                j && this.ctx.strokeText(character, this.centerX + n, p),
                                p += q;
                        else if ("inner" == e)
                            for (var r = m[i].length - 1; r >= 0; r--)
                                character = m[i].charAt(r),
                                h && this.ctx.fillText(character, this.centerX + n, p),
                                j && this.ctx.strokeText(character, this.centerX + n, p),
                                p -= q;
                        else if ("center" == e) {
                            var s = 0;
                            m[i].length > 1 && (s = q * (m[i].length - 1) / 2);
                            for (var p = this.centerY - this.innerRadius - (this.outerRadius - this.innerRadius) / 2 - s - g, r = 0; r < m[i].length; r++)
                                character = m[i].charAt(r),
                                h && this.ctx.fillText(character, this.centerX + n, p),
                                j && this.ctx.strokeText(character, this.centerX + n, p),
                                p += q
                        }
                        this.ctx.restore()
                    } else if ("curved" == d) {
                        var t = 0;
                        "inner" == e ? (t = this.innerRadius + g,
                        this.ctx.textBaseline = "bottom",
                        t += b * (m.length - 1)) : "outer" == e ? (t = this.outerRadius - g,
                        this.ctx.textBaseline = "top") : "center" == e && (t = this.innerRadius + g + (this.outerRadius - this.innerRadius) / 2,
                        this.ctx.textBaseline = "middle");
                        var u = 0
                          , v = 0;
                        for (m[i].length > 1 ? (this.ctx.textAlign = "left",
                        u = 4 * (b / 10),
                        radiusPercent = 100 / t,
                        u *= radiusPercent,
                        totalArc = u * m[i].length,
                        v = seg.startAngle + ((seg.endAngle - seg.startAngle) / 2 - totalArc / 2)) : (v = seg.startAngle + (seg.endAngle - seg.startAngle) / 2,
                        this.ctx.textAlign = "center"),
                        v += this.rotationAngle,
                        r = 0; r < m[i].length; r++)
                            this.ctx.save(),
                            character = m[i].charAt(r),
                            this.ctx.translate(this.centerX, this.centerY),
                            this.ctx.rotate(this.degToRad(v)),
                            this.ctx.translate(-this.centerX, -this.centerY),
                            j && this.ctx.strokeText(character, this.centerX, this.centerY - t + n),
                            h && this.ctx.fillText(character, this.centerX, this.centerY - t + n),
                            v += u,
                            this.ctx.restore()
                    }
                    n += b
                }
            }
            this.ctx.restore()
        }
    }
}
,
Winwheel.prototype.degToRad = function(a) {
    return .017453292519943295 * a
}
,
Winwheel.prototype.setCenter = function(a, b) {
    this.centerX = a,
    this.centerY = b
}
,
Winwheel.prototype.addSegment = function(a, b) {
    newSegment = new Segment(a),
    this.numSegments++;
    var c;
    if ("undefined" != typeof b) {
        for (var d = this.numSegments; d > b; d--)
            this.segments[d] = this.segments[d - 1];
        this.segments[b] = newSegment,
        c = b
    } else
        this.segments[this.numSegments] = newSegment,
        c = this.numSegments;
    return this.updateSegmentSizes(),
    this.segments[c]
}
,
Winwheel.prototype.setCanvasId = function(a) {
    a ? (this.canvasId = a,
    this.canvas = document.getElementById(this.canvasId),
    this.canvas && (this.ctx = this.canvas.getContext("2d"))) : (this.canvasId = null,
    this.ctx = null,
    this.canvas = null)
}
,
Winwheel.prototype.deleteSegment = function(a) {
    if (this.numSegments > 1) {
        if ("undefined" != typeof a)
            for (var b = a; b < this.numSegments; b++)
                this.segments[b] = this.segments[b + 1];
        this.segments[this.numSegments] = void 0,
        this.numSegments--,
        this.updateSegmentSizes()
    }
}
,
Winwheel.prototype.windowToCanvas = function(a, b) {
    var c = this.canvas.getBoundingClientRect();
    return {
        x: Math.floor(a - c.left * (this.canvas.width / c.width)),
        y: Math.floor(b - c.top * (this.canvas.height / c.height))
    }
}
,
Winwheel.prototype.getSegmentAt = function(a, b) {
    var c = null
      , d = this.getSegmentNumberAt(a, b);
    return null !== d && (c = this.segments[d]),
    c
}
,
Winwheel.prototype.getSegmentNumberAt = function(a, b) {
    var d, e, f, g, h, c = this.windowToCanvas(a, b);
    c.x > this.centerX ? (f = c.x - this.centerX,
    e = "R") : (f = this.centerX - c.x,
    e = "L"),
    c.y > this.centerY ? (g = c.y - this.centerY,
    d = "B") : (g = this.centerY - c.y,
    d = "T");
    var i = g / f
      , j = 180 * Math.atan(i) / Math.PI
      , k = 0;
    if (h = Math.sqrt(g * g + f * f),
    "T" == d && "R" == e ? k = Math.round(90 - j) : "B" == d && "R" == e ? k = Math.round(j + 90) : "B" == d && "L" == e ? k = Math.round(90 - j + 180) : "T" == d && "L" == e && (k = Math.round(j + 270)),
    0 != this.rotationAngle) {
        var l = this.getRotationPosition();
        k -= l,
        k < 0 && (k = 360 - Math.abs(k))
    }
    for (var m = null, a = 1; a <= this.numSegments; a++)
        if (k >= this.segments[a].startAngle && k <= this.segments[a].endAngle && h >= this.innerRadius && h <= this.outerRadius) {
            m = a;
            break
        }
    return m
}
,
Winwheel.prototype.getIndicatedSegment = function() {
    var a = this.getIndicatedSegmentNumber();
    return this.segments[a]
}
,
Winwheel.prototype.getIndicatedSegmentNumber = function() {
    var a = 0
      , b = this.getRotationPosition()
      , c = Math.floor(this.pointerAngle - b);
    for (c < 0 && (c = 360 - Math.abs(c)),
    x = 1; x < this.segments.length; x++)
        if (c >= this.segments[x].startAngle && c <= this.segments[x].endAngle) {
            a = x;
            break
        }
    return a
}
,
Winwheel.prototype.getRotationPosition = function() {
    var a = this.rotationAngle;
    if (a >= 0) {
        if (a > 360) {
            var b = Math.floor(a / 360);
            a -= 360 * b
        }
    } else {
        if (a < -360) {
            var b = Math.ceil(a / 360);
            a -= 360 * b
        }
        a = 360 + a
    }
    return a
}
,
Winwheel.prototype.startAnimation = function() {
    if (this.animation) {
        this.computeAnimation(),
        winwheelToDrawDuringAnimation = this;
        var a = new Array(null);
        a[this.animation.propertyName] = this.animation.propertyValue,
        a.yoyo = this.animation.yoyo,
        a.repeat = this.animation.repeat,
        a.ease = this.animation.easing,
        a.onUpdate = winwheelAnimationLoop,
        a.onComplete = winwheelStopAnimation,
        this.tween = TweenMax.to(this, this.animation.duration, a)
    }
}
,
Winwheel.prototype.stopAnimation = function(a) {
    winwheelToDrawDuringAnimation && winwheelStopAnimation(a),
    winwheelToDrawDuringAnimation = this
}
,
Winwheel.prototype.pauseAnimation = function() {
    this.tween && this.tween.pause()
}
,
Winwheel.prototype.resumeAnimation = function() {
    this.tween && this.tween.play()
}
,
Winwheel.prototype.computeAnimation = function() {
    this.animation && ("spinOngoing" == this.animation.type ? (this.animation.propertyName = "rotationAngle",
    null == this.animation.spins && (this.animation.spins = 5),
    null == this.animation.repeat && (this.animation.repeat = -1),
    null == this.animation.easing && (this.animation.easing = "Linear.easeNone"),
    null == this.animation.yoyo && (this.animation.yoyo = !1),
    this.animation.propertyValue = 360 * this.animation.spins,
    "anti-clockwise" == this.animation.direction && (this.animation.propertyValue = 0 - this.animation.propertyValue)) : "spinToStop" == this.animation.type ? (this.animation.propertyName = "rotationAngle",
    null == this.animation.spins && (this.animation.spins = 5),
    null == this.animation.repeat && (this.animation.repeat = 0),
    null == this.animation.easing && (this.animation.easing = "Power4.easeOut"),
    null == this.animation.stopAngle ? this.animation._stopAngle = Math.floor(359 * Math.random()) : this.animation._stopAngle = 360 - this.animation.stopAngle + this.pointerAngle,
    null == this.animation.yoyo && (this.animation.yoyo = !1),
    this.animation.propertyValue = 360 * this.animation.spins,
    "anti-clockwise" == this.animation.direction ? (this.animation.propertyValue = 0 - this.animation.propertyValue,
    this.animation.propertyValue -= 360 - this.animation._stopAngle) : this.animation.propertyValue += this.animation._stopAngle) : "spinAndBack" == this.animation.type ? (this.animation.propertyName = "rotationAngle",
    null == this.animation.spins && (this.animation.spins = 5),
    null == this.animation.repeat && (this.animation.repeat = 1),
    null == this.animation.easing && (this.animation.easing = "Power2.easeInOut"),
    null == this.animation.yoyo && (this.animation.yoyo = !0),
    null == this.animation.stopAngle ? this.animation._stopAngle = 0 : this.animation._stopAngle = 360 - this.animation.stopAngle,
    this.animation.propertyValue = 360 * this.animation.spins,
    "anti-clockwise" == this.animation.direction ? (this.animation.propertyValue = 0 - this.animation.propertyValue,
    this.animation.propertyValue -= 360 - this.animation._stopAngle) : this.animation.propertyValue += this.animation._stopAngle) : "custom" == this.animation.type)
}
,
Winwheel.prototype.getRandomForSegment = function(a) {
    var b = 0;
    if (a)
        if ("undefined" != typeof this.segments[a]) {
            var c = this.segments[a].startAngle
              , d = this.segments[a].endAngle
              , e = d - c - 2;
            e > 0 ? b = c + 1 + Math.floor(Math.random() * e) : console.log("Segment size is too small to safely get random angle inside it")
        } else
            console.log("Segment " + a + " undefined");
    else
        console.log("Segment number not specified");
    return b
}
,
Segment.prototype.changeImage = function(a, b) {
    this.image = a,
    this.imgData = null,
    b && (this.imageDirection = b),
    winhweelAlreadyDrawn = !1,
    this.imgData = new Image,
    this.imgData.onload = winwheelLoadedImage,
    this.imgData.src = this.image
}
;
var winwheelToDrawDuringAnimation = null
  , winhweelAlreadyDrawn = !1;
