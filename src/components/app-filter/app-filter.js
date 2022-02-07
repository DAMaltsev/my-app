import './app-filter.css';

const AppFilter = ({risedData, onRiseSearch}) => {

    // onRiseSearch = ({data}) =>{

    // }

   
    return(
        <div className="btn-group">
            <button className="btn btn-light" type="button">
                Все сотрудники
            </button>
            <button onClick={onRiseSearch} className="btn btn-outline-light" type="button">
                На повышение
            </button>
            <button className="btn btn-outline-light" type="button">
                З/п больше 1000$
            </button>
        </div>
    );
};

export default AppFilter;