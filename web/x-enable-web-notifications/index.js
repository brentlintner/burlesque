/*
* <x-enable-web-notifications>
*/
;(function () {
  function cleanup(tag, msg) {
    return function () {
      console.warn(msg), $(tag).find('button').hide()
    }
  }

  function show_request_permission_button(tag) {
    $(tag)
      .show()
      .find('button')
      .on('click', function () {
        Notify
          .requestPermission(
            cleanup(tag, "web notifications allowed"),
            cleanup(tag, "notification access denied- going silent"))
      })
  }

  function on_created() {
    this_tag = this
    Notify.isSupported() ?
      Notify.needsPermission() && show_request_permission_button(this) :
      console.warn('no (web) notification support detected')
  }

  xtag.register('x-enable-web-notifications', {
    extends: 'button',
    lifecycle: {
      created: on_created
    }
  })
}());
