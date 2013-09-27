define(["underscore", "backbone", "tpl!locationTemplate.ejs", "mediator"], function(_, Backbone, locationTemplate, mediator){
  return Backbone.View.extend({

    template : locationTemplate,

    tagName: "div",

    className: "location",

    events: {
      "click" : "onLocationClick"
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },

    onLocationClick : function(e) {
      mediator.trigger("maps:display_route", this.model.get("latlng"));
    }

  });
});