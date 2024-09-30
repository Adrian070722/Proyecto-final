const http = require("http");
const path = require( "path");
const fs = require("fs");
const host = 'localhost';
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./DB/db");
const { createArticle, getArticle, updateArticle, deleteArticle} = require("./Models/articulos");
const { createComentarios, updateComentarios, getComentarios } = require("./Models/comentarios");
const { createFaqs, getFaqs, updateFaqs, deleteFaqs } = require("./Models/faqs");
const { createMensajes, getMensajes, updateMensajes, deleteMensajes } = require("./Models/mensajes");
const {createUser, findUserByEmail} = require("./Models/usuarios");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie');
const auth = require("./middleware/auth");
const requestListener = function (request, response) {
    if (request.url == "/") {
        const filepath = path.join (__dirname, "Templates/index.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    }
    else if (request.url == "/usuarios/inicio") {
        const filepath = path.join (__dirname, "Templates/usuarios/index.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    }
    
    else if (request.url == "/usuarios/faqs") {
        const filepath = path.join (__dirname, "Templates/usuarios/faqs.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    }
    else if (request.url == "/usuarios/blog") {
        const filepath = path.join (__dirname, "Templates/usuarios/blog.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    }



    else if (request.url == "/empresas/inicio") {
        const filepath = path.join (__dirname, "Templates/empresas/index.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    }
    else if (request.url == "/empresas/faqs") {
        const filepath = path.join (__dirname, "Templates/empresas/faqs.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    }
    else if (request.url == "/empresas/blog") {
        const filepath = path.join (__dirname, "Templates/empresas/blog.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    } 
    else if (request.url == "/bienvenido/inicio") {
        const filepath = path.join (__dirname, "Templates/bienvenido/index.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        } )
    }

    else if (request.url == "/admins/login") {
        const filepath = path.join (__dirname, "Templates/admins/auth/login.html")
        fs.readFile(filepath, (error, content)=>{
            if(error){
                response.writeHead (500)
                response.end("error en el servidor")
            } else{
                response.writeHead (200, {"Content-Type": "text/html"})
                response.end(content)
            }

        });
    }

    else if (request.url === '/auth/logout') {
        response.writeHead(302, {
            'Set-Cookie': cookie.serialize('token', '', {
                httpOnly: true,
                expires: new Date(0),
                path: '/'
            }),
            'Content-Type': 'text/plain', 
            'Location': '/admins/login'
        });
        //response.writeHead(302, { 'Location': '/admins/login' });
        response.end('Cierre de sesión exitoso');
    }

    else if (request.method === 'POST' && request.url === '/auth/login') {
        let body = '';
        request.on('data', chunk => { body += chunk.toString(); });
        request.on('end', async () => {
            const { email, password } = JSON.parse(body);
            try {
                const user = await findUserByEmail(email);
                if (!user) {
                response.writeHead(401, { 'Content-Type': 'text/plain' });
                response.end('Credenciales inválidas');
                return;
                }
                const isMatch = await bcrypt.compare(password.toString(), user.password);
                if (!isMatch) {
                response.writeHead(401, { 'Content-Type': 'text/plain' });
                response.end('Credenciales inválidas');
                return;
                }
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log('Token generado:', token);
                response.writeHead(200, {
                'Set-Cookie': cookie.serialize('token', token, { httpOnly: true, path: '/' }),
                'Content-Type': 'text/plain'
                });
                response.end('Inicio de sesión exitoso');
            } catch (err) {
                console.log("Error:", err);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Error al iniciar sesión');
            }
        });
    }


    else if (request.url == "/admins/register") {
        auth(request, response, ()=> {

            const filepath = path.join (__dirname, "Templates/admins/auth/register.html")
            fs.readFile(filepath, (error, content)=>{
                if(error){
                    response.writeHead (500)
                    response.end("error en el servidor")
                } else{
                    response.writeHead (200, {"Content-Type": "text/html"})
                    response.end(content)
                }
    
            });
        });
    }

    else if (request.method === 'POST' && request.url === '/auth/register') {
        let body = '';
        request.on('data', chunk => { body += chunk.toString(); });
        request.on('end', async () => {
            const { name, email, password } = JSON.parse(body);
            try {
                const user = await createUser(name, email, password);
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(user));
            } catch (err) {
                console.log("Error:", err);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Error al crear usuario');
            }
        });
    }

    else if (request.url == "/admins/blog") {
        auth(request, response, async () => {

            const filepath = path.join (__dirname, "Templates/admins/blog.html")
            fs.readFile(filepath, (error, content)=>{
                if(error){
                    response.writeHead (500)
                    response.end("error en el servidor")
                } else{
                    response.writeHead (200, {"Content-Type": "text/html"})
                    response.end(content)
                }
    
            });
         });
    }

    
    else if (request.url == "/admins/faqs") {
        auth(request, response, async () => { 

            const filepath = path.join (__dirname, "Templates/admins/faqs.html")
            fs.readFile(filepath, (error, content)=>{
                if(error){
                    response.writeHead (500)
                    response.end("error en el servidor")
                } else{
                    response.writeHead (200, {"Content-Type": "text/html"})
                    response.end(content)
                }
    
            });
        });
    }


    else if (request.url == "/admins/inicio") {
        auth(request, response, async () => { 

            const filepath = path.join (__dirname, "Templates/admins/index.html")
            fs.readFile(filepath, (error, content)=>{
                if(error){
                    response.writeHead (500)
                    response.end("error en el servidor")
                } else{
                    response.writeHead (200, {"Content-Type": "text/html"})
                    response.end(content)
                }
    
            });
        });
    }

    else if (request.url == "/admins/mensajes") {
        auth(request, response, async () => {

            const filepath = path.join (__dirname, "Templates/admins/mensajes.html")
            fs.readFile(filepath, (error, content)=>{
                if(error){
                    response.writeHead (500)
                    response.end("error en el servidor")
                } else{
                    response.writeHead (200, {"Content-Type": "text/html"})
                    response.end(content)
                }
    
            });
         });
    }
    



    else if (request.url === '/api/create/article' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const article = JSON.parse(body);
            createArticle(article).then(id => {
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ insertedId: id }));
            }).catch(err => {
                console.error('Error creating article:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error creating article' }));
            });
        });
    }
    else if (request.url === '/api/get/article') {
        getArticle().then(data => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(data));
        }).catch(err => {
            console.error('Error fetching articles:', err); // Log del error
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error fetching articles' }));
        });
    }
    else if (request.url.startsWith('/api/update/article') && request.method === 'PUT') {
        const articleId = request.url.split('/').pop();
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const updatedArticle = JSON.parse(body);
            updateArticle(articleId, updatedArticle).then(modifiedCount => {
                if (modifiedCount === 1) {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: 'article updated' }));
                } else {
                    response.writeHead(404, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'article not found' }));
                }
            }).catch(err => {
                console.error('Error updating article:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error updating article' }));
            });
        });
    }
    else if (request.url.startsWith('/api/delete/article') && request.method === 'DELETE') {
        const articleId = request.url.split('/').pop();
        deleteArticle(articleId).then(deletedCount => {
            if (deletedCount === 1) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'article deleted' }));
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'article not found' }));
            }
        }).catch(err => {
            console.error('Error deleting article:', err);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error deleting article' }));
        });
    }

    
    else if (request.url === '/api/create/comentarios' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const comentarios = JSON.parse(body);
            createComentarios(comentarios).then(id => {
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ insertedId: id }));
            }).catch(err => {
                console.error('Error creating comentarios:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error creating comentarios' }));
            });
        });
    }
    else if (request.url === '/api/get/comentarios') {
        getComentarios().then(data => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(data));
        }).catch(err => {
            console.error('Error fetching comentarios:', err); // Log del error
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error fetching comentarios' }));
        });
    }
    else if (request.url.startsWith('/api/update/comentarios') && request.method === 'PUT') {
        const comentariosId = request.url.split('/').pop();
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const updatedComentarios = JSON.parse(body);
            updateComentarios(comentariosId, updatedComentarios).then(modifiedCount => {
                if (modifiedCount === 1) {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: 'comentarios updated' }));
                } else {
                    response.writeHead(404, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'comentarios not found' }));
                }
            }).catch(err => {
                console.error('Error updating comentarios:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error updating comentarios' }));
            });
        });
    }
    else if (request.url.startsWith('/api/delete/comentarios') && request.method === 'DELETE') {
        const comentariosId = request.url.split('/').pop();
        
        deleteComentarios(comentariosId).then(deletedCount => {
            if (deletedCount === 1) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'comentarios deleted' }));
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'comentarios not found' }));
            }
        }).catch(err => {
            console.error('Error deleting comentarios:', err);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error deleting comentarios' }));
        });
    }

    else if (request.url === '/api/create/faqs' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const faqs = JSON.parse(body);
            createFaqs(faqs).then(id => {
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ insertedId: id }));
            }).catch(err => {
                console.error('Error creating faqs:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error creating faqs' }));
            });
        });
    }
    else if (request.url === '/api/get/faqs') {
        getFaqs().then(data => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(data));
        }).catch(err => {
            console.error('Error fetching faqs:', err); // Log del error
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error fetching faqs' }));
        });
    }
    else if (request.url.startsWith('/api/update/faqs') && request.method === 'PUT') {
        const faqsId = request.url.split('/').pop();
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const updatedFaqs = JSON.parse(body);
            updateFaqs(faqsId, updatedFaqs).then(modifiedCount => {
                if (modifiedCount === 1) {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: 'faqs updated' }));
                } else {
                    response.writeHead(404, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'faqs not found' }));
                }
            }).catch(err => {
                console.error('Error updating faqs:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error updating faqs' }));
            });
        });
    }
    else if (request.url.startsWith('/api/delete/faqs') && request.method === 'DELETE') {
        const faqsId = request.url.split('/').pop();
        deleteFaqs(faqsId).then(deletedCount => {
            if (deletedCount === 1) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'faqs deleted' }));
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'faqs not found' }));
            }
        }).catch(err => {
            console.error('Error deleting faqs:', err);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error deleting faqs' }));
        });
    }

    
    else if (request.url === '/api/create/mensajes' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const mensajes = JSON.parse(body);
            createMensajes(mensajes).then(id => {
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ insertedId: id }));
            }).catch(err => {
                console.error('Error creating mensajes:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error creating mensajes' }));
            });
        });
    }
    else if (request.url === '/api/get/mensajes') {
        getMensajes().then(data => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(data));
        }).catch(err => {
            console.error('Error fetching mensajes:', err); // Log del error
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error fetching mensajes' }));
        });
    }
    else if (request.url.startsWith('/api/update/mensajes') && request.method === 'PUT') {
        const mensajesId = request.url.split('/').pop();
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const updatedMensajes = JSON.parse(body);
            updateMensajes(mensajesId, updatedMensajes).then(modifiedCount => {
                if (modifiedCount === 1) {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: 'mensajes updated' }));
                } else {
                    response.writeHead(404, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'mensajes not found' }));
                }
            }).catch(err => {
                console.error('Error updating mensajes:', err);
                response.writeHead(500, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Error updating mensajes' }));
            });
        });
    }
    else if (request.url.startsWith('/api/delete/mensajes') && request.method === 'DELETE') {
        const mensajesId = request.url.split('/').pop();
        deleteMensajes(mensajesId).then(deletedCount => {
            if (deletedCount === 1) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'mensajes deleted' }));
            } else {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'mensajes not found' }));
            }
        }).catch(err => {
            console.error('Error deleting mensajes:', err);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Error deleting mensajes' }));
        });
    }



    else if (request.url === '/styles') {
        const filePath = path.join(__dirname, 'Assets/css/styles.css');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                response.writeHead(500);
                response.end('Error en el servidor');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/css' });
                response.end(content);
            }
        });
    } 
    else if (request.url === '/js') {
        const filePath = path.join(__dirname, './Assets/js/app.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(err);
                response.writeHead(500);
                response.end('Error en el servidor');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' });
                response.end(content);
            }
        });
    } 

    else if (request.url === '/admin-article-js') {
        const filePath = path.join(__dirname, './Assets/js/admin-article.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(err);
                response.writeHead(500);
                response.end('Error en el servidor');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' });
                response.end(content);
            }
        });
    } 

    else if (request.url === '/admin-comentarios-js') {
        const filePath = path.join(__dirname, './Assets/js/admin-comentarios.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(err);
                response.writeHead(500);
                response.end('Error en el servidor');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' });
                response.end(content);
            }
        });
    } 

    else if (request.url === '/admin-faqs-js') {
        const filePath = path.join(__dirname, './Assets/js/admin-faqs.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(err);
                response.writeHead(500);
                response.end('Error en el servidor');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' });
                response.end(content);
            }
        });
    } 
    
    else if (request.url === '/admin-mensajes-js') {
        const filePath = path.join(__dirname, './Assets/js/admin-mensajes.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(err);
                response.writeHead(500);
                response.end('Error en el servidor');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/javascript' });
                response.end(content);
            }
        });
    } 


    else if (request.url.match(/.(jpg|jpeg|png|gif)$/)) {
        const filePath = path.join(__dirname, 'Assets/img', request.url);
        const extname = path.extname(request.url).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        
        
    console.log("")
     
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(err);
                response.writeHead(500);
                response.end('Error en el servidor');
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content);
            }
        });
    }
    else if (request.url.match(/.(mp4|webm|ogg)$/)) {
        const sanitizedUrl = path.normalize(request.url).replace(/^(\.\.[\/\\])+/, '');
        const filePath = path.join(__dirname, 'Assets/video', sanitizedUrl);
        const extname = path.extname(request.url).toLowerCase();
        const mimeTypes = {
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.ogg': 'video/ogg'
        };
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.stat(filePath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Archivo no encontrado');
                } else {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end(`Error en el servidor: ${err.message}`);
                }
                return;
            }

            const range = request.headers.range;
            if (!range) {
                response.writeHead(416, { 'Content-Type': 'text/plain' });
                response.end('requiere el encabezado Range');
                return;
            }

            const positions = range.replace(/bytes=/, "").split("-");
            const start = parseInt(positions[0], 10);
            const total = stats.size;
            const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            const chunksize = (end - start) + 1;

            response.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${total}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType
            });
const stream = fs.createReadStream(filePath, { start, end })
                .on('open', () => {
                    stream.pipe(response);
                }).on('error', (err) => {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end(`Error en el servidor: ${err.message}`);
                });
        });
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Archivo no encontrado');
    }
} 


const server = http.createServer(requestListener);
connectDB().then(()=>{
    server.listen(PORT,  ()=>{
        console.log("mi servidor esta funcionando en http://localhost:"+PORT + "/bienvenido/inicio")
    })

});
