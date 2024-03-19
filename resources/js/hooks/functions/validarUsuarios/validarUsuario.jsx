// validarUsuario.js

const validarUsers = async (
    nome,
    chapa,
    horarioDoAlmoco,
    grupo,
    usuario,
    CPF,
    senha,
    gestorResponsavel,
    setGestorResponsavel,
    isGestor,
) => {
    const mensagens = {
        nome: 'O nome precisa ser preenchido',
        chapa: 'A chapa precisa ser preenchida e deve conter pelo menos 5 números',
        horarioAlmoco: 'O horário de almoço precisa ser preenchido',
        grupo: 'O grupo precisa ser selecionado',
        usuarioEsenha: 'Se o usuário ser criado ele precisa de uma senha',
        gestorResponsavel: 'O gestor responsavel precisa ser preenchido',
        CPFFormat: 'CPF no formato inválido',
    };

    const listmsg = [];

    if (!nome) {
        listmsg.push(mensagens.nome);
    }
    if (!chapa || chapa.length < 5 || !/^\d+$/.test(chapa)) {
        listmsg.push(mensagens.chapa);
    }
    if (!horarioDoAlmoco) {
        listmsg.push(mensagens.horarioAlmoco);
    }
    if (!grupo) {
        listmsg.push(mensagens.grupo);
    }

    if (usuario && (senha === undefined || senha === null || senha === '')) {
        listmsg.push(mensagens.usuarioEsenha);
    }
    if (isGestor) {
        setGestorResponsavel('');
    }
    if (!isGestor && !gestorResponsavel) {
  	listmsg.push(mensagens.gestorResponsavel);
    }
    if (CPF && !validarCPF(CPF)) {
        listmsg.push(mensagens.CPFFormat);
    }

    // Retornar um objeto consistente
    return {
        sucesso: listmsg.length === 0,
        mensagens: listmsg,
    };
};

// Função para validar o CPF usando a lógica matemática
const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
};

export default validarUsers;
