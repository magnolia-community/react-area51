# Area51
Area51 allows mysterious alien content to take control of your React app. :alien:

*With it, content authors can edit your React app in visual WYSIWYG editing UI, such as a page editor.*

**This is Alpha software. Subject to frequent change. Not yet officially supported by Magnolia.:warning:**

Area51 enables content authors to manage the actual structure and layout of a React app, not just the content items. It was created to re-empower non-developers to create and edit React-based websites and other digital experiences. Area51 connects the modern component-architecture of React, with the component concept of CMS page editors.
It does not include an editing tool itself, but provides the infrastructure an editing UI can plug into.

Capabilities

* Use any React component without modification. They recieve all CMS-managed content passed in as `props`.
* Handles injecting 'EditorHints' into the DOM to support the editing UI of the CMS.
* Supports managing nested components.
* Supports managing a tree of 'pages'.

Screenshot of React Demo Project being edited in a CMS.
![Area51 Demo Project in Magnolia](mag-aliens-demo/_dev/README-demo-project.jpg)


# How Area51 works

Area51 provides an `Area` React component that is dynamically populated with React components and content based on a JSON configuration, typically from a CMS REST endpoint.
The configuration stores both an ordered list of React components, and their content, which will be passed as props to the instantiated React components. Because an instantiated React component may itself contain an area, the configuration can also be a tree, instead of a list.
In an edit mode, Area51 adds markup or data attributes to the Area component and its child components to allow an external tool to add an editing UI to interact with the configuration.
The Area51 library is CMS-agnostic, additional CMS-specific libraries can leverage it to connect to their editing UI and content structures.


# Setup

## How to develop these libraries and demo (or just try it out).

As the project is in rapid development, we currently host three things in this repo, two libraries (react-area51, magnolia-react-area51) & a demo project (Area51 Aliens) that shows the nested areas and multipage support in action.

### Requirements
* Java SE JDK (Tested on v1.8.0_151)
* Node (Tested on v10.15.0)
* mgnl, the Magnolia CLI (Tested on v3.0.7) (Install globally with `npm -g @magnolia/cli`.)

### Setup Demo on Magnolia CMS (~10 minutes)

This Git repo contains binding to a simple Magnolia CMS project for demonstration purposes.

1. Clone this git repository
2. Go into the demo project directory: `react-area51-alpha/mag-aliens-demo`.
3. Use the Magnolia CLI to install Magnolia in the directory: `mgnl jumpstart`.
   * Choose option 3, `magnolia-community-demo-webapp` because it will configure CORS for you.
4. To easily install necessary config and sample content, copy the contents from `_dev/import-this-manually` into `apache-tomcat/webapps/magnoliaAuthor/WEB-INF/bootstrap/common
`. (Otherwise use standard Magnolia import functionality to bring it in.)
5. Start Magnolia server:`mgnl start`, and open it in a browser: `http://localhost:8080/magnoliaAuthor/`.
   * Username: superuser. Password: superuser.
6. Open `Pages` app. Open `solar-system`. You should see the React demo project, and be able to edit it! :boom: (This is because the React app is already deployed to `/light-modules/react-aliens/webresources/static`)




### React code (~15 minutes)
Running the React App, outside of the Page Editor - aka in 'Headless' configuration:

To work on the either of the libraries and the demo project with the comfort of live updates, you will typically want to get the source code (Currently all in this repository already.) and have three simple development servers running in three terminal tabs.

**Setup React Code:**

1. Open two terminal tabs.
2. Go to each of these directories and install the npm package:


* magnolia-react-area51
  * The CMS-specific library, for Magnolia.
  * `npm install`
* mag-aliens-demo/react-app
  * The demonstration project.
  * `npm install`

**TIP**: if any of your `npm install`'s has an error 'no such file or directory' with a message about '@webassemblyjs/ast' module, then try deleting the package-lock.json in that directory and running the install again.

**Running the React development setup:**

With this setup, whenever you change any file in any of the projects, the full demo will automatically rebuild.

* magnolia-react-area51
  * `npm run build`
  * Runs webpack with a watch configuration.
  * Builds `./lib/MagnoliaReactArea51.js`
* mag-aliens-demo/react-app
  * `npm start`
  * Opens running app in a browser.
  * Depends on the `MagnoliaReactArea51.js` library.
  * Based on Create-React-App 3.*

Now try changing any content in the Magnolia Pages app, then refresh this app and notice that it reflects your content changes! :fire:



**Deploy:**

Any code changes you make to react-app (and the libraries) must be deployed to the Magnolia instance, in order to be available in the Pages app. Deploy the app to Magnolia by running:
`npm run build`

**Test:**
Run the Jest-based automatic tests for the magnolia-react-area51 package by running `npm run test`.

Run the Jest-based snapshot test for the mag-aliens-demo project by running `npm test`.

# How to Connect React Dev Server to Magnolia Pages app.
To establish a real-time connection, (so that you dont have to do a 'build' during development) see the comments at the bottom of `mag-aliens-demo/light-modules/react-aliens/templates/pages/standard.ftl`. It lets you pull in the JS bundle from the dev server.


# Known Issues :grimacing:

(Magnolia Developer team is working on these issues.)

* When a new page, or a new component is created which contains areas, Magnolia will not create the necessary area nodes in the 'JCR' backend. Therefore when playing with the demo, you can copy an existing page, or you can go into the 'JCR Browser' app and copy area nodes from one page to a new page.
* The Magnolia Page Editor runs javascript when the page loads in order to scan the page for 'EditHints' and insert the green 'EditBars'. This means if a React app is dynamic and later shows a new component, that new component will not have green EditBars, because the component was not in the DOM at the time the Magnolia javascript ran.


## Things to improve
Not bugs, but lets improve these:
* Add more tests.
* Make the Content JSON parsing 'pluggable'.

# Technical Details :triangular_ruler:

TODO

# Environment Variables for Default setup.
(In the .env file.)

```
REACT_APP_ORIGIN= http://localhost:8080
REACT_APP_SERVER_PATH= /magnoliaAuthor
REACT_APP_BASE= /solar-system

REACT_APP_STATIC_PATH= /.resources/react-aliens/webresources/static
REACT_APP_REST_NAV= /.rest/delivery/pagenav/v1
REACT_APP_REST_CONTENT= /.rest/delivery/pages/v1

REACT_APP_LOG_LEVEL= 1
```

# Contributors

* Adrien Manzoni, [Magnolia](https://documentation.magnolia-cms.com)
* Bartosz Staryga, [Magnolia](https://documentation.magnolia-cms.com)
* Christopher Zimmermann, [Magnolia](https://documentation.magnolia-cms.com)
* *Your name here!* :grinning:
