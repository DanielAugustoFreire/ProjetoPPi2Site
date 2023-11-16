import express from 'express';
import path from 'path';

const PORTA = 3000;
const HOST = '0.0.0.0';

const app = express();

var lista_usuario = [];

function processarCadastro(req, res)
{
    const dados = req.body;

    const checker = req.body.check1 || req.body.check2 || req.body.check3;


    if(!(req.body.full_name && req.body.emailentrada && checker))
    {
        var resposta = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        </head>
        <body style="display: flex;
                    padding: 10%;
                    justify-content: center;
                    "
        >
        
            <div class="container bg-secondary p-md-5">    
                <form action="/cadastrarusuario" method="POST" novalidate>
                <div class="form-group">
                  <label for="emailentrada">Endereço de email</label>
                  <input type="email" class="form-control" id="emailentrada" name="emailentrada" value="${req.body.emailentrada}" aria-describedby="emailHelp"required>`;

        if(!req.body.emailentrada)
        {
            resposta +=`<p style="color: red;">Por favor, preencha este campo.</p>`;
        }

        resposta += `        </div>
        <div class="form-group">
          <label for="senha">Nome Completo</label>
          <input type="text" class="form-control" id="full_name" value="${req.body.full_name}" name="full_name" required>`;
     
          if(!req.body.full_name)
        {
            resposta +=`<p style="color: red;">Por favor, preencha este campo.</p>`;
        }
     
        resposta += `        </div>
        <div class="form-group form-check">`
        if(req.body.check1){
            resposta += `<input type="checkbox" class="form-check-input" name="check1" value="1" id="Check1" checked>
            <label class="form-check-label" for="Check1">Destro</label><br>`
        }
        else{
            resposta += `<input type="checkbox" class="form-check-input" name="check1" value="1" id="Check1">
            <label class="form-check-label" for="Check1">Destro</label><br>`
        }
        if(req.body.check2){
            resposta +=`<input type="checkbox" class="form-check-input" name="check2" value="1" id="Check2" checked>
            <label class="form-check-label" for="Check2">Canhoto</label><br>`
        }
        else{
            resposta +=         `<input type="checkbox" class="form-check-input" name="check2" value="1" id="Check2">
            <label class="form-check-label" for="Check2">Canhoto</label><br>`
        }
        if(req.body.check3){
            resposta += 
            `<input type="checkbox" class="form-check-input" name="check3" value="1" id="Check3" checked>
            <label class="form-check-label" for="Check3">Ambidestro</label>`
        }
        else{
            resposta += 
            `<input type="checkbox" class="form-check-input" name="check3" value="1" id="Check3">
            <label class="form-check-label" for="Check3">Ambidestro</label>`
        }
        if(!checker)
        {
            resposta +=`<p style="color: red;">Por favor, preencha pelo menos um checker.</p>`;
        }
        resposta += `</div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>

                <script>

                </script>

                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            </body>
            </html>`;

        res.end(resposta);
    }  
    else
    {
        const usuario = {
            email: req.body.emailentrada,
            nome: req.body.full_name,
            check1: req.body.check1 ?? 0,
            check2: req.body.check2 ?? 0,
            check3: req.body.check3 ?? 0
        }

        lista_usuario.push(usuario);

        res.redirect(`/listar`);
    }
    
};

function listar(req,res){
    let conteudo = `    <style>
    body {
        font-family: Arial, sans-serif;
    }

    h1 {
        color: #333; /* Altere a cor conforme necessário */
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px; /* Ajuste conforme necessário */
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2; /* Cor de fundo para cabeçalho */
    }

    /* Estilizar linhas alternadas */
    tbody tr:nth-child(even) {
        background-color: #f9f9f9; /* Cor de fundo para linhas pares */
    }
    a {
        display: inline-block;
        padding: 10px;
        margin-top: 10px; /* Ajuste conforme necessário */
        text-decoration: none;
        color: #fff; /* Cor do texto dos links */
        background-color: #007bff; /* Cor de fundo dos links */
        border-radius: 5px; /* Borda arredondada */
        transition: background-color 0.3s ease; /* Efeito de transição suave */
    }

    a:hover {
        background-color: #0056b3; /* Cor de fundo ao passar o mouse */
    }
</style> <body  style="font-family: Arial, sans-serif;">
    <h1>Lista de usuario cadastrados</h1>
    <table>
        <thead>
            <tr>
                <th>Email</th>
                <th>Nome Completo</th>
                <th>Destro</th>
                <th>Canhoto</th>
                <th>Ambidestro</th>
            </tr>
        </thead>
        <tbody> `;

    for (const usuario of lista_usuario){
        conteudo += `<tr>
                        <td>${usuario.email}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.check1}</td>
                        <td>${usuario.check2}</td>
                        <td>${usuario.check3}</td>
                    <tr>
        `;
    }
    
    app.use(express.static(path.join(process.cwd(),`src`)))

    conteudo+=
    `            </tbody>
    </table>
    <a href="/">Voltar ao menu</a>
    <a href="/cadastro.html">Continuar cadastrando</a>
        </body>
    `;
       
    res.end(conteudo);
};

app.use(express.urlencoded({ extended: true }));

app.post(`/cadastrarusuario`, processarCadastro)


app.get(`/listar`, listar);

app.get(`/`, (req,res) => {
    app.use(express.static(path.join(process.cwd(),`src`)));

    res.send(`
    <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    h1 {
        text-align: center;
        color: #333;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .instructions {
        text-align: center;
        margin-top: 20px;
        color: #555;
    }

    .button-container {
        text-align: center;
        margin-top: 20px;
    }

    button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>
    <body>      

    <h1>Responda o seguinte Form:<br><a href="/cadastro.html">Formulário</a></h1>
    <h1 class="instructions">Para Listar, clique no botao abaixo</h1>
    <button onclick="redirecionarParaListar()">Listar</button>
    <script>
        function redirecionarParaListar() {
            window.location.href = '/listar';
        }
    </script>

    </body>

    `);
});

app.listen(PORTA, HOST, () =>{
    console.log(`Rodando em ${HOST}:${PORTA}`);
});