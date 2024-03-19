export const validarSystems = async (tiposDeAcessonew, save, tipoAlterado) => {
    const mensagens = {
        tiposDeAcesso: 'É necessário que haja pelo menos um tipo de acesso criado',
        tiposDeAcessowhite: 'Todos os tipos de acesso devem ser preenchidos',
    };

    const listmsg = [];

    // Verificar se 'save' é true
    if (save || tipoAlterado) {
        return {
            sucesso: true,
            mensagens: listmsg,
        };
    }

    // Verificar se pelo menos um 'tipoDeAcessonew' foi criado e não está vazio
    if (!tiposDeAcessonew || tiposDeAcessonew.length === 0) {
        listmsg.push(mensagens.tiposDeAcesso);
    } else {
        const algumTipoEmBranco = tiposDeAcessonew.some((tipo) => tipo.trim() === '');
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
