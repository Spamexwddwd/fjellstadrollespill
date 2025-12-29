import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors";
const config = require("./config.js");

const db = new sqlite3.Database("database.sqlite");

// Comments table (auto)
db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, eventDate TEXT, user TEXT, avatar TEXT, comment TEXT)");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Sessions
app.use(session({ secret: "hemmelig", resave:false, saveUninitialized:false }));

passport.use(new DiscordStrategy(
    {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        scope: ["identify"]
    },
    (accessToken, refreshToken, profile, done) => done(null, profile)
));

passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((obj,done)=>done(null,obj));
app.use(passport.initialize());
app.use(passport.session());

// Discord login routes
app.get("/auth/discord", passport.authenticate("discord"));
app.get("/auth/discord/callback", passport.authenticate("discord", {
    failureRedirect: "/"
}), (req,res)=>res.redirect("/") );

app.get("/logout",(req,res)=>{ req.logout(()=>{}); res.redirect("/"); });

// API: Hent kommentarer for event
app.get("/comments/:date",(req,res)=>{
    db.all("SELECT * FROM comments WHERE eventDate=?",[req.params.date],(err,rows)=>res.json(rows));
});

// API: Lagre kommentar
app.post("/comment", (req,res)=>{
    if(!req.user) return res.json({error:"Ikke logget inn"});
    db.run("INSERT INTO comments (eventDate,user,avatar,comment) VALUES (?,?,?,?)",
        [req.body.date, req.user.username, req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "", req.body.comment]
    );
    res.json({success:true});
});

app.listen(3000,()=>console.log("Server kjører på http://localhost:3000"));
