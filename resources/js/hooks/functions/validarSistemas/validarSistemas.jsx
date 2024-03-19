export const validarSystems = async (nome, tiposDeAcesso) => {
    const mensagens = {
        nome: 'O nome precisa ser preenchido',
        tiposDeAcesso: 'É necessário que haja pelo menos um tipo de acesso criado', // Adicione outras mensagens conforme necessário
        tiposDeAcessowhite: 'Todos os tipos de acesso devem ser preenchidos'
    };

    const listmsg = [];

    if (!nome) {
        listmsg.push(mensagens.nome);
    }

    if (!tiposDeAcesso || tiposDeAcesso.length === 0) {
        listmsg.push(mensagens.tiposDeAcesso);
    } else {
        // Verificar se pelo menos um tipo de acesso não está em branco
        const algumTipoEmBranco = tiposDeAcesso.some((tipo) => tipo.trim() === '');

        if (algumTipoEmBranco) {
            listmsg.push(mensagens.tiposDeAcessowhite);
        }
    }

    // Retornar ou lidar com as mensagens de erro conforme necessário
    return {
        sucesso: listmsg.length === 0,
        mensagens: listmsg,
    };
};

export default validarSystems;
