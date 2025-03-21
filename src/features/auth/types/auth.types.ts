export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  options: {
    data: {
      first_name: string;
      last_name: string;
    };
  };
} 