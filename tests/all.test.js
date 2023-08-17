const { app } = require('../server');
const request = require('supertest');
const customer = require('../models/customer.model');
const hotel = require('../models/hotel.model');
const hotelAdministration = require('../models/hotelAdministration.model');
const maintainer = require('../models/maintainer.model');
const receptionist = require('../models/receptionist.model');
test('cutomer Create/Read', async () => {
    jest.setTimeout(60000);
    let Customer = new customer({
        name:{firstName : 'abc', lastName : 'def',},
        email: 'abc@w.com',
        password: 'password',
    });
    await Customer.save();
    let result = await customer.findOne({ email: 'abc@w.com' });
    expect(result.email).toBe('abc@w.com');
});

test('customer Update', async () => {
    jest.setTimeout(60000);
    await customer.updateOne({ email: 'abc@w.com' }, { $set: { "email": 'ab@w.com' } });
    let result = await customer.findOne({ email: 'ab@w.com' });
    expect(result.email).toBe('ab@w.com');
});

test('customer (Delete)', async () => {
    jest.setTimeout(60000);
    await customer.deleteOne({ email: 'ab@w.com' });
    let result = await customer.findOne({ email: 'ab@w.com' });
    expect(result).toBe(null);
});
test('hotel Create/Read', async () => {
    jest.setTimeout(60000);
    let Hotel = new hotel({
        hotelName:'abc',
		address: {
			street: 'def',
			city: 'delhi',
			pinCode: '344056',
		},
    });
    await Hotel.save();
    let result = await hotel.findOne({ hotelName:'abc' });
    expect(result.hotelName).toBe('abc');
});

test('hotel Update', async () => {
    jest.setTimeout(60000);
    await hotel.updateOne({ hotelName:'abc' }, { $set: { hotelName:'ab'} });
    let result = await hotel.findOne({ hotelName:'ab' });
    expect(result.hotelName).toBe('ab');
});

test('hotel (Delete)', async () => {
    jest.setTimeout(60000);
    await hotel.deleteOne({ hotelName:'ab'});
    let result = await hotel.findOne({ hotelName:'ab'});
    expect(result).toBe(null);
});
test(' hotelAdministration Create/Read', async () => {
    jest.setTimeout(60000);
    let HotelAdministration = new hotelAdministration({
        name:{firstName : 'abc', lastName : 'def',},
        email: 'xyz@w.com',
        password: 'password',
        hotelId: 'qrs',
    });
    await HotelAdministration.save();
    let result = await hotelAdministration.findOne({ email: 'xyz@w.com' });
    expect(result.email).toBe('xyz@w.com');
});

test('hotelAdministration Update', async () => {
    jest.setTimeout(60000);
    await hotelAdministration.updateOne({ email: 'xyz@w.com' }, { $set: { "email": 'xy@w.com' } });
    let result = await hotelAdministration.findOne({ email: 'xy@w.com' });
    expect(result.email).toBe('xy@w.com');
});

test('hotelAdministration (Delete)', async () => {
    jest.setTimeout(60000);
    await hotelAdministration.deleteOne({ email: 'xy@w.com' });
    let result = await hotelAdministration.findOne({ email: 'xy@w.com' });
    expect(result).toBe(null);
});
test('maintainer Create/Read', async () => {
    jest.setTimeout(60000);
    let Maintainer = new maintainer({
        name:{firstName : 'abc', lastName : 'def',},
        email: 'ijk@w.com',
        password: 'password',
    });
    await Maintainer.save();
    let result = await maintainer.findOne({ email: 'ijk@w.com' });
    expect(result.email).toBe('ijk@w.com');
});

test('maintainer Update', async () => {
    jest.setTimeout(60000);
    await maintainer.updateOne({ email: 'ijk@w.com' }, { $set: { "email": 'ij@w.com' } });
    let result = await maintainer.findOne({ email: 'ij@w.com' });
    expect(result.email).toBe('ij@w.com');
});

test('maintainer (Delete)', async () => {
    jest.setTimeout(60000);
    await maintainer.deleteOne({ email: 'ij@w.com' });
    let result = await maintainer.findOne({ email: 'ij@w.com' });
    expect(result).toBe(null);
});
test('receptionist Create/Read', async () => {
    jest.setTimeout(60000);
    let Receptionist = new receptionist({
        name:{firstName : 'abc', lastName : 'def',},
        email: 'mno@w.com',
        password: 'password',
        hotelId: 'qrs',
    });
    await Receptionist.save();
    let result = await receptionist.findOne({ email: 'mno@w.com' });
    expect(result.email).toBe('mno@w.com');
});

test('receptionist Update', async () => {
    jest.setTimeout(60000);
    await receptionist.updateOne({ email: 'mno@w.com' }, { $set: { "email": 'mn@w.com' } });
    let result = await receptionist.findOne({ email: 'mn@w.com' });
    expect(result.email).toBe('mn@w.com');
});

test('receptionist (Delete)', async () => {
    jest.setTimeout(60000);
    await receptionist.deleteOne({ email: 'mn@w.com' });
    let result = await receptionist.findOne({ email: 'mn@w.com' });
    expect(result).toBe(null);
});