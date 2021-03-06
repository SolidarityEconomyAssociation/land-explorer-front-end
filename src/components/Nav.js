import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios/index";
import constants from "../constants";
import { PropTypes } from 'prop-types';
import NavInformation from './NavInformation';
import NavLandOwnership from './NavLandOwnership';
import NavLandData from './NavLandData';
import NavCommunityAssets from './NavCommunityAssets';
import NavDrawingTools from './NavDrawingTools';
import analytics from '../analytics';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            ownership: true
        }
    }

    componentDidMount() {
        const LX_SUBSCRIPTION_ID = "1";
        const SUBSCRIPTION_ACTIVE = "1";

        axios.get(`${constants.PAYMENTS_URL}/subscription/${this.props.user.username}/${LX_SUBSCRIPTION_ID}`)
            .then(res => {
                const { data: { subscription } } = res;
                if (subscription)
                    if (subscription.status_type == SUBSCRIPTION_ACTIVE)
                        this.setState({ ownership: true });
            });
    }

    closeTray = () => {
        this.props.dispatch({ type: 'CLOSE_TRAY' })

    }

    closeNav = () => {
        if (this.props.active !== '') {
            this.props.dispatch({ type: 'CLOSE_TRAY' });
            console.log(this.props.active)

            setTimeout(() => {
                this.props.dispatch({ type: 'CLOSE_NAVIGATION' });
            }, 200);
        } else {
            this.props.dispatch({ type: 'CLOSE_NAVIGATION' });

        }
    }

    clickIcon = (tray) => {
        let { active, dispatch } = this.props;
        active === tray ?
            dispatch({ type: 'CLOSE_TRAY' }) :
            dispatch({ type: 'SET_ACTIVE', payload: tray });
    }

    handleTrashClick = () => {
        if (this.props.activeTool === 'edit') {
            let selected = this.props.drawControl.draw.getSelected();
            if (selected.features[0]) {
                let id = selected.features[0].id;
                this.props.drawControl.draw.delete(id);
                this.props.dispatch({
                    type: 'DELETE_POLYGON',
                    payload: id
                })
            }
        } else if (this.props.activePolygon !== null) {
            // Delete the active Polygon
            this.props.drawControl.draw.delete(this.props.activePolygon);
            this.props.dispatch({
                type: 'DELETE_POLYGON',
                payload: this.props.activePolygon
            })
        } else if (this.props.currentMarker !== null) {
            // Delete the current marker
            this.props.dispatch({
                type: 'CLEAR_MARKER',
                payload: this.props.currentMarker
            })
        }
    }

    render() {
        const { dispatch, open, active, drawControl, readOnly, user: { type } } = this.props;
        const { ownership } = this.state;
        const council = type == 'council';

        return (
            <nav>
                <div className="toggle-nav"
                    onClick={() => {
                        analytics.event(analytics._event.SIDE_NAV, 'Open');
                        dispatch({ type: 'TOGGLE_NAVIGATION' })
                    }}
                >
                </div>
                <div className="nav-left"
                    style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
                >
                    <div className="nav-left-icon close"
                        onClick={this.closeNav}
                    />
                    <div id="drawing-tools-icon"
                        className={`nav-left-icon drawing-tools ${active === 'Drawing Tools' && 'active'}`}
                        style={{ opacity: readOnly ? .5 : 1 }}
                        onClick={() => {
                            if (!readOnly) {
                                analytics.event(analytics._event.SIDE_NAV + ' Drawing', 'Open');
                                this.clickIcon('Drawing Tools')
                            }
                        }}
                        data-tip
                        data-for="ttDrawingTools"
                    />
                    {council ? <div className={`nav-left-icon data-layers ${active === 'Community Assets' && 'active'}`}
                        onClick={() => {
                            analytics.event(analytics._event.SIDE_NAV + ' Community Assets', 'Open');
                            this.clickIcon('Community Assets')
                        }}
                        data-tip
                        data-for="ttCommunityAssets"
                    /> :
                        <div className={`nav-left-icon data-layers ${active === 'Land Data' && 'active'}`}
                            onClick={() => {
                                analytics.event(analytics._event.SIDE_NAV + ' Land Data', 'Open');
                                this.clickIcon('Land Data')
                            }}
                            data-tip
                            data-for="ttLandData"
                        />}
                    <div className={`nav-left-icon info ${active === 'Land Information' && 'active'}`}
                        onClick={() => {
                            analytics.event(analytics._event.SIDE_NAV + ' Land Information', 'Open');
                            this.clickIcon('Land Information')
                        }}
                        data-tip
                        data-for="ttInfo"
                    />
                    {
                        ownership &&
                        <div className={`nav-left-icon property-search ${active === 'Land Ownership' && 'active'}`}
                            onClick={() => {
                                analytics.event(analytics._event.SIDE_NAV + ' Land Ownership', 'Open');
                                this.clickIcon('Land Ownership')
                            }}
                            data-tip
                            data-for="ttLandOwnership"
                        />
                    }
                    <div className="nav-left-icon new-map-icon"
                        onClick={() => {
                            analytics.event(analytics._event.SIDE_NAV + ' New Map', 'Clicked');
                            this.props.dispatch({
                                type: 'OPEN_MODAL',
                                payload: 'newMap'
                            });
                        }}
                        data-tip
                        data-for="ttNewMap"
                    />
                    <div className="nav-left-icon save"
                        data-tip
                        data-for="ttSave"
                        onClick={() => {
                            analytics.event(analytics._event.SIDE_NAV + ' Save', 'Clicked');
                            this.props.dispatch({ type: 'OPEN_MODAL', payload: "save" })
                        }}
                    />
                    <div
                        id="share-icon"
                        className="nav-left-icon share"
                        data-tip
                        data-for="ttShare"
                        style={{
                            opacity: readOnly ? .5 : 1
                        }}
                        onClick={() => {
                            if (!readOnly) {
                                analytics.event(analytics._event.SIDE_NAV + ' Share', 'Clicked');
                                analytics.pageview('/app/my-maps/share');
                                this.props.dispatch({ type: 'OPEN_MODAL', payload: "share" })
                            }
                        }}
                    />
                </div>
                {
                    // If not read only, render drawing tools
                    !readOnly && (
                        <NavDrawingTools
                            active={active}
                            open={open}
                            onClose={this.closeTray}
                            handleTrashClick={this.handleTrashClick}
                            drawControl={drawControl}
                        />
                    )
                }
                {council ? <NavCommunityAssets
                    open={open}
                    active={active}
                    onClose={this.closeTray}
                /> : <NavLandData
                    open={open}
                    active={active}
                    onClose={this.closeTray}
                />}
                <NavLandOwnership
                    open={open}
                    active={active}
                    onClose={this.closeTray}
                />
                <NavInformation
                    open={open && active === 'Land Information'}
                    onClose={this.closeTray}
                />
            </nav>
        );
    }
}

Nav.propTypes = {
    open: PropTypes.bool,
    active: PropTypes.string
};

const mapStateToProps = ({ navigation, information, informationSections, readOnly, drawings, markers, mapMeta, user }) => ({
    open: navigation.open,
    active: navigation.active,
    information,
    informationSections,
    activeTool: navigation.activeTool,
    readOnly: readOnly.readOnly,
    currentMarker: markers.currentMarker,
    activePolygon: drawings.activePolygon,
    currentMapId: mapMeta.currentMapId,
    user: user,
});

export default connect(mapStateToProps, null)(Nav);
