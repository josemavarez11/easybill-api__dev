export interface Cryptography {
    encrypt: (value: string) => Promise<object>;
    dencrypt: (value: string, compary: string) => Promise<object>
}