###
 <x-enable-web-notifications>
###
cleanup = (tag, msg) ->
  ->
    console.warn(msg)
    $(tag).find("button").hide()

show_request_permission_button = (tag) ->
  $(tag).show().find("button").on "click", ->
    Notify.requestPermission(
      cleanup(tag, "web notifications allowed"),
      cleanup(tag, "notification access denied- going silent")
    )

on_created = ->
  this_tag = this

  if Notify.isSupported()
    Notify.needsPermission()
    show_request_permission_button(this_tag)
  else console.warn("no (web) notification support detected")

xtag.register "x-enable-web-notifications",
  extends: "button"
  lifecycle:
    created: on_created
