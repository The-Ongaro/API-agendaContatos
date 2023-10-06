import {conexao} from './connection.js'

export async function inserirAgenda(agenda) {
    const comando =
    `INSERT INTO tb_agenda (nm_contato, ds_telefone, ds_email, bt_favorito, dt_cadastro)
                    VALUES (?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [agenda.nome, agenda.telefone, agenda.email, agenda.favorito, agenda.cadastro])
    agenda.id = resposta.insertId;
    return agenda;
}

export async function listarContatos() {
    const comando = 
    `SELECT id_agenda       as ID,
            nm_contato      as Nome,
            ds_telefone     as Telefone,
            ds_email        as Email,
            bt_favorito     as Favorito,
            dt_cadastro     as Cadastro
                FROM tb_agenda`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function buscarPorNome(nome) {
    const comando = 
    `SELECT id_agenda       as ID,
            nm_contato      as Nome,
            ds_telefone     as Telefone,
            ds_email        as Email,
            bt_favorito     as Favorito,
            dt_cadastro     as Cadastro 
                FROM tb_agenda
	                WHERE nm_contato LIKE ?`

    const [resposta] = await conexao.query(comando, [`%${nome}%`]);
    return resposta;
}

export async function buscarFavoritos(favoritos) {
    const comando = 
    `SELECT id_agenda       as ID,
            nm_contato      as Nome,
            ds_telefone     as Telefone,
            ds_email        as Email,
            bt_favorito     as Favorito,
            dt_cadastro     as Cadastro 
                FROM tb_agenda
	                WHERE bt_favorito = true`

    const [resposta] = await conexao.query(comando, [favoritos]);
    return resposta;
}

export async function buscarContatosIntervalo(inicio, fim) {
    const comando =
    `SELECT id_agenda FROM tb_agenda
        WHERE id_agenda > ? && id_agenda < ?`

    const [resposta] = await conexao.query(comando, [inicio, fim]);
    return resposta;
}

export async function alterarContato (id, contato) {
    const comando = 
    `UPDATE tb_agenda 
        SET nm_contato          = ?, 
            ds_telefone         = ?, 
            ds_email            = ?, 
            bt_favorito         = ?, 
            dt_cadastro         = ? 
                WHERE id_agenda = ? `

    const [resposta] = await conexao.query(comando, [contato.nome, contato.telefone, contato.email, contato.favorito, contato.data, id])
    return resposta.affectedRows;
}

export async function deletarContato (id) {
    const comando = 
    `DELETE FROM TB_AGENDA
            WHERE ID_AGENDA = ?`

    const [resposta] = await conexao.query (comando, [id])
    return resposta.affectedRows;
}