// 給js彈窗套件用的參數 
alertify.defaults = {
    // dialogs defaults
    autoReset: true,
    basic: false,
    closable: true,
    closableByDimmer: true,
    frameless: false,
    maintainFocus: true, // <== global default not per instance, applies to all dialogs
    maximizable: true,
    modal: true,
    movable: true,
    moveBounded: false,
    overflow: false,
    padding: true,
    pinnable: true,
    pinned: true,
    preventBodyShift: false, // <== global default not per instance, applies to all dialogs
    resizable: true,
    startMaximized: false,
    transition: 'pulse',

    // notifier defaults
    notifier: {
        // auto-dismiss wait time (in seconds)  
        delay: 5,
        // default position
        position: 'bottom-right',
        // adds a close button to notifier messages
        closeButton: false
    },

    // language resources 
    glossary: {
        // dialogs default title
        title: '西部樂園',
        // ok button text
        ok: '確定',
        // cancel button text
        cancel: '取消'
    },

    // theme settings
    theme: {
        // class name attached to prompt dialog input textbox.
        input: 'ajs-input',
        // class name attached to ok button
        ok: 'ajs-ok',
        // class name attached to cancel button 
        cancel: 'ajs-cancel'
    }
};