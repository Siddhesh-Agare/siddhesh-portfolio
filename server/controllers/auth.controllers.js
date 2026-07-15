export const testingApi = async(req, res)=>{
    try{
        res.json({ message: "API is working fine" });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};