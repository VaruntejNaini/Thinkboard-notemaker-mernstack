import ratelimit from "../configs/upstash.js";

const  rateLimiter =  async (req,res,next)=>{
 try{
  const {success} = await ratelimit.limit("my-limit-key")
     if(!success){
       return res.status(429).json({message: "rate limit exceeded - too many requests sent-try again later"}) 
        }
     next();
    }catch(error){
         console.error("error in rate limiter middleware",error)
         next(error);
         }
}

export default rateLimiter;