(function( $ ){
    $.fn.flyout = function(options) {

        var defaults = {
          arrowDirection: 'left',
          visible: false
        };
 
        var settings = $.extend( {}, defaults, options );
 
        return this.each(function() {
            
            $(this).css('display', settings.visible ? 'block' : 'none');
            
            if(settings.width)
                $(this).css('width', settings.width);
            
            if(settings.arrowDirection)
            {
                if(settings.arrowDirection === 'center')
                    $(this).css('left', '50px');
                else if(settings.arrowDirection === 'right')
                    $(this).css('left', $(this).attr('width'));
            }
        });
    };
    
    $.fn.flyout.show = function(o) {

        var show = o ? o : true;
 
        return this.each(function() {
            $(this).css('display', show ? 'block' : 'none');
        });
    };
})( jQuery );