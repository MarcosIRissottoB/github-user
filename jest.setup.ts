import { TextEncoder, TextDecoder } from 'util';

if (global.TextEncoder === undefined) {
  global.TextEncoder = TextEncoder;
}

if (global.TextDecoder === undefined) {
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}
