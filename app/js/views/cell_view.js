var CellView = Backbone.View.extend({
  tagName: 'div',
  className: 'cell',
  events: {
    'mousedown': 'mark',
    'contextmenu' : 'contextmenu'
  },
  initialize: function (opts){
    _.bindAll(this, 'render', 'mark', 'open'); // fixes loss of context for 'this' within methods
    this.width = 1;
    this.model.bind('change', this.render);
    this.render();
  },
  contextmenu: function(event) {
    if(event.button != 0) {
      event.preventDefault();
    }
  },
  mark: function(event) {
    if(event.button == 2) {
      this.model.mark_toggle();
    } else {
      this.open(event);
    }
    event.preventDefault();
    return false;
  },
  open: function(event) {
    if (this.model.has_mine()) {
      this.model.collection.forEach(function(cell) {
        cell.set({state: 'open'})
      });
    } else {
      this.model.open();
    }
  },
  render: function() {
    $(this.el).addClass('span1');
    var state = this.model.get('state');
    $(this.el).removeClass('cover open blow mark');
    if (state == 'cover') {
      $(this.el).addClass('cover');
    } else if (state == 'mark') {
      $(this.el).addClass('mark');
      $(this.el).html('&#x2691;');
    } else {
      if (this.model.has_mine()) {
        $(this.el).addClass('blow');
       $(this.el).html('&#x274B;');
      } else {
        var mines_count = this.model.count_mines();
        $(this.el).addClass('open' + (mines_count > 0 ? ' open'+mines_count : ''));
        $(this.el).html(mines_count);
      }
    }
    return $(this.el);
  }
});