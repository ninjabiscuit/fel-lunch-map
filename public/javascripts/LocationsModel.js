define(['underscore', 'backbone'], function(_, Backbone) {
  return Backbone.Model.extend({
    defaults : {
      name: "",
      latlng: ""
    }
  });
});