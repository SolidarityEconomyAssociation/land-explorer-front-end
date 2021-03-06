import React, { Component } from 'react';
import Modal from '../common/Modal';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../Auth";
const moment = require('moment/moment.js');

class MySharedMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: {
                id: null,
                name: null
            },
            trash: false,
            load: false,
        }
    }

    renderMapList = () => {
        let myMaps = this.props.myMaps.filter((map) => map.access === 'READ');
        return myMaps.map((item, i) => {
            console.log("render map list", item);
            let map = item.map;
            let momentDate = moment(map.lastModified).format("DD/MM/YYYY");
            return (
                <tr key={`map-${i}`}
                    className={`table-map ${this.state.active.id === map.eid ? 'active' : ''}`}
                    onClick={() => {
                        this.setState({ active: { id: map.eid, name: map.name } })
                    }}
                >
                    <th style={{ width: '24px' }}>{` `}</th>
                    <td style={{ width: '230px' }}>{map.name}</td>
                    <td>{momentDate}</td>
                </tr>
            )
        });
    }

    render() {
        let { currentMapId } = this.props;
        let myMaps = this.props.myMaps.filter((map) => map.access === 'READ');
        if (this.state.trash) {
            return (
                <Modal id="mySharedMaps" padding={true}>
                    <div className="modal-title">Shared Maps</div>
                    <div className="modal-content modal-content-trash">
                        {`Delete "${this.state.active.name}"? This cannot be undone.`}
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel button-small"
                            onClick={() => {
                                this.setState({ trash: false })
                            }}
                        >
                            Cancel
                        </div>
                        <div className="button button-small"
                            onClick={() => {
                                axios.post(`${constants.ROOT_URL}/api/user/map/delete/`, {
                                    "eid": this.state.active.id
                                }, getAuthHeader())
                                    .then((response) => {
                                        console.log("delete response", response);
                                        if (this.state.active.id === currentMapId) {
                                            this.props.dispatch({ type: 'NEW_MAP' });
                                            this.props.drawControl.draw.deleteAll();
                                            setTimeout(() => {
                                                this.props.dispatch({ type: 'CHANGE_MOVING_METHOD', payload: 'flyTo' })
                                            }, 1000);
                                        }
                                        axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
                                            .then((response) => {
                                                console.log("maps response", response);
                                                this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
                                                this.setState({ trash: false });
                                            })
                                            .catch(() => {
                                                this.setState({ trash: false });
                                            })
                                    });
                            }}
                        >
                            Delete
                        </div>
                    </div>
                </Modal>
            )
        } else if (this.state.load) {
            return (
                <Modal id="mySharedMaps" padding={true}>
                    <div className="modal-title">Shared Maps</div>
                    <div className="modal-content modal-content-trash"
                        style={{ textAlign: 'center' }}>
                        {`Load "${this.state.active.name}"?`}
                        <br />
                        <br />
                        Any unsaved changes to the current map will be lost.
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel button-small"
                            onClick={() => {
                                this.setState({ load: false })
                            }}
                        >
                            Cancel
                        </div>
                        <div className="button button-small"
                            onClick={() => {
                                let savedMap = this.props.myMaps.filter((item) => item.map.eid === this.state.active.id);
                                savedMap = JSON.parse(savedMap[0].map.data);
                                console.log("saved map", savedMap);
                                if (savedMap) {
                                    this.props.drawControl.draw.deleteAll();
                                    axios.post(`${constants.ROOT_URL}/api/user/map/view/`, {
                                        "eid": this.state.active.id,
                                    }, getAuthHeader());

                                    //pick up the old name for the landDataLayers
                                    if (savedMap.mapLayers.activeLayers) {
                                        console.log("happening")
                                        savedMap.mapLayers.landDataLayers = savedMap.mapLayers.activeLayers;
                                    }
                                    //fix that some have no dataLayers
                                    if (!savedMap.mapLayers.myDataLayers) {
                                        savedMap.mapLayers.myDataLayers = [];
                                    }

                                    console.log(savedMap.mapLayers.activeLayers)
                                    console.log(savedMap)
                                    this.props.dispatch({
                                        type: 'LOAD_MAP',
                                        payload: savedMap,
                                        id: this.state.active.id
                                    });
                                    this.props.dispatch({
                                        type: 'CLOSE_MODAL',
                                        payload: 'mySharedMaps'
                                    });
                                    this.setState({ load: false });
                                    this.props.dispatch({
                                        type: 'READ_ONLY_ON'
                                    });
                                    setTimeout(() => {
                                        this.props.redrawPolygons();
                                    }, 200);
                                    setTimeout(() => {
                                        this.props.dispatch({
                                            type: 'CHANGE_MOVING_METHOD',
                                            payload: 'flyTo'
                                        })
                                    }, 1000)
                                }
                            }}
                        >
                            Ok
                        </div>
                    </div>
                </Modal>
            )
        } else if (myMaps.length) {
            return (
                <Modal id="mySharedMaps" padding={true}>
                    <div className="modal-title">Shared Maps</div>
                    <div className="modal-content">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '24px' }}>{` `}</th>
                                    <th style={{ width: '230px' }}>Name</th>
                                    <th>Modified</th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{
                            height: '130px',
                            overflowY: 'scroll',
                        }}>
                            <table>
                                <tbody>
                                    {this.renderMapList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel button-small"
                            onClick={() => this.props.dispatch({
                                type: 'CLOSE_MODAL',
                                payload: 'mySharedMaps'
                            })}
                        >
                            Cancel
                        </div>
                        <div className="button button-small"
                            onClick={() => {
                                if (this.state.active !== null) {
                                    this.setState({ load: true });
                                }
                            }}
                        >
                            Open
                        </div>
                    </div>
                </Modal>
            );
        } else {
            return (
                <Modal id="mySharedMaps" padding={true}>
                    <div className="modal-title">Shared Maps</div>
                    <div className="modal-content modal-content-trash">
                        <p>There are no shared maps.</p>
                    </div>
                </Modal>
            )
        }
    }
}

const mapStateToProps = ({ user, save, myMaps, mapMeta }) => ({
    user: user,
    savedMaps: save.savedMaps,
    myMaps: myMaps.maps,
    currentMapId: mapMeta.currentMapId
});

export default connect(mapStateToProps)(MySharedMaps);
