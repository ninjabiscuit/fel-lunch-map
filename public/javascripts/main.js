require.config({
  waitSeconds : 120,
  baseUrl: '/javascripts',
  paths: {
    "async" : 'components/requirejs-plugins/src/async',
    "underscore" : "components/underscore/underscore",
    "backbone" : "components/backbone/backbone",
    "jquery": "components/jquery/jquery",
    "tpl" : "components/requirejs-tpl/tpl"
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require([
  "jquery",
  "backbone",
  "indexview",
  "mediator",
  "helpers"
  ],
  function($, Backbone, IndexView, mediator){

    $.ajaxSetup({
      headers: { "cache-control": "no-cache" }
    });

    $(document.body).ready(function(){

      var toggleMenu = function(e) {
        $(document.documentElement).toggleClass("js-nav");
        if (typeof e === "string") { return; }
        e.preventDefault();
        e.stopPropagation();
      };

      $("#menu").on("touchstart click", toggleMenu);
      mediator.on("maps:display_route", toggleMenu);

      new IndexView();

      document.addEventListener("touchstart", function(){}, true);

      Backbone.history.start({pushState: true});
    });
  }
);