import { arrayOf, shape, string } from 'prop-types';

const address = {
  label: string,
  street: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  countryRegion: string,
};

const businessCard = {
  uuid: string.isRequired,
  prefix: string,
  firstname: string.isRequired,
  middlenames: arrayOf(string),
  lastname: string,
  birthday: string,
  addresses: shape({
    homeAddress: shape(address),
    workAddress: shape(address),
  }),
  phoneNumbers: shape({
    cellPhone: string,
    workPhone: string,
    homePhone: string,
    pagerPhone: string,
  }),
  faxNumbers: shape({
    homeFax: string,
    workFax: string,
  }),
  emails: shape({
    email: string,
    workEmail: string,
  }),
  logo: shape({
    url: string.isRequired,
  }),
  organization: string,
  jobTitle: string.isRequired,
  socialUrls: shape({
    facebook: string,
    twitter: string,
    linkedIn: string,
    custom: string,
  }),
};

export default businessCard;
