export const isValidateEmail = (email: string | undefined) => {
  if (!email) return false;
  const match = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return Boolean(match);
};

export const isValidCode = (code: string): boolean => {
  if(!code || code.length !== 6)  return false;

  const codeString = code.slice(0,2);
  const codeNumber = code.slice(2);

  const isText = /^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(codeString);
  const isNumber = Number.isInteger(Number(codeNumber));

  return isText && isNumber;
};

export const isExpired = (dateExp: Date): boolean => {

  const last = dateExp.getTime();
  const now = Date.now();

  return now > last;
};
