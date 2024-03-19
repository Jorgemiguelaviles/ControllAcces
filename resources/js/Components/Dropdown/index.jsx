import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ etiqueta, desativado, selectedOption, setSelectedOption, optionsData, personalizacao, subtitulo, obrigatorio }) => {
  const etiquetaComAsterisco = obrigatorio ? (
    <>
      {subtitulo} <span style={{ color: 'red' }}> *</span>
    </>
  ) : (
    subtitulo
  );

  // Adicionando um array padrão de opções caso optionsData não seja fornecido
  const options = optionsData;

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="row mb-3">
      <div className="col-sm">
        <div className="input-group">
          <span className="input-group-text w-25" id="basic-addon1" disabled={desativado}>
            {etiquetaComAsterisco}
          </span>
          <select
            className="form-select w-75"
            aria-label={etiqueta}
            aria-describedby={personalizacao}
            disabled={desativado}
            value={selectedOption}
            onChange={handleSelectChange}
            required={obrigatorio}
          >
            <option value="" disabled>{etiqueta}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  desativado: PropTypes.bool.isRequired,
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  optionsData: PropTypes.array,
  personalizacao: PropTypes.string.isRequired,
  subtitulo: PropTypes.string.isRequired,
  obrigatorio: PropTypes.bool,
};

export default Dropdown;
