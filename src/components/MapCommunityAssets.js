import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nodal from './common/Nodal';
import {communitySpace, publicLayer, communityBusiness, voluntarySector} from '../data/councilAssets';

class MapCommunityAssets extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }

        this.createNodal = this.createNodal.bind(this);
        
    }

    createNodal(communityAsset){
        return <Nodal
                    type = {communityAsset.Layer.slice(0,1)}
                    location = {[communityAsset.long,communityAsset.lat]}
                    name = {communityAsset.Name}
                    postcode = {communityAsset.Postcode}
                    subcat = {communityAsset["Sub Cat"]}
                    key = {this.state.count++}
                    telephone = {communityAsset["Telephone No."]}
                    ward = {communityAsset.Ward}
                    webAddress = {communityAsset["Web Address"]}
                    siteAddress = {communityAsset["Address"]}
                />
    }

    createNodes(){
        
        let nodes = [];

        if(this.props.activeCommunityAssets.includes("Community Space")){
            nodes.push(communitySpace.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            nodes.push(publicLayer.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){
            nodes.push(communityBusiness.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
            nodes.push(voluntarySector.map(this.createNodal))
        }

        return nodes;
    }

    render(){

        return (
            <React.Fragment>
                {this.createNodes()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ communityAssets }) => ({
    activeCommunityAssets: communityAssets.activeCommunityAssets,
});

export default connect(mapStateToProps)(MapCommunityAssets);