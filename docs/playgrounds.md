# Playground(s)

There are two "special" branches, `ec-playground` and `eu-playground`, that we use to create two public environments that can be used to make experiments, try out the admin interface and see the result of these actions in real preview urls publicly accessible.
Our previews are using netlify:
 -  https://ec-playground--ecl-ssg.netlify.app/
 -  https://eu-playground--ecl-ssg.netlify.app/

 These are just two "websites" with only an home page, the same home page using the components from the two systems, EC and EU.

 ## The cms

 What is interesting is the netlify cms attached to those websites, accesing the cms at:
  -  https://ec-playground--ecl-ssg.netlify.app/admin
  -  https://eu-playground--ecl-ssg.netlify.app/admin

will give you access to the admin interface of these two environments where you can generate content or edit existing one. 

## How to access the admin interface?

Access is restricted, if you're really interested in trying out this tool you can submit a request in order to be allowed. Mind the fact that these are "playgrounds", whatever will be published in it would be "stored" in our github repo, so normally save without publishing, you will still get a preview url without affecting the main preview for the whole environment.

## How does the workflow works?

The cms is using an editorial worflow, this way you can save your content without publishing it, you get a preview but the main branch in the repo will not be affected.
If you want to experiment more than just by creating a single page you're allowed to publish your pages, let's just wait for the moment when this will completely break the website, but as long as it doesn't happen..well, have fun :)
