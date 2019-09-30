import { AES, enc } from 'crypto-js'

export const encrypt = (data: string, salt: string) =>
  AES.encrypt(data, salt).toString()

export const decrypt = (data: string, salt: string) =>
  AES.decrypt(data, salt).toString(enc.Utf8)
