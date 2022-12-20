# TO DO
	- [x] update score when changing importances
	- [x] remove criterion
    - [x] disable criterion importance before creation
    - [x] correct reset scores (criteria are not deleted)
	- [x] multiple criteria
	- [x] save in localstoragebrowser
	- [x] format
        - tailwind
        - initial page:
            - different criteria (name, little description)
            - remove button on each of them
            - add criteria button
        - criteria page:
            - name and description
            - criteria
            - edit button
                - change name, description
                - chage name, description of criteria
                - add criteria, remove button on each of them
            - evaluations and remove button on each of them
            - add evaluation button
        - evaluation page:
            - name and description
            - options and remove button
            - add option
            - edit button
                - change name, description
            - score for each option
            - some plots
	- [x] serve
    - [x] remove evaluation
    - [x] persist scores
    - [x] back button
    - [] debug:
        - when deleting criteria with no option and creating a new option we obtain an insconsistent result
        - resizing (make score responsive)
        - write code that clears browser storage if encountered an error
    - reset button
	- export
	- import
    - prohibit name repetition
    - add one plot

# FUTURE:
	- promote
	- sync to local database
	- create users
    - unify and correct remove functions
	- allow for shared criteria and options / colab
	- allow for meta estimation (importance of user * range given by user)
	- biometrics
	- bayesian estimations
    - make more efficient:
        - surgical updates


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
