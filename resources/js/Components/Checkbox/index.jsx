// Checkbox.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import seta_cima from '../../assets/seta-para-cima.png';
import seta_baixo from '../../assets/seta-para-baixo.png';

const Checkbox = ({
    value,
    setvalue,
    etiqueta,
    image,
    setimage,
    setimagestatus,
    interligacao,
    updatedSystemImageStatus,
    check // Nova propriedade para determinar se o checkbox será exibido
}) => {


    console.log(value)
    const [localValue, setLocalValue] = useState(value);
    const [systemImageStatus, setSystemImageStatus] = useState(updatedSystemImageStatus);
    const [NewValue, setNewValue] = useState(updatedSystemImageStatus);


    useEffect(() => {
        setLocalValue(value);
    }, [value]);


    const handleCheckboxChange = () => {
        const newValuev = !localValue;
        if (setvalue) {
            setvalue(newValuev);
            setLocalValue(newValuev);
            setNewValue(newValuev);
        }
    };

    const handleImageClick = () => {
        const newImage = image === seta_baixo ? seta_cima : seta_baixo;
        const updatedSystemImageStatus = !systemImageStatus;

        // Atualiza a imagem no estado
        if (setimage) {
            setimage(newImage);
        }

        if (setimagestatus) {
            setimagestatus(updatedSystemImageStatus);
        }

        // Atualiza o status no estado
        setSystemImageStatus(updatedSystemImageStatus);
    };

    return (
        <div className="form-check" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            {check && ( // Renderiza o checkbox apenas se a propriedade check for true
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={interligacao}
                    checked={localValue}
                    onChange={handleCheckboxChange}
                />
            )}
            <label className="form-check-label" htmlFor={interligacao} style={{ marginRight: '0.5rem' }}>
                {etiqueta}
            </label>
            {image && (
                <div>
                    <img
                        src={image}
                        alt="Imagem"
                        style={{ width: '1.5rem', cursor: 'pointer' }}
                        onClick={handleImageClick}
                    />
                </div>
            )}
        </div>
    );
};

Checkbox.propTypes = {
    setvalue: PropTypes.func.isRequired,
    etiqueta: PropTypes.string.isRequired,
    image: PropTypes.string, // Alterado para string
    setimage: PropTypes.func,
    setimagestatus: PropTypes.func,
    updatedSystemImageStatus: PropTypes.bool,
    check: PropTypes.bool // Nova propriedade para determinar se o checkbox será exibido
};

export default Checkbox;
