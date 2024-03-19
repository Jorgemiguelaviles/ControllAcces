import React, { useState } from 'react';
import PropTypes from 'prop-types';
import close from '../../assets/retorno.png';

export function ModalSelectCorpos({ setVisible, visible, descricao, titulo, corpomodal }) {


    return (
        <>
            <button style={{ background: '#333', borderColor: '#333' }} className=" w-100 btn btn-primary" onClick={() => setVisible(!visible)}>
                {descricao}
            </button>

            <div className={`modal ${visible ? 'show' : ''}`} tabIndex="-1" style={{ display: visible ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{titulo}</h1>
                            <button type="button" style={{ width: '2rem', height: '2rem', border: 'none', background: 'transparent' }} aria-label="Close" onClick={() => setVisible(!visible)}>
                                <img src={close} alt="Close" style={{ width: '2rem', height: '2rem', border: 'none', background: 'transparent' }} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {corpomodal}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ModalSelectCorposEdit({ setVisible, visible, onClick, descricao, titulo, corpomodal }) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <>
            <button
                style={{ background: '#333', borderColor: '#333' }}
                className="w-100 btn btn-primary"
                onClick={handleClick}
                data-bs-toggle="modal"
                data-bs-target="#modalCorpos"
            >
                {descricao}
            </button>

            <div
                className={`modal fade ${visible ? 'show' : ''}`}
                id="modalCorpos"
                tabIndex="-1"
                aria-labelledby="modalCorposLabel"
                aria-hidden={!visible}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCorposLabel">{titulo}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClick}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {corpomodal}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


ModalSelectCorposEdit.propTypes = {
    onClick: PropTypes.func,
    descricao: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    corpomodal: PropTypes.node.isRequired,
};
