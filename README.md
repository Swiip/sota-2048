# sota-2048 (State Of The Art 2048)

The point of this repository is to maintain an "as best as possible" implementation of the game 2048 with state of the art technologies.

By state of the art, I mean both in term of browsers capabilities and frameworks. To illustrate browsers capabilities, I volontary will use the minimum of transpiling. This means, no or a minimum of Babel, no Sass... You don't imagine what's already works on todays browser.

## Opinionated choices

There is obviously opinionated choices to make in selecting best state of the art technologies at one point. Here is the list of the current ones:
- Sass can be avoided, state of the art CSS is awesome.
- I agree SystemJS would be the best module loader to avoid transpiling (even if in reality the transpiling occurs in the browser) but I don't like it. I'll use Webpack 2.
- I choose React / Redux as the main frameworks.
- I could find solutions to use React without transpiling but it's just not worth it. As the pure JSX compiler is deprecated in profit of Babel, I'll use Babel with the only React plugins.

## Requirement
- Git
- Node 6+
- NPM 3+
- Chrome or Firefox current version (only tested browsers)

## Installation
- Clone the repo
- Run `npm i` inside the directory

## Usage
- Run `npm start`
- Open `http://localhost:3000`

## References

The 2048 game itself is of course not something of my invention. Even the code is something which has been forked number of times. Here are the differents original repo:
- https://github.com/Swiip/2048-redux
- https://github.com/dvalchanov/react-redux-2048
- https://github.com/gabrielecirulli/2048
