// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos ) {
    var bgData = bgImg.data; // Access to the background image data.
    var fgData = fgImg.data; // Access to the foreground image data.

// Iteratively loop through all pixels of the foreground image.
    for (var y = 0; y < fgImg.height; y++) { // Loop through y
        for (var x = 0; x < fgImg.width; x++) { // Loop through x
            var fgIndex = (y * fgImg.width + x) * 4; // Calculate the current pixel index for the foreground image
            var bgX = x + fgPos.x; // Calculate corresponding x coordinates in the background image
            var bgY = y + fgPos.y; // Calculate corresponding y coordinates in the background image
            if (bgX >= 0 && bgX < bgImg.width && bgY >= 0 && bgY < bgImg.height) { // Boundary check to ensure the pixel is within the background image limits
                var bgIndex = (bgY * bgImg.width + bgX) * 4;

                var fgAlpha = fgData[fgIndex + 3] * fgOpac; // Calculate the actual opacity of the foreground pixel

                // Adjusting the RGBA (Red, Green, Blue, Alpha) channels
                bgData[bgIndex] = (fgData[fgIndex] * fgAlpha + bgData[bgIndex] * (255 - fgAlpha)) / 255; // Calculate new R channel value by combining R of fgImg and bgImg based on the A channel of fgImg - Weighted average
                bgData[bgIndex + 1] = (fgData[fgIndex + 1] * fgAlpha + bgData[bgIndex + 1] * (255 - fgAlpha)) / 255; // Calculate new G channel value by combining G of fgImg and bgImg based on the A channel of fgImg - Weighted average
                bgData[bgIndex + 2] = (fgData[fgIndex + 2] * fgAlpha + bgData[bgIndex + 2] * (255 - fgAlpha)) / 255; // Calculate new B channel value by combining B of fgImg and bgImg based on the A channel of fgImg - Weighted average
                bgData[bgIndex + 3] = Math.min(bgData[bgIndex + 3] + fgAlpha, 255); // Update the A channel of bgImg. Increase the A value of bgImg pixels based on the fgImg's fgAlpha
            }
        }
    }
}
