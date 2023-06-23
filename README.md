# Image Board

ImageBoard is a visual tool for curating photos, collaboration and presenting bodies of work in digital form

The idea for ImageBoard was born from a need to simplify editorial projects or gallery curation, where a person needs to be able to see multiple images at once, quickly reorder them, add text, and do this collaboratively if needed. Profiles also double as portfolios as they are a digital representation of a users bodies of work. 

ImageBoard has been creative outlet for me to explore my curiosities for coding, as well as a place to showcase my technical abilities and creativity. My main objective for this project was to learn through creating unique and complex elements. The following are a few examples of these.

![](community_scroll_cont.gif)
![](right_sidebar.gif)
![](editable_elements.gif)
![](image_tile_animations.gif)

Things to come:
- continue cleaning up code, and storing repetitious code in variables. the project has been a lot of experimenting for the sake of learning, so I would like to go back and apply a best practices approach
- an accompanying camera app for mobile
- adding the ability to reorder elements in the sidebar such as folders, and links
- adding an image bank to the right so a user can drag and store multiple images into the app before setting them in their desired place
- the ability to drag images from a file manager into a square on the grid
- because their are so many filters in the community page, I would like to revise the layout to utilize the left sidebar where information is already store
- add realtime updates for collaborators and profile visitors
- public and private toggle for folders
- including collaborative folders in collaborators sidebar
- adding a blog to accompanying folder
- adding a "like" value to photos for search filters and a separate button for adding to favorites
- lastly I would like to update code based on what's currently available from Rails and React, and eventually rewrite the backend in Python and the frontend using Typescript

Image Board is a visual tool for image layout but may also act as a digital portfolio, or an extension for pre-existing portfolios. 
Prior to Image Board the project was called Memphis. Rather than continue to work on the original, I chose to take what I learned an rebuild the project piece by piece, while keeping a reference to all of the original code as I rebuild. 
For a more in depth look at what's to come, please refer to verion 1 [frontend](https://github.com/coreyleec/memphis) and [backend](https://github.com/coreyleec/memphis_backend).

UPDATE 08.16.21



I chose to continue with React Bootstrap Modal rather than  code the Modal from scratch after some issues with indexing (i.e., image tiles were appearing above the non-Bootstrap modal). I'll return to this at a later time, but right now I feel that there's more important things I can focus on.

Additionally, I gave img tags with null img src's an additional CSS state, setting them to the back using their Z Index, and I also disabled the DnD feature, when the edit condition was not met. 

And lastly, I got rid of the "Reorder Submit" button, and set the edit switch to call the function when its initial state was true and set to false.

I'm still debating on the size of the image tiles, and their on hover functionality. I am curious to try to set landscape photo heights to be half as tall and portrait photos to make the grid function a little better. I'm having an issue with my JSON server saving the reordered array exactly as it is, but I won't worry about that unless the problems continues once I've reincorporated Rails/PostgreSQL.

Centering the modal image has been a bit tricky due to some of Bootsrap Modals default style settings being set to display block, but I plan to nest a container with an absolute position in center, and then styling within that. For more details, and code examples please see my blog where I document my process.


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
        X left and right panel scrolls with window
        X edit toggle turns off DnD functionality
        - refine css transitions
in progress - drag and drop transfer from grid photo to folder in sidebar 
    Code
in progress - clean up my code
in progress - break app into smaller more specific componenents
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

