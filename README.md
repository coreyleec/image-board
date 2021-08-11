# Image Board

Image Board is a visual tool for image layout but may also act as a digital portfolio, or an extension for pre-existing portfolios. 
Prior to Image Board the project was called Memphis. Rather than continue to work on the original, I chose to take what I learned an rebuild the project piece by piece, while keeping a reference to all of the original code as I rebuild. Here are links to verion 1 [frontend](https://github.com/coreyleec/memphis) and [backend](https://github.com/coreyleec/memphis_backend).

![](demo.gif)

Changes in this iteration:

    - improve 2 dimensioanl Drag and Drop movement
    - save reordered photo array to the backend
    - incorperate masonry effect within the DnD grid

And upcoming changes include: 

    Photo series adjacent 
        - incorperate a blog feature that associates with each photo Folder or can be stand alone
        - add user and tag search
        - add user messaging
        - add public feed
    Aesthetics and functionality
        - clean up sidebar navigation
        - incorperate "settings" in right panel
        - left and right panel scrolls with window
        - edit toggle turns off DnD functionality
        - refine css transitions
        - drag and drop transfer from grid photo to folder in sidebar 
    Code
        - clean up my code
        - break app into smaller more specific componenents
    Misc
        - Present other code related projects as I build out the portfolio aspect

I'll include a more in depth walkthrough on my blog, as well as a link once the app is deployed.

For a more detailed explanation check this .

## References

This example was compiled adapting solutions from different sources.

After following several DnD grid examples, I found [blog post](https://thisisvini.com/responsive-mosaic-with-dnd-reactjs) by [viniciusgerevini](https://github.com/viniciusgerevini/react-responsive-mosaic) who had the cleanest implementation I've seen thus far. 

I'll also include his references, because it took all three from me to understand how everything worked. 

For the responsive masonry grid there's this [blog post](https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb).

And this react-dnd sortable [example](https://react-dnd.github.io/react-dnd/examples/sortable/simple) 

## Sidenotes

Although, this is above my skill level at the time of writitng this, it took so much reading to really grasp and utilize these examples, and I hope that what I've done with it and the documentation I'll eventually post will be of some help others that come to similar roadblocks in the future. 

