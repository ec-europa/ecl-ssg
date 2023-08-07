<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  ECL ssg starter based on gatsby typescript starter kit
</h1>

## 🚀 Quick start

1.  **Clone this repo**

    Clone the repository in your user space in github if you plan to start developing a website using ECL ssg.

    ```shell
    # fetch the repository
    git clone git@github.com:ec-europa/ecl-ssg.git
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-ecl-ssg-site/
    yarn start
    ```

3.  **Access the website**

    Your site is now running at http://localhost:8000!

4. **Access the content in the cms**

    ```shell
    yarn netlify-cms-proxy-server
    cd static/admin/
    sed -i '/^#/d' config.yml
    ```

    The cms is now accessible at http://localhost:8000/admin!
    Since you configured the cms with a local backend you will have immediate access without providing any credential.

5. **What you will find**

    Not much, this starter comes with an homepage in english, in terms of content.
    This page will show a site header, a footer, a menu, but these are the defaults set by the tool, which are using the EC theme as long as you haven't changed the `customTheme` property in the `gatsby-config.js` file.
    You can override these default content using the cms, your content will be used instead of the "mocked" site header and footer.
    This is also true for the menu, which is by default automatically built browsing the existing pages, but this is only to provide you with some default, the menu is not particularly smart so you are invited to create your own menu and adapt it everytime you add or remove a content.

6. **Using the playground environments**

    Two special environments are available to you to try out this tool without cloning the repo and making the needed steps to connect your instance with a CI environment to get the website deployed somewhere.
    These are accessible at:
    - https://ec-playground--ecl-ssg.netlify.app/
    - https://eu-playground--ecl-ssg.netlify.app/

    Request access to these environments in order to be able to see their backend and start using the cms and the editor.
    If you already have access, the playgrounds are configured in order to generate preview urls for the content you create.
    You are invited to create content and save it but not to publish it, unless you're content is meant to improve the minimal
    setup of this starter.
    When you save a content a pull request will be generated, if you publish that would be merged in one of the two branches attached to the playground environments, in order not to pollute those, publishing is dicouraged, and if you do it we might then remove the content added if we find it inappropriate.

7. **Learn more about ECL ssg**
    - [Documentation](./docs/README.md)

8.  **Learn more about gatsby**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)


