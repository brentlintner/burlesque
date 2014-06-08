###
 A component to create reveal.js presentations.

 x-git-show
   div
     .slides
       section
         # content
     .slides
       section
         # content
       section
         # content
###
xtag.register "x-git-show",
  extends: "div"
  lifecycle:
    created: ->
      $(this).children("div").addClass "reveal"
      Reveal.initialize controls: true
