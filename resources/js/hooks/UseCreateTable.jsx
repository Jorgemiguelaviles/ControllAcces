import axios from 'axios';
const useCreateTable = () => {
    const getDataFromBackend = async (route, domain) => {
        try {



            // Continue com a lógica para realizar a solicitação GET
            const response = await axios.get(route);

            // Log dos dados no console

            if (response.status === 200) {
                const data = response.data;
                return data;
            } else {
                throw new Error(`Erro ao chamar a API: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro durante a solicitação:', error);
            throw error;
        }
    };

    return getDataFromBackend;
};

export default useCreateTable;
