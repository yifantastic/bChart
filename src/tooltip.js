/**
 * Created by CaptainMao on 5/22/15.
 */
bChart.prototype.tooltip = function (options) {
    var self = this;

    if (!bChart.existy(options)) {
        return self._options.tooltip;

    } else {
        if (bChart.typeString(options) && options === 'refresh') {
            drawTooltip();
        } else {
            self.setOptions(arguments, 'tooltip');
            drawTooltip();
        }

        return self;
    }

    function drawTooltip () {
        var tooltipDIV;
        var parentSVG = d3.select(self._options.selector);
        if (self._options.tooltip.display) {
            if (parentSVG.select('.bChart_tooltip').empty()) {
                tooltipDIV = parentSVG.append('div')
                    .attr('class', 'bChart_tooltip')
                    .style('opacity', 0);
            } else {
                tooltipDIV = parentSVG.select('.bChart_tooltip')
                    .style('opacity', 0);
            }

            var groupSVG = parentSVG.selectAll('.bChart_groups');
            groupSVG.on('mouseover', function (d) {
                d3.select(this).style('opacity', 0.7);
                tooltipDIV.transition()
                    .duration(self._options.duration)
                    .style('opacity', 1)
                    .style('display', 'block');
            })
                .on('mousemove', function (d) {
                    var selectedBar = this;
                    var tooltip_html = d.group + '(' + d.x + ') :' + d.value;
                    var selectedColor = d3.select(this).style('fill');
                    var offx = d3.event.hasOwnProperty('offsetX') ? d3.event.offsetX : d3.event.layerX;
                    var offy = d3.event.hasOwnProperty('offsetY') ? d3.event.offsetY : d3.event.layerY;
                    tooltipDIV.style('background', selectedColor)
                        .style('top', (offy-10) + 'px')
                        .style('left', (offx + 10) + 'px')
                        .style('font-family', self._options.tooltip.fontType)
                        .style('text-decoration', function () {
                            return self._options.tooltip.fontUnderline ? 'underline' : 'none';
                        })
                        .style('font-weight', function () {
                            return self._options.tooltip.fontBold? 'bold': 'normal';
                        })
                        .style('font-style', function () {
                            return self._options.tooltip.fontItalic ? 'italic' : 'normal';
                        })
                        .style('font-size', self._options.tooltip.fontSize)
                        .style('color', self._options.tooltip.fontColor)
                        .html(tooltip_html);

                })
                .on('mouseout', function (d) {
                    d3.select(this).style('opacity', 1);
                    tooltipDIV.transition()
                        .duration(self._options.duration)
                        .style('opacity', 0)
                        .style('display', 'none');
                });
        } else {
            tooltipDIV.remove();
        }
    }
};