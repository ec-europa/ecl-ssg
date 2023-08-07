# ECL Ssg

ECL ssg is a static site generator based on gatsby that uses ECL webcomponents to build pages and layouts using the EC or the EU theme. 
The tool is pretty basic, being based on gatsby we won't cover here what the [gatsby documentation](https://www.gatsbyjs.com/docs/) already provides, this document is more meant to explain the purpose of ECL ssg, its limitations together with its effectiveness.
[ECL](https://ec.europa.eu/component-library/) is the library defining the UI elements of the [EC (Europen Commission)](https://ec.europa.eu/component-library/ec/) and the [EU (Europena Union)](https://ec.europa.eu/component-library/eu/) visual identities, it's markkup is consequently pretty reach and complex to be reproduced.
This makes the usage of ECL, outside of its official implementation in twig, a complex matter in relation to the markup definition.
ECL webcomponents can simplify this, its markup is way much simpler than the one defined by the vanilla component but still it is far from being something a generic user, not aware of the html language and not familiar with custom elements, would easily insert by hand.

## How is is this tool supposed to help?

We've tried to imagine what would have been the easiest way to create layouts using ECL components, and what we imagined was a rich text area with the capability of rendering our webcomponents, offering a simplified interface where to insert values for predefined attributes, which are the main way of passing data to the webcomponent.
Furthermore, once we had the chance to generate the "content" of a web page was not difficult to think about an environment where everything could be put together, the ECL webcomponents, the ckeditor plugin, into a simple tool that would create full web-pages in a such a "simple" way.

## Is this really that simple?

No, something complex can hardly be reduced to a simple task, but to a certain extent, depending on the needs, it can really be pretty straighforward:
In the editor might be complex sometimes to understand what is happening, many times you would find yourself in troubles when inserting complex components that include others, it can be challenging.
Indeed this approach of creating pages through the cms is only one of the approaches possible and when working on a real project you might prefer editing some file manually to get the achieved result.

## Do i have to use this approach with the netlify cms to create any page?

Absolutely not, this is only a basic gatsby application that currently generates pages based on the available md files created by the cms, but you can take it over entirely, fork this repo and make any change you might want, in the end this is gatsby and it's up to you to create the needed configuration for your project, here we are just creating a basic configuration that might serve only demoing purposes.
Think about the editor as an opportunity, if that is not what it is for you, don't use it, change the configuration and generate pages the way you want.

## Can i use this tool to render content from a drupal website?

Yes you can, gatsby can easily connect with a drupal database and fetch content from it through a graphQL query, if enabled also in Drupal.
It's a matter of configuring the app in order to do so, an example is available in the [demo website of ECL ssg](https://ecl-ssg.netlify.app/en/drupal/), the content in the linked page is fetched from a mysql database using the drupal graphQl and shown as cards in the website.

## What others data source can i use for my project?

Gatsby has many plugins that can be explored to identify many different possible integrations or definitions of data sources for your project, in the demo website a few of these options are used to build a few simple pages. You can see the source code related to this demo website in this [branch](https://github.com/ec-europa/ecl-ssg/tree/chore-demo-website) on github.