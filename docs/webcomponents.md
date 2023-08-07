# ECL webcomponents

ECL webcomponents is a distribution of the vanilla ECL components as vanilla web-components, it is also distributed as a react package containing react wrappers produced by stencil.js.
The react package is integrated in this gatsby basic application, the current templates are already using them to render the content of the default home page.
But they are also integrated in the admin interface through a rich text area with the ecl webcomponents plugin enabled, see the docs|[./editor.md].
All the ECL packages this tool relies directly on are:

```text
@ecl/ecl-webcomponent-react
@ecl/ckeditor5-ecl-webcomponents
``` 

## Where is the documentation of the ECL webcomponents?

The best way to get easily access to all the different components in an interactive environment is to go to to their [website](https://ecl-webcomponents.netlify.app/?path=/docs/components-accordion--docs]), you can get all the markup needed for each of the components and the easy way to pass user data to them through html attributes or their content.

## How do i build an entire layout using ECL webcomponents

There are special components provided:

- ecl-spacing
- ecl-text
- ecl-grid

As their name suggest, they can be used to generate an ECL layout with columns, to add spacing between elements and to easily insert paragraphs or headings.

### How to use the grid component

Creating layouts with columns is one of the complex task the editor can perform, the Ui for the grid is different than the others, currently using a dashed border to make it identifiable.
You would normally first define a container:
 - this is done setting `container` to `true`
 - once you press `Enter` you can define a row by clicking again on the relevant button int he toolbar and then setting `row` to `true`
 - finally you can start inserting your columns, by clicking again of the button in the toolbar and choosing, this time, the number of `columns`, while `container` and `row` are both `false`.
All the content needs then to be inserted in your columns wrapper, only at the end, pressing Enter will move you out of it, when the layout is finshed pressing `Enter` a few times will move you out of the whole layout you created.

## Is the ECL webcomponents release cycle stable enough for this to be used in a production environment?

Neither `ecl-webcomponents` nor `ecl-ssg` are in a such a status, but both can be currently used to build pages that can be exported and put in production.
It is possible that future releases of the ecl-webcomponent packages or of this tool might not be 100% compatible with a project that you might have built using them, but the effort needed to align would surely not be too big.

