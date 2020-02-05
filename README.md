## Highlight Presenter

#### Getting started

**NOTE**: Webpack is configured instead of using react-scripts 
to have a better control on the builds.

###### Install packages

```shell
npm install
```

###### Configure Server Settings

```shell
cp .env.[environment] .env.[environment].[node_env]
```

where,
* `[environment]` can be `development` or `production`,
* `[node_env]` can be `local` only

Update the server endpoint in the local file by updating the value of `HIGHLIGHTS_API_ENDPOINT`.

Note that environment variables are loaded in the following order updating any previously loaded values
1. *.env*
1. *.env.[environment]*
1. *.env.[environment].[node_env]*

Also, update any webpack arguments in package.json under `scripts` (if required).

###### Start the project

*For Production*:

```shell
npm run build
```

Builds the app for production to the *dist* folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Now, the app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

*For Development*:

```shell
npm start
```

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload with every edit.
Lint errors are also visible in the console.
