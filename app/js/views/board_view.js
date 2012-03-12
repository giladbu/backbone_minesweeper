var BoardView = Backbone.View.extend({    
  tagName: 'div',
  className: 'board',
  initialize: function() {
    _.bindAll(this, 'render', 'render_control'); // fixes loss of context for 'this' within methods
    $('.container').append($(this.el));
    this.render_control();
    this.render();
  },

  render_control: function() {
    control = new ControlView({model: this.model});
    var row = $("<div class='row'/>");
    $(row).append(control.render());
    $(this.el).prepend($(row));
  },

  render: function() {
    for (var i=0 ; i < this.model.height ; i++) {
      var row = $("<div class='row'/>");
      for (var j=0 ; j < this.model.width; j++) {
        var cell_view = new CellView({model: this.model.get_cell(i, j)});
        $(row).append(cell_view.render());
      }
      $(this.el).append(row);
    }
  }
});
