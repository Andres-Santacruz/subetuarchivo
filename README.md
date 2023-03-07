# Back Subetuarchivo

This is the alpha backend for Subetuarchivo, an online platform that enables users to quickly and easily share files with others.

## Installation

To install and run the backend, please follow these steps:

1. Clone the repository to your local machine
2. Install the dependencies using `npm install`
3. Run the backend in development mode using `npm run dev`

## Scripts

This project includes the following scripts:

- `dev`: runs the backend in development mode using `ts-node-dev`
- `postinstall`: runs the `compile` script after `npm install`
- `compile`: compiles the TypeScript code to JavaScript
- `start`: compiles the TypeScript code and starts the server using `node`
- `test`: runs tests (currently not implemented)

## Dependencies

This project uses the following dependencies:

- `bcryptjs` for password hashing
- `cloudinary` for image and video management
- `cors` for Cross-Origin Resource Sharing (CORS) support
- `dotenv` for loading environment variables
- `express` for the web server
- `express-fileupload` for file uploads
- `fs-extra` for file system operations
- `jsonwebtoken` for JSON Web Token (JWT) authentication
- `mongoose` for database management
- `nodemailer` for email sending
- Various `@types/*` packages for TypeScript typings

## License

This project is licensed under the ISC License.
