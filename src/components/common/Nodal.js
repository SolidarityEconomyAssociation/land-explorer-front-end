import React, {Component} from 'react';
import {Marker} from 'react-mapbox-gl';
import {connect} from 'react-redux';
 



class Nodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            checkBoxState : false,
           
        }

        this.openPopup              = this.openPopup.bind(this);
        this.displayInfoIfActive    = this.displayInfoIfActive.bind(this);
        this.closePopup             = this.closePopup.bind(this);
        this.readMore               = this.readMore.bind(this);
        this.readLess               = this.readLess.bind(this)
        this.deleteNodal            = this.deleteNodal.bind(this);
    }


  
    getImgByType(type){
        const redMarker = require('../../assets/img/icon-community-asset-red.svg');
        const blueMarker =  require('../../assets/img/icon-community-asset-blue.svg');
        const purpleMarker = require('../../assets/img/icon-community-asset-purple.svg');
        const greenMarker = require('../../assets/img/icon-community-asset-green.svg');
        const brownMarker = require('../../assets/img/icon-community-asset-brown.svg');
        const greyMarker = require('../../assets/img/icon-community-asset-grey.svg');
        const orangeMarker = require('../../assets/img/icon-community-asset-orange.svg');
        
        switch(type){
            case "1": return redMarker;
            case "2": return blueMarker;
            case "3": return purpleMarker;
            case "4": return greenMarker;
            case "5": return brownMarker;
            case "6": return greyMarker;
            case "7": return orangeMarker;
        }
    }
   
    readMore() 
     {
        this.setState({ checkBoxState:  true  });
     }

     readLess()
     {
        this.setState({ checkBoxState:  false  });
     }

     extraInfo()
     {
        
         return(<div>
            <p> Opening Times </p>
            
            <p> Capacity </p>
           
            <p> Telephone No </p>
           
            <p> Contact Name </p>
           
            <p> Email Address </p>
        </div> );
     }


    openPopup()
    {   

        
        this.props.dispatch({
            type: 'TURN_ON_NODAL',
            payload: {
                id:     this.props.id,
            }
        });
        // let zoom = this.map.getZoom();
        // alert(zoom);

    }

    closePopup()
    {
        this.props.dispatch({
            type: 'CLOSE_NODALS',
        });
    }

    deleteNodal()   
    {

           
           // if I click ok I then delete button sends an API call along with the key 
           // then API call deletes a specific record from the database  based on the key value 
                       
    }

    displayInfoIfActive(){
 
         
        // console.log(this.props.zoom)
  

        const closeIcon = require('../../assets/img/icon-close-new.svg')
        const DeleteCommunityAsset = require('../../assets/img/icon-trash-red.svg')

        let buttonStyle={
            color: 'grey',
            textDecoration: 'underline',
        }

        let closeStyle =
         {
            height: '10px',
            width: '10px',
            borderRadius: '50%',
            position: 'absolute',
            top: '12px',
            cursor: 'pointer',
            right: '12px',
            zIndex: '5',
        }

        if(this.props.id === this.props.activeNodal)
       
            return <div className="nodal">
                 <form  className = "CommunityAssetControls">
                    <button className = "DeleteCommunityAsset" onClick ={this.deleteNodal}  >
                            <img src = {DeleteCommunityAsset}   alt = "DeleteCommunityAsset" 
                              key = {this.props.id}  />
                    </button>
                   </form> 
                        
                        <dialog style = {{display: 'block'}} className = "ConfirmDialog"> Are you sure want to remove this nodal from the map ? 
                        
                       < div className = "DecisionButtons">
                           
                        <button id = "Yes" onClick ={console.log('Element is being deleted...') }> Yes </button> 
                        <button id = "No" onClick = {console.log('Dialog is closed ')}> No </button>
                        </div>

                        </dialog>
                   
                        
                        

            <span onClick = {this.closePopup} className="nodal_close">&#x2715;</span>
            <h2 className = "nodal_title">{this.props.name}</h2>
            {this.state.checkBoxState ? 
                <div>
                    <table className="w3-table">
                        <tr>
                            <td valign="top">Address:</td>
                            <td>{this.props.addressLine1} {this.props.addressLine2} {this.props.addressLine3} {this.props.addressLine4}</td>
                        </tr>
                        <tr>
                            <td>Postcode:</td>
                            <td>{this.props.postcode}</td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td>{this.props.subcat}</td>
                        </tr>
                        <tr>
                            <td>Ward:</td>
                            <td>{this.props.ward}</td>
                        </tr>
                        {(this.props.telephone) && (this.props.telephone !== "") ?
                            <tr>
                                <td>Phone:</td>
                                <td>{this.props.telephone}</td>
                            </tr>:""
                        } 
                        {(this.props.email) && (this.props.email !== "") ?
                            <tr>
                                <td>Email:</td>
                                <td>{this.props.email}</td>
                            </tr>:""
                        } 
                        {(this.props.website) && (this.props.website !== "") ?
                            <tr>
                                <td>Website:</td>
                                <td>{this.props.website}</td>
                            </tr>:""
                        } 
                        {(this.props.spaceAvailable) && (this.props.spaceAvailable !== "") ?
                            <tr>
                                <td>Space Available:</td>
                                <td>{this.props.spaceAvailable}</td>
                            </tr>:""
                        } 
                        {(this.props.specialistSpace) && (this.props.specialistSpace !== "") ?
                            <tr>
                                <td>Specialist Space:</td>
                                <td>{this.props.specialistSpace}</td>
                            </tr>:""
                        } 
                        {(this.props.kitchen) && (this.props.kitchen !== "") ?
                            <tr>
                                <td>Kitchen:</td>
                                <td>{this.props.kitchen === "Y" ? "Yes" : this.props.kitchen}</td>
                            </tr>:""
                        } 
                        {(this.props.disabled) && (this.props.disabled !== "") ?
                            <tr>
                                <td>Disabled Access:</td>
                                <td>{this.props.disabled === "Y" ? "Yes" : this.props.disabled}</td>
                            </tr>:""
                        } 
                        {(this.props.price) && (this.props.price !== "") ?
                            <tr>
                                <td>Price Range:</td>
                                <td>{this.props.price}</td>
                            </tr>:""
                        } 
                    </table>
                    <button onClick = { this.readLess} className="nodal_action">Read less &#8594;</button>
                </div> 
                : 
                <div>
                    <table className="w3-table">
                        <tr>
                            <td valign="top">Address:</td>
                            <td>{this.props.addressLine1} {this.props.addressLine2} {this.props.addressLine3} {this.props.addressLine4}</td>
                        </tr>
                        <tr>
                            <td>Postcode:</td>
                            <td>{this.props.postcode}</td>
                        </tr>

                        <tr>
                            <td>Category:</td>
                            <td>{this.props.subcat}</td>
                        </tr>

                        <tr>
                            <td>Ward:</td>
                            <td>{this.props.ward}</td>
                        </tr>
                        
                    </table>
                    <button onClick = { this.readMore} className = "nodal_action">Read more &#8594;</button>
                </div> 
            }
            <div className="SpeechBubble"></div>
            {/*   
            <div className = "Popup">
                    <span>
                        <img src = {closeIcon} style = {closeStyle} onClick = {this.closePopup} />
                        <h2>{this.props.name}</h2>
                    </span>
                        
                      
                        <figure className = "CommunityAssetControls">
                            <button className = "DeleteCommunityAsset"  >
                            <img src = {DeleteCommunityAsset}   alt = "DeleteCommunityAsset" 
                             onClick ={ ((e) => this.deleteNodal(e, this.props.id))} style = {{ backgroundColor: 'none'}}  />
                            </button>
                        </figure> 
                        
                        <p>{this.props.addressLine1}</p>
                        <p>{this.props.addressLine2}</p>
                        <p>{this.props.addressLine3}</p>
                        <p>{this.props.addressLine4}</p>
                        <p>{this.props.postcode}</p>
                        <p>{this.props.subcat}</p>
                        <p>{this.props.website}</p>


                    {this.state.checkBoxState ? 
                        <div>
                            <div>
                                <p> Opening Times </p>                                
                                <p> Capacity </p>    
                                <p>{this.props.telephone}</p>                          
                                <p> Contact Name </p>  
                                <p>{this.props.email}</p>
                            </div>
                            <div  
                                id = "LessInfo"   
                                onClick = { this.readLess}>
                                <p style={buttonStyle}>Less</p>
                            </div>
                        </div> 
                    : 
                        <div>
                            <div  
                                id = "MoreInfo"   
                                onClick = { this.readMore}>
                                <p style={buttonStyle}>More</p>
                            </div>
                        </div>
                    }
                        <div className="SpeechBubble"></div>  
                    </div>;
                    */}
                    
          </div>;
        else
            return;
    }
    
    
    render(){
        if(this.props.id == this.props.activeNodal)
        {
           
            return (<Marker style = { { zIndex: this.props.id == this.props.activeNodal? 4 : 3}}  
                     coordinates = {this.props.location} 
                    >
                        {this.displayInfoIfActive()}
                        <img 
                            src={this.getImgByType(this.props.type)} 
                            style={{height: '30px', width: '30px', }}
                        />
                    </Marker>);
        }
        else
            return (<Marker 
                        style = { { zIndex: this.props.id == this.props.activeNodal? 4 : 3}}  
                        coordinates = {this.props.location}
                        onClick={this.openPopup}
                    >
                        {this.displayInfoIfActive()}
                        <img 
                            src={this.getImgByType(this.props.type)} 
                            style={{height: '30px',width: '30px', }}
                        />
                    </Marker>);
    }
}

const mapStateToProps = ({ nodal , map }) => ({
    activeNodal: nodal.activeNodal,
    zoom: map.zoom
    
});




export default connect(mapStateToProps)(Nodal);