/*!
 * jQuery Video Popup Player Plugin v2.0
 * http://lab.abhinayrathore.com/jquery_youtube/
 * 
 * Modified on November 27th 2012 by F. Carrega for Treize37
 * http://www.treize37.com
 */

(function ($) {
    var VideoDialog = null;

    var methods = {
        //initialize plugin
        init: function (options) {
            options = $.extend({}, $.fn.VideoPopup.defaults, options);

            // initialize Video Player Dialog
            if (VideoDialog == null) {
                VideoDialog = $('<div></div>').css({ display: 'none', padding: 0 });
                $('body').append(VideoDialog);
                VideoDialog.dialog({ autoOpen: false, resizable: false, draggable: options.draggable, modal: options.modal,
                    close: function () {
						VideoDialog.html(''); 
						$(".ui-dialog-titlebar").show();
					}
                });
            }

            return this.each(function () {
                var obj = $(this);
                var data = obj.data('Video');
                if (!data) { //check if event is already assigned
                    obj.data('Video', { target: obj, 'active': true });
                    $(obj).bind('click.VideoPopup', function () {
                        var videoId = options.videoId;
                        if ($.trim(videoId) == '') videoId = obj.attr(options.idAttribute);
                        var videoTitle = options.title;
                        if ($.trim(videoTitle) == '') videoTitle = obj.attr('title');

                        // Format Video URL
                        var VideoURL = getVideoURL(options, videoId);

                        //Setup Video Dialog
                        VideoDialog.html(getVideoPlayer(VideoURL, options.width, options.height, options.provider));
                        VideoDialog.dialog({ 'width': 'auto', 'height': 'auto' }); //reset width and height
                        VideoDialog.dialog({ 'minWidth': options.width, 'minHeight': options.height, title: videoTitle });
                        VideoDialog.dialog('open');
						$(".ui-widget-overlay").fadeTo('fast', options.overlayOpacity); //set Overlay opacity
						if(options.hideTitleBar && options.modal){ //hide Title Bar (only if Modal is enabled)
							$(".ui-dialog-titlebar").hide(); //hide Title Bar
							$(".ui-widget-overlay").click(function () { VideoDialog.dialog("close"); }); //automatically assign Click event to overlay
						}
						if(options.clickOutsideClose && options.modal){ //assign clickOutsideClose event only if Modal option is enabled
							$(".ui-widget-overlay").click(function () { VideoDialog.dialog("close"); }); //assign Click event to overlay
						}
                        return false;
                    });
                }
            });
        },
        destroy: function () {
            return this.each(function () {
                $(this).unbind(".VideoPopup");
                $(this).removeData('Video');
            });
        }
    };

	function getVideoURL(options, videoId) {
		var VideoURL = null;
		switch (options.provider) {
			case "YouTube" :
				VideoURL = "http://www.youtube.com/embed/" + videoId + "?rel=" + options.related + "&showsearch=" + options.showsearch;
            	VideoURL += "&autoplay=" + options.autoplay + "&color1=" + options.color1 + "&color2=" + options.color2;
            	VideoURL += "&controls=" + options.controls + "&fs=" + options.fullscreen + "&loop=" + options.loop;
            	VideoURL += "&hd=" + options.hd + "&showinfo=" + options.showinfo + "&color=" + options.color + "&theme=" + options.theme;
				VideoURL += "&enablejsapi=" + options.api  + "&autohide=" + options.autohide + "&modestbranding" + options.logo;
				VideoURL += "&border=" + options.border;
				break;
			
			case "Vimeo" :
				VideoURL = "http://player.vimeo.com/video/" + videoId + "?autoplay=" + options.autoplay + "&api=" + options.api;
				VideoURL += "&loop=" + options.loop + "&logo=" + options.logo + "&color=" + options.color1 + "&title=" + options.showinfo;
				VideoURL += "&byline=" + options.byline + "&portrait=" + options.portrait;
				break;
			
			case "Dailymotion" :
				VideoURL = "http://www.dailymotion.com/embed/video/" + videoId + "?autoplay=" + options.autoplay + "&api=" + options.api;
				VideoURL += "&info=" + options.showinfo + "&related=" + options.related;
				break
		}
		return VideoURL;
	}

    function getVideoPlayer(URL, width, height) {
		var VideoPlayer = '<iframe title="Video player" style="margin:0; padding:0;" width="' + width + '" ';
	    VideoPlayer += 'height="' + height + '" src="' + URL + '" frameborder="0" ';
	 	VideoPlayer += 'webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>';
        return VideoPlayer;
    }

    $.fn.VideoPopup = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.VideoPopup');
        }
    };

    //default configuration
    $.fn.VideoPopup.defaults = {
		'videoId': '',
		'title': '',
		'idAttribute': 'rel',
		'draggable': false,
		'modal': true,
		'width': 640,
		'height': 480,
		'hideTitleBar': false,
		'clickOutsideClose': false,
		'overlayOpacity': 0.5,
		'autohide': 2,
		'autoplay': 1,
		'color': 'white',
		'color1': 'FFFFFF',
		'color2': 'FFFFFF',
		'controls': 1,
		'fullscreen': 1,
		'loop': 0,
		'hd': 1,
		'showinfo': 0,
		'theme': 'light',
		'api': 0,
		'related': 0,
		'showsearch': 0,
		'logo': 1,
		'border': 0,
		'byline': 0,
		'portrait': 0
    };
})(jQuery);