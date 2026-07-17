import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "unauthorized access, token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "user unauthorized, token invalid",
            });
        }

        if(!decoded.id){
            return res.status(401).json({
                success: false,
                message: "user unauthorized, token invalid",
            });
        } 

        req.userId = decoded.id;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error !"
        });
    }

};

export default isAuth;