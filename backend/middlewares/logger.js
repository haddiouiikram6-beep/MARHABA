const logger = (req, res, next)=>{
    const date = new Date().toLocalString();
    console.log(`[${date}] ${req.methood} ${req.originalUrl}`);

    next();
};
export default logger