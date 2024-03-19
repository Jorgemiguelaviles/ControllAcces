import axios from 'axios';

const enviarDadosParaBackend = async (rotaBack, dados, domain, file = null) => {
    try {


        // Continue com a lógica para enviar os dados para o backend
        const response = await axios.post(rotaBack, dados, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',

            },
        });

        return response.data;
    } catch (error) {
        console.error('Erro durante a solicitação:', error);
        throw error;
    }
};

export default enviarDadosParaBackend;
