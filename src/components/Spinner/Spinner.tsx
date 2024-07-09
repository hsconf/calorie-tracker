
const Spinner = () => {
    return (
        <div className="text-center position-fixed top-50" style={{left: '50%'}}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;