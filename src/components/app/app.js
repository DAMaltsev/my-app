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
            return {
                data: newArr
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


    render(){

        const commonQty = this.state.data.length

        const rised = this.state.data.filter(item => item.increase).length

        return(
            <div className="app">
                <AppInfo
                commonQty={commonQty}
                rised={rised}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployersList 
                data={this.state.data}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployersAddForm data={this.state.data}
                onAdd= {this.createItem}/>
            </div>
        );
    }
};

export default App;
