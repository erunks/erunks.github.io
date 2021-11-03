import assignIn from 'lodash/assignIn';
import get from 'lodash/get';
import join from 'lodash/join';
import split from 'lodash/split';

export const createVcfFromBusinessCard = (vCard, businessCardInfo) => {
  const keyMappings = {
    uid: get(businessCardInfo, 'uuid', ''),
    namePrefix: get(businessCardInfo, 'prefix', ''),
    firstName: get(businessCardInfo, 'firstname', ''),
    middleName: join(get(businessCardInfo, 'middlenames', []), ' '),
    lastName: get(businessCardInfo, 'lastname', ''),
    nameSuffix: get(businessCardInfo, 'suffix', ''),
    birthday: businessCardInfo?.birthday && new Date(businessCardInfo.birthday),
    organization: get(businessCardInfo, 'organization', ''),
    title: get(businessCardInfo, 'jobTitle', ''),
  };

  const logoUrl = get(businessCardInfo, 'logo.url', '');
  if (logoUrl) {
    vCard.logo.attachFromUrl(logoUrl, split(logoUrl, '.').pop());
  }

  return assignIn(
    vCard,
    keyMappings,
    get(businessCardInfo, 'emails', {}),
    get(businessCardInfo, 'faxNumbers', {}),
    get(businessCardInfo, 'phoneNumbers', {})
  );
};

export const downloadFile = (filename, contentType, data) => {
  const link = document.createElement('a');
  link.href = `data:${contentType};charset=utf-8,${data}`;
  link.download = filename;
  link.click();
};

export const handleKeyUp = (e, callback) => {
  // if keycode is enter or space
  if (e.keyCode === 13 || e.keyCode === 32) {
    callback();
  }
};

export default {
  createVcfFromBusinessCard,
  downloadFile,
  handleKeyUp,
};
