import React, { useEffect, useState } from 'react';
import { Checkbox } from '../index';

const GerenciamentoGroup = ({
    systemimageStatus,
    setSystemimageStatus,
    listMain,
    systemStates,
    systemStatus,
    setListMain,
    setSystemStates,
    setSystemStatus,
    listSecondary,
    setListSecondary,
    listSecondaryID,
    systemStatusSecondary,
    setSystemStatusSecondary,
    StatusAccess,
    dadosgrupo,
    dadosacesso,
}) => {

    const [contentCheckboxMain, setContentCheckboxMain] = useState([]);
    const [updatedSystemImageStatusLog, setUpdatedSystemImageStatusLog] = useState(null);

    useEffect(() => {
        try {
            const updatedListMain = [...listMain];
            const updatedSystemStatus = { ...systemStatus };
            const updatedListSecondary = [...listSecondary];
            const updatedCheckboxSecondaryStatus = { ...systemStatusSecondary };

            const mainCheckboxes = listMain.map((elementid, mainIndex) => {
                const value = updatedSystemStatus[elementid];


                if (value) {
                    return (
                        <div key={`mainCheckbox_${mainIndex}`}>
                            <Checkbox
                                etiqueta={elementid}
                                image={systemStates[elementid]}
                                interligacao={elementid}
                                updatedSystemImageStatus={systemimageStatus[elementid]}
                                setimage={(image) => {
                                    setSystemStates((prevSystemStates) => ({
                                        ...prevSystemStates,
                                        [elementid]: image,
                                    }));
                                    console.log(`Main Checkbox Image Updated ${mainIndex}:`, image);
                                }}
                                setimagestatus={(updatedSystemImageStatus) => {
                                    setUpdatedSystemImageStatusLog(updatedSystemImageStatus);
                                    setSystemimageStatus((prevStatus) => ({
                                        ...prevStatus,
                                        [elementid]: updatedSystemImageStatus,
                                    }));
                                    console.log(`Main Checkbox Image Status Updated ${mainIndex}:`, updatedSystemImageStatus);
                                }}
                            />

                            {systemimageStatus[elementid] && (
                                <div style={{ marginLeft: '4rem' }}>
                                    {updatedListSecondary.map((element, secondaryIndex) => {
                                        const id = mainIndex + 1;
                                        const system_id = listSecondaryID[secondaryIndex];
                                        const value2 = systemStatusSecondary[system_id];
                                        console.log(systemStatusSecondary)
                                        const definetion = dadosacesso[secondaryIndex]["acesso"]


                                        if (id === system_id) {
                                            if (StatusAccess[secondaryIndex]) {
                                                return (
                                                    <div key={`secondary_${secondaryIndex}`} style={{ marginLeft: '4rem' }}>
                                                        <Checkbox
                                                            check={true}
                                                            value={dadosgrupo[definetion]}
                                                            etiqueta={element}
                                                            interligacao={element}
                                                            setvalue={(value2) => {
                                                                setSystemStatusSecondary((prevListMain) => ({
                                                                    ...prevListMain,
                                                                    [secondaryIndex + 1]: value2,
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            }
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            )}
                        </div>
                    )
                }
            });

            const shouldUpdate =
                JSON.stringify(updatedListMain) !== JSON.stringify(listMain) ||
                JSON.stringify(updatedSystemStatus) !== JSON.stringify(systemStatus) ||
                JSON.stringify(updatedListSecondary) !== JSON.stringify(listSecondary) ||
                JSON.stringify(updatedCheckboxSecondaryStatus) !== JSON.stringify(systemStatusSecondary);

            if (shouldUpdate) {
                setSystemStatus(updatedSystemStatus);
                setListSecondary(updatedListSecondary);
                setSystemStatusSecondary(updatedCheckboxSecondaryStatus);
            }

            setContentCheckboxMain(mainCheckboxes);
        } catch (error) {
            // Handle errors here
        }
    }, [
        listMain,
        listSecondary,
        listSecondaryID,
        systemStates,
        systemStatus,
        systemStatusSecondary,
        systemimageStatus,
        setListMain,
        setSystemStates,
        setSystemStatus,
        setListSecondary,
        setSystemStatusSecondary,
    ]);

    useEffect(() => {
        if (updatedSystemImageStatusLog !== null) {
            console.log('Updated System Image Status:', updatedSystemImageStatusLog);
        }
    }, [updatedSystemImageStatusLog]);

    return <div style={{ marginBottom: '1rem' }}>{contentCheckboxMain}</div>;
};

export default GerenciamentoGroup;
