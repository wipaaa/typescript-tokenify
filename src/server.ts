import app from './configs/express.config';
import status from 'http-status';

import APIV1Router from './api/routes/v1';

app.use('/api/v1', APIV1Router);

app.use((req, res, next) => {
  return res.status(status.NOT_FOUND).json({
    message: '404 - API End Point Not Found!',
  });
});

app.listen(app.get('port'), app.get('host'), () =>
  console.log(`Listening at port: ${app.get('port')}`)
);
