import cron from 'node-cron';
import axios from 'axios';

export const Crons = () => {
  console.log("Crons running")
  // cron.schedule('*/5 * * * *', async () => {
  //   await axios.get('http://localhost:8080/scrap');
  // });

  cron.schedule('*/5 9-15 * * *', async () => {
    await axios.get('http://localhost:8080/scrapMorning');
  })

  cron.schedule('*/5 15-21 * * *', async () => {
    await axios.get('http://localhost:8080/scrapAfternoon');
  });

}

