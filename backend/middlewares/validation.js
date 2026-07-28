const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateRegister = (req, res, next) =>{
    const {fullName, email, password} = req.body;
}
