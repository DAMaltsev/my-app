import './app-info.css';

const AppInfo = ({commonQty, rised}) => {
    return(
        <div className="app-info">
            <h1>Учет сотрудников компании N </h1>
            <h2>Общее число сотрудников: {commonQty}</h2>
            <h2>Премию получат: {rised}</h2>
        </div>
    );
};

export default AppInfo;