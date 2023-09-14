import "../config/googleAuth"
import passport from "passport";

const googleAuthentication = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })(req, res, next);
};

const googleCallBack = (req, res) => {
  try{
  const { user, token } = req.user;
  if(user.provider!=='google'){
    res.status(403).json({error:"only google authenticated users!"})
  }
  else{
  res.status(200).json({ message: 'logged in successfully!', token:token });
  }
}catch(error){
  return res.status(500).json({error:error.message})
}
};

export { googleAuthentication, googleCallBack };
