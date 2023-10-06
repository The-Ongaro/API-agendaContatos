-- TABELA AGENDA --
-- INSERIR --
INSERT INTO tb_agenda (nm_contato, ds_telefone, ds_email, bt_favorito, dt_cadastro)
                    VALUES (?, ?, ?, ?, ?);

-- LISTAR TODOS CONTATOS --
SELECT id_agenda       as ID,
       nm_contato      as Nome,
       ds_telefone     as Telefone,
       ds_email        as Email,
       bt_favorito     as Favorito,
       dt_cadastro     as Cadastro
            FROM tb_agenda;

-- LISTAR POR NOME --
SELECT id_agenda       as ID,
       nm_contato      as Nome,
       ds_telefone     as Telefone,
       ds_email        as Email,
       bt_favorito     as Favorito,
       dt_cadastro     as Cadastro 
            FROM tb_agenda
	            WHERE nm_contato LIKE ?;

-- LISTAR POR FAVORITOS --
SELECT id_agenda       as ID,
       nm_contato      as Nome,
       ds_telefone     as Telefone,
       ds_email        as Email,
       bt_favorito     as Favorito,
       dt_cadastro     as Cadastro 
            FROM tb_agenda
	            WHERE bt_favorito = true;

-- LISTAR POR INTERVALO DE CONTATOS --
SELECT id_agenda FROM tb_agenda
        WHERE id_agenda > ? && id_agenda < ?;

-- ALTERAR --
UPDATE tb_agenda 
   SET nm_contato           = ?, 
       ds_telefone          = ?, 
       ds_email             = ?, 
       bt_favorito          = ?, 
       dt_cadastro          = ? 
            WHERE id_agenda = ?; 

-- DELETAR --
DELETE FROM TB_AGENDA
        WHERE ID_AGENDA = ?;