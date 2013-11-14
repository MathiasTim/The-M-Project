M.ListView = M.View.extend({
    _type: 'M.ListView',

    _viewModelMapping: null,

    _template: _.tmpl(M.TemplateManager.get('M.ListView')),

    _render: function () {
        M.View.prototype._render.apply(this, arguments);
    },

    _renderChildViews: function () {
        if (this.collection) {
            this.addItems(this.collection.models);
        }
    },

    initialize: function () {
        M.View.prototype.initialize.apply(this, arguments);

        if (this.collection) {
            this._applyListener();
        }
        this._viewModelMapping = {};
    },

    _applyListener: function () {


        this.listenTo(this.collection, 'add', function (model) {
            console.log('add');
            this.addItem(model);
        });

        this.listenTo(this.collection, 'fetch', function () {
            console.log('fetch');
            //that.addAll();
        });
        this.listenTo(this.collection, 'change', function () {
            console.log('change!');
            //that.addAll();
        });
        this.listenTo(this.collection, 'remove', function (model) {
            this._viewModelMapping[model.cid].$el.remove();
        });

        this.listenTo(this.collection, 'filter', function () {
            console.log('filter');
            //this.addItems(models);
        });

        this.listenTo(this.collection, 'sort', function () {
            //this.addItems(this.collection.models);
            console.timeEnd('a');
        });
    },

    addItems: function (models) {
        _.each(models, function (model) {
            this.addItem(model);
        }, this);
    },

    addItem: function (model) {
        var view = null;
        if (this.listItemView) {
            view = this.listItemView.create({
                scope: this.scope,
                value: model
            });
            view.render();
            this.$el.find('[data-childviews="list"]').append(view.$el);
            this._viewModelMapping[view.model.cid] = view;
            view.delegateEvents();
        }
    }
});