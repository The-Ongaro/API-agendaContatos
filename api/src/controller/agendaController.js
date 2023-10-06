import { inserirAgenda, buscarPorNome, buscarFavoritos, buscarContatosIntervalo, deletarContato, alterarContato, listarContatos,  } from "../repository/agendaRepository.js";

import {Router} from 'express';
const server = Router();

server.post('/contato', async (req, resp) => {
    try {
        const inserir = req.body;

        if(!inserir.nome)
            throw new Error('Nome inválido.');

        if(!inserir.telefone)
            throw new Error('Telefone Inválido.');

        if(!inserir.email)
            throw new Error('E-mail inválido.');

        if(inserir.favorito == undefined)
            throw new Error('Campo favorito inválido.');

        if(!inserir.cadastro)
            throw new Error('Data cadastro inválida.');
        
        const agendaInserida = await inserirAgenda(inserir);
        resp.send(agendaInserida);
        
    }catch (err) {
            resp.status(404).send({
                erro: err.message
            })
    }
})

server.get('/contato', async (req, resp) => {
    try{
        const dados = await listarContatos();

        if(dados.length === 0)
            throw new Error('Não há nenhum contato cadastrado.');

        resp.send(dados);

    } catch(err){
        resp.status(404).send({
            erro: err.message
        })
    }
})



server.get('/contato/buscar', async (req, resp) => {
    try{
        const {nome} = req.query;
        const dados = await buscarPorNome(nome);

        if(dados.length === 0)
            throw new Error('Não há nenhum contato com esse nome.');

        resp.send(dados);

    } catch(err){
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.get('/contato/favoritos', async (req, resp) => {

    try{
        const {favoritos} = req.query;

        const dados = await buscarFavoritos(favoritos);
        resp.send(dados);

    } catch(err){
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.get('/contato/cadastro', async (req, resp) => {
    try{
        const {inicio, fim} = req.query;
        const resposta = await buscarContatosIntervalo(inicio, fim);
        resp.send(resposta);

    }catch(err){
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.put('/contato/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const alteracao = req.body;

        if(!alteracao.nome)
        throw new Error('Nome inválido.');

        if(!alteracao.telefone)
            throw new Error('Telefone Inválido.');

        if(!alteracao.email)
            throw new Error('E-mail inválido.');

        if(alteracao.favorito == undefined)
            throw new Error('Campo favorito inválido.');

        if(!alteracao.cadastro)
            throw new Error('Data cadastro inválida.');
        
        const resposta = await alterarContato(id, alteracao);
        if(resposta != 1)
            throw new Error('Não foi possível alterar o contato.');

        resp.status(204).send();
        
    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.delete('/contato/:id', async (req, resp) => {
    try {
        const {id} = req.params
        const resposta = await deletarContato(id)

        if(resposta != 1)
            throw new Error('Não foi possível deletar esse contato.');

        resp.status(204).send()

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }
})


export default server;