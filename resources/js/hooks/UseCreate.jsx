import validarUsers from './functions/validarUsuarios/validarUsuario'
import validarGroup from './functions/validarGrupo/validarGrupo'
import validarSystems from './functions/validarSistemas/validarSistemas'
import enviarDadosParaBackend from './functions/submitbackend/submitbackend'
import enviarDadosParaBackendFile from './functions/submitbackend/submitbackendDataandFile'
import validarSystemsEdit from './functions/validarSystemsEdit/validarSystemsEdit'
import validarUsersEdit from './functions/validarUsersEdit/validarUsersEdit'

const useCreate = () => {

    return { enviarDadosParaBackendFile, validarUsers, validarGroup, validarSystems, enviarDadosParaBackend, validarSystemsEdit, validarUsersEdit }
}

export default useCreate
