import bcrypt from 'bcrypt'

export const encrypt = (text: string): string => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(text, salt)
}

export const compareCrypted = (text: string, hash: string): boolean => {
    return bcrypt.compareSync(text, hash)
}