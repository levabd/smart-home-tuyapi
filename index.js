const TuyAPI = require('tuyapi');

const device = new TuyAPI({
  id: '10801581f4cfa202a0ea',
  key: 'f02d6f06ecb15f68',
});

let stateHasChanged = false;

// Find device on network
device.find().then(() => {
  // Connect to device
  device.connect();
});

// Add event listeners
device.on('connected', () => {
  console.log('Connected to device!');
});

device.on('disconnected', () => {
  console.log('Disconnected from device.');
});

device.on('error', (error) => {
  console.log('Error!', error);
});

device.on('data', (data) => {
  console.log('Data from device:', data);

  console.log(`Boolean status of default property: ${data.dps['1']}.`);

  // Set default property to opposite
  if (!stateHasChanged) {
    device.set({ set: !data.dps['1'] });

    // Otherwise we'll be stuck in an endless
    // loop of toggling the state.
    stateHasChanged = true;
  }
});

// Disconnect after 10 seconds
setTimeout(() => {
  device.disconnect();
}, 10000);
