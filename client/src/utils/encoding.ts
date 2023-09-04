import { Buffer } from 'buffer';

export const encode = (input: string | number): string => {
    if (typeof input === 'number') {
        input = String(input);
    }
    return Buffer.from(input, 'binary').toString('base64');
};
