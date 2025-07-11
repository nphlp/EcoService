export type ProcessResponse<T> =
    | {
          data: T;
          status: true;
          message?: undefined;
      }
    | {
          data?: undefined;
          status: false;
          message: string;
      };
