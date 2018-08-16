require(['CSSModule'], function(CSSModule) {
  CSSModule.preload('xp/ascii/css/style.css');
});


define(['xp/ascii/js/fluid.solver', 'xp/ascii/js/fluid.display', 'CSSModule', 'jquery'],
function(FluidField, FluidDisplayAscii, CSSModule, $) {

  var fluid;
  var el_fluid;
  var display;
  var displayFPS;
  var resize;
  var $el_main;
  var $el_container;


  return {
    prepare: function(parent) {
      // physics solver
      fluid = new FluidField();

      // display DOM element
      el_fluid = document.createElement('p');
      el_fluid.id = 'ascii-fluid';
      el_fluid.unselectable = 'on';


      // display component

      display = new FluidDisplayAscii(fluid);
      fluid.setIterations(5);
      display.Config.density = 180;


      // other DOM stuff


      var $el_hackermode = (function() {
        var $el =
          $('<a />')
            .attr('href', '#')
            .text('Switch to hacker mode');

        $el.mousedown(function(e) {
          $el_container.toggleClass('ascii-hackermode')

          text = $el.text()
          if (text.search("hacker") != -1) {
            text = text.replace("hacker", "designer")
          }
          else {
            text = text.replace("designer", "hacker")
          }
          $el.text(text)
        });

        return $el;
      }());



      var $el_card = $('<div />').attr('id', 'ascii-card')
        .addClass('overlay')
        .append('<br />')
        .append('<dl><dd>"People create programs to direct processes. ' +
            'In effect, we conjure the spirits of the computer with our spells." <br/><br/></dd>' +
            '<dt>&mdash;The Structure &amp; Interpretation<br/>of Computer Programs </dt></dl>'
        )
        .append('<br/>&rarr; ')
        .append($el_hackermode)
        .append('(<a href="http://news.ycombinator.com/item?id=3567665" target="_blank">?</a>)<br/>')
        .append('<br /><br/>')


      var $el_fluid = $(el_fluid);
      var $el_clear =
        $('<button />')
          .text('"Disappear!"')
          .mousedown(function(e) {
            $el_fluid
              .addClass('fading')
              .fadeOut('medium', function() {
                fluid.reset();
                $el_fluid
                  .removeClass('fading')
                  .fadeIn('fast');
              });
          });


      var $el_controls =
        $('<div />')
          .attr('id', 'ascii-controls')
          .addClass('overlay')
          .append('<br/>')
          .append($el_clear)
          .append('<br/><br/>');


      $el_main =
        $('<div />')
        .attr('id', 'ascii-main')
        .hide()
        .append($el_card)
        .append('<br />')
        .append($el_controls);


      $el_container =
        $('<div />')
          .attr('id', 'ascii-container')
          .append($el_main)
          .append(el_fluid);


      displayFPS = function() {
        var frames = 0;
        var time_start = Date.now();
        var $DOMfps =
          $('<div />')
            .id('ascii-fps')
            .appendTo($el_container);

        $DOMfps.show();

        return function(frame) {
          var time_end = Date.now();
          frames++;
          if ((time_end - time_start) >= 1000) {
            $DOMfps.text('fps: ' + Math.round((1000 * frames / (time_end - time_start))));

            time_start = time_end;
            frames = 0;
          }
        };
      };


      // resize fix

      !function () {
        var $dummy =
          $('<span />')
            .addClass('____ascii-chartest____')
            .text('M')
            .css({visibility: 'hidden'})
            .appendTo('body');

        var glyphDims;

        // defer for CSS engine on glyphDims calculation
        setTimeout(function() {
          // this is a really horrible way of doing this in case you were wondering
          glyphDims = {
            width:  $dummy.width() - 1,
            height: $dummy.height() - 2 // would prefer css('line-height') but can't seem to make it happen
          };
          $dummy.remove();

          resize = (function() {
            var $parent = $(parent);
            return function(e) {
              // this won't be perfect, as the screen dims won't often be evenly disible
              fluid.setResolution(Math.round($parent.height() / glyphDims.height), Math.round($parent.width() / glyphDims.width));
            };
          }());

          $(window)
            .resize(resize)
            .trigger('resize');
        }, 10);
      }();


    },


    go: function(parent) {
      CSSModule.enable('xp/ascii/css/style.css');

      $(parent).append($el_container);

      display.bindElement(el_fluid);
      display.Animation.start( /*displayFPS()*/ );

      $el_main.fadeTo('slow', 1);
    },


    destroy: function(parent) {
      CSSModule.disable('xp/ascii/css/style.css');

      $(parent).empty();
      display.Animation.stop();

      $(window).unbind('resize', resize);

      fluid = null;
      el_fluid = null;
      display = null;
      displayFPS = null;
      resize = null;
      $el_main = null;
      $el_container = null;
    }
  }

});