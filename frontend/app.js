
async function verificarServidor() {

    const status = document.getElementById("server-status");
    const detalhe = document.getElementById("server-detail");

    try {

        const resposta = await fetch("/api/status");

        if (!resposta.ok) {
            throw new Error("Servidor indisponível");
        }

        const dados = await resposta.json();

        status.textContent = "Servidor online";
        detalhe.textContent = dados.status;

    } catch (erro) {

        status.textContent = "Servidor offline";
        detalhe.textContent = "Desconectado";

        console.error("Erro ao consultar servidor:", erro);
    }
}

verificarServidor();
