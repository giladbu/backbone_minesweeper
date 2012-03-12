// **This example illustrates how to use a Collection of Models to store data, and how to tie changes in those to a View.**
//
// _Working example: [3.html](../3.html)._  
// _[Go to Example 4](4.html)_
//
var Cell = Backbone.Model.extend({
  defaults: {
    x: 0,
    y: 0,
    mine: false,
    state: 'cover'
  },

  x: function() {
    return this.attributes.x;
  },

  y: function() {
    return this.attributes.y;
  },

  has_mine: function() {
    return this.attributes.mine;
  },

  board: function() {
    return this.collection;
  },

  find_adjacent: function() {
    result = [];
    left_border = (this.y() == 0) ? 0 : this.y() - 1;
    top_border = (this.x() == 0) ? 0 : this.x() - 1;
    right_border = (this.y() == (this.board().width - 1)) ? this.y() : this.y() + 1;
    bottom_border = this.x() == (this.board().height - 1) ? this.x() : this.x() + 1;
    for(var i= top_border ; i <= bottom_border ; i ++) {
      for(var j= left_border ; j <= right_border ; j ++) {
        cell = this.board().get_cell(i, j);
        result.push(cell);
      }
    }
    return result;
  },
  mark_toggle: function() {
    this.set({state: this.get('state') == 'cover' ? 'mark' : 'cover'})
  },
  count_mines: function() {
    return _.reduce(this.find_adjacent(), function(memo, cell) {
      return memo += cell.has_mine() ? 1 : 0;
    }, 0);
  },

  open: function() {
    this.set({state: 'open'});
    if (this.count_mines() == 0) {
      _.forEach(this.find_adjacent(), function(cell) {
        if(cell.get('state') != 'open') {
          cell.open();
        }
      });
    }
  }
});
