import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ obrigatorio, etiqueta, desativado, input, setinput, tipo, personalizacao, subtitulo }) => {
  const etiquetaComAsterisco = obrigatorio ? (
    <>
      {subtitulo} <span style={{ color: 'red' }}>*</span>
    </>
  ) : (
    subtitulo
  );

  return (
    <div className="row mb-3">
      <div className="col-sm">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1" disabled={desativado}>
            {etiquetaComAsterisco}
          </span>
          <input
            type={tipo}
            className="form-control"
            placeholder={etiqueta}
            aria-label={etiqueta}
            aria-describedby={personalizacao}
            disabled={desativado}
            value={input}
            onChange={(e) => setinput(e.target.value)}
            required={obrigatorio} // Adicionando required quando o campo é obrigatório
          />
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  desativado: PropTypes.bool.isRequired,
  input: PropTypes.string.isRequired,
  setinput: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  personalizacao: PropTypes.string.isRequired,
  subtitulo: PropTypes.string.isRequired,
  obrigatorio: PropTypes.bool, // Adicionando a propriedade obrigatorio
};

export default Input;
