import { React, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export const Deslogin = ({ descricao, funcao }) => {
    return (
        <>
            <buttom
                color="success"
                className="col-sm-2 col-form-label col-form-label-sm w-10"
                onClick={funcao}
            >
                {descricao}
            </buttom>
        </>
    )
}

const Submit = ({ descricao, funcao }) => {
    return (
        <>
            <button
                class="btn btn-success"
                onClick={funcao}>
                {descricao}
            </button>
        </>
    )
}

export default Submit;

export const ButtomFile = ({ descricao, setfoto, acceptedFileType }) => {
    const verificarTipo = (e) => {
        const selectedFile = e.target.files[0]

        if (!selectedFile) {
            alert('Nenhum arquivo selecionado.')
            return
        }

        // Converte o tipo do arquivo para letras minúsculas
        const selectedFileType = selectedFile.type.toLowerCase()

        // Divide a lista de tipos aceitos por vírgula e remove espaços em branco
        const acceptedTypes = acceptedFileType
            ? acceptedFileType.split(',').map((type) => type.trim().toLowerCase())
            : []

        // Verifica se o tipo selecionado está na lista de tipos aceitos
        const isAccepted = acceptedTypes.includes(selectedFileType)

        if (isAccepted) {
            // Crie uma URL temporária para exibir a imagem
            const imageUrl = URL.createObjectURL(selectedFile)

            // Atualize o estado 'setfoto' com o arquivo selecionado
            setfoto(imageUrl)

            // Encontre o elemento <img> e atualize seu atributo src
            const imgElement = document.getElementById('previewImage')

            if (imgElement) {
                imgElement.src = imageUrl
            }
        } else {
            alert('Tipo de arquivo não suportado.')
        }
    }

    return (
        <>
            <label
                htmlFor="foto"
                className="bg-success d-flex justify-content-center align-items-center p-3"
                style={{ height: '2.5rem', borderRadius: '5px' }}
            >
                {descricao}
                <input
                    type="file"
                    name="foto"
                    id="foto"
                    style={{ display: 'none' }}
                    onChange={verificarTipo}
                />
            </label>
        </>
    )
}

export const ButtomWebCam = ({ descricao, funcao1, funcao2, estado1, estado2, videoRef }) => {
    return (
        <>
            {estado2 && (
                <button
                    htmlFor="foto"
                    className="bg-warning d-flex justify-content-center align-items-center p-3"
                    style={{ height: '2.5rem', borderRadius: '5px', border: 0 }}
                    onClick={funcao1}
                    type="submit"
                >
                    {descricao}
                </button>
            )}
        </>
    )
}

export const Accept = ({ descricao }) => {
    return (
        <>
            <buttom
                color="dark"
                type="submit"
                className="col-sm-2 col-form-label col-form-label-sm w-100 mt-3"
            >
                {descricao}
            </buttom>
        </>
    )
}

export const Cancel = ({ descricao, funcao }) => {
    return (
        <>
            <buttom
                color="danger"
                type="submit"
                className="col-sm-2 col-form-label col-form-label-sm w-100 mt-3"
                onClick={funcao}
            >
                {descricao}
            </buttom>
        </>
    )
}

export const Success = ({ descricao, funcao }) => {
    return (
        <>
            <buttom
                color="success"
                type="submit"
                className="col-sm-2 col-form-label col-form-label-sm w-100  mt-3"
                onClick={funcao}
            >
                {descricao}
            </buttom>
        </>
    )
}

Deslogin.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.func.isRequired,
}
Submit.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.node.isRequired,
}
Accept.propTypes = {
    descricao: PropTypes.string.isRequired,
}
Cancel.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.node.isRequired,
}
Success.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao: PropTypes.node.isRequired,
}

ButtomFile.propTypes = {
    descricao: PropTypes.string.isRequired,
    foto: PropTypes.node.isRequired,
    setfoto: PropTypes.node.isRequired,
    acceptedFileType: PropTypes.string.isRequired,
}

ButtomWebCam.propTypes = {
    descricao: PropTypes.string.isRequired,
    funcao1: PropTypes.func.isRequired,
    funcao2: PropTypes.func.isRequired,
    estado1: PropTypes.node.isRequired,
    estado2: PropTypes.node.isRequired,
    videoRef: PropTypes.node.isRequired,
}
