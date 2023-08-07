# ECL ssg documentation

ECL ssg is a static site generator based on [gatsby](https://www.gatsbyjs.com/) that integrates [ECL webcomponents](https://github.com/ec-europa/ecl-webcomponents) and an admin interface where a rich text area using the [ECL webcomponents ckeditor plugin](https://ecl-webcomponents.netlify.app/playground/) is provided.

It comes with a basic configuration providing a page template which includes all the components that will provide a default output in the two systems EC and EU with mocked data, this can be then replaced by content generated through the admin interface, using the rich text area with the ecl-webcomponents enabled.

It assumes the website is multilingual, but currently defines only english as an available language, this can be changed in the `gatsby-config.js` by adding languages in the i18n plugin section.

 ```text
 {
  resolve: 'gatsby-plugin-i18n',  
  options: {  
    createPages: false,    
    langKeyDefault: 'en',  
    useLangKeyLayout: false,  
    localizedPaths: { 
      'en': '/en/',  
    },  
    languageLabels: {  
      'en': 'English',  
    },  
  }  
 }
 ```

Internazionalition is supported through the admin interface, when other languages are enabled it is possible to select the language but also a primitive string translation logic is in place.
Most of the current templates are supporting this using `t()`, but the locales files currently hosted are not necessarily relevant and there is no advanced logic in the tool to generate prettier locales based on the current strings used in the website.

It comes with an automatic language switcher, a default menu (..pretty dumb), a basic breadcrumb, a very basic search (unthemed) example,

## Playgrounds

If you are looking for info on how to use the playgrounds there are two environments https://ec-playground--ecl-ssg.netlify.app/ and https://eu-playground--ecl-ssg.netlify.app, these are connected with netlify cms instances that can be used to test the creation of pages and the usage of the ckeditor plugin, their access is restricted, if you believe you are entitled to get an account on them, feel free to submit a request about it. 

- [ECl ssg](./ecl-ssg.md): The tool presentation
- [Playgrounds](./playgrounds.md): This is for you that want to start using the playgrounds.
- [Ecl webcomponents](./webcomponents.md): What are them, where to find documentation.
- [Netlify Cms](./netlify-cms.md): Some info about the backend.
- [Ckeditor](./editor.md): The magic, and the misery of..
