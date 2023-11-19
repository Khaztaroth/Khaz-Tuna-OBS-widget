## Khaz's Tuna OBS widget

Lightweight widget to use as a browser source in OBS. It makes use of Tuna's local server to get the song, artist, and cover information. To use it you first have to have the Tuna plugin installed and configured.

Download the source or fork it, then install all dependencies with `yarn install`

To check changes as you make them run it with:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev --open
```

## Building

You can technically use it in a live server but building it works just fine, this project is configured to build a static HTML file that you can add as a local file in OBS. Do it by running:

```bash
yarn build
```

You can preview the production build with `yarn preview`.