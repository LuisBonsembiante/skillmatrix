import React from "react";
import {connect} from "react-redux";

const _profileInfo = (props) => {

    return (
        <>
            <h1>Profile Info</h1>
            <br/>
            <br/>
        </>
    )
};

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, {})(_profileInfo);