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
      event.preventDefault();
      return false;
    } else {
      this.open(event);
    }
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
      $(this.el).html('&nbsp;');
    } else if (state == 'mark') {
      $(this.el).addClass('mark');
      $(this.el).html('@');
    } else {
      if (this.model.has_mine()) {
        $(this.el).addClass('blow');
        $(this.el).html('M');
      } else {
        $(this.el).addClass('open');
        var mines_count = this.model.count_mines();
        $(this.el).html(mines_count > 0 ? mines_count : '&nbsp;');
      }
    }
    return $(this.el);
  }
});