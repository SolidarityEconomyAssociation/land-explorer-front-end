import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nodal from './common/Nodal';
import {communitySpace,
        publicLayer,
        sportsLeisure,
        communityBusiness,
        businessNight,
        business,
        voluntarySector, } from '../data/councilAssetsNew';

class MapCommunityAssets extends Component {
    constructor(props){
        super(props);

        this.createNodal = this.createNodal.bind(this);
        this.getBoundaries = this.getBoundaries.bind(this);
        
    }

    getBoundaries(){

        var bounds = this.props.map.getBounds();

        //topRight has a higher long, and a higher lat
        //bottomLeft has a lower long and a lower lat
        return {"topRight": bounds._ne, "bottomLeft": bounds._sw};
    }

    createNodal(communityAsset){
        let boundaries = this.getBoundaries();

        if(communityAsset.Long < boundaries.topRight.lng && communityAsset.Long > boundaries.bottomLeft.lng)
        if(communityAsset.Lat < boundaries.topRight.lat && communityAsset.Lat > boundaries.bottomLeft.lat)
            return <Nodal
                    type = {communityAsset.Layer.slice(0,1)}
                    location = {[communityAsset.Long,communityAsset.Lat]}
                    name = {communityAsset.Name}
                    postcode = {communityAsset.Postcode}
                    subcat = {communityAsset["Sub Cat"]}
                    key = {communityAsset["Ref:No"]}
                    telephone = {communityAsset["Telephone No."]}
                    ward = {communityAsset.Ward}
                    website = {communityAsset["Web Address"]}
                    addressLine1 = {communityAsset["Address 1"]}
                    addressLine2 = {communityAsset["Add 2 (RD - St)"]}
                    addressLine3 = {communityAsset["Add 3"]}
                    addressLine4 = {communityAsset["Add 4"]}
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

        if(this.props.activeCommunityAssets.includes("Sports Leisure")){
            nodes.push(sportsLeisure.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){
            nodes.push(communityBusiness.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business Night")){
            nodes.push(businessNight.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business")){
            nodes.push(business.map(this.createNodal))
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