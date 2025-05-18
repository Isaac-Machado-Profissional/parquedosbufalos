const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const nodemailer = require('nodemailer');
const connection = require('./DB/database');
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());

// Rota para tratar o callback do OAuth (exemplo para Facebook/Instagram)
app.get('/callback', (req, res) => {
    const { code } = req.query; // O código de autenticação que o Facebook/Instagram envia

    if (!code) {
        return res.status(400).send('Código de autorização ausente.');
    }

    // Exemplo de resposta:
    res.send(`Código de autorização recebido: ${code}`);
});

app.get('/db-test', (req, res) => {
    connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco:', err);
            return res.status(500).send('Erro ao consultar o banco de dados.');
        }
        res.send(`Banco funcionando! Resultado: ${results[0].resultado}`);
    });
});

//coisas do nodemailer

// Rota pra teste
app.post('/api/send-newsletter', async (req, res) => {
    const { to, subject, text } = req.body;

    // Configuração do transporter do Nodemailer para Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER, 
            pass: process.env.GMAIL_PASS 
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to,
            subject,
            text
        });
        res.status(200).send({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send({ message: 'Erro ao enviar e-mail.' });
    }
});

// Rota para envio em massa da newsletter
app.post('/api/send-newsletter-all', async (req, res) => {
    const { subject, text } = req.body;

    connection.query('SELECT email FROM newsletter_emails', async (err, results) => {
        if (err) {
            console.error('Erro ao buscar e-mails:', err);
            return res.status(500).send({ message: 'Erro ao buscar e-mails.' });
        }
        const emails = results.map(row => row.email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        try {
            await transporter.sendMail({
                from: process.env.GMAIL_USER,
                bcc: emails, // envio em massa usando BCC
                subject,
                text
            });
            res.status(200).send({ message: 'Newsletter enviada para todos!' });
        } catch (error) {
            console.error('Erro ao enviar newsletter:', error);
            res.status(500).send({ message: 'Erro ao enviar newsletter.' });
        }
    });
});

// Rota para cadastrar e-mails no banco de dados
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ message: 'E-mail é obrigatório.' });
    }
    connection.query(
        'INSERT INTO newsletter_emails (email) VALUES (?)',
        [email],
        (err, results) => {
            if (err) {
                console.error('Erro ao salvar o e-mail:', err);
                return res.status(500).send({ message: 'Erro ao salvar o e-mail.' });
            }
            res.status(201).send({ message: 'E-mail cadastrado com sucesso!' });
        }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


