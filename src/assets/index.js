const fs = require('fs');
const express = require('express')
const app = express(); 
const mysql = require('mysql2');
const { connSequelize } = require('../../config/bdConnection');
const tb_videos = require('../models/video_model')

// Função para inserir o arquivo no banco de dados
function Inserir_Video(id_aula, nm_arquivo, caminho_video, descricao, id_profissional, id_categoria) {
    const arquivo = fs.readFileSync(caminho_video);
    const sql = 'INSERT INTO tb_videos (id_aula, nm_arquivo, arquivo, descricao, id_profissional, id_categoria) VALUES (?, ?, ?, ?, ?, ?)';
    connSequelize.query(sql, [id_aula, nm_arquivo, arquivo, descricao, id_profissional, id_categoria], (err, result) => {
        if (err) {
            console.error('Erro ao inserir arquivo no banco de dados:', err);
        } else {
            console.log('Arquivo inserido no banco de dados com sucesso!');
        }
    });

Inserir_Video(id_aula, nm_arquivo, caminho_video, descricao, id_profissional, id_categoria);

  }


  /* const fs = require('fs');
const mysql = require('mysql2');
const { connSequelize } = require('../../config/bdConnection');
const tb_videos = require('../models/video_model');

function Inserir_Video(id_aula, nm_arquivo, caminho_video, descricao, id_profissional, id_categoria) {
    try {
        const arquivo = fs.readFileSync(caminho_video);
        const sql = 'INSERT INTO tb_videos (id_aula, nm_arquivo, arquivo, descricao, id_profissional, id_categoria) VALUES (?, ?, ?, ?, ?, ?)';
        connSequelize.query(sql, [id_aula, nm_arquivo, arquivo, descricao, id_profissional, id_categoria], (err, result) => {
            if (err) {
                console.error('Erro ao inserir arquivo no banco de dados:', err);
            } else {
                console.log('Arquivo inserido no banco de dados com sucesso!');
            }
        });
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
    }
}

// Exemplo de chamada da função
const id_aula = 1;
const nm_arquivo = 'video.mp4';
const caminho_video = './assets/video/estudar para o enem.mp4';
const descricao = 'Descrição do vídeo';
const id_profissional = 1;
const id_categoria = 1;

Inserir_Video(id_aula, nm_arquivo, caminho_video, descricao, id_profissional, id_categoria);
*/