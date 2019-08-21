import React, {Component} from 'react';

class PropertyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            properties: this.getProperties()
        }
    }

    getProperties(){
        let properties = [
            {
                img:        'field',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'Humberts'
            },
           {
                img:        'meadow',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'plotfinder.net'
            },
            {
                img:        'prarie',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'plotfinder.net'
            },
             {
                img:        'wasteland',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'Humberts'
            }
        ]
        return properties; 
    }

    createList(){
        let testName = this.state.properties[0].img;
       // let output = [<p>{this.state.properties[0].img}</p>];
        let propertyArray = [<p>test</p>,<p>test2</p>,<p>{this.testname}</p>];
        /*( 
            
                <p>{this.state.properties[0].img}</p>
                <p>{this.state.properties[0].location}</p>
                <p>{this.state.properties[0].price}</p>
                <p>{this.state.properties[0].agent}</p>
                <p>{this.state.properties[1].img}</p>
                <p>{this.state.properties[1].location}</p>
                <p>{this.state.properties[1].price}</p>
                <p>{this.state.properties[1].agent}</p>
                <p>{this.state.properties[2].img}</p>
                <p>{this.state.properties[2].location}</p>
                <p>{this.state.properties[2].price}</p>
                <p>{this.state.properties[2].agent}</p>
                <p>{this.state.properties[3].img}</p>
                <p>{this.state.properties[3].location}</p>
                <p>{this.state.properties[3].price}</p>
                <p>{this.state.properties[3].agent}</p>
                
                )
       */
        return propertyArray;
    }

    render(){
        return(
            <div>
               {this.createList()}
            </div>
            
        )
        
    }
}

export default PropertyList;