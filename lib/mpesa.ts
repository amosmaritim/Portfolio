import axios from 'axios';
import crypto from 'crypto';

interface MpesaCredentials {
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  callbackUrl: string;
}

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  // Check if token is still valid
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const credentials = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000; // Refresh 1 min before expiry

    return accessToken;
  } catch (error) {
    console.error('Error getting M-Pesa access token:', error);
    throw new Error('Failed to authenticate with M-Pesa');
  }
}

function generatePassword(shortcode: string, passkey: string): string {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
  return password;
}

export interface STKPushRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

export async function initiateSTKPush(request: STKPushRequest): Promise<any> {
  const token = await getAccessToken();
  const shortcode = process.env.MPESA_SHORTCODE || '';
  const passkey = process.env.MPESA_PASSKEY || '';
  const callbackUrl = process.env.CALLBACK_URL || '';

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = generatePassword(shortcode, passkey);

  // Format phone number (remove + and ensure it starts with 254)
  let phone = request.phoneNumber.replace(/\D/g, '');
  if (phone.startsWith('0')) {
    phone = '254' + phone.substring(1);
  } else if (!phone.startsWith('254')) {
    phone = '254' + phone;
  }

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: request.amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: request.accountReference,
    TransactionDesc: request.transactionDesc,
  };

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error initiating STK Push:', error.response?.data || error.message);
    throw new Error(error.response?.data?.errorMessage || 'Failed to initiate M-Pesa payment');
  }
}

export async function verifySTKPush(CheckoutRequestID: string): Promise<any> {
  const token = await getAccessToken();
  const shortcode = process.env.MPESA_SHORTCODE || '';
  const passkey = process.env.MPESA_PASSKEY || '';

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = generatePassword(shortcode, passkey);

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID,
  };

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error verifying STK Push:', error.response?.data || error.message);
    throw new Error('Failed to verify M-Pesa payment');
  }
}




