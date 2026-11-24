Para enviar projetos para o git hub, passo a passo: 

## 1. Primeiro envio (projeto novo)

```bash
git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin LINK_DO_REPOSITORIO
git push -u origin main
```

## 2. Envios seguintes (atualizações)

```bash
git add . && git commit -m "Descrição das alterações" && git push
```

## 3. O que cada comando faz?

- `git add .` — Adiciona as alterações.
- `git commit -m "mensagem"` — Registra as alterações.
- `git push` — Envia as alterações para o GitHub.

**Lembrete:** ADD → COMMIT → PUSH