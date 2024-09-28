import React from 'react';

const Alert = ({ type, message, onClose }) => {
    const alertStyles = {
        container: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '300px',
            zIndex: 1000,
        },
        base: {
            padding: '20px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        success: {
            backgroundColor: '#4CAF50',
            color: '#fff',
        },
        error: {
            backgroundColor: '#f44336',
            color: '#fff',
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            color: 'inherit',
            fontSize: '20px',
            cursor: 'pointer',
        },
    };

    const alertStyle = type === 'success' ? { ...alertStyles.base, ...alertStyles.success } : { ...alertStyles.base, ...alertStyles.error };

    return (
        <div style={alertStyles.container}>
            <div style={alertStyle}>
                <span>{message}</span>
                <button style={alertStyles.closeBtn} onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Alert;
