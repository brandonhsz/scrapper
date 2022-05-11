import cron from 'node-cron';
import axios from 'axios';

export const Crons = () => {

  cron.schedule('5 * * * *', async () => {
    await axios.get('http://localhost:8080/scrap');
  });

}

