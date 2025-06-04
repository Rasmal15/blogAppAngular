// ==================================================
// 
// jquery-input-mask-phone-number 1.0.14
//
// Licensed (The MIT License)
// 
// Copyright © Raja Rama Mohan Thavalam <rajaram.tavalam@gmail.com>
//
// Last Updated On: 22/Aug/2020 IST  12:05 AM 
//
// ==================================================

(function ($) {
    $.fn.usPhoneFormat = function (options) {
        var params = $.extend({
            format: '1*****7890',
            international: false,

        }, options);

        if (params.format === '1*****7890') {
            console.log('gdg')
            $(this).bind('paste', function (e) {
                console.log('fedefw')
                e.preventDefault();
                var inputValue = e.originalEvent && e.originalEvent.clipboardData.getData('Text');
                inputValue = inputValue.replace(/\D/g, '');
                if (!$.isNumeric(inputValue)) {
                    return false;
                } else {
                    console.log('ee')
                    if (inputValue.length === 10) {
                        inputValue = inputValue[0] + '*****' + inputValue.slice(-4);
                    }
                    $(this).val(inputValue);  // Update the input field
                    // $(this).val(inputValue);
                    // $(this).val('');
                    // inputValue = inputValue.substring(0, 12);
                    // $(this).val(inputValue);
                }
            });
            $(this).on('keydown touchend', function (e) {
                e = e || window.event;
                var key = e.which || e.keyCode; // keyCode detection
                var ctrl = e.ctrlKey || e.metaKey || key === 17; // ctrl detection
                if (key == 86 && ctrl) { // Ctrl + V Pressed!
                    // Do nothing here (paste logic is handled already)
                } else if (key == 67 && ctrl) { // Ctrl + C Pressed!
                    // Do nothing here (copy logic is handled already)
                } else if (key == 88 && ctrl) { // Ctrl + X Pressed
                    // Do nothing here (cut logic is handled already)
                } else if (key == 65 && ctrl) { // Ctrl + A Pressed!
                    $(this).trigger("paste");
                } else if (key != 9 && e.which != 8 && e.which != 0 && !(e.keyCode >= 96 && e.keyCode <= 105) && !(e.keyCode >= 48 && e.keyCode <= 57)) {
                    return false; // Block non-numeric characters
                }
                
                var curval = $(this).val();
                if (curval.length > 7) {
                    console.log(curval)
                    // After first digit, add asterisks
                    $(this).val(curval + '*'.repeat((curval.length) - 4) + curval.slice(-4));
                // } else if (curval.length === 8) {
                //     // After the asterisks part, append the last four digits
                //     $(this).val(curval + curval.slice(-4));
                // }
                }
                $(this).attr('maxlength', '13'); // Limit to 10 characters max
            });
        }
    }
}(jQuery));
