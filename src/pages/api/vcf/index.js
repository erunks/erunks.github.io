import { createVcfFromBusinessCard } from 'lib/helpers';
import join from 'lodash/join';
import vCard from 'vcards-js';

export const handler = (req, res) => {
  try {
    const vcard = createVcfFromBusinessCard(vCard(), req.body.info);    
    const filename = `${join([vcard.firstName, vcard.lastName], '_')}.vcf`;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/vcard');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(vcard.getFormattedString());
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.send(e.message);
  }
};

export default handler;
