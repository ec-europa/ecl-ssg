# The cms

ECL ssg uses [netlify cms](https://v1.netlifycms.org/) (or decap cms, future wise..) which is far from being a cms in the traditional term.

Mainly it is an admin interface attached to a git repository, the purpose of which is usually to manage or create md or mdx files.
In ECL ssg the content created through the cms does not only create new pages, but can also override the default content shown in the website, like the site header, the footer, the menu.

## Content types

We currently configure a very basic set of collections, for pages there are `home` and `page` types, it's easy to feel that one is meant for the home page(s) and the second for all the rest of the pages of your website.

### What does the "page" content type offer?

At the moment you will find a few fields:

- **path**: it is meant for you to set a custom path (relative path, no language prefixes) for your content that would otherwise be reachable at an automated path using the title of your content.
- **title**: The title of your content, it will be used to generate the automated path to reach the page if no value is provided in the path field.
- **content top**: This is a rich text area with the plugin enabled, it's meant for you to insert any content that has to go on top of your content area limited by an ecl-container.
- **body**: This is the main content of your page, you should use this textarea to insert all the content needed by a page.

## How do i use the interface?

The Ui provided by the cms is pretty neat, since we enabled multilingualism you will have the chance to see a side by side layout with the default language (english) on the left and another language (if enabled) on the right.
It is possible to toggle the preview, so that it appears on the right instead of the translation, the preview will render the webcomponents in order to give you confidence about what you are inserting.

Mind the fact that currently there are usability issues regarding our ckeditor plugin, its interface, particularly the dropdown, is simply too big and you will have to enlarge the left side of the page to be able to fully see it, this might improve in the future.

## How do i use the workflow?

As said the cms is mainly an interface to edit files in the repository, the way it works is to create pull requests when you save a content and to merge them when you publish it.
The workflow gives you the chance to review the content created also by accessing the preview url before publishing a content and getting it in your main preview for the website. We are assuming here the usage of the playground environments, if you are using the tool for your own projet it will be up to you to configure netlify, if you plan to use it.

So, assuming that you are using a playground environment, you're invited to save your content as draft but not to publish it, as we have one env for all the users that might request access it would be better not to pollute the two branches these environments are attached to.

## I don't need multilingualism, how do i disable it?

It's a bit tricky, ECL ssg defines a multilanguage environment and its layout elements, like footer, header are already capable of both content translation and string translation, disabling multilanguage would mean rewriting these components and changing the base configuration in `gatsby-config.js`, you will find the section where the i18n plugin is enabled and the languages configured, you can get rid of it all if your project doesn't need to handle multilanguage content.

For the cms, the configuration is at `static/admin/config.yml`, there you will see i18n added to the general conf and to the different collections and fields.
To remove support for multilingualism you will have to remove all the occurrencies of i18n in the cms configuration file, this can only be done in the case you are working on your personal project using a fork or better a clone of the repo, please do not try to edit files manually in the repository, even if you have access to it.





