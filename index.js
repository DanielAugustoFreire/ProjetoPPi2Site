import express from 'express';
import path from 'path';

const PORTA = 3000;
const HOST = '0.0.0.0';

const app = express();

var lista_usuario = [];

function processarCadastro(req, res)
{
    const usuario = {
        email: req.query.emailentrada,
        nome: req.query.full_name,
        check1: req.query.check1,
        check2: req.query.check2,
        check3: req.query.check3
    }

    if(usuario.check1 != 1) usuario.check1 = 0;
    if(usuario.check2 != 1) usuario.check2 = 0;
    if(usuario.check3 != 1) usuario.check3 = 0;

    lista_usuario.push(usuario);

    res.redirect(`/listar`);

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

app.get(`/cadastrarusuario`, processarCadastro);


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