export const BACKGROUND_BUTTON = "#038C65";
export const BACKGROUND_BUTTON_HOVER = "#64C827";
export const BACKGROUND_PAPER = "#0C3B40";
export const BACKGROUND_BUTTON_DISABLE = "#D9D9D9"


export const buttonStyles = {
    backgroundColor: BACKGROUND_BUTTON,
    color: "#fff",
    "&:hover": {
        backgroundColor: BACKGROUND_PAPER,
    },
};

export const backgroundNavBar = {
    backgroundColor: "#fff",
    color: "#000",
};

export const paperStyle = {
    display: "flex",
	borderRadius: 2,
    backgroundColor: BACKGROUND_PAPER,
    width: "95%",
    height: "100%",
    color: "WHITE",
    margin: "20px",
    borderColor: "WHITE",
    padding: "20px"
}


export const paperStyleInternal = {
    backgroundColor: '#00382C',
    padding: '40px',
    textAlign: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
}


export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 669,
    height: "50%",
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    padding: '20px',
}


export const searchBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '30px',
    marginLeft: '30px'
};