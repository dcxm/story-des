import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import getItemsAction from "../store/actions/getItemsAction";

const ItemsList = (getItems, novels) => {
    const getNovels = () => {
            if (!novels || novels.length === 0) {
                setClearedType('novels')
                getItems("novel", "novels")
                setItems(novels)
            } else {
                setClearedType('novels')
                setItems(novels)
            }
    }

    useEffect(() => {
        getNovels()
    }, [])

    return (
        <ItemLists itemName='Novels' items={novels} type='novels'/>
    )
}

const mapStateToProps = state => {
    const { novels } = state.items;
    return {
        novels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getItems: (modelName, object) => dispatch(getItemsAction(modelName, object)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)
