import * as admin from 'firebase-admin';
import * as dataSource from './dataSource.json';

const {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_CERT,
  FIREBASE_DATABASE_URL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PROJECT_ID,
} = process.env;

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: FIREBASE_PROJECT_ID,
    private_key_id: FIREBASE_PRIVATE_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY,
    client_email: FIREBASE_CLIENT_EMAIL,
    client_id: FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: FIREBASE_CLIENT_CERT,
  }),
  databaseURL: FIREBASE_DATABASE_URL,
});

const ref = admin.database().ref('jobs');

// -- Set data --
ref.set(dataSource.offers);

// -- Add data to list --
ref.push({
  category: 'UX',
  position: 'UX Lead',
  url: 'https://google.com/jobs/399078',
  remote: true,
  location: 'Anywhere',
  company: 'Google',
  companyUrl: 'https://jobspresso.co/company/Google/',
  companyAbout: 'About Google',
  companyImage: 'https://jobspresso.co/wp-content/uploads/2016/04/zzf1jQF31.png',
  text: 'Lorem ipsum',
  state: 'imported',
  highlight: false,
  createdAt: '2017-02-17T22:57:20.000Z',
  id: '0268a464-2303-4bff-a19d-4ecfd01da887',
  provider: 'jobspresso',
  providerId: '12681',
  updatedAt: '2017-02-17T22:49:07.273Z',
});

// -- Update data --
const refGithub = ref.child('1');

refGithub.update({
  location: 'US',
});

// -- Get data --
ref.on('value', (snapshot) => {
  console.log('\x1b[36m%s\x1b[0m', 'First position is: ', snapshot.val()[0].position);
}, (errorObject) => {
  console.log('The read failed: ', errorObject.code);
});

ref.on('child_added', (snapshot) => {
  const nextJob = snapshot.val();
  console.log('\n\x1b[36m%s\x1b[0m', 'Job Offer');
  console.log('Company: ', nextJob.company);
}, (errorObject) => {
  console.log('The read failed: ', errorObject.code);
});

// -- Filter, Sort and search --
ref.orderByChild('category').equalTo('Writing').on('child_added', (snapshot) => {
  console.log('\n\x1b[36m%s\x1b[0m', 'Searching by category equals to "Writing" and display the company name');
  console.log(snapshot.val().company);
});

ref.on('value', (snapshot) => {
  console.log('\n\x1b[36m%s\x1b[0m', 'Select by child:', snapshot.child('0/company').val());
});

console.log('\n\x1b[36m%s\x1b[0m', 'Reordering by key:');
refGithub.orderByKey().on('child_added', (snapshot) => {
  console.log(snapshot.key);
});

refGithub.on('value', (snapshot) => {
  console.log('\n\x1b[36m%s\x1b[0m', 'Has child "company":');
  console.log(snapshot.hasChild('company'));
});

console.log('\n\x1b[36m%s\x1b[0m', 'Retrieve first 2 children:');
ref.limitToFirst(2).on('child_added', (snapshot) => {
  console.log(snapshot.val().company);
});

console.log('\n\x1b[36m%s\x1b[0m', 'Retrieve last 2 children:');
ref.limitToLast(2).on('child_added', (snapshot) => {
  console.log(snapshot.val().company);
});

// -- Removing data
refGithub.set({
  companyAbout: null,
});
