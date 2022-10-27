import neboAxios from '../../config/axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      if (req.body.contact) {
        await neboAxios.post('/', {
          mutations: [
            {
              create: {
                _type: 'messages',
                email: `${req.body.contact.email}`,
                message: `${req.body.contact.message}`,
              },
            },
          ],
        });

        res.status(200).send();
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
