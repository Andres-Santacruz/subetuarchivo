import { isValidateEmail } from ".";

interface IPropsRegister {
  name: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
}
type IPropsLgin = Omit<IPropsRegister, "name">;
interface Details {
  message: string;
}
interface Error {
  details: Details[];
}
interface IResValidate {
  error: Error | null;
}
export const validateRegister = ({ email, name, password }: IPropsRegister): IResValidate => {
  if (!email)
    return {
      error: {
        details: [
          {
            message: "email is required",
          },
        ],
      },
    };
  if (!name)
    return {
      error: {
        details: [
          {
            message: "email is required",
          },
        ],
      },
    };
  if (!password)
    return {
      error: {
        details: [
          {
            message: "email is required",
          },
        ],
      },
    };
  if (!isValidateEmail(email))
    return {
      error: {
        details: [
          {
            message: "email is not valid",
          },
        ],
      },
    };
  if (name.length < 3)
    return {
      error: {
        details: [
          {
            message: "Name must be greater than 2 letters",
          },
        ],
      },
    };
  if (password.length < 4)
    return {
      error: {
        details: [
          {
            message: "password must be greater than 3 letters",
          },
        ],
      },
    };

  return {
    error: null,
  };
};
export const validateLogin = ({ email, password }: IPropsLgin): IResValidate => {
  if (!email)
    return {
      error: {
        details: [
          {
            message: "email is required",
          },
        ],
      },
    };
  if (!password)
    return {
      error: {
        details: [
          {
            message: "email is required",
          },
        ],
      },
    };
  if (!isValidateEmail(email))
    return {
      error: {
        details: [
          {
            message: "email is not valid",
          },
        ],
      },
    };
  if (password.length < 4)
    return {
      error: {
        details: [
          {
            message: "password must be greater than 3 letters",
          },
        ],
      },
    };

  return {
    error: null,
  };
};
