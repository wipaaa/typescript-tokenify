import app from './configs/express.config';
import status from 'http-status';

app.use('/', (req, res) => {
  return res.status(status.OK).json({
    message: '200 - You Are Accessing The API Main End Point!',
  });
});

app.use((req, res, next) => {
  return res.status(status.NOT_FOUND).json({
    message: '404 - API End Point Not Found!',
  });
});

app.listen(app.get('port'), app.get('host'), () =>
  console.log(`Listening at port: ${app.get('port')}`)
);
