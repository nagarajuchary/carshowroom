<!-- What is JWT Authentication? -->
JWT is a compact, URL-safe token format that securely represents claims between two parties.
The authentication process using JWT involves three steps:
The client sends a login request with their credentials.
The server verifies the credentials and generates a JWT.
The server sends the JWT to the client, which can then use it to access protected resources1.


<!-- Example API with JWT Authentication: -->

We’ll create a simple example API with two endpoints:
/users/authenticate: A public route that accepts HTTP POST requests containing the username and password. If the credentials are correct, it returns a JWT authentication token and user details.
/users: A secure route that accepts HTTP GET requests. It returns a list of all users if the valid JWT token is provided in the HTTP Authorization header. Otherwise, it responds with a 401 Unauthorized status2.
You can find the tutorial project on GitHub here.

<!-- Steps to Implement JWT Authentication: -->

Install Node.js and npm from nodejs.org.
Download or clone the tutorial project code from GitHub.
Install required npm packages by running npm install in the project root folder.
Start the API using npm start (or npm run start:dev with nodemon) in the project root folder.
Before deploying to production, update the secret property in the config.json file. This secret is used to sign and verify JWT tokens for authentication. Make it a random string to ensure security2.

<!-- Testing with Postman: -->

Postman is an excellent tool for testing APIs.
You can test the Node.js JWT Auth API using Postman.
Download Postman and explore the API endpoints.

<!-- create jwt file -->

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: "Unauthorized:Bearer token missing or invalid" });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, "my-secretkey", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized:Invalid token' });
        }
        req.User = decoded;
        next();

    });
}


<!-- require in routes -->
const jwt = require("jsonwebtoken");;
const verifyToken = require("../jwt/jwtoken.js")

<!-- postMethod in jwt -->
aroute.post("/login", async (req, res) => {
    try {
        const User = await
            adminModel.findOne({ "username": req.body.username, "password": req.body.password })
        if (!User) {
            res.status(404).json('user not found')
        }
        const secretkey = 'my-secretkey';
        const token = jwt.sign({ "username": req.body.username, "password": req.body.password }, secretkey, { expiresIn: '1h' })
        res.status(201).json({ User, token })

    } catch (err) {
        res.status(500).json({ err: 'User login failed' })
    }

<!-- getMethod in jwt -->

    aroute.get("/authors", verifyToken, async (req, res) => {

    try {
        const admins= await adminModel.find();
        res.status(201).json(admins)
    } catch (error) {
        res.status(500).json("server error")
    }
  
})




<!-- How to install Multer/fileuploadmethod -->

First install multer in the required routes.
 
 Require multer in Routes.

 Give the destination path in the routes as

   const multer = require("multer");
   const storage = multer.diskStorage({
    destination: "selectphoto/",
    filename: (req, file, pic) => { pic(null, file.originalname) },
});

const pics = multer({ storage });

aroute.post('/addadmindetails', pics.single("file"), async(req, res) => {
    const add = new adminModel(req.body);
    add.save();
    res.status(201).json(add);

    if(!req.file){
        return res.status(400).json({error: "no file"})
    }

    const userData = {
        username:req.body.username,
        photo:req.file.filename,
    };

    try{
        const profile = new adminModel(userData);
        profile.save();
        return res.status(201).json(profile)
}catch(err){
    return res.status(500).json({err});
}

});


