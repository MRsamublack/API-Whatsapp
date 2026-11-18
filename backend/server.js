
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

// Configurações
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Diretórios
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsFile = path.join(__dirname, "data", "contacts.json");

// Middlewares
app.use(cors());
app.use(express.json());

// Funções de armazenamento
async function lerContatos() {
    const dados = await readFile(contactsFile, "utf-8");
    return JSON.parse(dados);
}

async function salvarContatos(contatos) {
    await writeFile(
        contactsFile,
        JSON.stringify(contatos, null, 4)
    );
}

// Rota principal
app.get("/api/status", (req, res) => {
    res.json({
        sistema: "WhatsApp Automation",
        status: "Online"
    });
});

// Consultar contatos
app.get("/api/contatos", async (req, res) => {
    try {
        const contatos = await lerContatos();
        res.json(contatos);

    } catch (erro) {
        res.status(500).json({
            erro: "Não foi possível consultar os contatos."
        });
    }
});

// Cadastrar contato
app.post("/api/contatos", async (req, res) => {
    try {
        const { nome, telefone, autorizado } = req.body;

        if (
            typeof nome !== "string" ||
            !nome.trim() ||
            typeof telefone !== "string" ||
            !/^\+?[0-9\s()-]{10,20}$/.test(telefone.trim()) ||
            typeof autorizado !== "boolean"
        ) {
            return res.status(400).json({
                erro: "Informe nome, telefone válido e autorização."
            });
        }

        const contatos = await lerContatos();

        const novoContato = {
            id: randomUUID(),
            nome: nome.trim(),
            telefone: telefone.trim(),
            autorizado,
            criadoEm: new Date().toISOString()
        };

        contatos.push(novoContato);

        await salvarContatos(contatos);

        res.status(201).json({
            mensagem: "Contato cadastrado com sucesso!",
            contato: novoContato
        });

    } catch (erro) {
        res.status(500).json({
            erro: "Não foi possível cadastrar o contato."
        });
    }
});

// Disponibilizar frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
