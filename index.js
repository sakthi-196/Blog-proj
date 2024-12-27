import express from "express"
import bodyParser from "body-parser"
import lodash from "lodash"
const app=express();
const port=2019;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))
let posts=[
    {
        title: "I did it...",
        content:"I'm happy to say that I've successfully completed the web blog app making challenge..!I'm confident that I can achieve success in the upcoming module as well.Thank you Udemy and Angela",
        Author: "sakthi",
        date: new Date(),
    }
];
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.get("/compose",(req,res)=>{
    res.render("compose.ejs")
})
app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.get("/blogs",(req,res)=>{
    res.render("blogs.ejs",{
        posts: posts
    });
})
app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})
app.post("/compose",(req,res)=>{
    const post={
        title:req.body.heading,
        content: req.body.para,
        Author: req.body.author,
        date: new Date(),
    };
    posts.push(post);
    res.redirect("/blogs")
})
app.get("/posts/:postName",(req,res)=>{
    const requestedTitle=lodash.lowerCase(req.params.postName)
    posts.forEach((post)=>{
        const storedTitle=lodash.lowerCase(post.title)
        if(requestedTitle === storedTitle){
            res.render("post",{
                title: post.title,
                content: post.content,
                Author: post.Author,
                date: new Date()
            });
        }
    });
});
app.get("/edit/:postName",(req,res)=>{
    const edittedTitle=lodash.lowerCase(req.params.postName);
    posts.forEach((post)=>{
        if(edittedTitle === lodash.lowerCase(post.title)){
            res.render("edit",{
                title: post.title,
                content: post.content,
                Author: post.Author,
                date: new Date()
            })
        }
    })
})
app.post("/edit/:postName",(req,res)=>{
    const requestedTitle=lodash.lowerCase(req.params.postName)
    let listOfItem=-1;
    posts.forEach((post,index)=>{
        if(requestedTitle === lodash.lowerCase(post.title)){
            let editData={
                title: req.body.heading,
                content:req.body.para,
                Author: req.body.author,
                date:new Date()
            };
            listOfItem=index;
            posts.splice(listOfItem,1,editData);
            res.redirect("/blogs")
        }
    })
})
app.get("/delete/:postName",(req,res)=>{
    const deleteTitle=lodash.lowerCase(req.params.postName)
    let listOfItem=-1;
    posts.forEach((post,index)=>{
        if(deleteTitle === lodash.lowerCase(post.title)){
            listOfItem=index;
            posts.splice(listOfItem,1);
            res.redirect("/blogs")
        }
    });
});
app.listen(port,()=>{
    console.log("Server is running on the port: "+port)
})