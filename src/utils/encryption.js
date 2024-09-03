import bcrypt from "bcryptjs";

const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}

const encryption = {
    encryptPassword,
    comparePassword
}

export default encryption;