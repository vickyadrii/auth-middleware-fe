/* eslint-disable @typescript-eslint/no-explicit-any */
export type ResponseSuccessJSON = {
  code?: number;
  data?: any;
  message?: string;
};

export type ResponseErrorJSON = {
  response?: {
    data?: {
      message?: string;
    };
  };
};
