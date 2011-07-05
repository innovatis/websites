(function(){
  $.fn.imageFadeIn = function(){
    this.each(function(){
      var image = $(this),
            src = image.attr('src');

      image.load(function(){
        image.fadeIn();
      }).attr('src',src);
    });
  };

  $.fn.liveGallery = function(options){
    var gallery = new Gallery(options);
    this.data('liveGallery',gallery);
    gallery.run();
    return this;
  },

  Gallery = function(options){
    $.extend(true,this,options);

    this.viewer     = $(this.viewerSelector);
    this.scrollable = $(this.scrollableSelector);
  },

  // set your own global custom prefix
  PREFIX      = $.fn.PREFIX      = $.fn.PREFIX      || '.';

  Gallery.prototype = {
    viewer:     null,
    scrollable: null,
    gallerySelector:    PREFIX+'gallery',
    viewerSelector:     PREFIX+'viewer',
    currentSelector:    PREFIX+'current',
    scrollableSelector: PREFIX+'scrollable',
    thumbnailSelector:  PREFIX+'item img',

    onSeek: function(a,index){
      this.getItems().
        eq(index).
        find('img:first').
        trigger('click');
    },

    init: function(){
      var scrollable = this.scrollable,
          viewer     = this.viewer;

      scrollable.
        scrollable({ onSeek: this.onSeek }).
        find(this.thumbnailSelector).
          live('click',function(){
            var element = $(this),
              newSrc    = element.attr('data-src'),
              oldImage  = viewer.find('img'),
              newImage  = $(new Image());

              scrollable.
              find('img').
              removeClass(this.currentSelector);

            element.addClass(this.currentSelector);

            oldImage.before(newImage);
            newImage.load(function(){
              oldImage.fadeOut('fast',function(){
                oldImage.remove();
              });
            }).attr('src',newSrc);
          });
    },

    run: function(){
      this.init();
      $('img.'+PREFIX+'fade-in').imageFadeIn();
      this.scrollable.
        find(this.thumbnailSelector).
        first().
        trigger('click');
    }
  };
  $(function(){
    $(this.gallerySelector).liveGallery();
  });
})();
