import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [
                {name: "John", salary: 3100, increase: false, id: 1, rise: true},
                {name: "Dan", salary: 1200, increase: true, id: 2, rise: false},
                {name: "Heket", salary: 1500, increase: false, id: 3, rise: false}
            ],
            term: '',
            filter: ''
        }
        this.maxID = 4 
    }



    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id == id);
            // console.log(index);

            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    createItem = (name, salary) => {
        const newUser = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxID++
        }

        this.setState(({data}) => {
            const newArr = [...data, newUser]
            if (newUser.name.length > 2 && newUser.salary > 0) {
                return {
                    data: newArr
                }
            }
            else {
                alert("Введите все данные для нового пользователя");
            }

        })
    }


    onToggleProp = (id, prop) => {

        // this.setState(({data})=> {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        //     return {
        //         data:newArr
        //     }

        // })

        this.setState(({data})=>({
            data: data.map(item => {
                if(item.id===id){
                    return {...item, [prop]: ! item[prop]}
                }
                return item;
            })
        }))
    }


    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    filterPost = (items, filter) =>{ 
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000': 
                return items.filter(item => item.salary > 1000);
            default: 
                return items
        }
    }
   

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    render(){

        const {data, term, filter} = this.state;
        const commonQty = this.state.data.length;
        const rised = data.filter(item => item.increase).length;
        const visiableData = this.filterPost( this.searchEmp(data, term), filter);


        return(
            <div className="app">
                <AppInfo
                commonQty={commonQty}
                rised={rised}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filterRise={this.filterPost(visiableData)}/>
                </div>
    
                <EmployersList 
                data={visiableData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployersAddForm data={data}
                onAdd= {this.createItem}/>
            </div>
        );
    }
};

export default App;
