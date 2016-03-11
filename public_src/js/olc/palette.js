'use strict';

var assign = require('lodash/object/assign');

/**
 * A palette provider for BPMN 2.0 elements.
 */
function PaletteProvider(palette, create, elementFactory, spaceTool, lassoTool) {

    this._create = create;
    this._elementFactory = elementFactory;
    this._spaceTool = spaceTool;
    this._lassoTool = lassoTool;

    palette.registerProvider(this);
}

module.exports = PaletteProvider;

PaletteProvider.$inject = [ 'palette', 'create', 'elementFactory', 'spaceTool', 'lassoTool' ];


PaletteProvider.prototype.getPaletteEntries = function(element) {

    var actions  = {},
        create = this._create,
        elementFactory = this._elementFactory,
        spaceTool = this._spaceTool,
        lassoTool = this._lassoTool;


    function createAction(type, group, className, title, options) {

        function createListener(event) {
            var shape = elementFactory.createShape(assign({ type: type }, options));

            if (options) {
                shape.businessObject.di.isExpanded = options.isExpanded;
            }

            create.start(event, shape);
        }

        var shortType = type.replace(/^bpmn\:/, '');

        return {
            group: group,
            className: className,
            title: title || 'Create ' + shortType,
            action: {
                dragstart: createListener,
                click: createListener
            }
        };
    }

    assign(actions, {
        'lasso-tool': {
            group: 'tools',
            className: 'bpmn-icon-lasso-tool',
            title: 'Activate the lasso tool',
            action: {
                click: function(event) {
                    lassoTool.activateSelection(event);
                }
            }
        },
        'space-tool': {
            group: 'tools',
            className: 'bpmn-icon-space-tool',
            title: 'Activate the create/remove space tool',
            action: {
                click: function(event) {
                    spaceTool.activateSelection(event);
                }
            }
        },
        'tool-separator': {
            group: 'tools',
            separator: true
        },
        'create.task': createAction(
            'bpmn:Task', 'activity', 'bpmn-icon-task'
        )
    });

    return actions;
};

module.exports = {
    __depends__: [
        require('diagram-js/lib/features/palette'),
        require('diagram-js/lib/features/create'),
        require('diagram-js/lib/features/space-tool'),
        require('diagram-js/lib/features/lasso-tool')
    ],
    __init__: [ 'paletteProvider' ],
    paletteProvider: [ 'type', PaletteProvider ]
};