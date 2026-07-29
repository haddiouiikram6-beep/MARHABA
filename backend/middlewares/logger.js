const logger = (req, res, next)=>{
    const date = new Date().toLocaleString();
    console.log(`[${date}] ${req.method} ${req.originalUrl}`);

    next();
};
export default logger