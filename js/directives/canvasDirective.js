app.directive("sketchPad", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            var canvas = element[0];
            var context = canvas.getContext('2d');

            var drawing = false;
			var x,
				y,
				offsetX,
				offsetParentX,
				offsetY,
				offsetParentY,
				prevX,
				prevY,
				ratio;


			// Mouse functionality
			element.bind('mousedown', function (event) {
				startDrawing(event);
			});

			element.bind('mousemove', function (event) {
				moveDrawing(event);

			});

			element.bind('mouseup', function (event) {
				completeDrawing();
			});

			// Touch screen functionality
			element.bind('touchstart', function (event) {
				event.preventDefault();
				startDrawing(event);
			});

			element.bind('touchmove', function (event) {
				event.preventDefault();
				moveDrawing(event);
			});

			element.bind('touchend', function () {
				completeDrawing();
			});
			
			// If touchscreen, need to get the offset along with any parent offset it contains
			var getX = function (event) {
				if (event.type.indexOf("touch") == 0) {
					offsetParentX = canvas.offsetParent;
					offsetX = canvas.offsetLeft;

					while (offsetParentX !== null) {
						offsetX += offsetParentX.offsetLeft;

						offsetParentX = offsetParentX.offsetParent;
					}
					return event.targetTouches[0].pageX - offsetX;
				} else {
					return event.offsetX;
				}
			}

			// If touchscreen, need to get the offset along with any parent offset it contains
			var getY = function (event) {
				if (event.type.indexOf("touch") == 0) {
					offsetParentY = canvas.offsetParent;
					offsetY = canvas.offsetTop;

					while (offsetParentY !== null) {
						offsetY += offsetParentY.offsetTop;

						offsetParentY = offsetParentY.offsetParent;
					}
					return event.targetTouches[0].pageY - offsetY;
				} else {
					return event.offsetY;
				}
			}

			var draw = function (prevX, prevY, x, y) {
				context.beginPath();
				context.moveTo(prevX, prevY);
				context.lineTo(x, y);
				context.stroke();
				context.closePath();
			}

			var startDrawing = function (event) {
				prevX = getX(event);
				prevY = getY(event);
				draw(prevX, prevY, (prevX + 1), (prevY + 1));
				drawing = true;
			}

			var moveDrawing = function (event) {
				x = getX(event);
				y = getY(event);

				if (drawing) {
					draw(prevX, prevY, x, y);
				}

				prevX = x;
				prevY = y;
			}

			var completeDrawing = function () {
				if (drawing) {
					drawing = false;
					x = y = null;
				}
			}

            // canvas reset
            function reset() {
                element[0].width = element[0].width;
            }

            function resizeCanvas() {
                var ratio = window.devicePixelRatio || 1;
                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext("2d").scale(ratio, ratio);
            }

            window.onresize = resizeCanvas;
            resizeCanvas();
			reset()
        }
    }

})