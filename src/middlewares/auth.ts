import { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";

export const context = async ({req}: StandaloneServerContextFunctionArgument) => {
  // get the user token from the headers
  const token = req.headers.authorization || "";
  // try to retrieve a user with the token
  const user = token;
  /* const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
  const res = jwt.decode(header +
    'eyJuYW1lIjoiSm9obiBEb2VNIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
      'Jweasg7bR9Ov0P5PEORnE622Tjlo62TDkuO8aaq4Swo'
  );

  console.log('res', res); */
  // optionally block the user
  // we could also check user roles/permissions here
  if (!user) {
    // throwing a `GraphQLError` here allows us to specify an HTTP status code,
    // standard `Error`s will have a 500 status code by default
    return null;
  }

  // add the user to the context
  return { name: user };
};
