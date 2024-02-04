const CampaignStatus = ({ status }) => {
    return (
        <>
            {status === 0 && (
                <div
                    style={{
                        position: 'relative',
                        borderRadius: '100px',
                        backgroundColor: '#E94E51',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        padding: '5px 10px',
                        boxSizing: 'border-box',
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#fff',
                        fontFamily: "'IBM Plex Sans'",
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '5px',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                width: '20px',
                                height: '20px',
                            }}
                        />
                        <div
                            style={{
                                position: 'relative',
                                lineHeight: '21px',
                                fontWeight: '600',
                            }}
                        >
                            Stopped
                        </div>
                    </div>
                </div>
            )}
            {status === 1 && (
                <div
                    style={{
                        position: 'relative',
                        borderRadius: '100px',
                        backgroundColor: '#01AB3B',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        padding: '5px 10px',
                        boxSizing: 'border-box',
                        textAlign: 'left',
                        fontSize: '14px',
                        color: '#fff',
                        fontFamily: "'IBM Plex Sans'",
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '5px',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                lineHeight: '21px',
                                fontWeight: '600',
                            }}
                        >
                            Running
                        </div>
                        <div
                            style={{
                                position: 'relative',
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                width: '20px',
                                height: '20px',
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CampaignStatus;
