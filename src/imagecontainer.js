function ImageContainer(src, cors) {
    this.src = src;
    this.image = new Image();
    var self = this;
    this.promise = new Promise(function(resolve, reject) {
        self.image.onload = resolve;
        self.image.onerror = reject;
        if (cors) {
            self.image.crossOrigin = "anonymous";
        }
        if (!(/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(src))
        {
            return dummy.promise.then(function(image) {
                self.image = image;
            });
        }
        self.image.src = src;
        if (self.image.complete === true) {
            resolve(self.image);
        }
    })['catch'](function() {
        var dummy = new DummyImageContainer(src);
        return dummy.promise.then(function(image) {
            self.image = image;
        });
    });
}
