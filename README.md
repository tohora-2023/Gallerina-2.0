# GALLERINA 🖼️

Gallerina is an art curation website which allows a user to create their own idyllic curations of some of the most famous art pieces in the world.
Inspired by the likes of Pinterest and gallery-style websites, our system uses the Artsy API to generate our data allowing users to save them to their collections.

### 0. Cloning and installation

- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip

  You may also want to start a new branch

  ```sh
  cd Gallerina
  npm i
  git checkout dev
  npm run dev
  ```

  </details>

<details>
  <summary>More about DB Setup</summary>

- `npm run knex migrate:latest`
- `npm run knex seed:run`
</details>

## Requirements

- First, please navigate to the home page when the dev is running - this will save the rendered artworks from the Artsy API into the database. Which will then be used to save into your own collection.

- Second, to create a Collection you must login in using the Login button on the top right hand side. This process will allow you to create collections and save artworks to your collections.

- Third, port numbers web app port 3000.
