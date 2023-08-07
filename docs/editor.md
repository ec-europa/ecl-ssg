# Editor

This whole project started from the idea of having the possibility of using a rich text editor to simplify the creation of content using ECL webcomponents.
When this started to be available, in the form a [ckeditor plugin we developed](https://ecl-webcomponents.netlify.app/playground), it seemed natural to create a simple static site generator which would use it to generate pages through an admin interface.

This was identified in [netlify cms](https://v1.netlifycms.org/) and the editor was integrated into it, so it can be used at `./admin` to generate pages (and other content).

## How do i access the admin interface?

At `localhost:8000/admin`
To access the admin interface locally remind to change the commented line at ./static/admin/config.yml, from `#local_backend: true` to `local_backend: true`.

Mind the fact that if this doesn't have to pushed ever, locally it has to be switched back whenever committing.
Furthermore run `yarn netlify-cms-proxy-server` and then access the admin interface at: `localhost:8000/admin`.

## How does it work?

It's a ckeditor plugin, we add one main ECL button in the textarea of a classic edition of ckeditor 5.
Clicking on this button reveals a big (...too big) dropdown, it contains buttons for each of the available components. Some of them, when they are children, will be nested into their parent button and identified by a label usually containing "items".

Clicking on the icon will open the form for generating the requested webcomponent markup. There are fields where to insert your custom data, technically this will generate html attributes, so only plain text can be inserted.

At the moment most of the components come with predefined data, because the editor was mainly used for demoing purposes, this also helps in getting a consistent layout when simply clicking on the save button without editing the form, but it's clear that most of the times, if the intention is to insert user data this implies deleting the existing values and typing them again.

When the configuration is done, clicking on the "save" button will insert the component in the editor and it will also be visible in the preview area on the right, if enabled.

## Why do i see all the standard buttons in a ckeditor instance, aren't most of them duplicated in the webcomponents?

Oh yes, the plugin is built using the same buttons as the classic textarea, probably not the best idea, we should complain about this! It will probably make sense to remove most if not all the standard ckeditor buttons, mind the fact that elements created this way will not have any particular styling from ECL, there is no general css from ECL loaded in this project, styles are directly coming from the webcomponents.

## What is this Ui that i see in the editor textarea?

The editor doesn't render the webcomponents in a browser, so we style the components you create in order to make them identifiable, it would be otherwise very tricky to move around the complex structures you might create.

The background colors and the label are tryingto help you identify the different elements you created.and to know where what you might be typing is going to be placed, look at your cursor, when you type on a button to create an ECL component this will give you confidence about where your content will be placed.

## How do i move in the textarea?

As said the editor has a complex task, a few gesture are handled to make the markup traversable in the textarea.

 - The **Enter** command moves you out of the current component, so it has to be used only when the component is finished, or a child component is created to start inserting the next one, when needed. 
 If you are in a child component pressign `Enter` will move you to the next available position in the parent component, pressing it again would move you to the next position available after the parent.

 - **Shift+enter** can be used to insert line breaks. This is the way to manage the insertion of block of text where you want to have line breaks, clicking enter would, as said before, move you out of the component you are editing, instead.

 - **arrowUp** can be used to traverse back the ECL webcomponents markup in the textarea, also the mouse can normally be used, but using `arrowUp` is more reliable.

 ### How do i delete content that i created wrongly?

Mmh..try `backspace`, but it might not work always as expected, handling the markup in the editor is complex, sometimes you might want to enable the "source code" view mode in ckeditor and adjust the markup manually, it is sub-optimal but it also gives a way to handle potentially blocking situations.

### How do i edit a component that i've inserted before?

For most components it will be possible to edit an instance created by going into its area and clicking the related button in the toolbar, the form will load the current values and you can further edit the component. This is not possible in components that can include other instances of the same component (like grid).

### How do i insert a nested component inside the parent?

It's easy, once inserted the parent click on the child button in the toolbar, when you will save that, you will be in the item's area in the editor, you should also see that visually thanks to a label that appears, if content is expected in the child, start typing and when you've done click `Enter`, this will complete the insertion of the first child component, if then you want to include some other click on the relative button in the toolbar and you can go on like this until you've created all the needed markup.

## How do i know what is expected as content of the component i created?

Many of the ecl webcomponents expect content, indeed, to know how complex components are built, which component to include to get what, you can refer to https://ecl-webcomponents.netlify.app, there you'll find what you need, and to a certain extent, you could also use that markup and copy paste it in the editor.

## Where do i complain about the hundred bugs i've already found?

The plugin is far from being perfect, per se it has a huge task which is potentially handling a full page content markup, it has been challenging to reach the current status, where you can build potentially do it, but the editor is pretty rough, the ECL dropdown is giant and you need to adapt the window in the cms in order to be able to see it all, some components might not have been ever tested, there could be misalignments with the current version of the ecl-webcomponents and many situations where you might find yourself blocked, or simply not able to fully reproduce what you had in mind.
We know the limitations of this editor and the criticalities about it, but being such a powerful tool, it feels worth making it available despite them.

There is no plan to offer continuos support about the editor, and no plan about keep developing on it, but it all depends on how much this tool will be used and how many requests about it we could receive.
If this remains a playground to try out ecl-webcomponents, maybe there will not be any further development, just an alignment of the components to the version of the webcomponents used.

## Where do i find the documentation about the cms?

Our brief document is available [here](./cms.md)

## Which version of ckeditor uses?

It is based on CkEditor 36.0.1 and it's not planned to upgraded it to newer versions of ckeditor because it would involve a deep rewriting of the plugin.
