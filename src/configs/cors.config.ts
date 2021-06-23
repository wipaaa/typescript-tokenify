import cors, { CorsOptions } from 'cors';

const options: CorsOptions = {
  credentials: false,
};

export default () => cors(options);
